import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MenuItem} from '../../interfaces/menus/MenuItem';
import {PathService} from '../../shared/path.service';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PathElement} from '../../interfaces/path-element';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {
  title: string;
  path: PathElement[] = []
  current: PathElement = {} as PathElement

  constructor(private titleService: Title,
              private pathService: PathService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.title = ''
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // TODO
      });
    this.title = this.titleService.getTitle()
  }

  getFirst(): MenuItem{
    return this.pathService.getFirst()
  }
}
