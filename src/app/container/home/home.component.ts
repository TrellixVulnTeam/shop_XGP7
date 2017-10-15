import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "../../services/product.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
// import * as firebase from 'firebase';
import * as _ from 'lodash';
// import { AdItem } from '../../components/advert/ad-item';
import { SearchService } from "../../services/search.service";
import { StorageService } from "../../services/storage.service";
import { CartService } from '../../services/cart.service';
import { AddressSearchService } from "../../services/addresssearch.service";
import { AuthService } from "../../authentications/authentication.service";
import { AdvertService } from '../../services/advert.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [
    trigger('movehome', [
      state('start', style({
        transform: 'scale(1)',
        backgroundColor: '#fff'
      })),
      state('end', style({
        transform: 'scale(1.1)',
        backgroundColor: 'red'
      })),
      transition('start => end', [animate('300ms ease-in')]),
      transition('end => start', [animate('300ms ease-out')])

    ])
  ]
})
export class HomeComponent implements OnInit {
  searchingPostcode;
  ads;
  emptyErr;
  successMsg;
  state:string = 'start';
  openPostInput;

  constructor(private _router:Router, private searchService:SearchService, 
  private PS:ProductService, private storeService:StorageService,
  private cartService:CartService, private addressService:AddressSearchService,
  private authService:AuthService, private advertService:AdvertService) {
    // title.setTitle('Welcome to our shop');
    // console.log(this.store.select('appState'));
   }
   animate(){
     this.state = (this.state == 'start'? 'end': 'start');
   }
  counter = 0;
  openPostBox(){
    this.openPostInput = "open" + this.counter++;
  }
   
  continueShop(){
    this._router.navigate(["/products/?", {dept_id:"5953ee34e8cc187c531f8491", dept:"Frozen Food", selected: true, code_number: 1001}])
  }
  // submitPostcode(postcode){
  //   let postCode = postcode.toUpperCase();
  //   if(postcode === ""){
  //     this.emptyErr = "please enter a valid postcode";
  //     return;
  //   }
  //   this.searchingPostcode = true;
  //   this.addressService.findAddres(postCode)
  //     .subscribe((address)=>{
  //       if(address.addresses[0].includes('London')){
  //         this.searchingPostcode = false;
  //         this.successMsg = "Congratulations...We can deliver to you.";
  //         this.storeService.storeData('postcode', postCode);
  //         return;
  //       }else{
  //         this.emptyErr = "Sorry! We can not deliver to you!!";
  //         this.searchingPostcode = false;
  //       }
        
  //     });
  //     setTimeout(()=>{
  //       this.searchingPostcode = false;
  //     }, 8000)
  //   // this.emptyErr = "Please enter a valid postcode";
    
  // }

  ngOnInit() {
  
    // this.addressService.getMyIp().subscribe((data)=>{
    //   this.storeService.storeData('ip', data.ip);
    // })
  
    this.advertService.getAdvertCached().subscribe((ad)=>{
      this.ads = _.take(ad, 4)[2];
      // console.log(this.ads);
    });
  }

}
