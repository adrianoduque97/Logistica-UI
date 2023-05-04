import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})
export class RestoreComponent implements OnInit {

  restoreForm: FormGroup;
  data:any;
  constructor(  public authService: AuthService,  public navService: NavbarService){
    this.restoreForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
    });
  }

  ngOnInit(): void {
    this.navService.hide();
    this.data={}
  }

  onClick(){
    this.data.email= this.restoreForm.value.email;
    this.authService.ForgotPassword(this.data.email);
  }
}
