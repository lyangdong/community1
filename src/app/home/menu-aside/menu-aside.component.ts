import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

declare let $:any;

@Component({
  selector: 'app-menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {

  communityId:any;

  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.clickAside();
    // $(document).ready(function(){
    //   var windowHeight = $(window).height();
    //   if($(this).height() < windowHeight){
    //     $(this).height(windowHeight);
    //   }
    // });
  }
  clickAside=()=>{
    $('li:not(".no-hover") a').click(function () {
      $('a').removeClass('aside-active');
      $(this).addClass('aside-active')
    })
  }
}
