import { Component, inject, OnInit } from '@angular/core';
import { Hero } from "../../shared/hero/hero";
import { Statistics } from "../../shared/statistics/statistics";
import { ProgramCard } from '../../shared/program-card/program-card';
import { RouterLink } from '@angular/router';
import { ProgramService } from '../../services/program';
import { Program } from '../../core/interfaces/programs.interface';

@Component({
  selector: 'app-home',
  imports: [Hero, Statistics,
    ProgramCard, RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  selectedProgram: Program | null = null;

  showProgram(program: Program): void {

    this.selectedProgram = program;
  
  }

  private readonly programService =
  inject(ProgramService);

programs: Program[] = [];

ngOnInit(): void {

  this.programService
    .getPrograms()
    .subscribe({

      next: programs => {

        this.programs = programs;

      },

      error: error => {

        console.error(error);

      }

    });

}

}
