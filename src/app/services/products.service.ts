import { Injectable } from '@angular/core';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { Products } from '../models/Products';
import { AppSettings } from '../appSettings';
@Injectable()
export class ProductsService extends BaseRequestOptions
{
    constructor(private http: Http) 
	{
		super();		
	}	
    update(product: Products) 
	{			
		var body = {'token': JSON.parse(localStorage.getItem('currentUser'))};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });			
		product['token'] = JSON.parse(localStorage.getItem('currentUser'));	
		product['id']=product.product_id;			
		return this.http.post(AppSettings.API_ENDPOINT+'updateproduct', JSON.stringify(product), options).map((response: Response) => response.json());		
    }	
	upload(bodyString,options) 
	{	 		
        return this.http.post(AppSettings.API_ENDPOINT+'updateproduct', bodyString,options).map((response: Response) => response.json());
    }
	getAll(json) 
	{	 
		let status=0;	    
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'limit':json.limit,'page':json.page};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_ENDPOINT+'productslist', bodyString,options).map((response: Response) => response.json());
    }
	updateproductStatus(product)
	{			
		let status=0;
	    if(product.product_status==1) {status=0;} else {status=1;}
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'status':status,'product_id':product.product_id};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });	
		//https://stackoverflow.com/questions/36208732/angular-2-http-post-is-not-sending-the-request
		return this.http.post(AppSettings.API_ENDPOINT+'productstatus', bodyString, options).map((response: Response) => response.json());  
	}
	deleteproduct(product)
	{
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'id':product.product_id};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });			
		return this.http.post(AppSettings.API_ENDPOINT+'product_delete', bodyString, options).map((response: Response) => response.json());  
	}
	getProduct(id)
	{
		var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'product_id':id};		
		let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        let options       = new RequestOptions({ headers: headers });			
		return this.http.post(AppSettings.API_ENDPOINT+'productslist', bodyString, options).map((response: Response) => response.json());
	}
}
