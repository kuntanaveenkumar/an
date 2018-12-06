import { Component,ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { RolesUsersService } from '../services/roleusers.service';  
import { RoleUsers } from '../models/roleUsers';  
			
@Component({

  templateUrl: './roleusers.component.html',  
 styleUrls: ['../admincss/style.default.css','../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RolesUsersService]
})
export class RoleusersComponent 
{
        roleusers: RolesUsersService[] = [];		
		total = 0;
		page = 1;
		limit = 4;
		loading = false;
		public data: Observable<any>;
		constructor(private http: Http,private rolesusersService: RolesUsersService,private router: Router) 
		{					
			
		}
		ngOnInit()
		{		
			this.listall();			
		}
                listall()
		{
			  this.loading = true;
				this.rolesusersService.getAll({'limit':this.limit,'page': this.page})
				.subscribe(
					response => 
					{			
						this.total = response.total;
						this.roleusers=response;
						this.loading = false;
					},
					error => {						
						
					});
		}
                updatestatus(roleusers)
		{
			this.rolesusersService.updateroleuserStatus(roleusers)
				.subscribe(
					response => 
					{												
						this.listall();
					},
					error => {						
						
					});
		}
                deleteuserrole(roleusers)
                {
			if (confirm("Are you sure you want to delete " + roleusers.admin_user + "?")) 
				{
                                    this.rolesusersService.deleteuserrole(roleusers)
                                            .subscribe(
                                                    response => 
                                                    {												
                                                        this.listall();
                                                    },
                                                    error => {						

                                                    });
				}
		}
}

