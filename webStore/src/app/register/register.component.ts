import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
        username: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', Validators.required],
        re_password: ['', Validators.required]
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
        const username = this.form.get('username')?.value;
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const rePassword = this.form.get('re_password')?.value;
       
        if ( password === rePassword ){
         
          this.UserService.register({email: email , username:username , pass:password}).pipe(map((res) => res as any )).subscribe((data) => {
            this.authService.settoken(data['email']);
            this.authService.setUserInfo(data);
            this.redirect();
            } , 
            (error) => {
              this.errors.push(error.error.text)
              throw(error);
            });

        }
       
        //await this.authService.login(username, password);
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
 

}
