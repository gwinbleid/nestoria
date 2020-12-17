import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Employees from 'src/app/model/employee.model';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html',
  styleUrls: ['./favors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavorsComponent implements OnInit {
  isInitLoading = false;
  favors?;
  constructor() { }

  ngOnInit(): void {
    this.favors = JSON.parse(localStorage.getItem('favour_employes'));
  }

}
