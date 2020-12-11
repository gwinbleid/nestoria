import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { noop } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

  searchRequestValue?: string;
  isEmpty: boolean = false;
  recentSearches = [];
  serverError: boolean = false;

  constructor(
    private employeesService : EmployeesService,
    private router: Router,
    private message: NzMessageService  
  ) { }

  ngOnInit(): void {
    let from_storage = JSON.parse(localStorage.getItem('recent_searches'));
    if (from_storage) this.recentSearches = this.recentSearches.concat(from_storage);
    if (!from_storage) localStorage.setItem('recent_searches', JSON.stringify(this.recentSearches));
  }

  search() {
    console.log(this.searchRequestValue);
    this.serverError = false;

    this.employeesService.searchFirstTen(this.searchRequestValue)
      .subscribe(
        next => {
          console.log(next);
          if (next.length) {
            this.router.navigate(['/search', {find: this.searchRequestValue}]);
          } else {          
            this.isEmpty = true;
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
