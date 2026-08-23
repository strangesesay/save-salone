import { Component, inject } from '@angular/core';
import { ProgramService } from '../../services/program';
import { Program } from '../../core/interfaces/programs.interface';
import { ProgramCard } from "../../shared/program-card/program-card";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-programs',
  imports: [ProgramCard,
    RouterLink
  ],
  templateUrl: './programs.html',
  styleUrl: './programs.scss',
})
export class Programs {


  private readonly programService =
  inject(ProgramService);

  programs: Program[] = [];

  filteredPrograms: Program[] = [];

  selectedProgram: Program | null = null;

  selectedCategory = 'All';

  loading = true;

  currentPage = 1;

  pageSize = 6;

  get totalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.filteredPrograms.length / this.pageSize)
    );
  }

  get pageNumbers(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  get paginatedPrograms(): Program[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredPrograms.slice(
      start,
      start + this.pageSize
    );
  }

  ngOnInit(): void {

    this.loadPrograms();

  }

  loadPrograms(): void {

    this.programService
      .getPrograms()
      .subscribe({

        next: programs => {

          this.programs = programs;

          this.filteredPrograms = programs;

          this.loading = false;

        },

        error: error => {

          console.error(
            'Unable to load programs:',
            error
          );

          this.loading = false;

        }

      });

  }

  filterPrograms(category: string): void {

    this.selectedCategory = category;
    this.currentPage = 1;

    if (category === 'All') {

      this.filteredPrograms = this.programs;

      return;

    }

    this.filteredPrograms =
      this.programs.filter(
        program =>
          program.title === category
      );

  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  showProgram(program: Program): void {

    this.selectedProgram = program;

  }


}
