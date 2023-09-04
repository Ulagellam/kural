import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.css']
})
export class WhyComponent {
  constructor(public dataService: DataService) {}
}
