import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IEmployeeQuery } from "../interfaces/employees";

@Injectable({
    providedIn:'root'
})

export class EmployeeSerivce{

    private serverUri: string = environment.serverUri;

    constructor(private http:HttpClient){}

    get(){
        return this.http.get<IEmployeeQuery[]>(`${this.serverUri}employees`);
    }

}