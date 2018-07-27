import { BaseService } from "src/app/services/base.serivce";
import { Injectable } from "@angular/core";
import { CurrencyInfo } from "src/app/models/currencyInfo";

@Injectable()
export class CurrencyService extends BaseService {

	public getCurrenciesValues(): Promise<CurrencyInfo[]> {
		return this.getData("currencies", []);
	}

	public postCurrenciesValues(currencies: CurrencyInfo[]): Promise<boolean> {
		return this.postData("currencies", currencies);
	}	
    
}