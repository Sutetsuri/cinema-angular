import { Injectable } from '@angular/core';
import { Reservation } from './reservation';
import { Http, Response } from '@angular/http';

@Injectable()
export class ReservationService {
    private reservationsUrl = '/api/reservations';

    constructor (private http: Http) {}

    // get("/api/reservations")
    getReservations(): Promise<void | Reservation[]> {
      return this.http.get(this.reservationsUrl)
                 .toPromise()
                 .then(response => response.json() as Reservation[])
                 .catch(this.handleError);
    }

    // post("/api/reservations")
    createReservation(newReservation: Reservation): Promise<void | Reservation> {
      return this.http.post(this.reservationsUrl, newReservation)
                 .toPromise()
                 .then(response => response.json() as Reservation)
                 .catch(this.handleError);
    }

    // get("/api/reservations/:id") endpoint not used by Angular app

    // delete("/api/reservations/:id")
    deleteReservation(delReservationId: String): Promise<void | String> {
      return this.http.delete(this.reservationsUrl + '/' + delReservationId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/reservations/:id")
    updateReservation(putReservation: Reservation): Promise<void | Reservation> {
      console.log(putReservation); // debug
      console.log(this.reservationsUrl); // debug
      console.log(putReservation._id); // debug
      var putUrl = this.reservationsUrl + '/' + putReservation._id;
      console.log(putUrl); // debug
      return this.http.put(putUrl, putReservation)
                 .toPromise()
                 .then(response => response.json() as Reservation)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
