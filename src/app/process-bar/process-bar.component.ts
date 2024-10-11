import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-process-bar',
  animations: [
    trigger('startEnd', [
      state('start', style({
        width: '0%'
      })),
      state('80', style({
        width: '80%'
      })),
      state('end', style({
        width: '100%'
      })),
      transition('* => 80', [
        animate('10s')
      ]),
      transition('* => end', [
        animate('0.3s')
      ]),
      transition('* => start', [
        animate('0s')
      ]),
    ]),
  ],
  standalone: true,
  imports: [NgIf],
  template: `
    <span class="loader" *ngIf="show">
        <span class="bar" [@startEnd]="status"></span>
    </span>
  `,
  styles: `
    .loader {
      width: 100%;
      height: 4.8px;
      display: block;
      position: fixed;
      z-index: 100;
      background: rgb(230, 240, 255);
      overflow: hidden;
      top:0;
    }
    
    .bar {
        content: '';
        box-sizing: border-box;
        width: 0;
        height: 4.8px;
        background: rgb(93, 111, 250);
        position: absolute;
        top: 0;
        left: 0;
    }
  `
})

export class ProcessBarComponent implements OnInit, OnDestroy {
  status = 'start';
  show = false;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.pipe(filter(event => event instanceof NavigationStart))
        .subscribe(() => this.onNavigationStart())
    );

    this.subscriptions.push(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.onNavigationEnd())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private onNavigationStart(): void {
    this.status = 'start';
    this.show = true;
    this.status = '80';
  }

  private onNavigationEnd(): void {
    this.status = 'end';
    setTimeout(() => {
      this.show = false;
      this.status = 'start';
    }, 300);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  showProgress() {
    this.show = true;
    this.status = 'start';
    setTimeout(() => {
      this.status = '80';
    }, 0);
  }

  hideProgress() {
    this.status = 'end';
    setTimeout(() => {
      this.show = false;
      this.status = 'start';
    }, 300);
  }
}
