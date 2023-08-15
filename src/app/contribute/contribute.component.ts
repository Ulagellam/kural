import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent {
  details: any

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/kural/contribute' + this.dataService.langExtension + '.json').subscribe(data => {
      this.details = data;
    });
  }
}
