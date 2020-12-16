import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {
  destroyed = false;
  routerSubscription$: Subscription;
  storeSubscription$: Subscription;
  count: number;
  searchValue: any;
  isInitLoading: boolean = true; // bug
  canLoadingMore: boolean = true;
  employees = [];
  employeesData$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.isInitLoading = true;
    this.searchValue = this.route.snapshot.params.find;

    this.storeSubscription$ = this.store.pipe(select(selectAllSearches)).subscribe(next => {
      let nextID = next.findIndex(item => item.id === this.searchValue);
      
      if (next.length && nextID !== -1) {
        console.log(next);
        this.employees = [...next[nextID].results];
        this.count = next[nextID].count;
        this.canLoadingMore = this.checkLoadMore();
        this.spinner.hide();
        this.triggerDetection();
      } else {
        this.getDataFromAPI(this.searchValue);
      }
    });

    this.recentSearchesManipulating();
  }

  getDataFromAPI(id) {
    this.employeesService.searchFirstTen(id).subscribe(
      next => {
        
        this.employees = [...this.employees, ...next.data];
        this.count = next.count;
        this.spinner.hide();
        this.canLoadingMore = this.checkLoadMore();
        let obj: Searches[] = [{id, results: next.data, count: next.count}];
        this.store.dispatch(allSearchesLoaded({searches: obj}));
        this.store.dispatch(allEmployeesLoaded({employees: next.data}));
        this.triggerDetection();
      })
  }

  onLoadMore(): void {
    this.spinner.show();
    this.store.dispatch(loadNextTenEmployees({from: this.searchValue, to: this.employees.length, prevData: this.employees, count: this.count}))
  }


  checkLoadMore(): boolean {
    return this.count > this.employees.length;
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

  triggerDetection() {
    if (!this.destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.storeSubscription$.unsubscribe();
    this.destroyed = true;
    
  }
}