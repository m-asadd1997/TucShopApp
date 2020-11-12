import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AdminServiceService } from './../admin-service.service';
import { expenseRecord, expenses } from './expenses';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-balance-sheet',
  templateUrl: './expense-balance-sheet.component.html',
  styleUrls: ['./expense-balance-sheet.component.css']
})
export class ExpenseBalanceSheetComponent implements OnInit {

  constructor(
    private service: AdminServiceService,
    private router: Router,
    private message: NzMessageService
  ) {
    this.expenses.date = new Date();
  }

  expenses: expenses = new expenses();
  expensesArray:expenseRecord[] = [];
  balance = 0;
  i;
  total = 0;
  disable = false;
  expenseId;
  dateCheck
  newDate;
  expenseRecord : expenseRecord = new expenseRecord();

  ngOnInit() {
    this.disabled();
    this.getExpensesByDate(this.expenses.date);
  }

  execute(str: any) {
  
    if (this.i!=null) {

      this.expensesArray[this.i].subject = this.expenses.subject
      this.expensesArray[this.i].amount = Number(this.expenses.amount);
    }

    else {

      this.expenseRecord = new expenseRecord();
      this.expenseRecord.subject = this.expenses.subject;
      this.expenseRecord.amount = Number(this.expenses.amount);

    }

    switch (str) {

      case 'debit': {

        if (this.i!=null) {

          this.expensesArray[this.i].debit = Number(this.expenses.amount);
          this.expensesArray[this.i].credit = 0;          
          this.expensesArray = [...this.expensesArray];
          this.calculate(this.expensesArray);
          this.disable = false;
          this.i = null;
          break;

        }
        else {
          
          this.expenseRecord.type= "debit";
          this.expenseRecord.debit = Number(this.expenses.amount);
          this.expenseRecord.credit = 0;
          this.expensesArray = [...this.expensesArray, this.expenseRecord];
          this.calculate(this.expensesArray);
          this.disable = false;
          break;

        }

      }
      case 'credit': {

        if (this.i!=null) {

          this.expensesArray[this.i].debit = 0;
          this.expensesArray[this.i].credit = Number(this.expenses.amount);
          this.expensesArray = [...this.expensesArray];
          this.calculate(this.expensesArray);
          this.i = null;
          break;

        }
        else {

          this.expenseRecord.type= "credit";
          this.expenseRecord.debit = 0;
          this.expenseRecord.credit = Number(this.expenses.amount);
          this.expensesArray = [...this.expensesArray, this.expenseRecord];
          this.calculate(this.expensesArray);
          break;

        }
      }
    }

    this.total = this.balance;
    console.log(this.expensesArray)
    this.erasingFields();

  }

  calculate(expensesArray: expenseRecord[]) {

    this.balance = 0;

    for(let expense of expensesArray){

          if (expense.type == "debit") {
        this.balance += Number(expense.amount);
        expense.balance = Number(this.balance);

      }
      else {
        this.balance -= Number(expense.amount);
        expense.balance= Number(this.balance);
      }
    }

    this.expensesArray = [...expensesArray]
    
  }

  disabled() {
    if (this.expensesArray.length <= 0) {
      this.disable = true;
    }
  }

  erasingFields() {
    this.expenses.subject = "";
    this.expenses.amount = null;
  }

  saveSheet() {
    console.log(this.expenses.date)
    var date = new Date(this.expenses.date);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let day = ("0" + date.getDate()).slice(-2)
    this.newDate = year + "-" + month + "-" + day;
    console.log(this.newDate);

    let object = {

      "total": this.total,
      "expenseDetails": this.expensesArray,
      "date": this.newDate
    }

    console.log("Object", object);

    if (this.newDate != this.dateCheck) {

      this.service.postExpense(object).subscribe(d => {
        console.log(d)
        if (d.status == 200) {
          this.message.success(d.message)
          this.expensesArray = [];
          this.balance = 0;
          this.total = 0;
          this.expenses.date = null;
          this.disable = true;
        }
        else {
          this.message.error("Something Went Wrong")
        }
      })

    }
    else {
      this.service.updateExpense(this.expenseId, object).subscribe(d => {
        console.log("Update", d);
        if (d.status == 200) {
          this.message.success(d.message);
          this.expensesArray = [];
          this.expenseId = null;
          this.balance = 0;
          this.total = 0;
          this.getExpensesByDate(this.expenses.date);
        }
        else {
          this.message.error(d.message);
        }
      })
    }
  }

  getExpensesByDate(value: any) {
    let date = value
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let day = ("0" + date.getDate()).slice(-2)
    let newDate = year + "-" + month + "-" + day;

    console.log(newDate);

    this.service.getExpenseByDate(newDate).subscribe(d => {
      console.log(d);

      if (d.status == 200) {
        this.expenseId = d.result.id;
        this.dateCheck = d.result.date;
        this.expensesArray = d.result.expenseDetailsList;
        this.total = d.result.total;
        this.disable = false;
      }
      else {
        this.message.error(d.message);
        this.expensesArray = [];
      }

    })

  }

  onChange(value: any): void {
    console.log(value)
    if (value != null && value != "") {
      this.getExpensesByDate(value);
    }
    else {
      this.expensesArray = [];
      this.disable = true;
    }
  }

  onDelete(index) {

    this.expensesArray.splice(index, 1);
    this.expensesArray = [...this.expensesArray];
    this.calculate(this.expensesArray);
    this.total = this.balance;
    this.disabled();

  }

  onEditRow(index) {

    this.i = index;
    console.log("Index", index);
    let find = this.expensesArray[index];
    console.log(find);
    this.expenses.subject = find.subject;
    this.expenses.amount = find.amount;

  }

  downloadBalanceSheet(value:any){
    if(value){
    let date = value
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    let day = ("0" + date.getDate()).slice(-2)
    let newDate = year + "-" + month + "-" + day;
    if (newDate !=null) {
        this.service.balanceSheetPDF(newDate).subscribe(d => {
          if(d.size!=0){
          console.log("Blob", d);
          let url = window.URL.createObjectURL(d);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = new Date().toDateString();
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          }
          else{
          this.message.error("Can't find Balance Sheet to this date");

          }
        })
      
      }
    
      // else {
      //   this.message.warning("Please Select A range first");
      // }
    
      }
      else{
       this.message.warning("Please Select A range first")

      }
    
    }
  
}

