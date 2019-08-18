import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  registration:boolean = false // Default form shown is login

  // Define inputs
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() email: string;
  @Input() dOb: string;
  @Input() password: string;
  @Input() confirmPassword: string;

  // Custom error messages
  errorMsg: object = {
    required: 'This field is required' as string,
    email: 'Email is invalid' as string
  }

  getFormattedDate(){
    const now:Date = new Date()
    const months:Array<string> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    return `${now.getFullYear()}-${months[now.getMonth()]}-${now.getDate()}`
  }

  // Check passwords match
  get matchingPasswords() {
    return this.password === this.confirmPassword
  }

  onSubmit(loginForm: NgForm) {
    if (!this.registration) {
      let data = {
        email: this.email,
        password: this.password
      }
    }
    debugger;
  }
}
