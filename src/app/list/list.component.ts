import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { ListService } from './list.service';

@Component({
  selector: 'movie',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListService]
})

export class MovieListComponent implements OnInit {

  movies: Movie[]
  selectedMovie: Movie

  constructor(private movieService: ListService) { }

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
