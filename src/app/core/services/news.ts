import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsArticle, NewsEvent } from '../interfaces/news.interface';


interface NewsData {

  articles: NewsArticle[];

  events: NewsEvent[];

}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  
  private readonly http = inject(HttpClient);

  private readonly dataUrl =
    'assets/data/news.json';


  getNews(): Observable<NewsData> {

    return this.http.get<NewsData>(
      this.dataUrl
    );

  }

}
