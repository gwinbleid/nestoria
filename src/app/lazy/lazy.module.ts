import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { FavorsComponent } from './favors/favors.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NgxSpinnerModule } from "ngx-spinner";

// NG-Zorro Modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

@NgModule({
  declarations: [
    EmployeesDetailComponent,
    SearchResultsComponent,
    FavorsComponent,],
  imports: [
    CommonModule,
    LazyRoutingModule,
    // UI imports
    NgxSpinnerModule,
    NzButtonModule,
    NzSpinModule,
    NzTableModule,
    NzDividerModule,
    NzListModule,
    NzLayoutModule,
    NzInputModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzSkeletonModule,
    NzIconModule,
    NzMenuModule,
    NzResultModule,
  ],
  providers: [{ provide: NZ_CONFIG, useValue: ngZorroConfig }]
})
export class LazyModule { }
