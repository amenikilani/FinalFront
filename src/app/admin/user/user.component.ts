import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit { 
   //Component properties
   allUsers: User[];
   statusCode: number;
   requestProcessing = false;
   userIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form
   userForm = new FormGroup({
       id: new FormControl('', Validators.required),
	   nom: new FormControl('', Validators.required),	
	   prenom: new FormControl('', Validators.required),	   
       cin: new FormControl('', Validators.required),	   
	   email: new FormControl('', Validators.required),
	   role: new FormControl('', Validators.required),	   
       motpass: new FormControl('', Validators.required)	   

	   
   });
   //Create constructor to get service instance
   constructor(private userService: UserService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllUsers();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllUsers() {
        this.userService.getAllUsers()
		  .subscribe(
                data => this.allUsers = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onUserFormSubmit() {
	  this.processValidation = true;   
	  if (this.userForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let user= this.userForm.value;
	  if (this.userIdToUpdate === null) {  
	    //Generate article id then create article
        this.userService.getAllUsers()
	     .subscribe(users => {
			 
		   //Generate article id	 
		   let maxIndex = users.length - 1;
		   let issueWithMaxIndex = users[maxIndex];
		   let userId = issueWithMaxIndex.id + 1;
		   user.id = userId;
		
		   //Create article
     	   this.userService.createUser(user)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllUsers();	
					this.backToCreateUser();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        user.id = this.userIdToUpdate; 		
	    this.userService.updateUser(user)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllUsers();	
					this.backToCreateUser();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadUserToEdit(userId: String) {
      this.preProcessConfigurations();
      this.userService.getUserById(userId)
	      .subscribe(user => {
		            this.userIdToUpdate = user.id;   
					this.userForm.setValue({ nom : user.nom, 
						prenom: user.prenom, 
						cin : user.cin,
						 email: user.email ,
						 role : user.role , 
						 motpass : user.motpass });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete articl
   deleteUser(issueId: String) {
      this.preProcessConfigurations();
      this.userService.deleteUserById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllUsers();	
				    this.backToCreateUser();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateUser() {
      this.userIdToUpdate = null;
      this.userForm.reset();	  
	  this.processValidation = false;
   }
}
    
