import { Component, ViewEncapsulation,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder  } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { RolesService } from '../services/roles.service';  
import { Roles } from '../models/roles';  
 			
@Component({
 templateUrl: './editrole.component.html',  
 styleUrls: ['../admincss/style.default.css','../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RolesService]
})
export class EditRoleComponent 
{	
		roles: Roles[] = [];
		public data: Observable<any>;		
		title: string;
		form: FormGroup;
		constructor(private http: Http,private rolesService: RolesService,private router : Router,private route: ActivatedRoute,private fb :FormBuilder) 
		{					
			this.form = this.fb.group({					
				role_name: ['', Validators.required],
				role_id: ['']
			});
		}
		ngOnInit()
		{		
				var id = this.route.params.subscribe(params => {
				var id = params['id'];
				this.title = id ? 'Edit Role' : 'New Role';				  
				if (!id) return; 
				this.rolesService.getRole(id)
					.subscribe(
					  roles => this.roles = roles["roles_list"]["0"],
					  response => {						  
						  
						if (response.status == 404) {
						  this.router.navigate(['NotFound']);
						}
					  });					
			});
		}		
		onSubmit()
		{
				
				var res=this.rolesService.update(this.form.value);
					 res.subscribe(data => this.router.navigate(['./home/viewroles']));
		}
}

