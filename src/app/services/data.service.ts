import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SiteData {
  siteName: string;
  name: string;
  palName: string;
  iyal: string;
  athikaramName: string;
  langName: string;
  explanation: string;
  home: string;
  valluvar: string;
  translators: string;
  why: string;
  contribute: string;
  aboutus: string;
  contactus: string;
  team: string;
  search: {
    number: string;
    search: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  isLoading = true;
  langExtension = '';
  selectedLanguage = 'தமிழ்';
  selectedIyalValue = '';
  selectedAthikaramValue = '';
  labels: SiteData;
  selectedIyal = '';
  iyals: any[] = [];
  athikarams: any[] = [];
  athikaram = '';
  kurals: any[] = [];
  trans: any[] = [];
  pal: any[] = [];
  selectedPalId = 1;
  selectedPal = '';

  constructor(private http: HttpClient) {
    this.loadLabels();
  }

  updateLangExtensions(language: string) {
    if (language === 'English') {
      this.langExtension = '_en';
    } else if (language === 'தமிழ்') {
      this.langExtension = '';
    }
  }

  loadLabels() {
    this.http
      .get(`assets/kural/label${this.langExtension}.json`)
      .subscribe((data: any) => {
        this.labels = data;
      });
  }

  selectedIyl(palId: number) {
    this.http
      .get(`assets/kural/iyal${this.langExtension}.json`)
      .subscribe((data1: any[]) => {
        let iyals: string[] = [];
        for (let i = 0; i < data1.length; i++) {
          if (data1[i].pal_id === palId) {
            iyals = data1[i].iyal;
          }
        }
        this.iyals = iyals;
        this.selectedIyal = this.iyals[0];
        this.selectedAthikaram();
      });
  }

  selectedAthikaram() {
    console.log(this.selectedIyal);
    this.http
      .get(`assets/kural/athikaram${this.langExtension}.json`)
      .subscribe((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].iyal === this.selectedIyal) {
            this.athikarams = data[i].athikaram;
          }
        }
        this.athikaram = this.athikarams[0];
        this.selectedKurals(this.athikaram);
      });
  }

  selectedKurals(selectedAthikaram: string) {
    this.getAllKurals().subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].athikaram.replace(/^\s+|\s+$/g, '') ===
          this.athikaram.replace(/^\s+|\s+$/g, '')
        ) {
          this.kurals = data[i].kurals;
        }
      }
      this.athikaram = selectedAthikaram;
      this.getAllTrans().subscribe((transData: any[]) => {
        this.trans = [];
        for (let i = 0; i < transData.length; i++) {
          if (
            transData[i].athikaram.replace(/^\s+|\s+$/g, '') ===
            this.athikaram.replace(/^\s+|\s+$/g, '')
          ) {
            for (let j = 0; j < transData[i].trans.length; j++) {
              this.trans.push(transData[i].trans[j]);
            }
          }
        }
      });
    });
  }

  selectedTrans(language) {
    this.selectedLanguage = language;
    localStorage.setItem('lang', language);
    this.updateLangExtensions(language);
    this.selectedIyl(1);
    this.selectedAthikaram();
    this.selectedKurals(this.athikaram);
    this.loadLabels();
    this.http
      .get(`assets/kural/pal${this.langExtension}.json`)
      .subscribe((data: any[]) => {
        this.pal = data;
        this.selectedPalId = data[0].id;
        this.selectedPal = data[0].name;
      });
  }

  getAllKurals() {
    return this.http.get<any[]>(
      `assets/kural/kurals${this.langExtension}.json`
    );
  }

  getAllTrans() {
    return this.http.get<any[]>(
      `assets/kural/translation${this.langExtension}.json`
    );
  }
}
