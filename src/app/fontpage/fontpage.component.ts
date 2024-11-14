import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgiconComponent } from '../svgicon/svgicon.component';

@Component({
  selector: 'app-fontpage',
  standalone: true,
  imports: [RouterLink, SvgiconComponent],
  template: `
    <main class="main-padding">
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div  class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-bblue">
            <div class="card-body">
              <h2 class="card-title pricing-card-title">上傳工具</h2>
              <h1 class="icon-color">
                <app-svgicon></app-svgicon>
              </h1>
              <a class="w-100 btn btn-lg btn-olive" routerLink="/uploadtools">進入</a>
            </div>
          </div>
        </div>
        <div  class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-bblue">
            <div class="card-body">
              <h2 class="card-title pricing-card-title">下載工具</h2>
              <h1 class="icon-color">
                <app-svgicon></app-svgicon>
              </h1>
              <a class="w-100 btn btn-lg btn-olive" routerLink="/downloadtools">進入</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: `
    .main-padding {
      padding-left: 100px; 
      padding-right: 100px;
      padding-top: 100px;
    }

    .btn-olive {
      background-color: #3085d6;
      color: white; 
      border: none; 
    }

    .btn-olive:hover {
      background-color: #2c81c0; 
      color: white;
    }

    .icon-color {
      color: #ccc;
    }
  `
})
export class FontpageComponent {

}
