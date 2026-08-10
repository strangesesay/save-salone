import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaItem } from '../../core/interfaces/media.interface';

@Component({
  selector: 'app-media-card',
  imports: [],
  templateUrl: './media-card.html',
  styleUrl: './media-card.scss',
})
export class MediaCard {
@Input({ required: true })
  media!: MediaItem;


  @Output()
  open =
    new EventEmitter<MediaItem>();


  openMedia(): void {

    this.open.emit(
      this.media
    );

  }
}
