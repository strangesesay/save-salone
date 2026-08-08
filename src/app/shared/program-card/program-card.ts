import { Component } from '@angular/core';
import {
  // Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Program } from '../../core/interfaces/programs.interface';
@Component({
  selector: 'app-program-card',
  imports: [],
  templateUrl: './program-card.html',
  styleUrl: './program-card.scss',
})
export class ProgramCard {

  @Input({ required: true })
  program!: Program;

  @Output()
  viewDetails = new EventEmitter<Program>();

  openDetails(): void {
    this.viewDetails.emit(this.program);
  }

}
