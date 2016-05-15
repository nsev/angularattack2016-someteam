import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-project-list',
  templateUrl: '/app/project/project_list.component.html',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class ProjectListComponent implements OnInit{ 


  projects : any;
  loading : any = {
    projects: false
  };

  constructor(public af : AngularFire){
    this.af.list("/projects").subscribe((projects)=>{
      this.projects = projects;
    });  
  }

  ngOnInit(){
    console.log("Init called for ProjectListComponent");
  }

  //should be a pipe....
  objToArray(obj){
    let arr = [];
    for (var i in obj) {
      if(obj.hasOwnProperty(i)){
        arr.push({
          key: i, 
          value: obj[i]
       });
      }
    }
    return arr;
  }
}