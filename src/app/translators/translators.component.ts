import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-translators',
  templateUrl: './translators.component.html',
  styleUrls: ['./translators.component.css']
})
export class TranslatorsComponent {
  translators: any

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/kural/translators' + this.dataService.langExtension + '.json').subscribe(data => {
      this.translators = data;
    });
  }
}
