import { Component, OnInit } from '@angular/core';
import { PitanjeZaKojeJeTrazenaPomoc, BesplatnaPravnaPomoc, UslugeSocZastite } from 'src/app/Models/pitanja.model';
import { UslugaService } from 'src/app/services/usluga.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-opcije',
  templateUrl: './opcije.component.html',
  styleUrls: ['./opcije.component.scss']
})
export class OpcijeComponent implements OnInit {

  vrstaPitanja: PitanjeZaKojeJeTrazenaPomoc[];
  besplatnaPomoc: BesplatnaPravnaPomoc[];
  socijalnaZastita: UslugeSocZastite[];
  inputVrstaPitanja = new FormControl('');
  inputBesplatnaPomoc = new FormControl('');
  inputSocijalnaZastita = new FormControl('');

  constructor(private uslugaService: UslugaService) { }

  ngOnInit() {
    this.uslugaService.getVrstePomoci().subscribe(pomoci => this.vrstaPitanja = pomoci);
    this.uslugaService.getAllBespPomoc().subscribe(besp => this.besplatnaPomoc = besp);
    this.uslugaService.getAllSocZastita().subscribe(soc => this.socijalnaZastita = soc);
  }

  deleteVrstaPitanja(id: string) {
    this.uslugaService.deleteVrstePomoci(id).subscribe(pomoci => this.vrstaPitanja = pomoci);
  }
  deleteBespPomoc(id: string) {
    this.uslugaService.deleteBespPomoc(id).subscribe(bespPomoc => this.besplatnaPomoc = bespPomoc);
  }
  deleteSocZastita(id: string) {
    this.uslugaService.deleteSocZastita(id).subscribe(socZast => this.socijalnaZastita = socZast);
  }

  postVrstaPitanja() {
    if (this.inputVrstaPitanja.value) {
      this.uslugaService.postVrstaPomoci({vrstaPomoci: this.inputVrstaPitanja.value}).subscribe(pitanje => {
        this.vrstaPitanja = [...this.vrstaPitanja, pitanje];
      });
    }
    this.inputVrstaPitanja.reset();
  }

  postBespPomoc() {
    if (this.inputBesplatnaPomoc.value) {
      this.uslugaService.postBespPomoc({bespPomoc: this.inputBesplatnaPomoc.value}).subscribe(pomoc => {
        this.besplatnaPomoc = [...this.besplatnaPomoc, pomoc];
      });
    }
    this.inputBesplatnaPomoc.reset();
  }

  postSocZastita() {
    if (this.inputSocijalnaZastita.value) {
    this.uslugaService.postSocZastita({socZastita: this.inputSocijalnaZastita.value}).subscribe(zastita => {
        this.socijalnaZastita = [...this.socijalnaZastita, zastita];
      });
    }
    this.inputSocijalnaZastita.reset();
  }

}
