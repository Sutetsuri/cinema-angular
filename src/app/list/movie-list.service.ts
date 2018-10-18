import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieForReservationData: any;

  setMovieData(data: any) {
    this.movieForReservationData = data;
    console.log(data);
  }
  getMovieData() {
    return this.movieForReservationData;
  }

}
