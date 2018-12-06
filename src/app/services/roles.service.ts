import { Injectable } from '@angular/core';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { Roles } from '../models/Roles';
import {AppSettings} from '../appSettings';
@Injectable()
export class RolesService  extends BaseRequestOptions
{
    constructor(private http: Http) 
	{
		super();		
	}	
    update(role: Roles) 
	{			
		var body = {'token': JSON.parse(localStorage.getItem('currentUser'))};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });			
		role['token'] = JSON.parse(localStorage.getItem('currentUser'));	
		role['id'] = role.role_id;			
		return this.http.post(AppSettings.API_ENDPOINT+'updateroleuser', JSON.stringify(role), options).map((response: Response) => response.json());		
    }	
	getAll(json) 
	{	 
	
		
		let status=0;	    
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'limit':json.limit,'page':json.page};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_ENDPOINT+'userroles', bodyString,options).map((response: Response) => response.json());
    }
	updateroleStatus(role)
	{			
		let status=0;
                if(role.status==1) {status=0;} else {status=1;}
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'status':status,'role_id':role.role_id};		
		let bodyString = JSON.stringify(body); // Stringify payload
                let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                let options       = new RequestOptions({ headers: headers });	
		//https://stackoverflow.com/questions/36208732/angular-2-http-post-is-not-sending-the-request
		return this.http.post(AppSettings.API_ENDPOINT+'roleliststatus', bodyString, options).map((response: Response) => response.json());  
	}
	deleterole(role)
	{
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'id':role.role_id};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });			
		return this.http.post(AppSettings.API_ENDPOINT+'role_delete', bodyString, options).map((response: Response) => response.json());  
	}
	getRole(id)
	{
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'role_id':id};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        let options       = new RequestOptions({ headers: headers });			
		return this.http.post(AppSettings.API_ENDPOINT+'userroles', bodyString, options).map((response: Response) => response.json());
	}
   /* private jwt() 
	{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) 
		{			
            let headers = new Headers();		
			var body = ({'token': JSON.parse(localStorage.getItem('currentUser')),'status':1,'product_id':1});	
			//var body ="token="+JSON.parse(localStorage.getItem('currentUser'));
			//headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			headers.append("Access-Control-Allow-Origin", "*");
			headers.append("Authorization", "Bearer " + currentUser);
			headers.append("Access-Control-Allow-Credentials", "true");
			
			headers.append("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
			headers.append("Content-Type", "application/x-www-form-urlencoded");
		
			headers.append("Access-Control-Request-Headers", "Content-type,X-Requested-With,Origin,accept");
            return new RequestOptions({headers: headers });
        }
    }	*/
}
