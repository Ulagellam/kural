import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // playing = false;
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.selectedTrans(this.dataService.selectedLanguage);
  }

  playKural(kural: any) {
    // if (this.playing){
    //   return
    // }

    const audioElement = document.getElementById(kural.id) as HTMLAudioElement;
    if (audioElement) {
      audioElement.play();
      // this.playing = !audioElement.paused
    }
  }

  playWords(word: string) {
    // if (this.dataService.langExtension != '' || this.playing){
    //   return
    // }

    word = word.replace(".", "")
    let audioElement = document.getElementById(word) as HTMLAudioElement;
    if (!audioElement){
      audioElement = document.createElement('audio');
      audioElement.setAttribute('id', word);
      audioElement.setAttribute('src', `assets/words/${word}.mp3`);
      document.querySelector(".kural").appendChild(audioElement)
    }
    // this.playing = !audioElement.paused
    audioElement.play();
    // this.playing = !audioElement.paused
  }

  splitWords(line: string){
    return (line).split(" ").filter(item => item != "")
  }
}
