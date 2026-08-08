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

showProgram(program: Program): void {

  this.selectedProgram = program;

}


}
