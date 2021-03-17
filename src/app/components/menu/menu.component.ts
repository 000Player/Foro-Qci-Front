import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user = new User();
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = Util.getStorageUser();

  }

  logOut() {
    Util.removeStorageUser();
    Util.removeStorageSkill();
    this.router.navigate(['/login/']);
  }

  getInfoUser() {
    this.user = Util.getStorageUser();
  }

}
