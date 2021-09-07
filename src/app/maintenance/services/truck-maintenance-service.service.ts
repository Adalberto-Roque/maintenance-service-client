import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IFilterCommon } from "src/app/shared/filter-common";
import { environment } from "src/environments/environment";
import { ITruckMaintenanceService } from "../interfaces/truck-maintenance-service";
import { ITypeTruckMaintenanceServices } from "../interfaces/type-truck-maintenance-service";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})

export class TruckMaintenanceServiceSerivce {

    private serverUri: string = environment.serverUri;

    constructor(private http: HttpClient) { }

    get(filters: IFilterCommon) {

        let params = this.loadParams(filters);

        return this.http.get<ITruckMaintenanceService[]>(`${this.serverUri}TruckMaintenanceServices`, {
            params: params,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-rows-count': ''
            }),
            observe: 'response',
        }).pipe(map(resp => {
            return { body: resp.body || [], count: resp.headers.get('x-rows-count') || 0 }
        }));

    }

    getById(id: number) {
        return this.http.get<ITruckMaintenanceService[]>(`${this.serverUri}TruckMaintenanceServices/${id}`);
    }

    save(entity: ITruckMaintenanceService) {
        return this.http.post(`${this.serverUri}TruckMaintenanceServices`, entity);
    }

    update(id: number, entity: ITruckMaintenanceService) {
        return this.http.put(`${this.serverUri}TruckMaintenanceServices/${id}`, entity);
    }

    getTypes() {
        return this.http.get<ITypeTruckMaintenanceServices[]>(`${this.serverUri}TruckMaintenanceServices/catalog/types`);
    }

    delete(id: number) {
        return this.http.delete(`${this.serverUri}TruckMaintenanceServices/${id}`);
    }

    private loadParams(filterCommon: IFilterCommon) {
        let params = new HttpParams();

        if (filterCommon.filter) {
            params = params.append('filter', filterCommon.filter.trim());
        }
        if (filterCommon.orderBy) {
            params = params.append('ascending', filterCommon.ascending.toString());
            params = params.append('orderBy', filterCommon.orderBy);
        }
        params = params.append('page', (filterCommon.page + 1).toString());
        params = params.append('PageSize', filterCommon.pageSize.toString());
        return params;
    }


}