import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { noop, Subscription } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { allEmployeesLoaded } from '../../state/employees.actions';
import { allSearchesLoaded } from 'src/app/state/searches.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { selectAllSearches } from 'src/app/state/searches.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import Searches from '../../model/search.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  storeSelector$: Subscription;
  searchRequestValue?: string;
  isEmpty = false;
  recentSearches = [];

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private message: NzMessageService,
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.storageInitManipulate();
  }

  storageInitManipulate(): void {
    const fromStorage = JSON.parse(localStorage.getItem('recent_searches'));

    fromStorage ? this.recentSearches = this.recentSearches.concat(fromStorage)
      : localStorage.setItem('recent_searches', JSON.stringify(this.recentSearches));
  }

  search(): void {
    this.spinner.show();
    this.storeSelector$ = this.store.pipe(
      select(selectAllSearches),
      untilDestroyed(this)
    ).subscribe(next => {
      this.checkStoreValue(next) ? this.searchNavigate() : this.fetchData();
    });
  }

  searchNavigate() {
    this.spinner.hide();
    this.router.navigate(['/search', {find: this.searchRequestValue}]);
  }

  checkStoreValue(next): boolean {
    return next.length && next.findIndex(item => item.id === this.searchRequestValue) !== -1
  }

  fetchData(): void {
    if (!this.searchRequestValue) {
      this.noDataHandler();
      return;
    }

    this.employeesService.searchFirstTen(this.searchRequestValue)
    .subscribe(
      next => {
        this.fetchRequestHandler(next);
      },
      err => {
        this.spinner.hide();
        this.generateError('error');
      }
    );
  }

  fetchRequestHandler(data): void {
    data.count ? this.sendDataToStore(data) : this.noDataHandler();
  }

  sendDataToStore(data): void {
    this.store.dispatch(allEmployeesLoaded({employees: data.data}));
    const obj: Searches[] = [{id: this.searchRequestValue, results: data.data, count: data.count}];
    this.store.dispatch(allSearchesLoaded({searches: obj}));
    this.spinner.hide();
    this.router.navigate(['/search', {find: this.searchRequestValue}]);
  }

  noDataHandler() {
    this.spinner.hide();
    this.message.create('info', `No Data`);
  }

  generateError(type): void {
    this.employeesService.generatingErrorRequest()
      .subscribe(
        noop,
        err => {
          this.createMessage(type);
        }
      );
  }

  createMessage(type: string): void {
    this.message.create(type, `Server ${type}`);
  }
}
