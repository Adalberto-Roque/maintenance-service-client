import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IEmployeeQuery } from '../../interfaces/employees';
import { IVehicleQuery } from '../../interfaces/trucks';
import { ITypeTruckMaintenanceServices } from '../../interfaces/type-truck-maintenance-service';
import { EmployeeSerivce } from '../../services/employee.service';
import { TruckMaintenanceServiceSerivce } from '../../services/truck-maintenance-service.service';
import { TrucksSerivce } from '../../services/trucks.service';

@Component({
  selector: 'app-maintenace-service-detail-page',
  templateUrl: './maintenace-service-detail-page.component.html',
  styleUrls: ['./maintenace-service-detail-page.component.scss']
})
export class MaintenaceServiceDetailPageComponent implements OnInit {

  trucks: IVehicleQuery[] = [];
  drivers: IEmployeeQuery[] = [];
  dispatchers: IEmployeeQuery[] = [];
  mechanicals: IEmployeeQuery[] = [];
  types: ITypeTruckMaintenanceServices[] = []
  form: FormGroup;
  loading:boolean = false;
  idMaintenanceService:number = 0;

  constructor(
    private truckService: TrucksSerivce,
    private employeeService: EmployeeSerivce,
    private fb: FormBuilder,
    private truckMaintenanceServiceSerivce: TruckMaintenanceServiceSerivce,
    private location: Location,
    private activatedRoute:ActivatedRoute
  ) {

    this.form = fb.group({
      idTruckMaintenanceServices: [0, Validators.required],
      idTruck: [0, Validators.required],
      idTypeTruckMaintenanceService: [0, Validators.required],
      driver: [0, Validators.required],
      dispatcher: [0, Validators.required],
      dueDate: [new Date(), Validators.required],
      mechanical: [0, Validators.required],
    });

    activatedRoute.params.subscribe(params => {
        this.idMaintenanceService = params.id || 0
    });

  }

  ngOnInit(): void {
    this.loadData();

    if (this.idMaintenanceService > 0) {
      this.truckMaintenanceServiceSerivce.getById(this.idMaintenanceService).subscribe(resp => {
        this.form.patchValue(resp);
      })
    }
    this.form.controls['driver'].valueChanges.subscribe(value => {
      const driver = this.drivers.find(e => e.idEmployee == value);
      if (driver)
        this.form.controls['idTruck'].setValue(driver.idTruck);
    });
  }

  private loadData() {
    this.truckService.get().subscribe(resp => {
      this.trucks = resp;
    });

    this.employeeService.get().subscribe(resp => {
      this.drivers = resp.filter(e => e.idJob === 1);
      this.dispatchers = resp.filter(e => e.idJob === 2);
      this.mechanicals = resp.filter(e => e.idJob === 3);
    });

    this.truckMaintenanceServiceSerivce.getTypes().subscribe(resp => {
      this.types = resp;
    });
  }

  save() {
    this.loading = true;

    if (this.idMaintenanceService > 0)
      this.update();
    else
      this.saveNew();
  }

  private saveNew() {
    const entity = Object.assign({}, this.form.getRawValue());
    this.truckMaintenanceServiceSerivce.save(entity).subscribe(resp => {
      this.location.back();
      this.loading = false;
    }, err => this.loading = false);
  }

  
  private update() {
    const entity = Object.assign({}, this.form.getRawValue());
    this.truckMaintenanceServiceSerivce.update(this.idMaintenanceService, entity).subscribe(resp => {
      this.location.back();
      this.loading = false;
    }, err => this.loading = false);
  }


  cancel() {
    this.location.back();
  }

}
