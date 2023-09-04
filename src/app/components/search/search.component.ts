import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  numberSearch = '';
  search = '';
  kuralsData: any[] = [];
  transData: any[] = [];
  filteredData: any[] = [];
  filteredNumberData: any[] = [];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllKurals().subscribe((data) => {
      this.kuralsData = [].concat(...data.map((item) => item.kurals));
      this.filteredData = this.kuralsData;
      this.filteredNumberData = this.kuralsData;
    });
    this.dataService.getAllTrans().subscribe((data) => {
      this.transData = [].concat(...data.map((item) => item.trans));
    });
  }

  filterDataByNumber() {
    this.filteredNumberData = this.kuralsData.filter((item) => item.id.toString().includes(this.numberSearch));
    if (!this.numberSearch) {
      this.dataService.selectedKurals(this.dataService.athikaram);
    }
  }

  filterData() {
    this.filteredData = this.kuralsData.filter((item) => this.addLines(item).includes(this.search));
    if (!this.search) {
      this.dataService.selectedKurals(this.dataService.athikaram);
    }
  }

  setKuralWithId(id: number) {
    this.setKuralCommon(this.filteredNumberData.filter((item) => item.id.toString() == id.toString()));
    this.numberSearch = ""
  }

  setKural(kural: string) {
    const kuralData = this.filteredData.filter((item) => this.addLines(item).toString() == kural.toString());
    this.setKuralCommon(kuralData);
    this.search = ""
  }

  setKuralCommon(kuralData: any[]) {
    this.dataService.kurals = kuralData;
    const id = kuralData.length > 0 ? kuralData[0].id : '';
    this.dataService.trans = this.transData.filter((item) => item.id.toString() == id.toString());
  }

  addLines(item: any) {
    return item.l1 + " " + item.l2
  }
}
