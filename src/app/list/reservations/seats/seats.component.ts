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


  reservation: Reservation;
  reservations: Reservation[];

  movieForSeats: any;

  // variable declarations
  movieTitle: string = 'Captain America: The Winter Soldier';
  screen: string = 'LUXE CINEMAS';
  time: string = 'FRI, 6:45PM';
  image;

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reservedSeats: string[] = ['A2', 'A3', 'F5', 'F1', 'F2', 'F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selectedSeats: string[] = [];
  previousSeat: string;

  ticketPrice: number = 12;
  convFee: number = 2;
  totalPrice: number = 0;
  currency: string = '$';

  constructor (private reservationService: ReservationService, private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieForSeats = this.movieService.getMovieData();
    if (!this.movieForSeats) {
      this.router.navigate(['']);
    } else {
      console.log(this.movieForSeats);
      // reservation to pass
      this.movieTitle = this.movieForSeats.Title;
      this.screen = this.movieForSeats.TheatreAndAuditorium;
      this.time = this.movieForSeats.dttmShowStart;
      /* this.image = this.movieForSeat.Images.EventLargeImageLandscape; */
    }
  }

  // return status of each seat
  getStatus = function (seatPos: string) {
    if (this.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selectedSeats.indexOf(seatPos) !== -1) {
      return 'selected';
    }
  };

  // clear handler
  clearSelected = function () {
    this.selectedSeats = [];
  };

  // click handler
  seatClicked = function (seatPos: string) {
    var index = this.selectedSeats.indexOf(seatPos);
    this.previousSeat = seatPos;
    if (index !== -1) {
      // seat already selected, remove
      this.selectedSeats.splice(index, 1);
    } else {
      // push to selected array only if it is not reserved
      if (this.reservedSeats.indexOf(seatPos) === -1) {
        this.selectedSeats.push(seatPos);
      }
    }
  };

  goToReservation() {
    console.log('Inside goToReservation');
    console.log(`movieForSeats: ${this.movieForSeats}`);
    console.log(`Title: ${this.movieForSeats.Title}`);
    this.reservation = {
      eventId: this.movieForSeats.EventID,
      movieTitle: this.movieForSeats.Title,
      movieOriginalTitle: this.movieForSeats.OriginalTitle,
      picture: this.movieForSeats.Images.EventSmallImagePortrait,
      theatreAndAuditorium: this.movieForSeats.TheatreAndAuditorium,
      length: this.movieForSeats.LengthInMinutes,
      seat: this.selectedSeats,
      dttmShowStart: this.movieForSeats.dttmShowStart
    };
    console.log(`Reservation: ${this.reservation}`);
    this.reservationService.createReservation(this.reservation).then(res => {
      console.log(`Response from POST: ${res}`);
      if (res) {
        this.router.navigate(['reservations']);
      }
    });
  }

  // // Buy button handler
  // showSelected = function () {
  //   if (this.selectedSeats.length > 0) {
  //     alert('Selected Seats: ' + this.selectedSeats + '\nTotal: ' + (this.ticketPrice * this.selectedSeats.length + this.convFee));
  //   } else {
  //     alert('No seats selected!');
  //   }
  // };
}
