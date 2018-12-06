import { Component, ViewEncapsulation,OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ProductsService } from '../services/products.service';  
import { Products } from '../models/products';  
declare var $:any;

@Component({
  templateUrl: './product.component.html',   
  styleUrls: ['../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/font-awesome.min.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css','../admincss/style.default.css'],   
  encapsulation: ViewEncapsulation.None,
  providers: [ProductsService] 
})
export class ProductComponent implements OnInit 
  {  
        products: Products[] = [];		
		total = 0;
		page = 1;
		limit = 4;
		loading = false;
		public data: Observable<any>;
		constructor(private http: Http,private productsService: ProductsService,private router: Router) 
		{					
			
		}
		ngOnInit()
		{		
			this.listall();
		}	
		listall()
		{
			this.loading = true;
			this.productsService.getAll({'limit':this.limit,'page': this.page})
			.subscribe(
				response => 
				{						
					
					this.total = response.total;
					this.products=response;
						 this.loading = false;
				},
				error => {						
					
				});
		}
		goToPage(n: number): void {
    this.page = n;
    this.listall();
  }
  onNext(): void 
  {
    this.page++;
    this.listall();
  }

  onPrev(): void {
    this.page--;
    this.listall();
  }
  
		edititem(product)
		{
			 this.router.navigate(["/home/editproduct"]);			 
		}
		deleteitem(product)
		{
			if (confirm("Are you sure you want to delete " + product.product_name + "?")) 
				{
			this.productsService.deleteproduct(product)
				.subscribe(
					response => 
					{												
						this.listall();
					},
					error => {						
						
					});
				}
		}
		updatestatus(product)
		{
			this.productsService.updateproductStatus(product)
				.subscribe(
					response => 
					{												
						this.listall();
					},
					error => {						
						
					});
					
		}
  }