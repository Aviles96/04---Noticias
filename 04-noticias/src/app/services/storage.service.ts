import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor( private storage: Storage ) { 
    this.init();
  }

  get getLocalArticles() {
    return [ ...this._localArticles ]
  }

  async init() { 
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
  }

  async saveRemoveArticle( noticia: Article ) {

    const exists = this._localArticles.find( localArticle => localArticle.title === noticia.title );

    if(exists) {
      this._localArticles = this._localArticles.filter( localArticle => localArticle.title !== noticia.title)
    } else {
      this._localArticles = [ noticia, ...this._localArticles];
    }

    this._storage!.set('articles', this._localArticles);
  }

  async loadFavorites() {
    try {
      const articles = await this._storage?.get('articles');
      this._localArticles = articles || [];
    } catch (error) {
      
    }
  }

  //Si una noticia esta en favoritos o no
  articleInFavorites( noticia: Article ) {
    return !!this._localArticles.find( localArticle => localArticle.title === noticia.title );
  }
   
}