import { Component, ViewEncapsulation,OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
declare var $:any;
import { UserService } from '../services/user.service';  
@Component({
  templateUrl: './profile.component.html',   
  styleUrls: ['../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/font-awesome.min.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css','../admincss/style.default.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit 
  {  
		model: any = {};
		constructor(private router: Router,private userService: UserService) 
		{
			
		}
		ngOnInit()
		{		
				
		}
		onSubmitEditProfile()
		{				
				this.userService.update(this.model)
				.subscribe(
					data => 
					{												
						this.router.navigate(['/home/editprofile']);
					},
					error => {						
						
					});
		}
  }

