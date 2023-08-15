import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  details: any

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/kural/about' + this.dataService.langExtension + '.json').subscribe(data => {
      this.details = data;
    });
  }
}
