import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValluvarComponent } from './valluvar.component';

describe('ValluvarComponent', () => {
  let component: ValluvarComponent;
  let fixture: ComponentFixture<ValluvarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValluvarComponent]
    });
    fixture = TestBed.createComponent(ValluvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
