import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProcessBarComponent } from './process-bar/process-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UiService } from '../@Service/UiService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, ProcessBarComponent],
  template: `
    <app-process-bar></app-process-bar>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'videostudioapplication';
  @ViewChild(ProcessBarComponent, { static: true }) processBar!: ProcessBarComponent;


  constructor(private uiService: UiService) { }

  ngAfterViewInit() {
    this.uiService.setProcessBar(this.processBar);
  }
}
