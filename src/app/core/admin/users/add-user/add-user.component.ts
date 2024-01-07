import { Component, OnInit,Input } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit{

  form: FormGroup | any;
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef) {
  }
  ngOnInit(): void {
   this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(null),
      fullName: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      address: new FormControl(null),
      postalCode: new FormControl(null),
      companyName: new FormControl(null),
      image: new FormControl(null),
    });
  }


  onFileUpload(event:any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .uploadFile(formData)
      .subscribe((response:any) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: ' آپلود تصویر محصول ',
            detail: 'تصویر با موفقیت آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' آپلود تصویر محصول ',
            detail: response.data,
          });
        }
      });
  }

  submitForm(): void {
    this.service
      .registerUser(this.localStorage.userToken, this.form.value)
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
}

}

