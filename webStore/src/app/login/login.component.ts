import { AuthServiceService } from './../auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';
import {map} from 'rxjs/operators'
//import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  errors :string[]=[];

  constructor( private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private UserService : UserService
    ) {
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

      this.form = this.fb.group({
        email: ['', Validators.email],
        password: ['', Validators.required],
        admin:[false]
      });
     }

  async ngOnInit(): Promise<void> {
      /* if (await this.authService.checkAuthenticated()) {
        await this.router.navigate([this.returnUrl]);
      } */

      localStorage.setItem('SeesionUser','');
    }

  async onSubmit(): Promise<void> {
 
    if (this.form.valid) {
      try {
        localStorage.clear();
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        this.UserService.login({email: email , pass:password}).subscribe((data) => {
        this.authService.settoken( data['user']['email']);
        this.authService.setUserInfo(data);
        if ( data['user']['role'] == "admin"){
          this.router.navigate(['/admin/dashboard']);
        }else{
          this.redirect();
        }
        
        } , 
        (error) => {
          this.errors.push(error.error.text)
          throw(error);
        });
        //await this.authService.login(username, password);
      } 
      catch (err) {
        this.errors.push(err.message)
        throw(err);
      }
    } 
    return;
  }

  redirect(){
    console.log("kkk")
    this.router.navigate(['/product']);
    console.log("aaa")
  }
}
