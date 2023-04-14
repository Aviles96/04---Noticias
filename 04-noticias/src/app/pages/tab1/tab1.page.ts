import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit{
//Para hacer visual la informcacion para usar en el HTML
@ViewChild( IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;
  public articles: Article[] = [];

//Inyectar el servicio
  constructor( private newsService: NewsService) {}


  ngOnInit() {
    this.newsService.getTopHeadLines()
    .subscribe( articles => this.articles.push( ...articles));
  }


  loadData( ) {
    this.newsService.getTopHeadlinesByCategory( 'business', true)
    .subscribe(articles => {
      if ( articles.length === this.articles.length) {
        this.infiniteScroll.disabled = true;
        return;
      }
      //Realizar el evento del infinite scroll se puede agregar setting
      this.articles = articles;
      this.infiniteScroll.complete();
    })
  }

}
