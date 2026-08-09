import { Component, inject, OnInit, Input, Output } from '@angular/core';
import { Project } from '../../core/interfaces/project.interface';
import { ProjectService } from '../../core/services/project';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectCard } from '../../shared/project-card/project-card';
import { DonationModal } from '../../shared/donation-modal/donation-modal';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FormsModule, ProjectCard, DonationModal],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects implements OnInit{
  private readonly projectService =
  inject(ProjectService);



projects: Project[] = [];

filteredProjects: Project[] = [];

donationProject: Project | null = null;

selectedProject: Project | null = null;

searchTerm = '';

selectedCategory = 'All';

selectedStatus = 'All';

loading = true;


ngOnInit(): void {

  this.loadProjects();

}


loadProjects(): void {

  this.projectService
    .getProjects()
    .subscribe({

      next: projects => {

        this.projects = projects;

        this.filteredProjects = projects;

        this.loading = false;

      },

      error: error => {

        console.error(error);

        this.loading = false;

        Swal.fire({

          icon: 'error',

          title: 'Unable to Load Projects',

          text: 'Please try again later.',

          confirmButtonColor: '#0B6E4F'

        });

      }

    });

}


filterProjects(): void {

  const search =
    this.searchTerm
      .trim()
      .toLowerCase();

  this.filteredProjects =
    this.projects.filter(project => {

      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.location.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        project.category === this.selectedCategory;

      const matchesStatus =
        this.selectedStatus === 'All' ||
        project.status === this.selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );

    });

}


showProject(project: Project): void {

  this.selectedProject = project;

}


closeProject(): void {

  this.selectedProject = null;

}


clearFilters(): void {

  this.searchTerm = '';

  this.selectedCategory = 'All';

  this.selectedStatus = 'All';

  this.filteredProjects = this.projects;

}


getProjectCount(status: string): number {

  if (status === 'All') {

    return this.projects.length;

  }

  return this.projects.filter(
    project => project.status === status
  ).length;

}

contactAboutProject(): void {

  Swal.fire({

    title: 'Interested in This Project?',

    text: 'Contact SAVE SALONE to discuss partnership, funding or collaboration opportunities.',

    icon: 'info',

    showCancelButton: true,

    confirmButtonText: 'Contact Us',

    cancelButtonText: 'Close',

    confirmButtonColor: '#0B6E4F',

    cancelButtonColor: '#6c757d'

  }).then(result => {

    if (result.isConfirmed) {

      window.location.href = '/contact';

    }

  });

}

openDonation(project: Project): void {

  if (
    project.status !== 'Ongoing' &&
    project.status !== 'Upcoming'
  ) {

    return;

  }

  this.donationProject = project;

}

closeDonation(): void {

  this.donationProject = null;

}

}
