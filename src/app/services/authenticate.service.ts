import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {AppSettings} from '../appSettings';

@Injectable()
export class AuthenticateService {
    constructor(private http: Http) { } 
    login(uname: string, password: string) 
	{
		return this.http.post('http://localhost/testadmin/api/adminlogin', { uname: uname, pword: password })
            .map((response: Response) => 
			{
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token.token) 
				{	
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.token.token));
                } 
                return user;
            });
    } 
    logout() 
	{
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
