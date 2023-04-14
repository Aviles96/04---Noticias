import { Component, Input } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

//Plugins de terceros
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

import { Article } from '../../interfaces';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent {

  @Input() noticia!: Article ;
  @Input() index!: number;

  constructor( private iab: InAppBrowser,
               private platform: Platform,
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private storageService: StorageService,
             ) { }

  //Para que nos lleve al enlace de la informacion
  openArticle() {

     if( this.platform.is('ios') || this.platform.is('android') ) {
      
     const browser = this.iab.create( this.noticia.url);
     browser.show();
     }
    window.open( this.noticia.url, '_blank');
  }

  async onOpenMenu() {
    //Llamado de la funcion de los favoritos si es false o true para darle el valor de ya agregado
    const articleInFavorite = this.storageService.articleInFavorites(this.noticia);
    
    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Remover favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      }, 
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        cssClass: 'secundary',
      }
    ]

        //Compartir solo si estamos trabajando en capacitor
        const shareBtn: ActionSheetButton = {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => 
          this.compartirNoticia()
        };
        if( this.platform.is('capacitor')) {
          normalBtns.unshift(shareBtn)
        }
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });


    await actionSheet.present();
  }

  onShareArticle() {
  
    const { title, source, url } = this.noticia;
      this.socialSharing.share(
        title, source.name, null!, url
      );
  }

  //Funcion para almacenar favoritos
  //Instalamos la dependencia de storage de la pagina de ionic creamos un nuevo servicio donde importamos
  //y creamos su funcion y ahora la importamos para hacer el uso de la misma para almacenar en favoritos
  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.noticia);
  }

  compartirNoticia() {

    if ( this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {  
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se pudo compartir porque no se soporta');
      }
    }
  }
}