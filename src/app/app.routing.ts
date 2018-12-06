import { Routes, RouterModule } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './product/editproduct.component';
import { EditRoleComponent} from './roles/editrole.component';
import { EditRoleUserComponent } from './roles/editroleuser.component';

import { RolesComponent } from './roles/roles.component';
import { RoleusersComponent } from './roles/roleusers.component';
import { PermissionsComponent } from './roles/permissions.component';
import { EditPermissionComponent } from './roles/editpermission.component';

import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './product/categories.component';
import { Authentication } from './auth/authentication';

//always use file names  
const appRoutes: Routes = [
    { path: '', component: HomeComponent , canActivate: [Authentication] },  
	{ path: 'home', component: HomeComponent , canActivate: [Authentication] },
	{ path: 'login', component: LoginComponent },	
	{
		path: 'home',
		component: HomeComponent,
		children: [
		  { path:'viewcategories', component: CategoriesComponent },
		  { path: 'viewproducts', component: ProductComponent },		 
		  { path: 'editprofile', component: ProfileComponent},		  
		  { path: 'editproduct/:id', component: EditProductComponent},
		  { path: 'editproduct', component: EditProductComponent},
		  { path: 'viewroles', component: RolesComponent},	
		  { path: 'editrole', component: EditRoleComponent},
		  { path: 'editrole/:id', component: EditRoleComponent},		  
		  { path: 'viewroleusers', component: RoleusersComponent},	
		  { path: 'editroleuser', component: EditRoleUserComponent},
		  { path: 'editroleuser/:id', component: EditRoleUserComponent},		  
		  { path: 'viewpermissions', component: PermissionsComponent},	
		  { path: 'editroleper', component: EditPermissionComponent},
		  { path: 'editroleper/:id', component: EditPermissionComponent},		
		]
   }
]; 
export const routing = RouterModule.forRoot(appRoutes);


