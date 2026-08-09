import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../core/interfaces/project.interface';

@Component({
  selector: 'app-project-card',
  imports: [
   
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {

  @Input({ required: true })
  project!: Project;

  @Output()
  viewDetails = new EventEmitter<Project>();

  @Output()
donate = new EventEmitter<Project>();

  openDetails(): void {
    this.viewDetails.emit(this.project);
  };

  openDonation(): void {

    this.donate.emit(this.project);

  }

}
