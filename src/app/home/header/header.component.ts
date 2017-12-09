import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tokenId:any;
  userType:any='';

  constructor(private http: Http, private router: Router, private requestService: RequestService) { }
  ngOnInit() {
    this.tokenId=sessionStorage.tokenId;
    this.userType =sessionStorage.type;

    // console.log(this.userType);
  }
  exitLand=()=>{
      this.requestService.exitLand(this.tokenId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          this.router.navigate(['/login']);
          layer.msg('退出成功');return;
        }
      },erro =>{
        if(erro.json().code==3){
          this.router.navigate(['/login']);
          layer.msg('登录超时');return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      })
  };//退出登录
}
