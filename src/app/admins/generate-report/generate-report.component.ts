import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  constructor(private service:AdminServiceService,private activatedroute:ActivatedRoute, private message: NzMessageService) { }

  ngOnInit() {

  }

  datevariable = [];

  startValue;
  endValue;
  

  download()
  {
    if (this.datevariable.length > 0) {
      this.startValue=this.datevariable[0].getFullYear()+"-"+ (this.datevariable[0].getMonth()+1)+"-"+this.datevariable[0].getDate();
      this.endValue=this.datevariable[1].getFullYear()+"-"+(this.datevariable[1].getMonth()+1)+"-"+this.datevariable[1].getDate();
        this.service.downloadAllTransactionPDF(this.startValue, this.endValue).subscribe(d => {
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
          this.message.error("Can't find transactions to this date");

          }
        })
      
      }
    
      else {
        this.message.warning("Please Select A range first");
      }
    
      }


}
