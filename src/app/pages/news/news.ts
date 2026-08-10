import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NewsArticle, NewsEvent } from '../../core/interfaces/news.interface';
import { NewsService } from '../../core/services/news';
import Swal from 'sweetalert2';
import { EventCard } from "../../shared/event-card/event-card";
import { NewsCard } from "../../shared/news-card/news-card";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [EventCard, NewsCard, FormsModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News  implements OnInit {


  private readonly newsService =
    inject(NewsService);


  articles: NewsArticle[] = [];

  filteredArticles: NewsArticle[] = [];

  events: NewsEvent[] = [];

  selectedArticle:
    NewsArticle | null = null;

  searchTerm = '';

  selectedCategory = 'All';

  loading = true;


  ngOnInit(): void {

    this.loadNews();

  }


  loadNews(): void {

    this.newsService
      .getNews()
      .subscribe({

        next: data => {

          this.articles =
            data.articles;

          this.filteredArticles =
            data.articles;

          this.events =
            data.events;

          this.loading = false;

        },

        error: error => {

          console.error(error);

          this.loading = false;

          Swal.fire({

            icon: 'error',

            title: 'Unable to Load News',

            text:
              'Please try again later.',

            confirmButtonColor:
              '#0B6E4F'

          });

        }

      });

  }


  filterNews(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    this.filteredArticles =
      this.articles.filter(article => {

        const matchesSearch =
          !search ||
          article.title
            .toLowerCase()
            .includes(search) ||
          article.excerpt
            .toLowerCase()
            .includes(search);


        const matchesCategory =
          this.selectedCategory === 'All' ||
          article.category ===
            this.selectedCategory;


        return (
          matchesSearch &&
          matchesCategory
        );

      });

  }


  openArticle(
    article: NewsArticle
  ): void {

    this.selectedArticle =
      article;

  }


  closeArticle(): void {

    this.selectedArticle = null;

  }


  clearFilters(): void {

    this.searchTerm = '';

    this.selectedCategory =
      'All';

    this.filteredArticles =
      this.articles;

  }


  registerForEvent(
    event: NewsEvent
  ): void {

    Swal.fire({

      title: 'Register for Event',

      html: `
        <p>
          <strong>
            ${event.title}
          </strong>
        </p>

        <p>
          ${event.date}
          ·
          ${event.time}
        </p>
      `,

      input: 'text',

      inputLabel: 'Your Full Name',

      inputPlaceholder:
        'Enter your full name',

      showCancelButton: true,

      confirmButtonText:
        'Continue',

      confirmButtonColor:
        '#0B6E4F',

      inputValidator: value => {

        if (!value?.trim()) {

          return 'Please enter your name.';

        }

        return null;

      }

    }).then(result => {

      if (result.isConfirmed) {

        Swal.fire({

          icon: 'success',

          title: 'Registration Received',

          text:
            `Thank you ${result.value}. SAVE SALONE will contact you with further event information.`,

          confirmButtonColor:
            '#0B6E4F'

        });

      }

    });

  }


  get featuredArticle():
    NewsArticle | undefined {

    return this.articles.find(
      article => article.featured
    );

  }

}