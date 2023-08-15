import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.selectedTrans(this.dataService.selectedLanguage);
  }

  playKural(kural: any) {
    const audioElement = document.getElementById(kural.id) as HTMLAudioElement;
    if (audioElement) {
      audioElement.play();
    }
  }
}
