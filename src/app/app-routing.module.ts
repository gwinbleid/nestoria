import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesDetailComponent } from './components/employees-detail/employees-detail.component';
import { FavorsComponent } from './components/favors/favors.component';
import { MainPageComponent } from './components/main/main-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CountResolverService } from './services/resolvers/count-resolver.service';
import { DetailResolver } from './services/resolvers/detail.resolver';
import { PropertySearchResolverService } from './services/resolvers/property-search-resolver.service';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { 
    path: 'search', 
    component: SearchResultsComponent ,
    resolve: {
      result: PropertySearchResolverService,
      count: CountResolverService
    }
  },
  { 
    path: 'property/:id', 
    component: EmployeesDetailComponent,
    resolve: {
      data: DetailResolver
    }
  },
  { path: 'favourites', component: FavorsComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
