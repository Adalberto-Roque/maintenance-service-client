import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class TypeTruckMaintenanceServiceSerivce{
    private serverUri = environment.serverUri;

    constructor(private http:HttpClient){}

    get(){
        return this.http.get(`${this.serverUri}TruckMaintenanceServices/catalog/types`);
    }
}