import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DevExtremeModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {
    email: '',
    password: '',
    confirmedPassword: '',
    displayName: '',
    countryCode: '',
    phoneNumber: ''
  };
  countryCodes = [
    { value: '+1', label: 'United States (+1)' },
    { value: '+49', label: 'Germany (+49)' },
    { value: '+44', label: 'United Kingdom (+44)' },
    { value: '+90', label: 'Turkey (+90)' },
    // we can add more info here or get from api / json.
  ];

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password, confirmedPassword, displayName, countryCode, phoneNumber } = this.formData;
    if(!this.validateEmail(email)){
      notify('Bad Email', 'error', 2000);
    return;
    }
    if(!this.confirmPassword(confirmedPassword)){
      notify('Your password not match', 'error', 2000);
      return;
    }
    if (!this.validateName(displayName)) {
      notify('Display name must be less than 15 more than 3 characters or less.', 'error', 2000);
      return;
    }
    if (!this.validatePhoneNumber(phoneNumber)) {
      notify('Invalid phone number format. Please use the international format, e.g., +49 151 240 123 87.', 'error', 2000);
      return;
    }
    this.loading = true;

    const result = await this.authService.createAccount(email, password);
    this.loading = false;

    if (result.isOk) {
      notify('Registration successful!', 'success', 2000);
      this.router.navigate(['/login-form']);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return this.formData.password === this.formData.confirmedPassword;
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    console.log(this.countryCodes+phoneNumber)
    const phoneRegex = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/; 
    return phoneRegex.test(this.countryCodes+phoneNumber);
  }
  validateName(displayName: string): boolean {
    //Just Control lengt some crayz people put name X Æ A-12 children example teslas owner son
    return (displayName.length >= 3 && displayName.length <= 15);
  }
  validateEmail(email:string):boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email)
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DevExtremeModule
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule {}
