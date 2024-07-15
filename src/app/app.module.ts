import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NameSearchPipe } from './pipes/name-search.pipe';
import { AmountSearchPipe } from './pipes/amount-search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NameSearchPipe,
    AmountSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, BrowserAnimationsModule,FormsModule,MatInputModule,NgFor,MatFormFieldModule,MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
