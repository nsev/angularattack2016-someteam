import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-navbar',
  templateUrl: '/app/navbar/navbar.Component.html',
  directives: [CORE_DIRECTIVES]
})
export class NavbarComponent implements OnInit{ 

  public auth : any;

  constructor(public af : AngularFire){
    this.af.auth.subscribe((auth) => {
      console.log(auth)
      this.auth = auth;
    });
  }

  login(){
    this.af.auth.login();
  }


  logout(){
    this.af.auth.logout();
  }

  ngOnInit(){
    console.log("Init called for NavbarComponent");
  }
}