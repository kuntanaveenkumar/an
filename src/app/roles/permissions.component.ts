import { Component, ViewEncapsulation,OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { RolesService } from '../services/roles.service';  
import { Roles } from '../models/roles'; 			
@Component({
  templateUrl: './permissions.component.html',  
 styleUrls: ['../admincss/style.default.css','../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RolesService] 
})
export class PermissionsComponent 
{
    roles: RolesService[] = [];		
    total = 0;
    page = 1;
    limit = 4;
    loading = false;
    public data: Observable<any>;
    constructor(private http: Http,private rolesService: RolesService,private router: Router) 
    {					

    }
    ngOnInit()
    {		
		this.listall();
    }		
    listall()
    {
        this.loading = true;
		this.rolesService.getAll({'limit':this.limit,'page': this.page})
		.subscribe(
				response => 
				{			
						this.total = response.total;
						this.roles=response;
						this.loading = false;
				},
				error => {						

				});
    }
    goToPage(n: number): void 
    {
            this.page = n;
            this.listall();
    }
    onNext(): void 
    {	 
        this.page++;
            this.listall();
    }
    onPrev(): void 
    {
            this.page--;
            this.listall();
    }  
	
}

