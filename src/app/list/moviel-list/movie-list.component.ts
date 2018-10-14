import { Component, OnInit } from '@angular/core';
import { Movie } from './../movie';
import { MovieService } from './../movie-list.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';


@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})

export class MovieComponent implements OnInit {
  movies: Movie[]
  selectedMovie: Movie

  xml = 'https://www.finnkino.fi/xml/Schedule/?area=1018';

  constructor (private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService, movieService: MovieService) { }


  ngOnInit() {
    const parser = new DOMParser();
    this.http.get(this.xml, {
        responseType: 'text'
      }).subscribe(data => {

        const xml = parser.parseFromString(data, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        this.movies = obj.Schedule.Shows.Show;
        console.log(obj.Schedule.Shows.Show);
        },
        error => console.log('oops', error))
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie
  }
}
