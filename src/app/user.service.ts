import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { User } from './user';
@Injectable()
export class UserService {
      //URL for CRUD operations
   userUrl = "http://localhost:8063/users";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
    getAllUsers(): Observable<User[]> {
      return this.http.get(this.userUrl)
         .pipe(map(this.extractData),
          catchError(this.handleError));

  }
//Create article
  createUser(user: User):Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.post(this.userUrl, user, options)
             .pipe(map(success => success.status),
             catchError(this.handleError));
  }
//Fetch article by id
  getUserById(userId: String): Observable<User> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: cpHeaders });
  console.log(this.userUrl +"/"+ userId);
  return this.http.get(this.userUrl +"/"+ userId)
       .pipe(map(this.extractData)
       ,catchError(this.handleError));
  }	
//Update article
  updateUser(user: User):Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.put(this.userUrl +"/"+ user.id, user, options)
             .pipe(map(success => success.status),
             catchError(this.handleError));
            

  }
  //Delete article	
  deleteUserById(userId: String): Observable<number> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: cpHeaders });
  return this.http.delete(this.userUrl +"/"+ userId)
       .pipe(map(success => success.status)
       ,catchError(this.handleError));
  }	
private extractData(res: Response) {
    let body = res.json();
      return body;
  }
  private handleError (error: Response | any) {
  console.error(error.message || error);
  return Observable.throw(error.status);
  }
}
