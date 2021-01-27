import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {TimerService} from '../../shared/quiz/timer.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User = {} as User

  @Output()
  toggled: EventEmitter<null> = new EventEmitter<null>()
  @Output()
  paused: EventEmitter<null> = new EventEmitter<null>()
  @Output()
  finished: EventEmitter<null> = new EventEmitter<null>()
  @Output()
  restart: EventEmitter<null> = new EventEmitter<null>()
  @Input()
  showToggle = true
  @Input()
  showProfile = true
  @Input()
  showTestController = false

  isPaused = false
  isNotStarted = false

  constructor(private authService: AuthService,
              private router: Router,
              private  timerService: TimerService){
    authService.getUser().subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

  signOut(): void{
    this.authService.signOut()
    this.router.navigate(['/'])
  }

  onPause(): void {
    this.paused.emit()
    this.isPaused = !this.isPaused
  }

}
