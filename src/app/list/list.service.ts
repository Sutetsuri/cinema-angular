import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Http, Response } from '@angular/http';

@Injectable()
export class ListService {
    private listUrl = '/api/list';

    constructor (private http: Http) {}

    // get("/api/list")
    getMovies(): Promise<void | Movie[]> {
      return this.http.get(this.listUrl)
                 .toPromise()
                 .then(response => response.json() as Movie[])
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
