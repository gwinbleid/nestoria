import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { allEmployeesLoaded } from 'src/app/state/employees.actions';
import { selectAllEmployees } from 'src/app/state/employees.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
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


    this.store.pipe(select(selectAllEmployees)).subscribe(next => {
      if (next.length) {
        this.employees = next
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
    this.employeesService.search(id).pipe(
      map(data => data.slice(0, 10))
    ).subscribe(
      next => this.employees = next
    )
  }

  onLoadMore(): void {
    this.canLoadingMore = true;
    this.employeesService.load_more(this.searchValue, this.employees.length)
      .subscribe(
        next => {
          
          this.employees = [...this.employees, ...next];
          this.canLoadingMore = this.disableLoadMore();
        }
      )
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
