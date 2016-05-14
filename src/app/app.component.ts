import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'rh-app',
  template: '<rh-navbar></rh-navbar>',
  directives: [NavbarComponent],
  providers : [AngularFire]
})

export class AppComponent implements OnInit{

  constructor(private _af : AngularFire){
  }

  ngOnInit(){
    console.log("Init called for AppComponent");
  }

}