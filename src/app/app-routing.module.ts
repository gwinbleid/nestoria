import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main/main-page.component';
import { FormPageComponent } from './form-page/form-page.component';
const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'form', component: FormPageComponent},
  {
    path: 'search',
    loadChildren: () => import('./lazy/lazy.module').then(m =>
      m.LazyModule
    )
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
