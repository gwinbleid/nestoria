import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// ng-zorro-ant elements
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

@NgModule({
  imports: [ CommonModule ],
  exports: [
    CommonModule,
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
    NzResultModule
  ]
})
export class SharedModule { }
