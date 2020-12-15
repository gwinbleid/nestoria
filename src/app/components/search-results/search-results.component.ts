import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employees } from 'src/app/model/employee';
import { Searches } from 'src/app/model/search';
import { EmployeesService } from 'src/app/services/employees.service';
import { allEmployeesLoaded } from 'src/app/state/employees.actions';
import { selectAllEmployees } from 'src/app/state/employees.selectors';
import { allSearchesLoaded, loadNextTenEmployees, nextTenEmployeesLoaded } from 'src/app/state/searches.actions';
import { selectAllSearches } from 'src/app/state/searches.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {
  routerSubscription$: Subscription;
  count: number;
  searchValue: any;
  isInitLoading: boolean = true; // bug
  canLoadingMore: boolean = true;
  employees = [];
  employeesData$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,



    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.searchValue = this.route.snapshot.params.find;
    console.log(this.searchValue);


    this.store.pipe(select(selectAllSearches)).subscribe(next => {
      if (next.length) {
        this.employees = next[0].results;
      } else {
        this.getDataFromAPI(this.searchValue);
      }
    });

    this.recentSearchesManipulating();
    this.subscribeToRoute();
  }

  subscribeToRoute(): void {
    this.routerSubscription$ = this.route.data
      .subscribe((next: {count: number }) => {
        // this.employees = next.result;
        
        this.count = next.count;
        this.isInitLoading = false;
        this.canLoadingMore = this.disableLoadMore();
    });
  }
  
  getDataFromStore() {
    
  }

  getDataFromAPI(id) {
    this.employeesService.searchFirstTen(id).subscribe(
      next => {
        this.employees = [...next.data];
        let obj: Searches[] = [{id, results: next.data, count: next.count}];
        this.store.dispatch(allSearchesLoaded({searches: obj}));
        this.store.dispatch(allEmployeesLoaded({employees: next.data, search: id}));
    })
  }

  onLoadMore(): void {
    this.store.dispatch(loadNextTenEmployees({from: this.searchValue, to: this.employees.length}))
    this.canLoadingMore = true;
    this.employeesService.loadMore(this.searchValue, this.employees.length)
      .subscribe(
        next => {
          
          this.employees = [...this.employees, ...next];
          this.canLoadingMore = this.disableLoadMore();
        }
      )
  }

  onLoadMoreNew() {

  }


  disableLoadMore(): boolean {
    return this.count > this.employees.length ? true : false;
  }

  recentSearchesManipulating(): void {
    let searches_storage = JSON.parse(localStorage.getItem('recent_searches'));
    searches_storage = [this.searchValue, ...searches_storage];
    if (searches_storage.length > 5) searches_storage.pop();
    localStorage.setItem('recent_searches', JSON.stringify(searches_storage));
  }

  navigateToDetails(id) {
    this.router.navigate(['/property', id]);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }
}

// nzSubtitle="{{employees.length}} items from {{count}}"
