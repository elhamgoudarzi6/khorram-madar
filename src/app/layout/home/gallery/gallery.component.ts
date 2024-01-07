import { TokenService } from './../../../auth/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { LayoutService } from '../../layout.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  responsiveOptions: any[] | any;
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { 
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '992px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  ngOnInit(): void {
   this.getGallery();
  }
  getGallery(): any {
    this.service
      .getAllGallery()
      .subscribe((response: any) => {
        if (response.success === true) {
          this.images = response.data;
        } else {
          this.token.checkTokenExamination(response.data, 'admin');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

}
