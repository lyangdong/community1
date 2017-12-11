import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checked:boolean=true;
  account:any;
  password:any;
  accountEmail:any='';
  wait:any=60;
  code:any='';
  passwordUpdate:any='';
  passwordUpdate2:any;

  constructor(private http:Http,private requestService : RequestService,private router : Router) { }

  ngOnInit() {
    // console.log(this.checked);
    if(localStorage.checked == 'false'){
      this.checked = false;
    }else {
      this.account = localStorage.account;
    }
    sessionStorage.communityId = '';
    sessionStorage.communityName = '';
    sessionStorage.position = '';
    sessionStorage.alias = '';
    sessionStorage.accountNo = '';
    sessionStorage.accountid = '';
    sessionStorage.tele = '';
    sessionStorage.type = '';
    sessionStorage.superCheck = '';
    sessionStorage.tokenId = '';
    $('#loading_con').fadeOut();
  }
  login=()=>{
    $('#loading_con').fadeIn();
    this.requestService.login(this.account,this.password).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }
      else{
        localStorage.account = this.account;
        localStorage.checked = this.checked;
        // console.log(sessionStorage.type);
          // console.log( localStorage.account);
        if(res.json().target.user.type=='1'){
            this.router.navigate(['/system'])

        }else if (res.json().target.user.type==4){
          this.router.navigate(['/system'])
        }else {
          this.router.navigate(['/home'])
        }
        console.log(res.json());
        layer.msg('登陆成功');
        // $('#loading_con').fadeOut();
      }
      // $('#loading_con').fadeOut();
      sessionStorage.communityId = res.json().target.user.communityId;
      sessionStorage.communityName = res.json().target.user.communityName;
      sessionStorage.alias = res.json().target.user.alias;
      sessionStorage.accountNo = res.json().target.user.accountNo;
      sessionStorage.accountid = res.json().target.user.accountid;
      sessionStorage.tele = res.json().target.user.telephone;
      sessionStorage.position = res.json().target.user.position;
      sessionStorage.type = res.json().target.user.type;
      sessionStorage.superCheck = res.json().target.user.type;
      sessionStorage.sex = res.json().target.user.sex;
      sessionStorage.tokenId = res.json().target.tokenId;
      // sessionStorage.communityName = res.json().target.communityName;
      /*console.log(sessionStorage.communityId);
      console.log(sessionStorage.position);
      console.log(sessionStorage.tokenId);
      console.log(sessionStorage.type);*/
    },erro=>{
      layer.msg('服务器连接失败，请稍后尝试');
      $('#loading_con').fadeOut();//this.router.navigate(['/home']);
    })
  };

  getCode=(event)=>{
    this.countDown(event);
    this.requestService.getCode(this.accountEmail).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        // layer.msg(res.json().text);return;
      }else {

        layer.msg('获取成功');
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取验证码

  updatePwd=()=>{
    if(this.passwordUpdate!=this.passwordUpdate2){
      layer.msg('两次输入的密码不一样');return
    }
    this.requestService.forgetPassword(this.accountEmail,this.code,this.passwordUpdate).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        // layer.msg(res.json().text);return;
      }else {
        layer.msg('修改成功');
        $('.btn-close').click();
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//更新密码

  countDown=(event)=>{
    let that = this;
    if (this.wait == 0) {
      $(event.target).removeAttr("disabled");
      $(event.target).text("获取验证码");
      this.wait = 60;
    } else {
      $(event.target).attr("disabled", true);
      $(event.target).text(this.wait + "秒后重发") ;
      this.wait--;
      setTimeout(function() {
        that.countDown(event);
      }, 1000)
    }
  };//倒计时1分钟
}
