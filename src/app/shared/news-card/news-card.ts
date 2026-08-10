import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsArticle } from '../../core/interfaces/news.interface';

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {

    @Input({ required: true })
  article!: NewsArticle;


  @Output()
  readMore =
    new EventEmitter<NewsArticle>();


  openArticle(): void {

    this.readMore.emit(
      this.article
    );

  }

}
