import { Component, ViewEncapsulation,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder  } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { PermissionsService } from '../services/permissions.service';  
import { Permissions } from '../models/permissions';   			
import { Roles } from '../models/Roles';   		
export interface ICategories {
    cat_id:number
	cat_name:string
	cat_page:string
	cat_image:string
	cat_sort_order:string
	pages : IPages[]
}
export interface IPages
{
	page_id:number,
	page_name:string,
	page_alias_name:string,
	page_category:number,
	page_sort_order:number,
	page_view_status:number,
	page_edit_status:number,
	page_add_status:number,
	page_del_status:number,
	page_stat_status:number,
	page_edit_name:string,
	vchk:boolean,
	echk:boolean,
	achk:boolean,
	dchk:boolean,
	schk:boolean
}

export interface IPermissions {
    roleslist: Roles[];
    total: number;
    categories: ICategories[];
}

@Component({
 templateUrl: './editpermission.component.html',  
 styleUrls: ['../admincss/style.default.css','../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PermissionsService]
})
export class EditPermissionComponent 
{	
		permissions: Permissions[] = [];
		permissonslist : IPermissions[] = [];
		public data: Observable<any>;		
		title: string;
		form: FormGroup;
		selectedviewItems: any = [];
		selectedaddItems: any = [];
		selectededitItems: any = [];
		selecteddelItems: any = [];
		selectedstatItems: any = [];
		index :number;
		constructor(private http: Http,private permissionService: PermissionsService,private router : Router,private route: ActivatedRoute,private fb :FormBuilder) 
		{					
			this.form = this.fb.group({					
				role_name: ['', Validators.required],
				role_id: [''],
				selectviewpage:[],
				selectaddpage:[],
				selecteditpage:[],
				selectdelpage:[],
				selectstatpage:[],
			});		
		}
		search(page, event,atype) 
		{						
			if (event.target.checked) 
			{		
				if(atype=='view')
				{
					this.selectedviewItems.push(page.page_id);				
				}
				else if(atype=='add')
				{
					this.selectedaddItems.push(page.page_id);	
				}
				else if(atype=='edit')
				{
					this.selectededitItems.push(page.page_id);	
				}
				else if(atype=='del')
				{
					this.selecteddelItems.push(page.page_id);	
				}
				else if(atype=='stat')
				{
					this.selectedstatItems.push(page.page_id);	
				}
			}
			else 
			{	
					if(atype=='view')
					{
						var index=this.selectedviewItems.indexOf(page.page_id);
						this.selectedviewItems.splice(index, 1);	
					}
					else if(atype=='add')
					{
						var index=this.selectedaddItems.indexOf(page.page_id);
						this.selectedaddItems.splice(index, 1);	
					}
					else if(atype=='edit')
					{
						var index=this.selectededitItems.indexOf(page.page_id);
						this.selectededitItems.splice(index, 1);	
					}
					else if(atype=='del')
					{
						var index=this.selecteddelItems.indexOf(page.page_id);
						this.selecteddelItems.splice(index, 1);	
					}
					else if(atype=='stat')
					{
						var index=this.selectedstatItems.indexOf(page.page_id);
						this.selectedstatItems.splice(index, 1);	
					}
			}					
		}
		ngOnInit()
		{				
				var id = this.route.params.subscribe(params => {
				var id = params['id'];
				this.title = id ? 'Edit Permission' : 'New Permission';				  
				if (!id) return; 
				/*this.permissionService.getPermission(id)
					.subscribe(
					permissions => this.permissonslist = permissions,
					response => 
					{
						if (response.status == 404) {
						  this.router.navigate(['NotFound']);
						}
					});	
					*/
					
				this.permissionService.getPermission(id).subscribe(response => {
				this.permissonslist = response;		
				this.selectedviewItems = [];
				this.selectedaddItems = [];				
				this.permissonslist['categories'].forEach((item, index) => {
				//console.log(item.pages); 
				//console.log(index); 					
				item.pages.forEach((sitem, sindex) => 
				{
					if (sitem.vchk) 
					{ 
						var index = this.selectedviewItems.indexOf(sitem.page_id);
						if(index < 0)
						{	
							this.selectedviewItems.push(sitem.page_id);	
						}		
					}
					if (sitem.achk) 
					{ 
						var index = this.selectedaddItems.indexOf(sitem.page_id);
						if(index < 0) 
						{	
							this.selectedaddItems.push(sitem.page_id);	
						}		
					}
					if (sitem.echk) 
					{ 
						var index = this.selectededitItems.indexOf(sitem.page_id);
						if(index < 0) 
						{	
							this.selectededitItems.push(sitem.page_id);	
						}		
					}
					if (sitem.dchk) 
					{ 
						var index = this.selecteddelItems.indexOf(sitem.page_id);
						if(index < 0) 
						{	
							this.selecteddelItems.push(sitem.page_id);	
						}		
					}
					if (sitem.schk) 
					{ 
						var index = this.selectedstatItems.indexOf(sitem.page_id);
						if(index < 0) 
						{	
							this.selectedstatItems.push(sitem.page_id);	
						}		
					}
				}
				});
				//alert(this.selectedviewItems);
				//alert(this.selectedaddItems);
				/*for (var item in this.permissonslist['categories']) {
					alert(item);
					for (var page in item['pages']) {
						alert(page);
						//this.selectedviewItems.push(page.page_id);		
					}
					
				}
				*/
				})							
				});
				//console.log(this.selectedviewItems);
				//alert(this.permissonslist['categories'].length);
				//var permissonslist: IPermissions = JSON.parse(json) as IPermissions;		
				//console.log("tester");
				//console.log(this.permissonslist);
				//alert(this.permissonslist["categories"].length)
		}		
		submitForm()
		{				
				/*
				this.selectedAll = this.form.selectviewpage.every(function(item:any) {
				return item.selected == true;
				})*/
				//alert(this.selectedviewItems);
				this.form.patchValue({
					selectviewpage: this.selectedviewItems,
					selectaddpage:this.selectedaddItems,
					selecteditpage:this.selectededitItems,
					selectdelpage:this.selecteddelItems,
					selectstatpage:this.selectedstatItems
				});				
				//console.log(this.form.value);
				//alert(this.selectededitItems);
				//alert("submitted");
				//alert(this.form.value);
				var res=this.permissionService.update(this.form.value);
				//res.subscribe(data => console.log(data));
				res.subscribe(data => this.router.navigate(['./home/viewpermissions']));								 
		}
}

