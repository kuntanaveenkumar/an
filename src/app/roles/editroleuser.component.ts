import { Component, ViewEncapsulation,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder  } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { RolesUsersService } from '../services/roleusers.service';  
import { RolesService } from '../services/roles.service';  

import { RoleUsers } from '../models/roleUsers';  	
import { Roles } from '../models/roles';		
@Component({
 templateUrl: './editroleuser.component.html',  
 styleUrls: ['../admincss/style.default.css','../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RolesUsersService,RolesService]
})
export class EditRoleUserComponent implements OnInit 
{	
        roleusers: RoleUsers[] = [];	
        roles:Roles[]=[];
        public data: Observable<any>;		
        title: string;
        form: FormGroup;
        is_edit: boolean; 
        constructor(private http: Http,private rolesusersService: RolesUsersService,private rolesService: RolesService,private router : Router,private route: ActivatedRoute,private fb :FormBuilder) 
        {					
           this.form = this.fb.group({
                admin_user: ['', Validators.required],
                admin_pswd: ['', Validators.required],
                admin_id: [''],
                admin_role_id: ['', Validators.required]
            });


        }
        ngOnInit()
        {		
            var id = this.route.params.subscribe(params => {
            var id = params['id'];
            this.title = id ? 'Edit User' : 'New User';	
            /*id ? this.is_edit = true : this.is_edit = false;*/
            this.rolesService.getAll({'limit':'1000','page': '1'})
				.subscribe(
					response => 
					{								
						this.roles=response;						
					},
					error => {						
						
					});

            if (!id)
                  return; 
                 this.rolesusersService.getRoleUser(id)
                  .subscribe(
                    roleusers => this.roleusers = roleusers["adminusers_list"]["0"],
                    response => 
                    {
                          if (response.status == 404) {
                            this.router.navigate(['NotFound']);
                          }
                    });                 					
                });
                         
        }		
        onSubmit()
        {				
            var res=this.rolesusersService.update(this.form.value);
            res.subscribe(data => this.router.navigate(['./home/viewroleusers']));
        }
}