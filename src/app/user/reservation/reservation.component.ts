import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReservationService } from '../../reservation.service';
import { Reservation } from '../../reservation';

@Component({
   selector: 'app-reservation',
   templateUrl: './reservation.component.html',
   styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit { 
   //Component properties
   allReservations: Reservation[];
   statusCode: number;
   requestProcessing = false;
   reservationIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form

   reservationForm = new FormGroup({
       id: new FormControl('', Validators.required),
	   user: new FormControl('', Validators.required),	
	   vol: new FormControl('', Validators.required),	   
       hebergement: new FormControl('', Validators.required),	   
	   transport: new FormControl('', Validators.required),
	   nbre_personne: new FormControl('', Validators.required),	   
	   
   });
   //Create constructor to get service instance
   constructor(private reservationService: ReservationService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllReservations();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllReservations() {
        this.reservationService.getAllReservations()
		  .subscribe(
                data => this.allReservations = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onReservationFormSubmit() {
	  this.processValidation = true;   
	  if (this.reservationForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let reservation= this.reservationForm.value;
	  if (this.reservationIdToUpdate === null) {  
	    //Generate article id then create article
        this.reservationService.getAllReservations()
	     .subscribe(reservations => {
			 
		   //Generate article id	 
		   let maxIndex = reservations.length - 1;
		   let issueWithMaxIndex = reservations[maxIndex];
		   let reservationId = issueWithMaxIndex.id + 1;
		   reservation.id = reservationId;
		
		   //Create article
     	   this.reservationService.createReservation(reservation)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllReservations();	
					this.backToCreateReservation();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        reservation.id = this.reservationIdToUpdate; 		
	    this.reservationService.updateReservation(reservation)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllReservations();	
					this.backToCreateReservation();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadReservationToEdit(reservationId: String) {
      this.preProcessConfigurations();
      this.reservationService.getReservationById(reservationId)
	      .subscribe(reservation => {
		            this.reservationIdToUpdate = reservation.id;   
					this.reservationForm.setValue({ 
						user: reservation.user ,
						vol : reservation.vol , 
						hebergement : reservation.hebergement ,
						transport : reservation.transport ,
						nbre_personne : reservation.nbre_personne 
						 });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteReservation(issueId: String) {
      this.preProcessConfigurations();
      this.reservationService.deleteReservationById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllReservations();	
				    this.backToCreateReservation();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateReservation() {
      this.reservationIdToUpdate = null;
      this.reservationForm.reset();	  
	  this.processValidation = false;
   }
}
    
