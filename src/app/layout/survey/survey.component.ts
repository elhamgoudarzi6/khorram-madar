import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  providers: [MessageService]

})
export class SurveyComponent implements OnInit {
  survey: any[] = [
    { code: 1, question: "نحوه ارتباط با بخش فروش و پاسخ گویی به سفارشات؟" },
    { code: 2, question: "توانایی کارکنان در درک نیازها و خواسته های مشتریان و ارائه مشاوره مطلوب" },
    { code: 3, question: "تناسب قیمت با کیفیت ارائه شده" },
    { code: 4, question: "نحوه رسیدگی و پاسخ گویی به نظرات و مشکلات" },
    { code: 5, question: "میزان رضایت از اطلاع رسانی و گزارش روند پیشرفت سفارش" },
    { code: 6, question: "میزان رضایت از کیفیت فیبر مورد استفاده" },
    { code: 7, question: "میزان رضایت از کیفیت سوراخ کاری" },
    { code: 8, question: "میزان رضایت از کیفیت خدمات چاپی( چاپ مدار، چاپ محافظ، چاپ راهنما)" },
    { code: 9, question: "میزان رضایت از کیفیت قلع پذیری" },
    { code: 10, question: "میزان انطباق ابعاد برد (ابعاد نهایی پانچ، روت، ویکات، برشکاری) با نقشه فنی سفارش" },
    { code: 11, question: "میزان رضایت از کیفیت بسته بندی (استحکام، اطلاعات، و مستندات همراه)" },
    { code: 12, question: "تحویل به موقع مطابق تعهدات هنگام اخذ سفارش" },
    { code: 13, question: "میزان رضایت از شیوه ارسال محموله" },
    { code: 14, question: "میزان تمایل شما به ادامه همکاری و سفارش دهی مجدد" },
  ];

  data: any[] = [];
  other: any;
  rating: any;
  rate: any[] = [];
  constructor(
    private router: Router,
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getRating();
    this.getRatingByCode();
  }

  onRate(event: any, code: any) {
    if (this.localStorage.getCurrentUser()) {
      if (this.data.find((item) => item.code == code)) {
        let index = this.data.findIndex((item) => item.code == code);
        this.data[index].rate = event.value;
      } else {
        this.data.push({ code: code, rate: event.value })
      }
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/auth', { state: { route: 'survey' } });
    }
    console.log(this.data);

  }

  getRating() {
    this.service.getRating().subscribe((response: any) => {
      if (response.success === true) {
        this.rating = response.data[0].avg;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا'
        })
      }
    });
  }

  getRatingByCode() {
    for (let i = 0; i < this.survey.length; i++) {
      this.service.getRatingByCode(this.survey[i].code).subscribe((response: any) => {
        if (response.success === true) {
          this.rate.push({ rate: Math.round(response.data[0].avg) })
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ''
          })
        }
      });
    }
  }

  submitForm(): void {
    let data = {
      userID: this.localStorage.userID,
      rating: this.data,
      other: this.other
    }
    this.service.registerRating(data).subscribe((response: any) => {
      if (response.success === true) {
        this.other = '';
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد'
        })
      } else {
        this.other = '';
        this.messageService.add({
          severity: 'error',
          summary: response.data
        })
      }
    });
  }
}

