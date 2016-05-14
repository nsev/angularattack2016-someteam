import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-profile',
  templateUrl: '/app/profile/profile.Component.html',
  directives: [CORE_DIRECTIVES]
})
export class ProfileComponent implements OnInit{ 

  public auth : any;

  constructor(public af : AngularFire){
    this.af.auth.subscribe((auth) => {
      console.log(auth)
      this.auth = auth;
    });
  }

  ngOnInit(){ 
    console.log("Init called for NavbarComponent");
  }
}