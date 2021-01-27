import { Injectable } from '@angular/core';
import {CountupTimerService} from 'ngx-timer';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  constructor(private timerService: CountupTimerService) {}

  toggleTimer(): void {
    if (this.timerService.isTimerStart) {
      this.pauseTimer()
    } else {
      this.resumeTimer()
    }
  }

  pauseTimer(): void {
    this.timerService.pauseTimer()
  }

  resumeTimer(): void {
    this.timerService.startTimer()
  }

  getTimer(): number {
    return this.timerService.totalSeconds
  }

  isLate(): boolean {
    return this.getTimer() >= 60
  }

  startTimer(val: number = 0): void {

    if (this.timerService.isTimerStart){
      this.timerService.stopTimer()
      console.log( 'stop timer')
    }
    console.log(' start timer from ' + this.getTime(val))
    this.timerService.startTimer(this.getTime(val))
  }

  setTimer(timer: number): void {
    if (this.timerService.isTimerStart){
      this.timerService.stopTimer()
    }
    console.log('set timer ' + timer)
    this.timerService.totalSeconds = timer
  }

  private getTime(seconds: number): Date{
    const date = new  Date(seconds * 1000)
    const out = new Date()

    out.setSeconds(out.getSeconds() - date.getSeconds())
    out.setMinutes(out.getMinutes() - date.getMinutes())
    out.setHours(out.getHours() - date.getHours() + 1)
    return out
  }
  get isTimerStart(): boolean{
    return this.timerService.isTimerStart
  }
}
