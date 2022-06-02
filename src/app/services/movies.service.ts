import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieDto } from '../models/movie';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // Instance of this anywhere in our application
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming') {
    // expected type <MovieDto></MovieDto>
    return this.http.get<MovieDto>(
      `${environment.baseUrl}/movie/${type}?api_key=${environment.api_url}`
    );
  }

  getTvShows(type: string = 'popular') {
    return this.http.get<MovieDto>(
      `${environment.baseUrl}/tv/${type}?api_key=${environment.api_url}`
    );
  }

}
