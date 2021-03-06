import { NgModule } from '@angular/core';
import { KorisnikPostComponent } from './admin/korisnik-post/korisnik-post.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './admin/admin.effects';
import { korisnikReducer, uslugeReducer, pitanjeReducer, vrstaPomociReducer,
        korisnikSortReducer, userReducer } from './admin/admin.reducers';
import { UslugaPostComponent } from './admin/usluga-post/usluga-post.component';
import { AllKorisnikComponent } from './admin/all-korisnik/all-korisnik.component';
import { OneKorisnikComponent } from './admin/one-korisnik/one-korisnik.component';
import { RouterModule } from '@angular/router';
import { EditKorisnikComponent } from './admin/edit-korisnik/edit-korisnik.component';
import { UslugaComponent } from './admin/usluga/usluga.component';
import { UpdateKorespComponent } from './admin/update-koresp/update-koresp.component';
import { UpdateKorespService } from './services/update-koresp.service';
import { EditKorisnikService } from './services/edit-korisnik.service';
import { KorespPostComponent } from './admin/koresp-post/koresp-post.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ViewDocComponent } from './admin/view-doc/view-doc.component';
import { DialogComponent } from './admin/dialog/dialog.component';
import { UslugeSortComponent } from './admin/usluge-sort/usluge-sort.component';
import { KorisnikSortComponent } from './admin/korisnik-sort/korisnik-sort.component';
import { OpcijeComponent } from './admin/opcije/opcije.component';
import { TabsComponent } from './admin/tabs/tabs.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { LoginComponent } from './admin/login/login.component';
import { CanactivateuserService } from './services/canactivateuser.service';
import { AdminOpcijeComponent } from './admin/admin-opcije/admin-opcije.component';
import { UpdPassComponent } from './admin/upd-pass/upd-pass.component';

@NgModule({
  declarations: [
    KorisnikPostComponent,
    UslugaPostComponent,
    AllKorisnikComponent,
    OneKorisnikComponent,
    EditKorisnikComponent,
    UslugaComponent,
    UpdateKorespComponent,
    KorespPostComponent,
    ViewDocComponent,
    DialogComponent,
    UslugeSortComponent,
    KorisnikSortComponent,
    OpcijeComponent,
    TabsComponent,
    SignUpComponent,
    LoginComponent,
    AdminOpcijeComponent,
    UpdPassComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    NgxDocViewerModule,
    RouterModule.forChild([
      {path: 'Admin/Svi korisnici', component: AllKorisnikComponent, canActivate: [CanactivateuserService]},
      {path: 'Admin/Dodaj korisnika', component: KorisnikPostComponent, canActivate: [CanactivateuserService]},
      {path: 'Admin/korisnik/:korisnikId', component: OneKorisnikComponent, canActivate: [CanactivateuserService]},
      {path: 'Admin/editKorisnik/:korisnikId', component: EditKorisnikComponent,
        resolve: {korisnik: EditKorisnikService}, canActivate: [CanactivateuserService]},
      {path: 'Admin/addUsluga/:korisnikId', component: UslugaPostComponent, canActivate: [CanactivateuserService]},
      {path: 'Admin/pregledUsluge/:korisnikId/:uslugaId', component: UslugaComponent, canActivate: [CanactivateuserService]},
      {path: 'Admin/updateKoresp/:uslugaId/:korespId', component: UpdateKorespComponent,
        resolve: {koresp: UpdateKorespService}, canActivate: [CanactivateuserService]},
      {path: 'Admin/dodajKomunikaciju/:uslugaId/:korisnikId', component: KorespPostComponent, canActivate: [CanactivateuserService]},
      {path: 'Usluge', component: UslugeSortComponent, canActivate: [CanactivateuserService]},
      {path: 'Korisnici', component: KorisnikSortComponent, canActivate: [CanactivateuserService]},
      {path: 'Opcije', component: OpcijeComponent, canActivate: [CanactivateuserService]},
      {path: 'Admin', component: TabsComponent},
      {path: '', redirectTo: 'Admin', pathMatch: 'full'}
    ]),
    StoreModule.forFeature('admin', {
      korisnici: korisnikReducer,
      usluge: uslugeReducer,
      pitanje: pitanjeReducer,
      vrstaPomoci: vrstaPomociReducer,
      korisnikSort: korisnikSortReducer,
      user: userReducer
    }),
    EffectsModule.forFeature([AdminEffects])
  ],
  exports: [
    KorisnikPostComponent,
    UslugaPostComponent,
    AllKorisnikComponent
  ],
  providers: [],
  entryComponents: [
    ViewDocComponent,
    DialogComponent
  ]
})
export class AdminModule {}
