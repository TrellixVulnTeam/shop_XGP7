import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './modules/material/material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebase-configuration';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { schema } from './db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Reducers } from './store/reducers';
import { ProductEffects } from "app/effects/product-effect";
import { CategoryEffects } from "app/effects/category-effect";
import { CartEffects } from "app/effects/cart-effect";



//Needed Hammerjs to work with material Design module
import 'hammerjs';

import { AppRouterModule } from './routers/app-router/app-router.module';
import { CatModule } from './components/products/prod-category/category.module';
import { CheckOutModule } from './components/check-out/check-out.module';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/menu/top-menu/top-menu.component';
import { SubMenuComponent } from './components/menu/top-menu/sub-menu';
import { SideMenuComponent } from './components/menu/side-menu/side-menu.component';
import { FooterComponent } from './components/menu/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ProductComponent } from './components/products/product/product.component';
import { CatTableComponent } from './components/products/new-product/category-table';
import { ProductService } from "app/services/product.service";









@NgModule({
  declarations: [
    AppComponent, TopMenuComponent, SideMenuComponent, 
    FooterComponent, HomeComponent, NewProductComponent, 
    ProductComponent, SubMenuComponent,CatTableComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,MaterialModule, ReactiveFormsModule,
    HttpModule, AppRouterModule,CatModule, CheckOutModule,
    StoreModule.provideStore(Reducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    EffectsModule.run(ProductEffects),
    EffectsModule.run(CategoryEffects),
    EffectsModule.run(CartEffects),

    DBModule.provideDB(schema),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,
    ButtonsModule
  
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }