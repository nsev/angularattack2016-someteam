import { Component, OnInit } from '@angular/core';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';

import { AngularFire } from 'angularfire2';

import {NavbarComponent} from './navbar/navbar.component';
import {ProfileComponent} from './profile/profile.component';
import {ProjectComponent} from './project/project.component';
import {ProjectListComponent} from './project/project_list.component';

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
  {path: '/profile',       component: ProfileComponent},
  {path: '/review',          component: ProjectListComponent},
  {path: '/projects/:id',      component: ProjectComponent}
])
export class AppComponent implements OnInit{

  constructor(){
  }

  ngOnInit(){
    console.debug("Init called for AppComponent");
  }

}