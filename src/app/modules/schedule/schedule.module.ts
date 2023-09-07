import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditDrawerComponent } from './edit-drawer/edit-drawer.component';

const routes: Routes = [
  {path: '', component: ListComponent},
];

@NgModule({
  declarations: [
    ListComponent,
    EditDrawerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ScheduleModule {
}
