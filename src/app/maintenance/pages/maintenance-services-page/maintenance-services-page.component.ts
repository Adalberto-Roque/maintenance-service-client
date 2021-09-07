import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IFilterCommon } from 'src/app/shared/filter-common';
import { ITruckMaintenanceService } from '../../interfaces/truck-maintenance-service';
import { TruckMaintenanceServiceSerivce } from '../../services/truck-maintenance-service.service';

@Component({
  selector: 'app-maintenance-services-page',
  templateUrl: './maintenance-services-page.component.html',
  styleUrls: ['./maintenance-services-page.component.scss']
})
export class MaintenanceServicesPage implements OnInit {

  displayedColumns: string[] = ['truck', 'driver', 'dispatcher', 'dueDate', 'mechanical', 'type', 'actions'];
  dataSource:ITruckMaintenanceService[] = [];
  searchControl: FormControl = new FormControl();
  filters: IFilterCommon = {
    filter:'',
    orderBy:'',
    ascending:false,
    page:1,
    pageSize:5,
    totalRows: 0
  }


  constructor(private truckMaintenanceService:TruckMaintenanceServiceSerivce) { }

  ngOnInit(): void {
    this.loadData();
  }

  changePaginator(event:PageEvent){
    this.filters.page = event.pageIndex;
    this.filters.pageSize = event.pageSize;
    this.loadData();
  }

  private loadData() {
    this.truckMaintenanceService.get(this.filters).subscribe(({body, count}) => {
      this.dataSource = body;
      this.filters.totalRows = +count;
    });
  }

  delete(id:number){
    this.truckMaintenanceService.delete(id).subscribe(resp => {
      this.loadData();
    });
  }

}
