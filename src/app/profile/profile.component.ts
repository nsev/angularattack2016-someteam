import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-profile',
  templateUrl: '/app/profile/profile.component.html',
  providers: [],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ProfileComponent implements OnInit{ 

  auth : any;
  items: Observable<any[]>;
  langs: any[];
  frames: any[];
  loading : any = {
    langs : false,
    frames: false
  };

  constructor(public af : AngularFire, public router : Router){
    this.af.auth.subscribe((auth) => {
      this.auth = auth;
    });

    this.subscribeToAvailableLangs();
    this.subscribeToAvailableFrames();
  }

  subscribeToAvailableLangs(){
    this.loading.langs = true;
    this.af.list('/availableLanguages').subscribe((langs : any) => {
      this.langs = langs;
      this.loading.langs = false;

    });
  }

  subscribeToAvailableFrames(){
    this.loading.frames = true;
    this.af.list('/availableFrameworks').subscribe((frames : any) => {
      this.frames = frames;
      this.loading.frames = false;
    });
  }

  addProject(){
    this.router.navigate(['projects/new'])
  }

  ngOnInit(){ 
    console.log("Init called for ProfileComponent");
    
  }
}