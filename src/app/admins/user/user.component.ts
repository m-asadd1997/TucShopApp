import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allTransactions = [];
  userTransactions = [];

  constructor(private service:AdminServiceService) { }

  ngOnInit() {
    this.showTransactions();
  }
  showTransactions(){
    this.service.getTransaction().subscribe(item => {
      console.log(item);
      this.allTransactions = item;
      this.userTransactions=this.allTransactions;
    })
  }

}
