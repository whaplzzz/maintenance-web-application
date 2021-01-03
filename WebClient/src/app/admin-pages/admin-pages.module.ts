import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminIndexPageComponent } from './admin-index-page/admin-index-page.component';
import { RepairOrderCardComponent } from './admin-index-page/repair-order-card/repair-order-card.component';
import { AdminPagesRoutingModule } from './admin-pages-routiong.module';
import { CarInfoComponent } from './admin-repair-order-info-page/car-info-component/car-info.component';
import { ClientInfoComponent } from './admin-repair-order-info-page/client-info-component/client-info.component';
import { WorkerInfoComponent } from './admin-repair-order-info-page/worker-info-component/worker-info.component';
import { RepairOrderInfoPageComponent } from './admin-repair-order-info-page/admin-repair-order-info-page.component';
import { AdminPersonsRequestsPageComponent } from './admin-persons-requests-page/admin-persons-requests-page.component';
import { PersonRequestCardComponent } from './admin-persons-requests-page/person-request-card/person-request-card.component';
import { AdminReportsPageComponent } from './admin-reports-page/admin-reports-page.component';
import { AdminClientsTableDataPageComponent } from './admin-clients-table-data-page/admin-clients-table-data-page.component';
import { AdminCarsTableDataPageComponent } from './admin-cars-table-data-page/admin-cars-table-data-page.component';
import { AdminWorkersTableDataPageComponent } from './admin-workers-table-data-page/admin-workers-table-data-page.component';
import { ClientsTableRowComponent } from './admin-clients-table-data-page/clients-table-row/clients-table-row.component';
import { CarsTableRowComponent } from './admin-cars-table-data-page/cars-table-row/cars-table-row.component';
import { WorkersTableRowComponent } from './admin-workers-table-data-page/workers-table-row/workers-table-row.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AdminPagesRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminIndexPageComponent,
    AdminHomePageComponent,
    AdminPersonsRequestsPageComponent,
    RepairOrderCardComponent,
    RepairOrderInfoPageComponent,
    PersonRequestCardComponent,
    AdminReportsPageComponent,
    AdminClientsTableDataPageComponent,
    ClientsTableRowComponent,
    AdminCarsTableDataPageComponent,
    CarsTableRowComponent,
    AdminWorkersTableDataPageComponent,
    WorkersTableRowComponent,
    CarInfoComponent,
    ClientInfoComponent,
    WorkerInfoComponent
  ],
  providers: [],
})
export class AdminPagesModule {}
