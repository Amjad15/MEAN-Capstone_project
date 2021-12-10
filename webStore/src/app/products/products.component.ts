import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';
import { Product } from '../shared/model/product.model';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['name', 'price', 'quantity', 'img','Actions' ];
  dispalyMessage = '';
  message = '';
  errors :string[]=[];
  form: FormGroup;
  formTitle = "";
  show = false;
  _id=null;
  imgSRC = './assets/images/preview-icon.png';
  imgALT = '';
  file:any;
  imgPATH = 'http://localhost:3000/img/';
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private productService : ProductService) { 
      
      this.form = this.fb.group({
        name: ['', Validators.required],
        _id: [''],
        avatar: [null],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        img:['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Function to Filter dataSource By Search Keys
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllProducts(){
    console.log("get All users Works!");
    this.productService.getProductList().pipe(map((res)=> res as any )).subscribe((data) => {
      this.dataSource.data = data;
    },(error) =>{
      this.errors.push(error);
      
    });
  }

  async onSubmit(): Promise<void> {
 
    if (this.form.valid) {
      try {
        
        const name = this.form.get('name')?.value;
        const price = this.form.get('price')?.value;
        const quantity = this.form.get('quantity')?.value;
        const img = this.form.get('img')?.value;
        const id  = this.form.get('_id')?.value;
        let formdata = new FormData();
        formdata.append('_id',this.form.value._id);
        formdata.append('name',this.form.value.name);
        formdata.append('price',this.form.value.price);
        formdata.append('quantity',this.form.value.quantity);
        if (this.form.value.avatar) {
          formdata.append('img',this.form.value.avatar.name);
          console.log(this.form.value.avatar.name);
        }
        formdata.append('imgFile',this.form.value.avatar);
    
        if ( this._id ){
          console.log(this._id);
          this.productService.putProduct(formdata , this._id)
          .pipe(map((res) => res as any )).subscribe((data) => {
           this.message = data['msg'];
           this.getAllProducts();
            } , 
            (error) => {
              this.errors.push(error.error.text)
              throw(error);
            });
            

        }else{
          console.log("hh");
          this.productService.postProduct(formdata)
          .pipe(map((res) => res as any )).subscribe((data) => {
            console.log(data);
           this.message = data['msg'];
           this.getAllProducts();
            } , 
            (error) => {
              this.errors.push(error.error.text)
              throw(error);
            });
            

        }
          
      } 
      catch (err) {
        throw(err);
      }
    }
    
    return;
  }

  editProduct(obj : any ){

    this.formTitle = "Edit Product";
    this._id = obj._id;
    this.form.patchValue({
      name: obj.name ,
      _id:obj._id,
        price: obj.price ,
        quantity: obj.quantity ,
        img: obj.img,
    });


  }
  addProduct(){
    this.show = !this.show;
    this.clearForm();
    
  }
  clearForm() {
    this.message=null;
    this.form.patchValue({
      name: null ,
        price: null ,
        quantity: null ,
        img: null ,
    });
  }
  deleteProduct(id : any ){

    this.productService.deleteProduct(id).pipe(map((res) => res as any )).subscribe((data) => {
      this.message = data['msg'];
      console.log(data);
      } , 
      (error) => {
        console.log(error);
        this.errors.push(error.error.text)
        throw(error);
      });

  }
  onFileChange(event:any) {

    this.file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: this.file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgSRC = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }
}
