import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from './../../../auth/token.service';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [MessageService]
})

export class UserInfoComponent implements OnInit {
  form: FormGroup | any;
  constructor(
    private router: Router,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.createForm();
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/auth', { state: { route: 'order' } });
    }
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.localStorage.userMobile),
      fullName: new FormControl(this.localStorage.userFullName),
      phone: new FormControl(this.localStorage.userPhone),
      email: new FormControl(this.localStorage.userEmail),
      address: new FormControl(this.localStorage.userAddress),
      postalCode: new FormControl(this.localStorage.userPostalCode),
      companyName: new FormControl(this.localStorage.userCompanyName),
    });
    this.form.controls.mobile.disable();
  }

  submitForm(): void {
    this.service.editUser(this.localStorage.userToken, this.localStorage.userID, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.router.navigateByUrl('/order/orderinfo');
      } else {
        this.token.checkTokenExamination(response.data, 'user');
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در ثبت اطلاعات',
        });
      }
    });
  }

}
