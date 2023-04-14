import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, IonSegment, SegmentChangeEventDetail } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  // @ViewChild(IonSegment, {static: true}) segment! : IonSegment;
  @ViewChild( IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;
 
 
 public categories: string[] =[
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

 
  constructor( private newsService: NewsService) {}
 
  ngOnInit(){
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
     .subscribe( articles => {
      this.articles = [...articles];
     })
  }

  segmentChanged( event: Event ) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = [...articles];
    })
  }
  // ionViewDidEnter() {
  //   this.segment.value = this.categories[0];
  // }

  loadData( ) {
    this.newsService.getTopHeadlinesByCategory( this.selectedCategory, true)
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
