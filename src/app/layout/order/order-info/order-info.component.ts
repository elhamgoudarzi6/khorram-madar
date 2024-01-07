import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from './../../../auth/token.service';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [MessageService]
})

export class OrderInfoComponent {
  form: FormGroup | any;

  errorMessages = {
    title: [{ type: 'required', message: ' عنوان را وارد کنید.' }],
    files: [{ type: 'required', message: ' فایل را وارد کنید.' }],
  };

  finalCut = [
    { name: 'Punch' },
    { name: 'V-Cut' },
    { name: 'CNC' },
  ];

  materials = [
    { title: "XPC (استخوانی - فنلیک)" },
    { title: "FR1 (استخوانی - فنلیک)" },
    { title: "CEM1 (نیمه فایبرگلاس)" },
    { title: "FR4 (فایبر گلاس)" },
    { title: "AL (آلومینیوم)" }];

  copperThickness = [
    { title: "18µ - 1/2 OZ" },
    { title: "35µ - 1 OZ" },
    { title: "70µ - 1/2 OZ" },
    { title: "سایر" }];

  cover = [
    { title: "HAL(قلع و سرب هموار شده با هوای داغ)" },
    { title: "HAL - free (قلع بدون سرب)" },
    { title: "Liquid flux -Cu-protect coating (معمولی)" },
    { title: "Roller Tinning  قلع و سرب | قلع به روش غلتکی)" },
    { title: "Gold plating (آبکاری طلا)" }];

  pcbType = [{ title: "تک لایه" }, { title: "دو لایه متالیزه" }, { title: "چند لایه" }];

  protectiveColor = [{ title: "سبز" }, { title: "سفید" }, { title: "مشکی" }, { title: "قرمز" }, { title: "آبی" }];

  partsPrinting = [{ title: " ندارد" }, { title: " یک رو " }, { title: " دو رو" }];

  celeryPrint = [{ title: " ندارد" }, { title: " یک رو " }, { title: " دو رو" }];

  partsColor = [{ title: " سفید" }, { title: " مشکی " }];

  eTest = [{ title: " خیر " }, { title: " بله" }];

  carbonPrinting = [{ title: " خیر " }, { title: " بله" }];

  finalCutList = "";

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
      userID: new FormControl(this.localStorage.userID),
      title: new FormControl(null),
      number: new FormControl(null),
      pcbType: new FormControl(null),
      material: new FormControl(null),
      copperThickness: new FormControl(null),
      celeryPrint: new FormControl(null),
      cover: new FormControl(null),
      protectiveColor: new FormControl(null),
      partsPrinting: new FormControl(null),
      dimensionsBoardX: new FormControl(null),
      dimensionsBoardY: new FormControl(null),
      pcbThickness: new FormControl(null),
      eTest: new FormControl(null),
      carbonPrinting: new FormControl(null),
      finalCut: new FormControl(null),
      partsColor: new FormControl(null),
      description: new FormControl(null),
      files: new FormControl(null),
    });
  }

  submitForm(): void {
    if (this.form.controls.title.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'عنوان سفارش را وارد نمایید',
      });
    }
    else if (this.form.controls.files.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'لطفا فایل را آپلود کنید',
      });
    }
    else {
      this.service.registerOrder(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
        if (response.success === true) {
          this.sendSms(response.data.code);
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت شد',
          });
          this.router.navigateByUrl('/user');
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

  sendSms(code: any) {
    let data = {
      "Mobile": "09165517882",
      "TemplateId": 925342,
      "Parameters": [
        {
          "Name": "Code",
          "Value": code
        }
      ]
    };
    this.service.sendSms(data).subscribe((result: any) => {
      if (result.status === 1) {

      } else {
        console.log("شماره را به درستی وارد کنید");
      }
    });
  }

  onCheck(event: any) {
    for (let i = 0; i < event.checked.length; i++) {
      this.finalCutList += event.checked[i].name + ",";
    }
    this.form.controls.finalCut.setValue(this.finalCutList);
  }

  onFileUpload(event: any): void {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.service.multiUpload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.files.setValue(response.data);
        this.messageService.add({
          severity: 'success',
          summary: 'با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در آپلود فایل',
        });
      }
    });
  }

}






