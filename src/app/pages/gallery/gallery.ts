import { Component, inject, OnInit } from '@angular/core';
import { MediaService } from '../../core/services/media-service';
import { MediaItem } from '../../core/interfaces/media.interface';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { MediaCard } from "../../shared/media-card/media-card";
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  imports: [MediaCard, FormsModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {


  private readonly mediaService =
    inject(MediaService);

    private readonly sanitizer =
  inject(DomSanitizer);


  media: MediaItem[] = [];

  filteredMedia: MediaItem[] = [];

  selectedMedia:
    MediaItem | null = null;


  searchTerm = '';

  selectedCategory = 'All';

  selectedType = 'All';

  loading = true;


  categories = [

    'All',

    'Education',

    'Environment',

    'Agriculture',

    'Health',

    'Human Rights',

    'Community',

    'Events'

  ];


  ngOnInit(): void {

    this.loadMedia();

  }


  loadMedia(): void {

    this.mediaService
      .getMedia()
      .subscribe({

        next: data => {

          this.media =
            data.media;

          this.filteredMedia =
            data.media;

          this.loading = false;

        },

        error: error => {

          console.error(error);

          this.loading = false;

          Swal.fire({

            icon: 'error',

            title: 'Unable to Load Gallery',

            text:
              'Please try again later.',

            confirmButtonColor:
              '#0B6E4F'

          });

        }

      });

  }

  getSafeVideoUrl(
  url: string
): SafeResourceUrl {

  return this.sanitizer.bypassSecurityTrustResourceUrl(
    url
  );

}

  filterMedia(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    this.filteredMedia =
      this.media.filter(item => {

        const matchesSearch =
          !search ||
          item.title
            .toLowerCase()
            .includes(search) ||
          item.description
            .toLowerCase()
            .includes(search);


        const matchesCategory =
          this.selectedCategory === 'All' ||
          item.category ===
            this.selectedCategory;


        const matchesType =
          this.selectedType === 'All' ||
          item.type ===
            this.selectedType;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesType
        );

      });

  }


  openMedia(
    media: MediaItem
  ): void {

    this.selectedMedia =
      media;

  }


  closeMedia(): void {

    this.selectedMedia = null;

  }


  clearFilters(): void {

    this.searchTerm = '';

    this.selectedCategory =
      'All';

    this.selectedType =
      'All';

    this.filteredMedia =
      this.media;

  }

}
