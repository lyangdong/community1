import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpModule, Http} from '@angular/http';
import { RequestService} from '../../services/request.service';

declare let $  : any;
declare let layer  : any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  tokenId:any;
  communityId:any;
  accountList:any=[];
  addAccount:any={sex:'',accountNo:'',alias:'',password:'',rePassword:'',type:'',};

  accountQuery:any='';
  queryType:any='';
  communitys:any;
  update:any={};

  constructor(private http:Http,private requestService:RequestService,private router:Router) { }

  ngOnInit() {
    this.communityId = sessionStorage.communityId;
    // console.log(this.communityId);
    this.tokenId = sessionStorage.tokenId;
    // this.getAllAccount(1);
    this.queryAccount(1);
    this.getAllCommunity();
  }
  addAcount=()=>{
    this.addAccount.sex = $('input[name="sex"]:checked').val();
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!reg.test(this.addAccount.accountNo)){
      layer.msg('请输入合法的邮箱账号');
      return
    }//邮箱验证
    // console.log(this.addAccount.accountNo);
    if(!this.addAccount.accountNo){
      layer.msg('请输入账号');return
    }else if(!this.addAccount.password){
      layer.msg('请输入密码');return
    }else if(!this.addAccount.alias){
      layer.msg('请输入管理员名称');return
    }else if(!this.addAccount.type){
      layer.msg('请选择账号类型');return
    }else if(!this.addAccount.sex){
      layer.msg('请选择性别');return
    }else if(!this.addAccount.communityId&&this.addAccount.type==2){
      layer.msg('请选择城市');return
    }
    if(this.addAccount.type==4){
      this.addAccount.communityId=0;
    }
    // console.log(this.addAccount.communityId)
    this.requestService.addKindOfUser(
      this.tokenId,
      this.addAccount.accountNo,
      this.addAccount.alias,
      this.addAccount.password,
      this.addAccount.type,
      this.addAccount.sex,
      this.addAccount.communityId
      ).subscribe(res=>{
      if(res.json().code!=0){
        layer.msg(res.json().text);return;
      } else {
        layer.msg('添加成功');
        $('.btn-close').click();
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//添加账号

  queryAccount=(page)=>{
    $('#loading_con').fadeIn();
    let that= this;
    this.requestService.queryAccount(this.tokenId,this.accountQuery,this.queryType,page).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      } else {
        // console.log(res.json());
        $('#loading_con').fadeOut();
        this.accountList= res.json().target.users;
       if(page==1){
         $('#pagination-details').empty();
         $('#pagination-details').removeData("twbs-pagination");
         $('#pagination-details').unbind("page");
       }
        $('#pagination-details').twbsPagination({
          totalPages: res.json().target.totalPage==0?1:res.json().target.totalPage,//当总页数为0时，改为1
          visiblePages:5,
          initiateStartPageClick:false,
          first:"首页",
          prev:"前一页",
          next:"下一页",
          last:"末页",
          onPageClick: function (event, page) {
            //点击对应页码，请求对应页码的数据
            that.queryAccount(page);
          }
        });
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        $('#loading_con').fadeOut();
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
      $('#loading_con').fadeOut();
    })
  };//获取账号

  getAccountDetails=(event)=>{
    let id = $(event.target).attr('value');
    this.requestService.getAccountDetails(this.tokenId,id).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        this.update = res.json().target;
        if(this.update.sex==1){
          $('input[name="sexUpdate"].woman').attr('checked',true)
        }
        this.update.password='mm12mm12mm';
        // console.log(this.update)
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        // this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取账号详情

  updateAccount=()=>{
    if(!this.update.password){
      layer.msg('密码不能为空');return
    }else if(!this.update.accountNo){
      layer.msg('账号不能为空');return
    }else if(!this.update.accountNo){
      layer.msg('管理员名称不能为空');return
    }
    if( this.update.password == 'mm12mm12mm'){
      this.update.password  = '';
    }
    this.update.sex = $('input[name="sexUpdate"]:checked').val();
    this.requestService.updateAccount(
      this.tokenId,
      this.update.accountNo,
      this.update.alias,
      this.update.password,
      this.update.sex,
      this.update.accountid,
      this.update.communityId
    ).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        layer.msg('修改成功');
        $('.btn-close').click();
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//修改账号信息


  deleteAccount=(event)=>{
    let that = this;
    let accountId = $(event.target).attr('value');
    // console.log(accountId);
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteUser(that.tokenId,accountId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          layer.msg('删除成功');
          that.queryAccount(1);
        }
      },erro =>{
        if(erro.type==3){
          layer.msg('登录超时，请重新登录');
          this.router.navigate(['/login']); return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      });
      layer.close(index);
    });
  };//删除账号

  getAllAccount=(page)=>{
    let that = this;
    this.requestService.getManager(this.communityId,page,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      } else {
        // console.log(res.json());
        this.accountList= res.json().target.users;
        $('#pagination-details').twbsPagination({
          totalPages: res.json().target.totalPage==0?1:res.json().target.totalPage,//当总页数为0时，改为1
          visiblePages:5,
          initiateStartPageClick:false,
          first:"首页",
          prev:"前一页",
          next:"下一页",
          last:"末页",
          onPageClick: function (event, page) {
            //点击对应页码，请求对应页码的数据
            that.getAllAccount(page);
          }
        });
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取所有管理员账号

  getAllCommunity=()=>{
    this.requestService.getAllCommunity(this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        this.communitys = res.json().target;
        // console.log(this.communitys)
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取所有城市

  // isEmail=(str)=>{
  //   //对电子邮件的验证
  //   let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  //   if(!myreg.test(str))
  //   {
  //     alert('提示\n\n请输入有效的E_mail！');
  //     str = '';
  //   }
  //   return str
  // }

}
