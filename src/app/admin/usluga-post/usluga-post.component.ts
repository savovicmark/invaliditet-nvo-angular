import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UslugaModel, KorespondencijaModel } from '../../Models/usluga.model';
import { UslugaService } from 'src/app/services/usluga.service';
import { Dokument } from '../../Models/dokument.model';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { PostKorespondencijaAction, PostUslugaAction } from '../admin.actions';
import { selectKorisnikId } from 'src/app/main/main.reducers';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PitanjeZaKojeJeTrazenaPomoc } from 'src/app/Models/pitanja.model';

@Component({
  selector: 'app-usluga-post',
  templateUrl: './usluga-post.component.html',
  styleUrls: ['./usluga-post.component.scss']
})
export class UslugaPostComponent implements OnInit, OnDestroy {


  sub$: Subscription;
  @Input() koresp: boolean;
  @Input() uslugaId: string;
  id: string;
  today = new Date();
  get dokuments(): FormArray {
    return this.uslugaForm.get('dokumenta') as FormArray;
  }
  get pravnaAkta(): FormArray {
    return this.uslugaForm.get('pravnaAkta') as FormArray;
  }
  docs: string[] = [];
  dostPravniAkti: string[] = [];
  obracanja = [
    'fiksni telefon', 'mobilni telefon', 'mobilni telefon zaposlenog/e',
    'mail', 'facebook', 'instagram', 'twitter', 'licno'
  ];
  pitanja: PitanjeZaKojeJeTrazenaPomoc[];
  bespPomoc = ['pravno obavjestenje', 'pravni savjet', 'zastupanje', 'posredovanje/medijacija'];
  socZast = ['personalna asistencija', 'pomoc u kuci', 'savjetodavno-terapijske'];

  uslugaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private uslugaService: UslugaService,
              private router: Router,
              private store: Store<AdminState>) { }

  ngOnInit() {
    this.sub$ = this.store.pipe(select(selectKorisnikId)).subscribe(id => this.id = id);
    this.uslugaService.getVrstePomoci().subscribe(vrste => {
      this.pitanja = vrste;
    });
    this.uslugaForm = this.fb.group({
      koJePodnioZahtjev: [''],
      imeKoJePodnioZahtjev: [''],
      prezimeKoJePodnioZahtjev: [''],
      datumUpucivanjaZahtjeva: [''],
      kojimPutemJePodnijetZahtjev: [['']],
      pitanjeZaKojeJeTrazenaPomoc: [['']],
      dodajPitanje: [false],
      novoPitanje: [''],
      sazetakPitanja: [''],
      datumOdgovora: [''],
      komeJeUpucenOdgovor: [''],
      imeKomeJeUpucenOdgovor: [''],
      prezimeKomeJeUpucenOdgovor: [''],
      kojimPutemJePruzenOdgovor: [['']],
      oblikPruzenePomoci: [['']],
      opisPruzenePomoci: [''],
      datumOdgovoraIliNovogObracanja: [''],
      sazetakOdgovora: [''],
      rezultatPruzenePomoci: [''],
      dokumenta: this.fb.array([
       this.addDokument()
      ]),
      pravnaAkta: this.fb.array([
        this.addPravnaAkta()
      ])
    });
  }

  addPravnaAkta(): FormGroup {
    return this.fb.group({
      opis: [null],
      datum: [null],
      broj: ['']
    });
  }

  addDokument(): FormGroup {
    return this.fb.group({
      opis: [null],
      datum: [null],
      broj: ['']
    });
  }

  pushDokument(): void {
    this.dokuments.push(this.addDokument());
  }
  pushPravniAkt(): void {
    this.pravnaAkta.push(this.addPravnaAkta());
  }

  dodajPitanje(): void {
    const pitanje = this.uslugaForm.get('novoPitanje').value;
    this.uslugaService.postVrstaPomoci({vrstaPomoci: pitanje}).subscribe(novoPit => {
      this.pitanja = [...this.pitanja, novoPit];
      this.uslugaForm.get('novoPitanje').reset();
    });
  }


  onFileSelect(files, i: number) {
    const file: File = files.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.uslugaService.postFile(formData).subscribe(res => {
      this.docs[i] = res.file;
      console.log(this.docs);
    });
  }

  onPravniAktSelect(files, i) {
    const file: File = files.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.uslugaService.postFile(formData).subscribe(res => {
      this.dostPravniAkti[i] = res.file;
      console.log(this.dostPravniAkti);
    });
  }

  submitUsluga() {
    const dostDok: Dokument[] | [] = [];
    this.dokuments.value.forEach((el, index) => {
      dostDok[index] = {...dostDok[index], opis: el.opis, datum: el.datum, broj: el.broj};
    });
    this.docs.forEach((el, index) => {
      dostDok[index] = {...dostDok[index], file: el};
    });
    const pripAkta: Dokument[] | [] = [];
    this.pravnaAkta.value.forEach((el, index) => {
      pripAkta[index] = {...pripAkta[index], opis: el.opis, datum: el.datum, broj: el.broj};
    });
    this.dostPravniAkti.forEach((el, index) => {
      pripAkta[index] = {...pripAkta[index], file: el};
    });
    const usluga: UslugaModel = {
      korisnik: this.id,
      korespondencije: {
        koJePodnioZahtjev: this.uslugaForm.get('koJePodnioZahtjev').value,
        imeKoJePodnioZahtjev: this.uslugaForm.get('imeKoJePodnioZahtjev').value,
        prezimeKoJePodnioZahtjev: this.uslugaForm.get('prezimeKoJePodnioZahtjev').value,
        datumUpucivanjaZahtjeva: this.uslugaForm.get('datumUpucivanjaZahtjeva').value,
        kojimPutemJePodnijetZahtjev: this.uslugaForm.get('kojimPutemJePodnijetZahtjev').value,
        pitanjeZaKojeJeTrazenaPomoc: this.uslugaForm.get('pitanjeZaKojeJeTrazenaPomoc').value,
        sazetakPitanja: this.uslugaForm.get('sazetakPitanja').value,
        datumOdgovora: this.uslugaForm.get('datumOdgovora').value,
        dostavljenaDokumenta: dostDok,
        komeJeUpucenOdgovor: this.uslugaForm.get('komeJeUpucenOdgovor').value,
        imeKomeJeUpucenOdgovor: this.uslugaForm.get('imeKomeJeUpucenOdgovor').value,
        prezimeKomeJeUpucenOdgovor: this.uslugaForm.get('prezimeKomeJeUpucenOdgovor').value,
        kojimPutemJePruzenOdgovor: this.uslugaForm.get('kojimPutemJePruzenOdgovor').value,
        oblikPruzenePomoci: this.uslugaForm.get('oblikPruzenePomoci').value,
        opisPruzenePomoci: this.uslugaForm.get('opisPruzenePomoci').value,
        pripremljenaPravnaAkta: pripAkta,
        sazetakOdgovoraIliNovogObracanja: this.uslugaForm.get('sazetakOdgovora').value,
        datumOdgovoraIliNovogObracanja: this.uslugaForm.get('datumOdgovoraIliNovogObracanja').value,
        rezultatPruzenePomoci: this.uslugaForm.get('rezultatPruzenePomoci').value
      }
    };
    if (this.koresp) {
      console.log(this.uslugaId);
      this.store.dispatch(new PostKorespondencijaAction({
        korespondencija: usluga.korespondencije as KorespondencijaModel,
        uslugaId: this.uslugaId
      }));
    } else {
      this.store.dispatch(new PostUslugaAction({usluga}));
    }
    this.router.navigate(['/Admin', 'korisnik', this.id]);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
