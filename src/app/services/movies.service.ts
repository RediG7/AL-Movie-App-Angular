import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Movie,
  MovieCredits,
  MovieDto,
  MovieImages,
  MovieVideoDto,
} from '../models/movie';
import { of, switchMap } from 'rxjs';
import { GenresDto } from '../models/genre';
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

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(
        `${environment.baseUrl}/movie/${id}/videos?api_key=${environment.api_url}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMoviesGenres() {
    return this.http
      .get<GenresDto>(
        `${environment.baseUrl}/genre/movie/list?api_key=${environment.api_url}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMoviesByGenreId(genreId: string, pageNumber: number) {
    // expected type <MovieDto></MovieDto>
    return this.http
      .get<MovieDto>(
        `${environment.baseUrl}/discover/movie/?with_genres=${genreId}&page=${pageNumber}&api_key=${environment.api_url}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(
      `${environment.baseUrl}/movie/${id}/images?api_key=${environment.api_url}`
    );
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.api_url}`
    );
  }

  // optional parameter -> searchValue?
  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/movie' : 'movie/popular';

    // expected type <MovieDto></MovieDto>
    return this.http
      .get<MovieDto>(
        `${environment.baseUrl}/${uri}?page=${page}&query=${searchValue}&api_key=${environment.api_url}`
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
