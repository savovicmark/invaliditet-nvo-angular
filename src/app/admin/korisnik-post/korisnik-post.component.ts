import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Korisnik } from '../../Models/korisnik.model';
import { KorisnikService } from '../../services/korisnik.service';
import { Store } from '@ngrx/store';
import { PostKorisnikAction } from '../admin.actions';
import { AdminState } from '../admin.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: '0px', opacity: 0}),
          animate('500ms', style({height: '100%', opacity: 1}))
        ]),
        transition(':leave', [
          style({height: '100%', opacity: 1}),
          animate('500ms', style({height: '0px', opacity: 0}))
        ])
      ]
    )
  ]
})
export class KorisnikPostComponent implements OnInit {

  today = new Date();
  ages = ['0-6', '6-14', '14-18', '18-25', '25-30', '30-40', '40-50', '50-60', '60-65', '65+'];
  invalidities = [
    'fizicki invaliditet',
    'senzorni invaliditet',
    'intelektualni invaliditet',
    'mentalni invaliditet',
    'psihosocijalni invaliditet'
  ];
  educations = ['bez obrazovanja', 'osnovno', 'srednje', 'vise', 'visoko', 'magistar', 'doktor nauka'];
  employments = [
    'zaposlen/a',
    'nezaposlen/a',
    'na skolovanju',
    'dijete mladje od skolskog uzrasta',
    'penzioner/ka'
  ];
  livingConditions = [
    'podstanar/ka',
    'vlasnik/ca',
    'zajednicko domacinstvo'
  ];
  family = [
    'majka',
    'otac',
    'brat',
    'sestra',
    'dijete',
    'zet/snaha',
    'rodjak/a'
  ];
  genders = ['muski', 'zenski', 'bez odgovora'];
  capability = ['puna', 'ogranicena', 'oduzeta'];
  others = [
    'komsija/inica',
    'prijatelj/ica',
    'druga osoba sa invaliditetom',
    'sluzbenik/ca u instituciji',
    'advokat/ica'
  ];
  korisnikForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<AdminState>) {}

  ngOnInit() {
    this.korisnikForm = this.fb.group({
      checkedForm : [false],
      userName: [''],
      userLastName: [''],
      userAge: [''],
      placeBirth: [''],
      placeLiving: [''],
      adress: [''],
      birthDate: [''],
      jmbg: [''],
      email: ['', Validators.email],
      telephone: [''],
      gender: [''],
      typeOfInvalidity: [''],
      diagnose: [''],
      workCapability: [''],
      educationLevel: [''],
      profession: [''],
      employed: [''],
      marginalGroup: [''],
      familyMembers: [''],
      livingCondition: [''],
      zahtjevaoc: this.fb.group({
        imeZahtjevaoca: [''],
        prezimeZahtjevaoca: [''],
        adresaZahtjevaoca: [''],
        telefonZahtjevaoca: [''],
        odnosSaKorisnikom: ['']
      })
    });
  }

  submitForm() {
    const korisnik: Korisnik = {
      ime: this.korisnikForm.get('userName').value,
      prezime: this.korisnikForm.get('userLastName').value,
      starosnaDob: this.korisnikForm.get('userAge').value,
      mjestoRodjenja: this.korisnikForm.get('placeBirth').value,
      mjestoStanovanja: this.korisnikForm.get('placeLiving').value,
      adresa: this.korisnikForm.get('adress').value,
      datumRodjenja: this.korisnikForm.get('birthDate').value,
      JMBG: this.korisnikForm.get('jmbg').value,
      telefon: this.korisnikForm.get('telephone').value,
      mail: this.korisnikForm.get('email').value,
      pol: this.korisnikForm.get('gender').value,
      vrstaInvaliditeta: this.korisnikForm.get('typeOfInvalidity').value,
      dijagnoza: this.korisnikForm.get('diagnose').value,
      poslovnaSposobnost: this.korisnikForm.get('workCapability').value,
      obrazovanje: this.korisnikForm.get('educationLevel').value,
      zanimanje: this.korisnikForm.get('profession').value,
      zaposlenje: this.korisnikForm.get('employed').value,
      pripadnostJosNekojMarginalizovanojGrupi: this.korisnikForm.get('marginalGroup').value,
      brClanovaDomacinstvaISrodstvo: this.korisnikForm.get('familyMembers').value,
      stambeniStatus: this.korisnikForm.get('livingCondition').value,
      podnosilacZahtjeva: {
        telefon: this.korisnikForm.get('zahtjevaoc.telefonZahtjevaoca').value,
        ime: this.korisnikForm.get('zahtjevaoc.imeZahtjevaoca').value,
        prezime: this.korisnikForm.get('zahtjevaoc.prezimeZahtjevaoca').value,
        srodstvo: this.korisnikForm.get('zahtjevaoc.odnosSaKorisnikom').value,
        adresa: this.korisnikForm.get('zahtjevaoc.adresaZahtjevaoca').value,
      }
    } ;
    // this.korisnikService.postKorisnik(korisnik)
      // .subscribe(data => console.log(data));
    // this.store.dispatch(new PostKorisnikAction({korisnik}));
    // const korisnik = this.korisnikForm.value;
    // delete korisnik.checkedForm;
    this.store.dispatch(new PostKorisnikAction({korisnik}));
    // this.router.navigate(['/Admin', 'Svi korisnici']);
  }

}
