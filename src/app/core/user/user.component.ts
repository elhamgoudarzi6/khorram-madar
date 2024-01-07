import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  mobile: any;
  fullName: any;
  image: any;
  items: MenuItem[];

  showFiller = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private localStorage: LocalStorageService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: UserService
  ) {
    this.items = [
      {
        label: 'داشبورد',
        icon: 'pi pi-home',
        routerLink: '/user',
      },
      {
        label: 'سفارشات',
        icon: 'pi pi-cart-plus',
        routerLink: '/user/order-list',
      },
      {
        label: 'مشخصات',
        icon: 'pi pi-user',
        routerLink: '/user/info',
      },
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'user') {
      this.router.navigateByUrl('/auth');
    }
    this.image = this.localStorage.userImage;
    this.mobile = this.localStorage.userMobile;
    this.fullName = this.localStorage.userFullName;
  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
