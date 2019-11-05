import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer, routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { NavItemComponent } from './nav-item/nav-item.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin.module';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { CustomSerializer } from './services/router-store';
import { Routes, RouterModule } from '@angular/router';
import { AllKorisnikComponent } from './admin/all-korisnik/all-korisnik.component';


@NgModule({
  declarations: [
    AppComponent,
    NavItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // AppRoutingModule,
    RouterModule.forRoot([], {scrollPositionRestoration: 'enabled'}),
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    LayoutModule,
    HttpClientModule,
    AdminModule,
    StoreModule.forRoot({router: routerReducer}, {
      metaReducers: [],
      initialState: {
        router: {
          state: {
            url: '/',
            params: {},
            queryParams: {}
          },
          navigationId: 0
        }
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({stateKey: 'router', serializer: CustomSerializer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
