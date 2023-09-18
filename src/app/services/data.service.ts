import { Injectable, OnInit, effect, signal } from '@angular/core';
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
  langExtension = signal('');
  selectedLanguage = 'தமிழ்';
  selectedIyalValue = '';
  selectedAthikaramValue = '';
  labels = signal<SiteData>({
    siteName: '',
    name: '',
    palName: '',
    iyal: '',
    athikaramName: '',
    langName: '',
    explanation: '',
    home: '',
    valluvar: '',
    translators: '',
    why: '',
    contribute: '',
    aboutus: '',
    contactus: '',
    team: '',
    search: {
      number: '',
      search: '',
    },
  });
  selectedIyal = '';
  iyals = signal([]);
  athikarams = signal([]);
  athikaram = '';
  kurals = signal([]);
  trans = signal([]);
  pal = signal([]);
  selectedPalId = 1;
  selectedPal = '';
  about = signal<any>({});
  contribute = signal<any>({});
  translators = signal<any>([]);
  valluvar = signal<any>({});
  why = signal<any>({});

  constructor(private http: HttpClient) {
    this.loadLabels();
    this.selectedTrans(this.selectedLanguage);
    effect(() => {
      this.getAboutData();
      this.getContributeData();
      this.getTranslatorsData();
      this.getValluvarData();
      this.getWhyData();
    });
    effect(() => {
      this.handleIsLoading();
    });
  }

  updateLangExtensions(language: string) {
    if (language === 'English') {
      this.langExtension.set('_en');
    } else if (language === 'தமிழ்') {
      this.langExtension.set('');
    }
    this.loadLabels();
  }

  loadLabels() {
    this.http
      .get(`assets/kural/label${this.langExtension()}.json`)
      .subscribe((data: any) => {
        this.labels.set(data);
      });
  }

  selectedIyl(palId: number) {
    this.http
      .get(`assets/kural/iyal${this.langExtension()}.json`)
      .subscribe((data1: any[]) => {
        let iyals: string[] = [];
        for (let i = 0; i < data1.length; i++) {
          if (data1[i].pal_id === palId) {
            iyals = data1[i].iyal;
          }
        }
        this.iyals.set(iyals);
        this.selectedIyal = this.iyals()[0];
        this.selectedAthikaram();
      });
  }

  selectedAthikaram() {
    this.http
      .get(`assets/kural/athikaram${this.langExtension()}.json`)
      .subscribe((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].iyal === this.selectedIyal) {
            this.athikarams.set(data[i].athikaram);
          }
        }
        this.athikaram = this.athikarams()[0];
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
          this.kurals.set(data[i].kurals);
        }
      }
      this.athikaram = selectedAthikaram;
      this.getAllTrans().subscribe((transData: any[]) => {
        for (let i = 0; i < transData.length; i++) {
          if (
            transData[i].athikaram.replace(/^\s+|\s+$/g, '') ===
            this.athikaram.replace(/^\s+|\s+$/g, '')
          ) {
            for (let j = 0; j < transData[i].trans.length; j++) {
              this.trans().push(transData[i].trans[j]);
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
      .get(`assets/kural/pal${this.langExtension()}.json`)
      .subscribe((data: any[]) => {
        this.pal.set(data);
        this.selectedPalId = data[0].id;
        this.selectedPal = data[0].name;
      });
  }

  getAllKurals() {
    return this.http.get<any[]>(
      `assets/kural/kurals${this.langExtension()}.json`
    );
  }

  getAllTrans() {
    return this.http.get<any[]>(
      `assets/kural/translation${this.langExtension()}.json`
    );
  }

  getAboutData() {
    this.http
      .get<any>('assets/kural/about' + this.langExtension() + '.json')
      .subscribe((data) => {
        this.about.set(data);
      });
  }
  getContributeData() {
    this.http
      .get<any>('assets/kural/contribute' + this.langExtension() + '.json')
      .subscribe((data) => {
        this.contribute.set(data);
      });
  }
  getTranslatorsData() {
    this.http
      .get<any>('assets/kural/translators' + this.langExtension() + '.json')
      .subscribe((data) => {
        this.translators.set(data);
      });
  }
  getValluvarData() {
    this.http
      .get<any>('assets/kural/valluvar' + this.langExtension() + '.json')
      .subscribe((data) => {
        this.valluvar.set(data);
      });
  }
  getWhyData() {
    this.http
      .get<any>('assets/kural/why' + this.langExtension() + '.json')
      .subscribe((data) => {
        this.why.set(data);
      });
  }
  handleIsLoading() {
    const conditionsMet =
      this.about() &&
      this.valluvar() &&
      this.contribute() &&
      this.why() &&
      this.translators()[0] &&
      this.athikarams()[0] &&
      this.iyals()[0] &&
      this.kurals()[0] &&
      this.trans()[0] &&
      this.pal()[0] &&
      this.labels().siteName;
  
    this.isLoading = !conditionsMet;
    if (this.isLoading){
      document.getElementById("drawer").classList.replace("display", "not-display")
      document.getElementById("spinner").classList.replace("not-display", "display")
    } else {
      document.getElementById("drawer").classList.replace("not-display", "display")
      document.getElementById("spinner").classList.replace("display", "not-display")
      document.getElementById("spinner").id = ''
    }
  }
  
}
