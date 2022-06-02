import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie, MovieDto } from '../models/movie';
import { of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // Instance of this anywhere in our application
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    // expected type <MovieDto></MovieDto>
    return this.http
      .get<MovieDto>(
        `${environment.baseUrl}/movie/${type}?api_key=${environment.api_url}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.api_url}`
    );
  }

  searchMovies(page: number = 1) {
    // expected type <MovieDto></MovieDto>
    return this.http
      .get<MovieDto>(
        `${environment.baseUrl}/movie/popular?page=${page}&api_key=${environment.api_url}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShows(type: string = 'popular', count: number = 12) {
    return this.http
      .get<MovieDto>(
        `${environment.baseUrl}/tv/${type}?api_key=${environment.api_url}`
      )
      .pipe(
        switchMap((res) => {
          // return as observable
          return of(res.results.slice(0, count));
        })
      );
  }
}
