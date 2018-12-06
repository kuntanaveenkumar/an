import { Component, ViewEncapsulation,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder  } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Http, Headers, BaseRequestOptions,RequestOptions, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ProductsService } from '../services/products.service';  
import { Products } from '../models/products';  

declare var $:any;
@Component({
  templateUrl: './editproduct.component.html',
  styleUrls: ['../admincss/bootstrap.min.css','../admincss/bootstrap-override.css','../admincss/font-awesome.min.css','../admincss/jquery-ui-1.10.3.css','../admincss/font-awesome.min.css','../admincss/animate.min.css','../admincss/animate.delay.css','../admincss/toggles.css','../admincss/chosen.css','../admincss/style.default.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductsService] 
})
export class EditProductComponent implements OnInit 
  {  		
		@ViewChild('dataContainer') dataContainer: ElementRef;
                products: Products[] = [];
		imagedata : string;
		public data: Observable<any>;		
		title: string;
		form: FormGroup;
		filesToUpload: Array<File>;
		constructor(private http: Http,private productsService: ProductsService,private router : Router,private route: ActivatedRoute,private fb :FormBuilder) 
		{					
			this.filesToUpload = [];
			this.form = this.fb.group({					
					product_name: ['', Validators.required],
					product_id: [''],
					product_name_french: ['',Validators.required],
					product_model_no: ['',Validators.required],
					product_desc: ['',Validators.required],
					product_desc_french: ['',Validators.required],
					product_meta_title_en: ['',Validators.required],
					product_meta_keywords_en: ['',Validators.required],
					product_meta_desc_en: ['',Validators.required],
					product_image:['']
				});
		}
		ngOnInit()
		{		
				 var id = this.route.params.subscribe(params => {
				  var id = params['id'];
				  this.title = id ? 'Edit Product' : 'New Product';
				  //http://www.bentedder.com/upload-images-angular-4-without-plugin/
				  if (!id)
					return;
 
					this.productsService.getProduct(id)
					.subscribe(
					  products => this.products = products["products_list"]["0"],
					  response => {						  
						  
						if (response.status == 404) {
						  this.router.navigate(['NotFound']);
						}
					  });
					
			});
		}
		makeFileRequest(url: string, params: Array<string>, files: Array<File>) 
		{
			this.imagedata="uploading..";	
			return new Promise((resolve, reject) => {
				var formData: any = new FormData();
				var xhr = new XMLHttpRequest();
				for(var i = 0; i < files.length; i++) {
					formData.append("uploads", files[i], files[i].name);
				}
				formData.append('token', JSON.parse(localStorage.getItem('currentUser')));
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							resolve(JSON.parse(xhr.response));
						} else {
							reject(xhr.response);
						}
					}
				}
				
				//let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
				//	let options       = new RequestOptions({ headers: headers });
					
				//xhr.setRequestHeader(headers);
				xhr.open("POST", 'http://localhost/testadmin/admin/api/upload', true);
				xhr.send(formData);
			});
		}

		fileChangeEvent(event) {
			 this.filesToUpload = <Array<File>> event.target.files;			 
			 this.makeFileRequest('http://localhost/testadmin/admin/api/upload', [], this.filesToUpload).then((result) => {
            console.log(result);	
			this.form.patchValue({
					product_image: result.filename
			});
			//this.form.product_image=this.imagedata.filename;
        }, (error) => {
            console.error(error);
        });
			//let fileList: FileList = event.target.files;
			
				/*if(fileList.length > 0) {
					let file: File = fileList[0];
					let formData:FormData = new FormData();
					formData.append('photo', file, file.name);
					formData.append('token', JSON.parse(localStorage.getItem('currentUser')));
					
					
					let status=0;	    
					var body = {'token': JSON.parse(localStorage.getItem('currentUser')),'photo':file.name};		
					let bodyString = JSON.stringify(body); 
					let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
					let options       = new RequestOptions({ headers: headers });
					//return this.http.post('http://localhost/testadmin/admin/api/upload', bodyString,options).map((response: Response) => response.json());
					this.productsService.upload(bodyString,options).map(res => res.json())
					.catch(error => Observable.throw(error))
					.subscribe(
						
						data =>   console.log('success'),
						error => console.log(error)
					);
					
	
				}*/
		 
		  }
		/*fileChange(event)
		{
			let fileList: FileList = event.target.files;
			if(fileList.length > 0) {
				let file: File = fileList[0];
				let formData:FormData = new FormData();
				formData.append('uploadFile', file, file.name);
				let headers = new Headers();
				
				//headers.append('enctype', 'multipart/form-data');
				//headers.append('Content-Type', 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2));
				headers.append('Accept', 'application/json');
				let options = new RequestOptions({ headers: headers });
				this.http.post('http://localhost/testadmin/admin/api/upload', formData, options)
					.map(res => res.json())
					.catch(error => Observable.throw(error))
					.subscribe(
						
						data =>   this.dataContainer.nativeElement.innerHTML = 'success',
						error => console.log(error)
					)
			}
		}*/
		onSubmit()
		{
				
				var res=this.productsService.update(this.form.value);
				res.subscribe(data => this.router.navigate(['./home/viewproducts']));
		}
		//onSubmitEditProduct(products)
		//{
			//alert("submit");
			  //console.log(products);
				//	var res=this.productsService.update(products);
				//	 res.subscribe(data => this.router.navigate(['./home/viewproducts']));
		//}
  }