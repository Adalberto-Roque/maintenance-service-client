import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IVehicleQuery } from "../interfaces/trucks";

@Injectable({
    providedIn:'root'
})

export class TrucksSerivce{

    private serverUri: string = environment.serverUri;

    constructor(private http:HttpClient){}

    get(){
        return this.http.get<IVehicleQuery[]>(`${this.serverUri}vehicles/trucks`);
    }

}