import { Http } from "@angular/http";
import { AppConfig } from "../app.config";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {
	constructor(protected config: AppConfig, private http: Http) {}  

	protected getUrl(url:string) {
		return `${this.config.hostAddress}/${url}`;
	}    

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}    

    protected getData<T>(actionName : string, resultOnError : T = undefined) : Promise<T> {
		var url = this.getUrl(actionName);
		return this.http.get(url)
				 .toPromise()
				 .then<T>(response => response.json())
				 .catch(error => {
					 console.log(`Error in GET request for ${url}`);
					 if (resultOnError != undefined) {
						return Promise.resolve<T>(resultOnError);
					 }
					 else {
						return Promise.reject(error.message || error);
					 }
				 });            
	}
	
	protected postData(actionName: string, data : any): Promise<boolean> {
		return this.http.post(this.getUrl(actionName), data)
		.toPromise()
		.then(response => response.ok)
		.catch(e => false);		
	}
}