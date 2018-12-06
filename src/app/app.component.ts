import { Component, ViewEncapsulation,OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
#import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,   
})
export class AppComponent implements OnInit
{	
	constructor(private router: Router,private activatedRoute: ActivatedRoute) 
	{
			$.getScript('./js/jquery-2.0.0.js');
			$.getScript("./js/jquery-1.10.2.min.js");	
			$.getScript("./js/jquery-migrate-1.2.1.min.js");
			$.getScript("./js/bootstrap.min.js");
			$.getScript('./js/toggles.min.js');
            $.getScript('./js/custom.js');
	} 
	ngOnInit()
	{		
		this.router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .subscribe((event) => 
		{			
			$.getScript('./js/jquery-2.0.0.js');
			$.getScript("./js/jquery-1.10.2.min.js");	
			$.getScript("./js/jquery-migrate-1.2.1.min.js");
			$.getScript("./js/bootstrap.min.js");
			$.getScript('./js/toggles.min.js');
            $.getScript('./js/custom.js');
        });				
	}
}