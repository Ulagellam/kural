import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-valluvar',
  templateUrl: './valluvar.component.html',
  styleUrls: ['./valluvar.component.css']
})
export class ValluvarComponent implements OnInit{
  details: any

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/kural/valluvar' + this.dataService.langExtension + '.json').subscribe(data => {
      this.details = data;
    });
  }
}
