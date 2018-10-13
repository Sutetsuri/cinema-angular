import { Component, OnInit } from '@angular/core';
import { Movie } from './../movie';
import { MovieService } from './../movie-list.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})

export class MovieComponent implements OnInit {

  movies: Movie[]
  selectedMovie: Movie

  constructor(private movieService: MovieService) { }

  ngOnInit() {
     this.movieService
      .getMovies()
      .then((movies: Movie[]) => {
        this.movies = movies.map((movie) => {
          if (!movie.times) {
            movie.times = [{
              day: '',
              time: ''
            }]
          }
          return movie;
        });
      });
  }

  private getIndexOfMovie = (movieId: String) => {
    return this.movies.findIndex((movie) => {
      return movie._id === movieId;
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie
  }
}
