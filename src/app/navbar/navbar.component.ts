import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-navbar',
  templateUrl: '/app/navbar/navbar.Component.html'
})

export class NavbarComponent implements OnInit{ 

  constructor(private _af : AngularFire){

  }

  login(){
    this._af.auth.login();
  }

  ngOnInit(){
    console.log("Init called for NavbarComponent");
  }
}