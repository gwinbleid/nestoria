import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { FavorsComponent } from './favors/favors.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { 
    path: '', 
    component: SearchResultsComponent
  },
  { 
    path: 'property/:id', 
    component: EmployeesDetailComponent
  },
  { path: 'favourites', component: FavorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
