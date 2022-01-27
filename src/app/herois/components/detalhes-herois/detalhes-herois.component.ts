import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Heroi } from "../../../core/models/heroi.model";
import { HeroiService } from "../../../core/services/heroi.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhes-herois',
  templateUrl: './detalhes-herois.component.html',
  styleUrls: ['./detalhes-herois.component.scss']
})

export class DetalhesHeroisComponent implements OnInit{
  heroi!: Heroi;

  constructor(
    private heroiService: HeroiService,

    /* permite interagir com histórico do navegador */
    private location: Location,

    /* segura as informacoes sobre o momento onde a rota estiver */
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHeroi();
  }

  getHeroi(): void {
    /* PEGA O ID DA URL NAQUELE MOMENTO */
    const ID = Number(this.route.snapshot.paramMap.get('id'));
    this.heroiService.getHeroi(ID).subscribe( heroi => {
      this.heroi = heroi;
    }, error => {
      console.log("Erro ao recebe heroi.")
    });

    //this.heroiService.
  }

  voltar(): void {
    this.location.back();
  }

  formularioValido(): boolean {
    return !!this.heroi.nome.trim();
  }

  salvarHeroi(): void {
    this.heroiService.atualizarHeroi(this.heroi).subscribe(
      (heroi) => this.voltar()
    );
  }
}
