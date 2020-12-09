import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavorsComponent } from './components/favors/favors.component';
import { PropertyListingComponent } from './components/property-listing/property-listing.component';
import { PropertySearchComponent } from './components/property-search/property-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PropertySearchService } from './services/property-search.service';
import { CountResolverService } from './services/resolvers/count-resolver.service';
import { DetailResolver } from './services/resolvers/detail.resolver';
import { PropertySearchResolverService } from './services/resolvers/property-search-resolver.service';

const routes: Routes = [
  { path: 'main', component: PropertySearchComponent },
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
    component: PropertyListingComponent,
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
