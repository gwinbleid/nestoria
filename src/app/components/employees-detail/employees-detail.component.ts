import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { selectExactEmployee } from 'src/app/state/employees.selectors';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.less']
})
export class EmployeesDetailComponent implements OnInit, OnDestroy {
  routeSubscription$: Subscription;
  employeeID: string = '';
  employeeData: Employees;
  isFavourite: boolean;
  localStoreData: Employees[] | null;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.employeeID = this.route.snapshot.params.id;

    console.log('inui works');
    this.getEmployee(this.route.snapshot.params.id);
  }

  getEmployee(id) {
    console.log(id);
    this.store.pipe(
      select(selectExactEmployee(id))
    ).subscribe(
      next => {
        if (!next.length) {
          this.fetchDataFromAPI(id);
        } else {
          this.employeeData = next[0];
        }
      }
    )
  }

  subscribeToRoute() {
    this.routeSubscription$ = this.route.data
      .subscribe((next: {data: Employees}) => {
        this.employeeData = next.data;
        this.localStoreData = JSON.parse(localStorage.getItem('favour_employes'));

        if (this.localStoreData && this.localStoreData.findIndex(element => element._id === this.employeeID) !== -1) {
          this.isFavourite = true;
        } else {
          this.isFavourite = false;
        }
    })
  }

  toggleFavors() {
    if (this.isFavourite) {
      this.localStoreData.splice(this.localStoreData.findIndex(({_id}) => _id === this.employeeID), 1);
      this.isFavourite = !this.isFavourite;
    } else {
      if (!this.localStoreData) this.localStoreData = [];
      this.localStoreData = this.localStoreData.concat(this.employeeData);
      this.isFavourite = !this.isFavourite;
    }
  }

  fetchDataFromAPI(id) {
    this.employeesService.search_one(id)
      .subscribe(
        next => this.employeeData = next
      );
  }

  ngOnDestroy() {
    if (this.localStoreData) {
      localStorage.setItem('favour_employes', JSON.stringify(this.localStoreData));
    }

    // this.routeSubscription$.unsubscribe();
  }
}
