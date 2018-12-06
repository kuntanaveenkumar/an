import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  AuthenticateService } from '../services/authenticate.service';
import '../js/jquery-2.0.0.js';
import '../js/jquery-1.10.2.min.js';
import '../js/jquery-migrate-1.2.1.min.js';
import '../js/bootstrap.min.js';
import '../js/jquery-1.10.2.min.js';
import '../js/custom.js';
import '../admincss/font-awesome.min.css';

@Component({
   templateUrl: './login.component.html',
   styleUrls: ['../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css','../admincss/style.default.css'],
   encapsulation: ViewEncapsulation.None
})
export class LoginComponent 
{  
	model: any = {};
    loading = false;
	returnUrl: string;
	constructor(private route: ActivatedRoute,private router: Router,private authenticateService: AuthenticateService,) {}
	ngOnInit() 
	{     
        this.authenticateService.logout();         
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
	login() 
	{
        this.loading = true;
        this.authenticateService.login(this.model.uname, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => 
				{                 
                    this.loading = false;
                });
    }
}