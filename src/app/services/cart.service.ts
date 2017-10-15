import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { iCart } from '../models/cart.model';
import { StorageService } from './storage.service';

@Injectable()

export class CartService {
    private oneCart;
    cartSum;
    constructor(private _af:AngularFireDatabase,
    private storeService:StorageService){}

    createCart(cart){
        //checking to see if the cart already exist
        this.getCart().map((carts)=>
         this.oneCart = carts.filter(findcart=> findcart.postcode == this.storeService.retriveData('postcode'))
                .find(anCart=> anCart.name == cart.name)
        ).subscribe(); 
        console.log(this.oneCart);
        if(this.oneCart){
            firebase.database().ref('/carts/'+this.oneCart.$key)
                .update({qty: this.oneCart.qty + 1}).then((res)=>console.log(res))
                                    .catch((error)=> console.log(error));
            return;
        }else{
            return this._af.list('/carts')
                .push(cart).then(res=> console.log(res))
                     .catch(err=> console.log(err));
        }
    }
    getCart():Observable<any>{
        return this._af.list('/carts');
    }
    incrementCart(cart):Observable<iCart>{
        // console.log(cart);
        let data = {
            qty: cart.qty + 1
        }

        let cartRef = firebase.database().ref('/carts/'+cart.key$);
            cartRef.update(data).then((res)=>console.log(res))
                                .catch((error)=> console.log(error));
        return;
    }
    decrementCart(cart):Observable<iCart>{
         let data = {
            qty: cart.qty - 1
        }
       
        let cartRef = firebase.database().ref('/carts/'+cart.key$);
            cartRef.update(data).then((res)=>{console.log(res)})
                                .catch((error)=> console.log(error));
        return;
    }
    removeCart(cart):Observable<iCart>{
        let cartRef = firebase.database().ref('/carts/'+cart.key$);
            cartRef.remove().then((res)=>console.log(res))
                                .catch((error)=> console.log(error));
        return;
    }

    removeBatchCart(postcode):Observable<any>{
        this.getCart().map((cart)=>{
            if(!cart){return null;}
            cart.filter(res=>res.postcode == postcode)
            .forEach((cat)=>{
                firebase.database().ref('/carts/'+cat.$key)
                    .remove().then((res)=>console.log(res))
                        .catch((error)=> console.log(error));
                });
            
        }).subscribe();
        return;
    }

    
    cartTotal(){
        return this._af.list('/carts');
    }
    
    getTotal(){
       this.cartTotal().subscribe((carts)=>{
        let total = carts.filter(cart=> cart.postcode == this.storeService.retriveData('postcode'))
        .map(cart=>cart.qty * Number(cart.price));
         this.cartSum = total.reduce(this.reducePrice, 0).toFixed(2);
        });
        return this.cartSum;
    }
    reducePrice(sum, num){
        return sum + num;
        
    }


}