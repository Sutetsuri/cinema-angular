export class Movie {
  _id?: string;
  name: string;
  length: string;
  times: Array<{day: string, time: string}>;
  ageLimit: string;
  reservedSeats: Array<{seat: number}>;
}
