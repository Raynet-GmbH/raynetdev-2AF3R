import { Component } from '@angular/core';
import { IUser } from 'src/user';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  employee: any;
  colCountByScreen: object;
  user: IUser | null = { email: 'sandra@example.com',displayName:'Sandra Johnson',avatarUrl:'',phone:'+49 xxxxxx' };
  constructor() {
    this.employee = {
      ID: 7,
      DisplayName: this.user?.displayName, // if come from api result.DisplayName
      FirstName: 'Sandra',
      LastName: 'Johnson',
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/5'),
      HireDate: new Date('2005/05/11'),
      AssignedTasks: 33,
      PhoneNumber: this.user?.phone, // if come from api result.phone
      Email:this.user?.email, // if come from api result.eMail
      /* tslint:disable-next-line:max-line-length */
      Notes: 'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
      Address: '4600 N Virginia Rd.'
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
