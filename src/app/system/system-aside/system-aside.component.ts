import { Component, OnInit } from '@angular/core';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-system-aside',
  templateUrl: './system-aside.component.html',
  styleUrls: ['./system-aside.component.css']
})
export class SystemAsideComponent implements OnInit {

  userType:any;
  communityId:any;

  constructor() { }

  ngOnInit() {
    this.clickAside();
    this.userType = sessionStorage.type;
    // this.communityId =sessionStorage.communityId;
    // console.log(this.communityId)
    // $(document).ready(function(){
    //   var windowHeight = $(window).height();
    //   if($(this).height() < windowHeight){
    //     $(this).height(windowHeight);
    //   }
    // });
  }
  clickAside=()=>{
    // $('li:not(".no-hover") a').click(function () {
    //   $('a').removeClass('aside-active');
    //   $(this).addClass('aside-active')
    // })
    $('ul').on('click','li:not(".no-hover") a',function(){
      $('a').removeClass('aside-active');
      $(this).addClass('aside-active')
    })
  }//绑定on方法，添加激活状态的
}
