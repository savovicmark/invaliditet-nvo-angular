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
import { korisnikReducer, uslugeReducer } from './admin/admin.reducers';
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
    DialogComponent
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
      {path: 'Admin/Svi korisnici', component: AllKorisnikComponent},
      {path: 'Admin/Dodaj korisnika', component: KorisnikPostComponent},
      {path: 'Admin/korisnik/:korisnikId', component: OneKorisnikComponent},
      {path: 'Admin/editKorisnik/:korisnikId', component: EditKorisnikComponent,
        resolve: {korisnik: EditKorisnikService}},
      {path: 'Admin/addUsluga/:korisnikId', component: UslugaPostComponent},
      {path: 'Admin/pregledUsluge/:korisnikId/:uslugaId', component: UslugaComponent},
      {path: 'Admin/updateKoresp/:uslugaId/:korespId', component: UpdateKorespComponent,
        resolve: {koresp: UpdateKorespService}},
      {path: 'Admin/dodajKomunikaciju/:uslugaId/:korisnikId', component: KorespPostComponent}
    ]),
    StoreModule.forFeature('admin', {korisnici: korisnikReducer, usluge: uslugeReducer}),
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
