import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  tokenId:any;
  cityNo:any;
  data:any;
  departmentNo:any;
  personnelNo:any;
  residentNo:any;
  modularNo:any;
  articNo:any;
  readingQuantity:any;
  communityId:any='';

  constructor(private http:Http,private requestService : RequestService,private router : Router) { }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.dataAnalysis();
  }
  dataAnalysis=()=>{
    $('#loading_con').fadeIn();
    this.requestService.dataAnalysis(this.communityId,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
       layer.msg(res.json().text);return;
      }else {
        this.data = res.json().target;
        this.cityNo= this.data.cityNo;
        this.departmentNo = this.data.departmentNo;
        this.personnelNo = this.data.personnelNo;
        this.residentNo = this.data.residentNo;
        this.modularNo = this.data.modularNo;
        this.articNo = this.data.articNo;
        this.readingQuantity = this.data.articNo;
        $('#loading_con').fadeOut();
      }
    },erro=>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        $('#loading_con').fadeOut();
        this.router.navigate(['/login']); return;
      }
      $('#loading_con').fadeOut();
      layer.msg('服务器连接失败，请稍后尝试');
    })
  }
}
