import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe,): string {
    // assets/heroes/{{heroe.id}}.jpg

    if(!heroe.id) {
      return `assets/no-image.png`
    }
    return `assets/heroes/${ heroe.id }.jpg`;
  }

}
