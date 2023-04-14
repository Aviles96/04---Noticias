import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

//Importar los enviroment para el uso de nuestra api
import { environment } from 'src/environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPage } from '../interfaces';

import { storedArticlesByCategory } from '../data/mock-news';

//Creamos la constante de la apikey para que importe nuestra api de news
const apikey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
//Manera de hacer la peticion por estilo de noticia de forma dinamica
private articlesByCategoryAndPage : ArticlesByCategoryAndPage = {};

//Inyectar la informacion de la api de news
  constructor( private http: HttpClient) { }

//Se sabe que es generico la peticion porque esta dentro de las llaves <>

//Se importa el map para efectuar el pipe y asi solo llamar los articulos

 private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey:apikey,
        country: 'us',
      }
    })
   }

  getTopHeadLines():Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');
//  return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
//   .pipe(
//    map( ({articles}) => articles)
//   );
 }
// Primera conexion sin especificar en las categorias
//  getTopHeadlinesByCategory( category: string ):Observable<Article[]> {
//   return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}`)
//     .pipe(
//     map( ({articles}) => articles)
//    );
//   }

// //Hacer el llamado de las news de acuerdo a su categoria y que no vuelva a cargar la informacion de la misma
//si hacemos una nueva peticion al cambiar la categoria

 getTopHeadlinesByCategory( category: string, loadMore: boolean = false ) : Observable<Article[]> {

  // 


   if( loadMore ) {
     return this.getArticlesByCategory( category );
   }

   if( this.articlesByCategoryAndPage[category]) {
     return of(this.articlesByCategoryAndPage[category].articles);
   }

   return this.getArticlesByCategory(category);
 }

   private getArticlesByCategory( category: string ): Observable<Article[]> {

     if( Object.keys( this.articlesByCategoryAndPage ).includes(category)) {
       //ya existe
     } else {
       //no existe
       this.articlesByCategoryAndPage[category] = {
         page: 0,
         articles: []
       }
     }

     const page = this.articlesByCategoryAndPage[category].page + 1;

     return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
     .pipe(
       map (({ articles }) => {

         if( articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

         this.articlesByCategoryAndPage[category] = {
           page: page,
           articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
         }

         return this.articlesByCategoryAndPage[category].articles;
       })
     );
   }
  }