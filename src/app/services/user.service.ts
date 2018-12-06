import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Admin } from '../models/Admin';
import { AppSettings } from '../AppSettings'; 
@Injectable()
export class UserService 
{
    constructor(private http: Http) {}	
    update(user: Admin) 
	{
        return this.http.post(AppSettings.API_ENDPOINT+'updateprofile', user, this.jwt()).map((response: Response) => response.json());
    }		
    private jwt() 
	{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
	
        if (currentUser) 
		{			
            let headers = new Headers();			
			headers.append("Access-Control-Allow-Origin", "*");
			headers.append("Access-Control-Allow-Credentials", "true"); 
			headers.append("Authorization", "Bearer " + currentUser);
			headers.append("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
			headers.append("Content-Type", "application/json,application/x-www-form-urlencoded");
			headers.append("Access-Control-Request-Headers", "Content-type,X-Requested-With,Origin,accept");
            return new RequestOptions({ headers: headers });
        }
    }
}
