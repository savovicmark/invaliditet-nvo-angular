import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { Korisnik } from 'src/app/Models/korisnik.model';
import { selectSelectedKorisnik } from '../admin.selectors';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { UpdateKorisnikAction } from '../admin.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-korisnik',
  templateUrl: './edit-korisnik.component.html',
  styleUrls: ['./edit-korisnik.component.scss'],
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
export class EditKorisnikComponent implements OnInit {

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
  korisnik: Korisnik;

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<AdminState>) { }

  ngOnInit() {
    this.store.pipe(select(selectSelectedKorisnik)).subscribe(kor => this.korisnik = kor);
    this.korisnikForm = this.fb.group({
      checkedForm : [true],
      userName: [this.korisnik.ime],
      userLastName: [this.korisnik.prezime],
      userAge: [this.korisnik.starosnaDob],
      placeBirth: [this.korisnik.mjestoRodjenja],
      placeLiving: [this.korisnik.mjestoStanovanja],
      adress: [this.korisnik.adresa],
      birthDate: [this.korisnik.datumRodjenja],
      jmbg: [this.korisnik.JMBG],
      email: [this.korisnik.mail, Validators.email],
      telephone: [this.korisnik.telefon],
      gender: [this.korisnik.pol],
      typeOfInvalidity: [this.korisnik.vrstaInvaliditeta],
      diagnose: [this.korisnik.dijagnoza],
      workCapability: [this.korisnik.poslovnaSposobnost],
      educationLevel: [this.korisnik.obrazovanje],
      profession: [this.korisnik.zanimanje],
      employed: [this.korisnik.zaposlenje],
      marginalGroup: [this.korisnik.pripadnostJosNekojMarginalizovanojGrupi],
      familyMembers: [this.korisnik.brClanovaDomacinstvaISrodstvo],
      livingCondition: [this.korisnik.stambeniStatus],
      zahtjevaoc: this.fb.group({
        imeZahtjevaoca: [this.korisnik.podnosilacZahtjeva.ime],
        prezimeZahtjevaoca: [this.korisnik.podnosilacZahtjeva.prezime],
        adresaZahtjevaoca: [this.korisnik.podnosilacZahtjeva.adresa],
        telefonZahtjevaoca: [this.korisnik.podnosilacZahtjeva.telefon],
        odnosSaKorisnikom: [this.korisnik.podnosilacZahtjeva.srodstvo]
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
    };

    this.store.dispatch(new UpdateKorisnikAction({korisnikId: this.korisnik._id, korisnik}));
    this.router.navigate(['/Admin', 'korisnik', this.korisnik._id]);

  }
}


