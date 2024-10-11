import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <div class="container">
      <nav class="navigation">
        <a routerLink="/fontpage" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" ariaCurrentWhenActive="page" class="nav-link" style="font-size: 1.5rem;">首頁</a>
        <a routerLink="/uploadtools" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" ariaCurrentWhenActive="page" class="nav-link" style="font-size: 1.5rem;">上傳工具</a>
        <a routerLink="/downloadtools" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" ariaCurrentWhenActive="page" class="nav-link" style="font-size: 1.5rem;">下載工具</a>
        <!-- <a routerLink="/hourlyrate" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" ariaCurrentWhenActive="page" class="nav-link" style="font-size: 1.5rem;">鐘點費</a> -->
      </nav>
      <!-- <div class="button-container">
        <button class="action-button" (click)="onLogout()">登出</button>
      </div> -->
    </div>
  `,
  styles: `
    .container {
      width: 100%; 
      margin: 0;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
    }

    .navigation {
      display: flex;
      flex-wrap: wrap;
      margin-left: 100px; 
    }

    .nav-link {
      margin-right: 25px;
      color: inherit;
      text-decoration: none;
    }

    .nav-link:hover {
      color: #1F2937; 
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      flex-grow: 1;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      background-color: #F3F4F6; 
      border: none;
      padding: 8px 12px;
      border-radius: 0.375rem; 
      cursor: pointer;
      font-size: 1rem; 
    }

    .action-button:hover {
      background-color: #E5E7EB; 
    }

    .active{
      border-bottom: 2px solid #7c3aed;
      transform:scale(1.1);
      transition:border-bottom 0.3s ease,color 0.3s ease,transform 0.3s ease;
    }
  `
})
export class NavBarComponent {

}
