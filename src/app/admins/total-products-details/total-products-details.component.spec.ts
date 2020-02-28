import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductsDetailsComponent } from './total-products-details.component';

describe('TotalProductsDetailsComponent', () => {
  let component: TotalProductsDetailsComponent;
  let fixture: ComponentFixture<TotalProductsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalProductsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
