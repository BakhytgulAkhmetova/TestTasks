import { TimeDuration } from '../interfaces';

export class Duration implements TimeDuration {
    hours: number;
    minutes: number;
    constructor(minutes: number){
        this.hours = minutes/60;
        this.minutes = minutes - (this.hours * 60);
    }
}
