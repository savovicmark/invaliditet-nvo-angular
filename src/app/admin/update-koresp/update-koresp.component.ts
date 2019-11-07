import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../admin.reducers';
import { UslugaService } from 'src/app/services/usluga.service';
import { KorespondencijaModel, UslugaModel } from 'src/app/Models/usluga.model';
import { selectUslugaId, selectKorespId } from 'src/app/main/main.reducers';
import { Subscription } from 'rxjs';
import { switchMap, withLatestFrom, tap, concatMap, mergeMap, mapTo, filter, take } from 'rxjs/operators';
import { selectKorespondencijaById, selectUslugaById } from '../admin.selectors';
import { Dokument } from 'src/app/Models/dokument.model';
import { UpdateKorespondencijaAction, GetUslugaByIdAction } from '../admin.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-koresp',
  templateUrl: './update-koresp.component.html',
  styleUrls: ['./update-koresp.component.scss']
})
export class UpdateKorespComponent implements OnInit, OnDestroy {
  sub$: Subscription;
  sub1$: Subscription;
  uslugaForm: FormGroup;
  koresp: KorespondencijaModel;
  usluga: UslugaModel;
  today = new Date();
  uslugaId: string;
  korespId: string;
  get dokuments(): FormArray {
    return this.uslugaForm.get('dokumenta') as FormArray;
  }
  get pravnaAkta(): FormArray {
    return this.uslugaForm.get('pravnaAkta') as FormArray;
  }
  dostAktiLength = 0;
  pripPravniAktiLength = 0;
  dostDok: Dokument[];
  pripAkta: Dokument[];
  obracanja = [
    'fiksni telefon', 'mobilni telefon', 'mobilni telefon zaposlenog/e',
    'mail', 'facebook', 'instagram', 'twitter', 'licno'
  ];
  pitanja: string[];
  bespPomoc = ['pravno obavjestenje', 'pravni savjet', 'zastupanje', 'posredovanje/medijacija'];
  socZast = ['personalna asistencija', 'pomoc u kuci', 'savjetodavno-terapijske'];

  constructor(private fb: FormBuilder,
              private store: Store<AdminState>,
              private uslugaService: UslugaService,
              private router: Router,
              private route: ActivatedRoute) {
                this.route.data.subscribe(data => {
                  this.koresp = data.koresp;
                } );
               }

  ngOnInit() {
    this.uslugaService.getVrstePomoci().subscribe(vrste => {
      this.pitanja = vrste;
    });
    this.route.params.subscribe(params => {
      this.uslugaId = params.uslugaId;
      this.korespId = params.korespId;
    });

    this.sub$ = this.store.pipe(
      select(selectUslugaId),
      switchMap(uslugaId => this.store.pipe(select(selectUslugaById(uslugaId))))
      ).subscribe(usluga => this.usluga = usluga);
    /*this.sub2$ = this.store.pipe(select(selectKorespId)).subscribe(id => this.korespId = id);*/
    this.sub1$ = this.store.pipe(
      select(selectUslugaId),
      withLatestFrom(this.store.pipe(select(selectKorespId))),
      switchMap(([uslugaId, korespId]) => this.store.pipe(select(selectKorespondencijaById(uslugaId, korespId))))
      ).subscribe(korespondencija => {
        this.dostAktiLength = korespondencija[0].dostavljenaDokumenta.length;
        this.pripPravniAktiLength = korespondencija[0].pripremljenaPravnaAkta.length;
        this.dostDok = korespondencija[0].dostavljenaDokumenta;
        this.pripAkta = korespondencija[0].pripremljenaPravnaAkta;
        // console.log(korespondencija);
      });
    this.uslugaForm = this.fb.group({
        koJePodnioZahtjev: [this.koresp.koJePodnioZahtjev],
        imeKoJePodnioZahtjev: [this.koresp.imeKoJePodnioZahtjev],
        prezimeKoJePodnioZahtjev: [this.koresp.prezimeKoJePodnioZahtjev],
        datumUpucivanjaZahtjeva: [this.koresp.datumUpucivanjaZahtjeva],
        kojimPutemJePodnijetZahtjev: [this.koresp.kojimPutemJePodnijetZahtjev],
        pitanjeZaKojeJeTrazenaPomoc: [this.koresp.pitanjeZaKojeJeTrazenaPomoc],
        dodajPitanje: [false],
        novoPitanje: [''],
        sazetakPitanja: [this.koresp.sazetakPitanja],
        datumOdgovora: [this.koresp.datumOdgovora],
        komeJeUpucenOdgovor: [this.koresp.komeJeUpucenOdgovor],
        imeKomeJeUpucenOdgovor: [this.koresp.imeKomeJeUpucenOdgovor],
        prezimeKomeJeUpucenOdgovor: [this.koresp.prezimeKomeJeUpucenOdgovor],
        kojimPutemJePruzenOdgovor: [this.koresp.kojimPutemJePruzenOdgovor],
        oblikPruzenePomoci: [this.koresp.oblikPruzenePomoci],
        opisPruzenePomoci: [this.koresp.opisPruzenePomoci],
        datumOdgovoraIliNovogObracanja: [this.koresp.datumOdgovoraIliNovogObracanja],
        sazetakOdgovora: [this.koresp.sazetakOdgovoraIliNovogObracanja],
        rezultatPruzenePomoci: [this.koresp.rezultatPruzenePomoci],
        dokumenta: this.fb.array([
         this.addDokument()
        ]),
        pravnaAkta: this.fb.array([
          this.addPravnaAkta()
        ])
      });

  }

  dodajPitanje(): void {
    const pitanje = this.uslugaForm.get('novoPitanje').value;
    this.uslugaService.postVrstaPomoci({vrstaPomoci: pitanje}).subscribe(novoPit => {
      this.pitanja = [...this.pitanja, novoPit.vrstaPomoci];
      this.uslugaForm.get('novoPitanje').reset();
    });
  }

  onFileSelect(files, i: number) {
    const index = i + this.dostAktiLength;
    const file: File = files.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.uslugaService.postFile(formData).subscribe(res => {
      this.dostDok[index] = {...this.dostDok[index], file: res.file};
      // console.log(this.docs);
    });
  }

  onPravniAktSelect(files, i) {
    const index = i + this.pripPravniAktiLength;
    const file: File = files.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.uslugaService.postFile(formData).subscribe(res => {
      this.pripAkta[index] = {...this.pripAkta[index], file: res.file};
    });
  }

  addPravnaAkta(): FormGroup {
    return this.fb.group({
      opis: ['']
    });
  }

  addDokument(): FormGroup {
    return this.fb.group({
      opis: ['']
    });
  }

  pushDokument(): void {
    this.dokuments.push(this.addDokument());
  }
  pushPravniAkt(): void {
    this.pravnaAkta.push(this.addPravnaAkta());
  }

  viewDokument(file: string) {
    console.log(file);
  }

  submitUsluga() {
    // const dostDok: Dokument[] | [] = [];
    this.dokuments.value.forEach((el, index) => {
      this.dostDok[index + this.dostAktiLength] = {...this.dostDok[index + this.dostAktiLength], opis: el.opis};
    });
    /*this.dostAkti.forEach((el, index) => {
      this.dostDok[index] = {...this.dostDok[index], file: el};
    });*/
    // const pripAkta: Dokument[] | [] = [];
    this.pravnaAkta.value.forEach((el, index) => {
      this.pripAkta[index + this.pripPravniAktiLength] = {...this.pripAkta[index + this.pripPravniAktiLength], opis: el.opis};
    });
    /*this.pripPravniAkti.forEach((el, index) => {
      this.pripAkta[index] = {...this.pripAkta[index], file: el};
    });*/
    const koresp: KorespondencijaModel = {
      koJePodnioZahtjev: this.uslugaForm.get('koJePodnioZahtjev').value,
        imeKoJePodnioZahtjev: this.uslugaForm.get('imeKoJePodnioZahtjev').value,
        prezimeKoJePodnioZahtjev: this.uslugaForm.get('prezimeKoJePodnioZahtjev').value,
        datumUpucivanjaZahtjeva: this.uslugaForm.get('datumUpucivanjaZahtjeva').value,
        kojimPutemJePodnijetZahtjev: this.uslugaForm.get('kojimPutemJePodnijetZahtjev').value,
        pitanjeZaKojeJeTrazenaPomoc: this.uslugaForm.get('pitanjeZaKojeJeTrazenaPomoc').value,
        sazetakPitanja: this.uslugaForm.get('sazetakPitanja').value,
        datumOdgovora: this.uslugaForm.get('datumOdgovora').value,
        dostavljenaDokumenta: this.dostDok,
        komeJeUpucenOdgovor: this.uslugaForm.get('komeJeUpucenOdgovor').value,
        imeKomeJeUpucenOdgovor: this.uslugaForm.get('imeKomeJeUpucenOdgovor').value,
        prezimeKomeJeUpucenOdgovor: this.uslugaForm.get('prezimeKomeJeUpucenOdgovor').value,
        kojimPutemJePruzenOdgovor: this.uslugaForm.get('kojimPutemJePruzenOdgovor').value,
        oblikPruzenePomoci: this.uslugaForm.get('oblikPruzenePomoci').value,
        opisPruzenePomoci: this.uslugaForm.get('opisPruzenePomoci').value,
        pripremljenaPravnaAkta: this.pripAkta,
        sazetakOdgovoraIliNovogObracanja: this.uslugaForm.get('sazetakOdgovora').value,
        datumOdgovoraIliNovogObracanja: this.uslugaForm.get('datumOdgovoraIliNovogObracanja').value,
        rezultatPruzenePomoci: this.uslugaForm.get('rezultatPruzenePomoci').value
    };
    this.store.dispatch(new UpdateKorespondencijaAction({
      uslugaId: this.uslugaId,
      korespId: this.korespId,
      koresp
    }));
    this.router.navigate(['/Admin', 'pregledUsluge', this.usluga.korisnik, this.uslugaId]);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
    this.sub1$.unsubscribe();
  }

}
