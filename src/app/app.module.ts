import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import { AppComponent } from './app.component';
import { VolComponent } from './admin/vol/vol.component';
import {VolService} from './vol.service';
import {HebergementService}from './hebergement.service';
import { Routes,RouterModule } from '@angular/router';
import { HebergementComponent } from './admin/hebergement/hebergement.component';
import { VilleComponent } from './admin/ville/ville.component';
import{VilleService} from './ville.service';
import { TransportComponent } from './admin/transport/transport.component';
import {TransportService} from './transport.service';
import { from } from 'rxjs';
import { ReservationComponent } from './user/reservation/reservation.component';
import { ReservationService } from './reservation.service';
import { UserComponent } from './admin/user/user.component';
import { UserService } from './user.service';
import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';

const appRoutes: Routes = [
  { path: 'vols', component: VolComponent },
  { path: 'hebergements', component: HebergementComponent },
  { path: 'villes', component: VilleComponent },
  { path: 'transports', component: TransportComponent },
  { path: 'reservations', component: ReservationComponent},
  { path: 'users', component: UserComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    VolComponent,
    HebergementComponent,
    VilleComponent,
    TransportComponent,
    ReservationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,AppBoostrapModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VolService,HebergementService,VilleService,TransportService,ReservationService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
