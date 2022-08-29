import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private heroeService: HeroesService ) { }

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(resp=>{
      this.heroes = resp;
    })
  }

}
