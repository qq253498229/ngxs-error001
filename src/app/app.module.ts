import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { CustomRouterStateSerializer, states } from './store';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    AppRoutingModule,
    SharedModule,
    NgxsStoragePluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([...states], {
      selectorOptions: {injectContainerState: false},
      developmentMode: !environment.production,
    }),
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
