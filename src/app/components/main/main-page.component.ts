import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { noop } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { AppState } from '../../state/index';
import { allEmployeesLoaded } from '../../state/employees.actions';
import { allSearchesLoaded } from 'src/app/state/searches.actions';
import { Searches } from 'src/app/model/search';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  searchRequestValue?: string;
  isEmpty: boolean = false;
  recentSearches = [];
  serverError: boolean = false;

  constructor(
    private employeesService : EmployeesService,
    private router: Router,
    private message: NzMessageService,
    private store: Store
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
    this.employeesService.searchFirstTen(this.searchRequestValue)
      .subscribe(
        next => {
          console.log(next);
          if (next.count) {
            this.store.dispatch(allEmployeesLoaded({employees: next.data, search: this.searchRequestValue}));
            let obj: Searches[] = [{id: this.searchRequestValue, results: next.data, count: next.count}];
            this.store.dispatch(allSearchesLoaded({searches: obj}))
            this.router.navigate(['/search', {find: this.searchRequestValue}]);
          } else {          
            this.message.create('info', `No Data`);
          }
        },
        err => {
          this.solveError(err);
        }
      )
  }

  nextHandler(data, searchVal) {
    
  }

  solveError(err) {

  }

  generateError(type) {
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
