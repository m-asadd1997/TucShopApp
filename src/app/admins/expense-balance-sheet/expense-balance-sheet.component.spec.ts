import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseBalanceSheetComponent } from './expense-balance-sheet.component';

describe('ExpenseBalanceSheetComponent', () => {
  let component: ExpenseBalanceSheetComponent;
  let fixture: ComponentFixture<ExpenseBalanceSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseBalanceSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
