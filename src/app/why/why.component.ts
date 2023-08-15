import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.css']
})
export class WhyComponent {
  details: any

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/kural/why' + this.dataService.langExtension + '.json').subscribe(data => {
      this.details = data;
    });
  }
}
