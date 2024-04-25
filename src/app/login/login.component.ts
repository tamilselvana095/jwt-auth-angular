import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, 
              private userAuthService: UserAuthService,
              private router:Router) { }

  login(loginForm: NgForm) {

    this.userService.login(loginForm.value).subscribe(
      (response:any) => {
        console.log(response.jwtToken);
        console.log(response.user.role);

        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        //console.log(response);
        const role=response.user.role[0].roleName;
        if(role === 'Admin'){
          this.router.navigate(['/admin'])
        }else{
          this.router.navigate(['/user'])
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser(){
    this.router.navigate(['/register']);
  }

}
