import { Component, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('leftSidenav') leftSidenav: MatSidenav;
  year = new Date().getFullYear();
  lang = [
    {
      "id": 2,
      "name": "English"
    },
    {
      "id": 1,
      "name": "தமிழ்"
    }
  ];

  
  constructor(public dataService: DataService) {
  }

  openLeftMenu() {
    this.leftSidenav.toggle();
  }
}
