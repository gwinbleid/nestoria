import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { allEmployeesLoaded } from 'src/app/state/employees.actions';
import { selectExactEmployee } from 'src/app/state/employees.selectors';
import { NgxSpinnerService } from "ngx-spinner";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesDetailComponent implements OnInit, OnDestroy {
  destroyed = false;

  storeSubscription$: Subscription;
  routeSubscription$: Subscription;
  employeeID: string = '';
  employeeData: Employees;
  isFavourite: boolean;
  localStoreData: Employees[] | null;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    this.changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.spinner.show();

    this.employeeID = this.route.snapshot.params.id;
    this.getEmployee(this.route.snapshot.params.id);
  }

  getEmployee(id) {
    this.storeSubscription$ = this.store.pipe(
      select(selectExactEmployee(id)),
      untilDestroyed(this)
    ).subscribe(
      next => {
        if (!next.length) {
          this.spinner.hide();
          this.fetchDataFromAPI(id);
        } else {
          this.employeeData = next[0];
          this.spinner.hide();
          this.isFavouriteCheck();
          this.triggerDetection();
        }
      }
    )
  }

  isFavouriteCheck(): void {
    this.localStoreData = JSON.parse(localStorage.getItem('favour_employes'));

    if (this.localStoreData && this.localStoreData.findIndex(element => element._id === this.employeeID) !== -1) {
      this.isFavourite = true;
    } else {
      this.isFavourite = false;
    }
  }

  toggleFavors(): void {
    if (this.isFavourite) {
      this.localStoreData.splice(this.localStoreData.findIndex(({_id}) => _id === this.employeeID), 1);
      this.isFavourite = !this.isFavourite;
    } else {
      if (!this.localStoreData) this.localStoreData = [];
      this.localStoreData = this.localStoreData.concat(this.employeeData);
      this.isFavourite = !this.isFavourite;
    }

    this.triggerDetection();
  }

  fetchDataFromAPI(id) {
    this.employeesService.searchEmployeeById(id)
      .subscribe(
        next => {
          this.employeeData = next;
          this.spinner.hide();
          this.isFavouriteCheck();
          this.store.dispatch(allEmployeesLoaded({employees: [].concat(next)}));
          this.triggerDetection();
        },


      );
  }

  triggerDetection() {
    if (!this.destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.destroyed = true;

    if (this.localStoreData) {
      localStorage.setItem('favour_employes', JSON.stringify(this.localStoreData));
    }

    // this.routeSubscription$.unsubscribe();
  }
}
