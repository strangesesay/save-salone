import { inject, Injectable } from '@angular/core';
import { MediaItem } from '../interfaces/media.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




interface MediaData {

  media: MediaItem[];

}

@Injectable({
  providedIn: 'root',
})
export class MediaService {

  private readonly http =
    inject(HttpClient);


  private readonly dataUrl =
    'assets/data/media.json';


  getMedia(): Observable<MediaData> {

    return this.http.get<MediaData>(
      this.dataUrl
    );

  }

  
}
