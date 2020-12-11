import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.less']
})
export class EmployeesDetailComponent implements OnInit, OnDestroy {
  employeeID: string = '';
  employeeData ;
  isFavourite: boolean;
  localStoreData: Employees[] | null;

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.employeeID = this.route.snapshot.params.id;
    this.route.data
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

  ngOnDestroy() {
    if (this.localStoreData) {
      localStorage.setItem('favour_employes', JSON.stringify(this.localStoreData));
    }
  }
}
