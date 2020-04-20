import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskRequestComponent } from './desk-request.component';

describe('DeskRequestComponent', () => {
  let component: DeskRequestComponent;
  let fixture: ComponentFixture<DeskRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
