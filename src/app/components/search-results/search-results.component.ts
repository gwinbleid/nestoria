import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { allEmployeesLoaded } from 'src/app/state/employees.actions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {
  routerSubscription$: Subscription;
  count: number;
  search_value: any;
  isInitLoading: boolean = true; // bug
  canLoadingMore: boolean = true;
  employees?;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.search_value = this.route.snapshot.params.find;
    this.recent_searches_manipulating();
    this.subscribeToRoute();
  }

  subscribeToRoute(): void {
    this.routerSubscription$ = this.route.data
      .subscribe((next: { result: Employees[], count: number }) => {
        this.employees = next.result;
        this.count = next.count;
        this.isInitLoading = false;
        this.canLoadingMore = this.disableLoadMore();
    });
  }

  onLoadMore(): void {
    this.canLoadingMore = true;
    this.employeesService.load_more(this.search_value, this.employees.length)
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

  recent_searches_manipulating(): void {
    let searches_storage = JSON.parse(localStorage.getItem('recent_searches'));
    searches_storage = [this.search_value, ...searches_storage];
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
