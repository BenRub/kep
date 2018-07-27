import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/components/AppComponent/app.component';
import { CurrencyService } from 'src/app/services/currency.service';
import { AppConfig } from 'src/app/app.config';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  HttpModule
  ],
  providers: [CurrencyService, AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
