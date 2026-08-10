import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../core/interfaces/project.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [
   CommonModule
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {

  @Input() project!: Project;
  @Output() view = new EventEmitter<Project>();
  @Output() donate = new EventEmitter<Project>();

  openDetails(): void {
    this.view.emit(this.project);
  }

  openDonation(): void {
    this.donate.emit(this.project);
  }

}
