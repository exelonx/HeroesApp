import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marven Comics',
      desc: 'Marven - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor( private heroesServices: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.heroesServices.getHeroe(id) )
          )
        .subscribe( heroe => this.heroe = heroe )
      
    }


  }

  guardar() {
    if( this.heroe.superhero.trim().length === 0) { return; }

    console.log(this.heroe.id)

    if ( this.heroe.id ) {
      this.heroesServices.putHeroe(this.heroe)
        .subscribe( heroe => console.log( 'Actualizando', heroe ) )
    } else {
      this.heroesServices.postHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
        } )
    }
  }

  borrar() {
    this.heroesServices.deleteHeroe(this.heroe.id!)
      .subscribe(resp => {
        this.router.navigate(['/heroes'])
      })
  }

}
