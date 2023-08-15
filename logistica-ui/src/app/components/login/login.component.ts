import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  data:any;
  constructor(  public authService: AuthService,  public navService: NavbarService){
    this.signupForm = new FormGroup({
      user: new FormControl('', [Validators.required,Validators.email]),
      password:new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.navService.hide();
    this.data={}
  }

  onClick(){
    this.data.user= this.signupForm.value.user;
    this.data.password= this.signupForm.value.password;
    this.authService.SignIn(this.data.user, this.data.password);
  }

}
