import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { MovieService } from './../../movie-list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  @Input()
  reservation: Reservation;

  @Input()
  createHandler: Function;

  movieForReservation: any;

  // variable declarations
  movieTitle: string = 'Captain America: The Winter Soldier';
  screen: string = 'LUXE CINEMAS';
  time: string = 'FRI, 6:45PM';

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2', 'F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selected: string[] = [];
  previous: string;

  ticketPrice: number = 12;
  convFee: number = 30;
  totalPrice: number = 0;
  currency: string = '$';

  constructor (private reservationService: ReservationService, private movieService: MovieService, private router: Router) {}

  createReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).then((newReservation: Reservation) => {
      this.createHandler(newReservation);
    });
  }

  ngOnInit() {
    this.movieForReservation = this.movieService.getMovieData();
    if (!this.movieForReservation) {
      this.router.navigate(['']);
    } else {
      console.log(this.movieForReservation);
    }
    this.movieTitle = this.movieForReservation.Title;
    this.screen = this.movieForReservation.TheatreAndAuditorium;
    this.time = this.movieForReservation.dttmShowStart;
  }

  // return status of each seat
  getStatus = function (seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
  };

  // clear handler
  clearSelected = function () {
    this.selected = [];
  };

  // click handler
  seatClicked = function (seatPos: string) {
    var index = this.selected.indexOf(seatPos);
    this.previous = seatPos;
    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1);
    } else {
      // push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1) {
        this.selected.push(seatPos);
      }
    }
  };

  // // Buy button handler
  // showSelected = function () {
  //   if (this.selected.length > 0) {
  //     alert('Selected Seats: ' + this.selected + '\nTotal: ' + (this.ticketPrice * this.selected.length + this.convFee));
  //   } else {
  //     alert('No seats selected!');
  //   }
  // };
}
