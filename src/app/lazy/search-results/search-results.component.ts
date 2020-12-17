import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeesService } from 'src/app/services/employees.service';
import { allEmployeesLoaded } from 'src/app/state/employees.actions';
import { selectAllEmployees } from 'src/app/state/employees.selectors';
import { allSearchesLoaded, loadNextTenEmployees, nextTenEmployeesLoaded } from 'src/app/state/searches.actions';
import { selectAllSearches } from 'src/app/state/searches.selectors';
import { NgxSpinnerService } from "ngx-spinner";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import  Employees  from 'src/app/model/employee.model';
import Searches from 'src/app/model/search.model';

@UntilDestroy()
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {
  storeSubscription$: Subscription;
  count: number;
  searchValue: any;
  isInitLoading: boolean = true;
  canLoadingMore: boolean = true;
  employees = [];

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

    this.storeManipulate();
    this.recentSearchesManipulating();
  }

  storeManipulate() {
    this.storeSubscription$ = this.store.pipe(
      select(selectAllSearches),
      untilDestroyed(this)
    ).subscribe(next => {
      let nextID = next.findIndex(item => item.id === this.searchValue);
      this.checkStoreSelect(next.length, nextID) ? this.storeDataHandle(next[nextID]) : this.getDataFromAPI(this.searchValue);
    });
  }

  checkStoreSelect(length, id) {
    return length && id !== -1
  }

  storeDataHandle(storeData) {
    this.employees = [...storeData.results];
    this.count = storeData.count;
    this.canLoadingMore = this.checkLoadMore();
    this.spinner.hide();
    this.changeDetectorRef.markForCheck();
  }

  getDataFromAPI(id): void {
    this.employeesService.searchFirstTen(id).subscribe(
      next => {
        this.apiDataHandle(next);
        this.spinner.hide();
        this.apiStoreHandle(id, next);
        this.changeDetectorRef.markForCheck();
      })
  }

  apiDataHandle(next) {
    this.employees = [...this.employees, ...next.data];
    this.count = next.count;
    this.canLoadingMore = this.checkLoadMore();
  }

  apiStoreHandle(id, next) {
    let obj: Searches[] = [{id, results: next.data, count: next.count}];
    this.store.dispatch(allSearchesLoaded({searches: obj}));
    this.store.dispatch(allEmployeesLoaded({employees: next.data}));
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

  navigateToDetails(id): void {
    this.router.navigate(['/search', 'property', id]);
  }
}