import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';
  isSignedIn = false;
  constructor(private titleService: Title,
              private router: Router,
              private routerData: ActivatedRoute){
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let child = this.routerData.firstChild;

        while (child?.firstChild) {
          child = child.firstChild;
        }

        child?.data.subscribe(data => {
          if (data.title !== undefined) {
            this.setTitle(data.title)
          }
        })

      }
    })
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
