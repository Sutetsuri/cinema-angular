import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieForComponentData: any;

  setMovieData(data: any) {
    this.movieForComponentData = data;
    console.log(data);
  }
  getMovieData() {
    return this.movieForComponentData;
  }

}
