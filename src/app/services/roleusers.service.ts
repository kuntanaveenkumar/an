import { Injectable } from '@angular/core';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { RoleUsers } from '../models/RoleUsers';
import {AppSettings} from '../appSettings';
@Injectable()
export class RolesUsersService  extends BaseRequestOptions
{
        constructor(private http: Http) 
	{
		super();		
	}	
        update(roleusers: RoleUsers) 
	{			
            var body = {'token': JSON.parse(localStorage.getItem('currentUser'))};		
            let bodyString = JSON.stringify(body); 
            let headers      = new Headers({ 'Content-Type': 'application/json' }); 
            let options       = new RequestOptions({ headers: headers });			
            roleusers['token'] = JSON.parse(localStorage.getItem('currentUser'));	
            roleusers['id'] = roleusers.admin_id;			
            return this.http.post(AppSettings.API_ENDPOINT+'updateadmin', JSON.stringify(roleusers), options).map((response: Response) => response.json());		
        }
        getAll(json) 
	{	 
            let status=0;	    
            var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'limit':json.limit,'page':json.page};		
            let bodyString = JSON.stringify(body); 
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(AppSettings.API_ENDPOINT+'adminuserslist', bodyString,options).map((response: Response) => response.json());
        }
        getRoleUser(id) 
        {
            var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'admin_id':id};		
            let bodyString = JSON.stringify(body); 
            let headers      = new Headers({ 'Content-Type': 'application/json' }); 
            let options       = new RequestOptions({ headers: headers });			
            return this.http.post(AppSettings.API_ENDPOINT+'adminuserslist', bodyString, options).map((response: Response) => response.json());
        }
        updateroleuserStatus(roleusers)
	{			
		let status=0;
                if(roleusers.admin_status==1) {status=0;} else {status=1;}
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'status':status,'admin_id':roleusers.admin_id};		
		let bodyString = JSON.stringify(body);
                let headers      = new Headers({ 'Content-Type': 'application/json' });
                let options       = new RequestOptions({ headers: headers });	
		return this.http.post(AppSettings.API_ENDPOINT+'adminstatus', bodyString, options).map((response: Response) => response.json());  
	}
        deleteuserrole(roleusers)
	{
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'id':roleusers.admin_id};		
		let bodyString = JSON.stringify(body); // Stringify payload
                let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                let options       = new RequestOptions({ headers: headers });			
		return this.http.post(AppSettings.API_ENDPOINT+'admin_delete', bodyString, options).map((response: Response) => response.json());  
	}
}
