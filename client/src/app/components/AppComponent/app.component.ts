import { Component } from '@angular/core';
import { CurrencyInfo } from 'src/app/models/currencyInfo';
import { CurrencyService } from 'src/app/services/currency.service';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'Kepel Project';
  fileContent : string;
  uploadStatus: string;
  currenciesValues: CurrencyInfo[];

  constructor(public config: AppConfig, private currencyService: CurrencyService) {
    this.config.hostAddress = `http://${window.location.hostname}:${this.config.getDefaultPort()}`;
    this.currenciesValues = []
  }

  public fetchData(): void {
    this.currencyService.getCurrenciesValues()
    .then(values => this.currenciesValues = values);
  }

  public uploadFile() : void {
      this.uploadStatus = "";
      try {
        var arr = this.fileContent.split("\n");     
        var dataToSend = arr.map(this.getCurrencyInfo);
        console.log(dataToSend);
        this.currencyService.postCurrenciesValues(dataToSend)
        .then(this.updateStatus);       
      }
      catch {
        this.updateStatus(false);
      }
  }

  private updateStatus(result: boolean) : void {
    this.uploadStatus = result ? "Success!" : "Failed!";
  }

  private getCurrencyInfo(line : string) : CurrencyInfo {
    var arr = line.split(",");
    return {
      currency: arr[0],
      exchange: arr[1],
      volume: +arr[2],
      value: +arr[3]
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => this.fileContent = myReader.result;

    myReader.readAsText(file);
  }  
}
