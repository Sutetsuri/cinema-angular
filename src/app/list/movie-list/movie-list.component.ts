import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Movie } from './../movie';
import { MovieService } from './../movie-list.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieComponent implements OnInit {
  movies: Movie[];
  selectedTime: string;
  xml;
  timeForm: FormGroup;
  times;
  places;
  selectedPlace;

  movieForReservation: any;

  constructor(private http: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService,
    private movieService: MovieService, private fb: FormBuilder, private router: Router) {}


  ngOnInit() {
    console.log('onInit movieList');
    this.movieService.setMovieData(this.movieForReservation);

    let today = new Date();
    this.selectedTime = formatDate(today, 'yyyy-MM-dd', 'en-FI', '+2');
    this.selectedPlace = {ID: '1018', Name: 'Oulu: PLAZA'};
    this.timeForm = this.fb.group({
      timeControl: [this.selectedTime],
      placeControl: [this.selectedPlace]
    });
    this.selectedTime = this.formatDate(this.selectedTime);
    this.getTimes();
    this.getAreas();
    this.getMovies(this.selectedPlace.ID, this.selectedTime);
  }

  getTimes() {
    this.xml = 'https://www.finnkino.fi/xml/ScheduleDates/';
    const parser = new DOMParser();
    this.http.get(this.xml, {
      responseType: 'text'
    }).subscribe(data => {

      const xml = parser.parseFromString(data, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      this.times = obj['Dates']['dateTime'];
    },
      error => console.log('oops', error));
  }

  getAreas() {
    this.xml = 'https://www.finnkino.fi/xml/TheatreAreas/';
    const parser = new DOMParser();
    this.http.get(this.xml, {
        responseType: 'text'
      }).subscribe(data => {

        const xml = parser.parseFromString(data, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        this.places = obj['TheatreAreas']['TheatreArea'];
        console.log(this.places);
        },
        error => console.log('oops', error))
  }

  getMovies(city, date) {
    this.movies = [];
    this.xml = 'https://www.finnkino.fi/xml/Schedule/?area=' + city + '&dt=' + date;
    const parser = new DOMParser();
    this.http.get(this.xml, {
      responseType: 'text'
    }).subscribe(data => {

      const xml = parser.parseFromString(data, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      this.movies = obj['Schedule']['Shows']['Show'];
      console.log(this.movies);
    },
      error => console.log('oops', error));
  }
  formatDate(inputDate) {
    let year = inputDate.substring(0, 4);
    let month = inputDate.substring(5, 7);
    let day = inputDate.substring(8, 10);
    let date = day + '.' + month + '.' + year;
    return date;
  }
  onSubmit() {
    if (this.timeForm.value.timeControl) {
      this.selectedTime = this.formatDate(this.timeForm.value.timeControl);
      this.selectedPlace = this.timeForm.value.placeControl;
      this.getMovies(this.selectedPlace.ID, this.selectedTime);
    }
  }

  goToReservation(listedMovie) {
    this.movieForReservation = listedMovie;
    this.movieService.setMovieData(this.movieForReservation);
    this.router.navigate(['reserve']);
  }
}
