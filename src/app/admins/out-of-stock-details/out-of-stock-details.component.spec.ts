import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfStockDetailsComponent } from './out-of-stock-details.component';

describe('OutOfStockDetailsComponent', () => {
  let component: OutOfStockDetailsComponent;
  let fixture: ComponentFixture<OutOfStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOfStockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOfStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
