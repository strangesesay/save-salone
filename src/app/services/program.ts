import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Program} from '../core/interfaces/programs.interface';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  
  private readonly http = inject(HttpClient);

  private readonly dataUrl = 'assets/data/programs.json';

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.dataUrl);
  }

  getProgramById(id: number): Observable<Program | undefined> {
    return new Observable(observer => {

      this.getPrograms().subscribe({

        next: programs => {

          const program = programs.find(
            item => item.id === id
          );

          observer.next(program);
          observer.complete();

        },

        error: error => observer.error(error)

      });

    });
  }
}
