import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-valluvar',
  templateUrl: './valluvar.component.html',
  styleUrls: ['./valluvar.component.css']
})
export class ValluvarComponent{
  constructor(public dataService: DataService) {}
}
