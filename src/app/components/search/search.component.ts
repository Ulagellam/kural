import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  jsonData: any[] = [];
  filteredData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllKurals().subscribe((data) => {
      this.jsonData = [].concat(...data.map((item) => item.kurals));
      this.filteredData = this.jsonData
    });
  }

  filterData() {
    this.filteredData = this.jsonData.filter((item) =>
    item.id.toString().includes(this.searchTerm.toString())
    
    );
    if (this.searchTerm == ""){
      this.dataService.selectedKurals(this.dataService.athikaram)
    }
  }

  setKural(id: number){
    this.dataService.kurals = this.filteredData.filter((item) => item.id.toString() == id.toString());
    console.log(this.filteredData);
    console.log(this.dataService.kurals);
  }
}
