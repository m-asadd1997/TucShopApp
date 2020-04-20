import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { startWith, take, map } from 'rxjs/operators';
import { slider } from './hello-slide.animation';
import { NguCarouselConfig } from '@ngu/carousel';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';


@Component({
  selector: 'app-desk-request',
  templateUrl: './desk-request.component.html',
  styleUrls: ['./desk-request.component.css'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeskRequestComponent implements OnInit {

  data:any;
  flag:Boolean = false;


  @Input() name: string;
  imgags = [
    // 'assets/bg.jpg',
    // 'assets/car.png',
    // 'assets/canberra.jpg',
    // 'assets/holi.jpg',
  ];
 

  public carouselTileItems$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 5, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 1500 },
    animation: 'lazy'
  };
  tempData: any[];

  
  
  constructor(private cdr: ChangeDetectorRef, private router:Router, private service:AdminServiceService) { }

  ngOnInit() {
    this.getAllPendingTransaction();
    this.tempData = [];
    this.carouselTileItems$ = interval(500).pipe(
      startWith(-1),
      take(this.carousel),
      map(val => {
        const data = (this.tempData = [
          ...this.tempData,
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        ]);
        return data;
      })
    );
    
  }
 
  carousel;
  navigateBackToLoginPage(){
    this.router.navigate(['admin'])
  }


  getAllPendingTransaction(){
  this.service.getAllPendingTransaction().subscribe(d=>{
    
    if(d){
      console.log(d, "hello");
      this.flag=true;     
      this.data=d;
      this.carousel=d.length;
    }

    
    
    
    });
  


  }


}
