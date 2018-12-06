import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { Authentication } from './auth/authentication';
import { AuthenticateService } from './services/authenticate.service';
import { UserService } from './services/user.service';  
//import { ProductsService } from './services/products.service';  


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './product/editproduct.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RolesComponent } from './roles/roles.component';
import { EditRoleComponent } from './roles/editrole.component';
import { RoleusersComponent } from './roles/roleusers.component';
import { EditRoleUserComponent } from './roles/editroleuser.component';

import { PermissionsComponent } from './roles/permissions.component';
import { EditPermissionComponent } from './roles/editpermission.component';


import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './product/categories.component';
import { PaginationComponent } from './pagination.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
	HomeComponent,
	LoginComponent,
	ProductComponent,
	ProfileComponent,
	CategoriesComponent,
	EditProductComponent,
	PaginationComponent,
	RolesComponent,
	EditRoleComponent,
	RoleusersComponent,
	EditRoleUserComponent,
	PermissionsComponent,
	EditPermissionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	ReactiveFormsModule,
	routing,
	NgbModule.forRoot()
  ],
    providers: [
        Authentication,
        AuthenticateService,
		UserService
		/*,ProductsService*/
		/*{provide: ErrorHandler, useClass: MyErrorHandler}*/
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
