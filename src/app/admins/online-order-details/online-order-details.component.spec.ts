import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineOrderDetailsComponent } from './online-order-details.component';

describe('OnlineOrderDetailsComponent', () => {
  let component: OnlineOrderDetailsComponent;
  let fixture: ComponentFixture<OnlineOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
