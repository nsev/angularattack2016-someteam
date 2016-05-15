import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-navbar',
  templateUrl: '/app/navbar/navbar.component.html',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit{ 

  auth : any;

  constructor(public af : AngularFire){
    this.af.auth.subscribe((auth) => {
      this.auth = auth;
      this.af.list('/users').update(auth.uid, {
        provider: auth.provider,
        name: auth.github.displayName,
        username: auth.github.username
      });
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