import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    // returns Observable at getMovies()
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
    });

    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;
    });

    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies;
    });

    this.moviesService.getTvShows().subscribe((tvshows) => {
      this.popularTvShows = tvshows;
    });
  }
}
