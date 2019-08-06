import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.username !== "") {
      localStorage.setItem(this.username, JSON.stringify(this.username));
      this.router.navigate(['scanner'], {state: {username: this.username}})
    } else {
      alert('Please enter username.')
    }
  }
}
