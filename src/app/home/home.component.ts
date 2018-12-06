import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
declare var $:any;
@Component({
  templateUrl: './home.component.html',   
  styleUrls: ['../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/font-awesome.min.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css','../admincss/style.default.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit
{
		url = "";
	constructor(private route: ActivatedRoute, private router: Router) 
    {	
		//alert(router.url); 
		
		/*$('.' + router.url).parents('ul').css('display', 'block');
		$('.' + router.url).addClass('active');
		$('.' + router.url).css('font-weight', 'bold');*/
    }
	ngOnInit()
	{
	
		/*
		  this.route.url.subscribe(segments => {
          this.url = segments[0].parameters;
      });
	  
	  alert(this.url);*/
	}
}