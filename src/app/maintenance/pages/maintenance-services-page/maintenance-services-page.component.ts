import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IFilterCommon } from 'src/app/shared/filter-common';
import { ConfirmationDialog } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
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
    page:0,
    pageSize:5,
    totalRows: 0
  }


  constructor(private truckMaintenanceService:TruckMaintenanceServiceSerivce,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  changePaginator(event:PageEvent){
    console.log(event.pageIndex);
    this.filters.page = event.pageIndex;
    this.filters.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id:number){
    const dialogRef = this.dialog.open(ConfirmationDialog, {data: {title: 'Delete Maintenance', message:'Are you sure to delete this maintenance?'}})
    
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.truckMaintenanceService.delete(id).subscribe(resp => {
          this.loadData();
        });
      }
    });
  }
  
  private loadData() {
    this.truckMaintenanceService.get(this.filters).subscribe(({body, count}) => {
      this.dataSource = body;
      this.filters.totalRows = +count;
    });
  }
}
