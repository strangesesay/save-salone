import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsEvent } from '../../core/interfaces/news.interface';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [SlicePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {

   @Input({ required: true })
  event!: NewsEvent;


  @Output()
  register =
    new EventEmitter<NewsEvent>();


  registerForEvent(): void {

    this.register.emit(
      this.event
    );

  }


}
