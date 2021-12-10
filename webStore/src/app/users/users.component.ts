import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../shared/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { UserService } from '../shared/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['username', 'email', 'password', 'role', 'active', 'createdAt','Actions' ];
  dispalyMessage = '';
  message = '';
  errors :string[]=[];
  form: FormGroup;
  formTitle = "";
  show = false;
  _id=null;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private userService : UserService) { 
      
      this.form = this.fb.group({
        username: ['', Validators.required],
        _id: [''],
        email: ['', Validators.email],
        password: ['', Validators.required],
        role:['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Function to Filter dataSource By Search Keys
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers(){
    console.log("get All users Works!");
    this.userService.getAllUsers().pipe(map((res)=> res as any )).subscribe((data) => {
      this.dataSource.data = data;
    },(error) =>{
      this.errors.push(error);
      
    });
  }

  async onSubmit(): Promise<void> {
 
    if (this.form.valid) {
      try {
        
        const username = this.form.get('username')?.value;
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const role = this.form.get('role')?.value;
        const id  = this.form.get('_id')?.value;
        if ( this._id ){
          console.log(this._id);
          this.userService.editUserInfo({email: email , username:username , pass:password } , this._id)
          .pipe(map((res) => res as any )).subscribe((data) => {
           this.message = data['msg'];
           this.getAllUsers();
            } , 
            (error) => {
              this.errors.push(error.error.text)
              throw(error);
            });
            

        }else{
          console.log("hh");
          this.userService.addUser({email: email , username:username , pass:password , role:'admin' , active:"1" })
          .pipe(map((res) => res as any )).subscribe((data) => {
           this.message = data['msg'];
           this.getAllUsers();
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

  redirect(){
    this.router.navigate(['/home']);
  }

  editUser(obj : any ){

    this.formTitle = "Edit User";
    this._id = obj._id;
    this.form.patchValue({
      username: obj.username ,
      _id:obj._id,
        email: obj.email ,
        password: obj.pass ,
        role: obj.role,
    });


  }
  addUser(){
    this.show = !this.show;
    this.clearForm();
    
  }
  clearForm() {
    this.message=null;
    this.form.patchValue({
      username: null ,
        email: null ,
        password: null ,
    });
  }
  deActivate(id : any ){

    this.userService.deActivateUser(id).pipe(map((res) => res as any )).subscribe((data) => {
      this.message = data['msg'];
      console.log(data);
      } , 
      (error) => {
        console.log(error);
        this.errors.push(error.error.text)
        throw(error);
      });

  }

}
