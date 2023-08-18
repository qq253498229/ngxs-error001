import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const THIRD_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxsFormPluginModule,
];
const NG_ZORRO_MODULES: any[] = [
  NzLayoutModule,
  NzMenuModule,
];
const COMPONENTS: any[] = [];
const DIRECTIVES: any[] = [];
const PIPES: any[] = [];

@NgModule({
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
    ...THIRD_MODULES,
    ...NG_ZORRO_MODULES,
  ],
  exports: [
    ...THIRD_MODULES,
    ...NG_ZORRO_MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {
}
