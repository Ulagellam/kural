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

  playWords(word: string) {
    word = word.replace(".", "")
    let audioElement = document.getElementById(word) as HTMLAudioElement;
    if (!audioElement){
      audioElement = document.createElement('audio');
      audioElement.setAttribute('id', word);
      fetch(`assets/words/${word}.mp3`).then((res) => {
        audioElement.setAttribute('src', `assets/words/${word}.${res.ok ? "mp3" : "m4a"}`);
      })
      document.querySelector(".kural").appendChild(audioElement)
    }
    audioElement.play();
  }

  splitWords(line: string){
    return (line).split(" ").filter(item => item != "")
  }
}
