import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    public hostAddress : string = ``;
    
    public getDefaultPort() : number {
        return 5000;
    }

    constructor() {
    }

}