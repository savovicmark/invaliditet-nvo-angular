import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllKorisnikComponent } from './admin/all-korisnik/all-korisnik.component';
import { KorisnikPostComponent } from './admin/korisnik-post/korisnik-post.component';
import { UslugaPostComponent } from './admin/usluga-post/usluga-post.component';
import { OneKorisnikComponent } from './admin/one-korisnik/one-korisnik.component';

const routes: Routes = [
  // {path: 'Naslovna', component: KorisnikPostComponent},
  // {path: 'Partneri', component: AllKorisnikComponent},
  {path: 'Admin/Svi korisnici', component: AllKorisnikComponent},
  {path: 'Admin/Dodaj korisnika', component: KorisnikPostComponent},
  {path: '**', component: OneKorisnikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
