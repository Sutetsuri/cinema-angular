import { Component, OnInit, Input } from '@angular/core';
import { Movie } from './../movie';
import { MovieService } from './../movie-list.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})

export class MovieComponent implements OnInit {
  movies: Movie[]
  selectedTime
  xml
  timeForm: FormGroup
  times
  selectedOption: string


  constructor (private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService, movieService: MovieService, private fb: FormBuilder) { }


  ngOnInit() {
    this.timeForm = this.fb.group({
      timeControl: [Date.now()]
    });
    this.getTimes()
    this.getMovies(Date.now())
  }

  getTimes() {
    this.xml = 'https://www.finnkino.fi/xml/ScheduleDates/';
    const parser = new DOMParser();
    this.http.get(this.xml, {
        responseType: 'text'
      }).subscribe(data => {

        const xml = parser.parseFromString(data, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        this.times = obj.Dates.dateTime;
        },
        error => console.log('oops', error))
  }

  getMovies(date) {
    this.xml = 'https://www.finnkino.fi/xml/Schedule/?area=1018&dt='+date;
    const parser = new DOMParser();
    this.http.get(this.xml, {
        responseType: 'text'
      }).subscribe(data => {

        const xml = parser.parseFromString(data, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        this.movies = obj.Schedule.Shows.Show;
        console.log(this.movies);
        },
        error => console.log('oops', error))
  }
  onSubmit() {
    console.log(this.timeForm.value.timeControl);
    this.selectedTime = this.timeForm.value.timeControl;
    let year = this.selectedTime.substring(0, 4);
    let month = this.selectedTime.substring(5, 7);
    let day = this.selectedTime.substring(8, 10);
    let date = day+'.'+month+'.'+year;
    console.log(date);
    this.getMovies(date);
   }
}
