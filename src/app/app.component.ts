import { Component, OnInit } from '@angular/core';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';

import { AngularFire } from 'angularfire2';

import {NavbarComponent} from './navbar/navbar.component';
import {ProfileComponent} from './profile/profile.component';

@Component({
  selector: 'rh-app',
  template: `
  <rh-navbar></rh-navbar>
  <router-outlet></router-outlet>
  `,
  directives: [NavbarComponent, ROUTER_DIRECTIVES],
  providers : [AngularFire]
})
@Routes([
  {path: '/profile',       component: ProfileComponent}
  // {path: '/feed',          component: ReviewFeedComponent},
  // {path: '/feed/:id',      component: HeroDetailComponent}
])
export class AppComponent implements OnInit{

  constructor(){
  }

  ngOnInit(){
    console.log("Init called for AppComponent");
  }

}