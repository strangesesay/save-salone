import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private readonly http = inject(HttpClient);

  private readonly dataUrl =
    'assets/data/projects.json';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.dataUrl);
  }

  getProjectById(id: number): Observable<Project | undefined> {

    return new Observable(observer => {

      this.getProjects().subscribe({

        next: projects => {

          const project =
            projects.find(project => project.id === id);

          observer.next(project);
          observer.complete();

        },

        error: error => observer.error(error)

      });

    });

  }

  
}
