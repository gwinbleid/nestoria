import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/model/employee';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html',
  styleUrls: ['./favors.component.less']
})
export class FavorsComponent implements OnInit {
  initLoading = false;
  results?;
  constructor() { }

  ngOnInit(): void {
    this.results = JSON.parse(localStorage.getItem('favour_employes'));
  }

}
