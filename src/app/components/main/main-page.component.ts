import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { noop, Subscription } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { AppState } from '../../state/index';
import { allEmployeesLoaded } from '../../state/employees.actions';
import { allSearchesLoaded } from 'src/app/state/searches.actions';
import { Searches } from 'src/app/model/search';
import { NgxSpinnerService } from "ngx-spinner";
import { selectAllSearches } from 'src/app/state/searches.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
  isEmpty: boolean = false;
  recentSearches = [];
  serverError: boolean = false;

  constructor(
    private employeesService : EmployeesService,
    private router: Router,
    private message: NzMessageService,
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.storageInitManipulate();
  }

  storageInitManipulate(): void {
    let from_storage = JSON.parse(localStorage.getItem('recent_searches'));
    if (from_storage) this.recentSearches = this.recentSearches.concat(from_storage);
    if (!from_storage) localStorage.setItem('recent_searches', JSON.stringify(this.recentSearches));
  }

  search() {
    this.spinner.show();
    this.storeSelector$ = this.store.pipe(
      select(selectAllSearches),
      untilDestroyed(this)
    ).subscribe(next => {
      if (next.length && next.findIndex(item => item.id === this.searchRequestValue) !== -1) {
        this.spinner.hide();
        this.router.navigate(['/search', {find: this.searchRequestValue}]);
      } else {
        this.fetchData();
      }
    });

    
  }

  fetchData() {
    this.employeesService.searchFirstTen(this.searchRequestValue)
    .subscribe(
      next => {
        this.fetchRequestHandler(next);
      },
      err => {
        this.spinner.hide();
        this.generateError('error')
      }
    )
  }

  fetchRequestHandler(data) {
    if (data.count) {
      this.sendDataToStore(data);
      this.spinner.hide();
      this.router.navigate(['/search', {find: this.searchRequestValue}]);
    } else {          
      this.spinner.hide();
      this.message.create('info', `No Data`);
    }
  }

  sendDataToStore(data) {
    this.store.dispatch(allEmployeesLoaded({employees: data.data}));
    let obj: Searches[] = [{id: this.searchRequestValue, results: data.data, count: data.count}];
    this.store.dispatch(allSearchesLoaded({searches: obj}));
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
