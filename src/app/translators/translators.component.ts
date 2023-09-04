import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-translators',
  templateUrl: './translators.component.html',
  styleUrls: ['./translators.component.css']
})
export class TranslatorsComponent {
  constructor(public dataService: DataService) {}
}
