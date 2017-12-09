import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpModule, Http} from '@angular/http';
import { RequestService} from '../../services/request.service';

declare var $  : any;
declare var layer  : any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  tokenId : string;
  accountid:any;
  IP : string;
  communityId:any;

  pid:any=-1;
  provinces:any;
  areas : any;
  cities : any;
  cid:any='';

  //新建社区
  newPid:any=this.pid;
  newCid:any = this.cid;
  newProvinces:any;
  newCitise:any;

  communitys : any;
  allCommunitys:any;

  newcommunityInfo : any={};
  updateCommunityInfo:any={};



  constructor(private http:Http,private requestService:RequestService,private router:Router) { }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.accountid = sessionStorage.accountid;
    // console.log(this.accountid);
    this.getArea();
    this.getAreaCity(this.pid);
    this.getAllCommunity();
  }
  getArea=()=>{
    this.requestService.getQueryArea('').subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else if(res.json().code==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']);
      }
      else {
        // console.log(res.json());
        this.provinces = res.json().target.fristAreas;
      }
    },erro =>{
        layer.msg('获取网络信息失败，请检查网络');
      })
  };//获取一级城市

  getAreaCity=(pid)=>{
    this.requestService.getQueryArea(pid).subscribe(res=>{
    if(res.json().code!=0){
      // layer.msg('账号或密码错误');
      layer.msg(res.json().text);return;
    } else {
      // console.log(res.json());
      this.cities = res.json().target.secondAreas;
      if(this.cities[0]){
        this.cid = this.cities[0].id;
      }
      this.newCitise = res.json().target.secondAreas;
    }
  },erro =>{
    layer.msg('获取网络信息失败，请检查网络');
  })
  };//获取二级城市

  getQueryCommunity=()=>{
    if(this.pid == -1){
      this.getAllCommunity();
      this.cid == ' ';
      return
    }
    if(this.cid == ''){
      layer.msg('请先选择城市');
      return;
    }
    $('#loading_con').fadeIn();
    this.requestService.getQueryCommunity(this.cid,this.tokenId).subscribe(res=>{
      if(res.json().code==3){
        layer.msg('登录超时，请重新登录');return
      }
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        $('#loading_con').fadeOut();
        this.communitys = res.json().target;
      }
    },erro=>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败111，请检查网络');
    })
  };  //获取城市的社区

  getAllCommunity=()=>{
    $('#loading_con').fadeIn();
    this.requestService.getAllCommunity(this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        this.communitys = res.json().target;
        $('#loading_con').fadeOut();
        // console.log(this.communitys)
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
  };//获取所有城市

  goInCommunity=(event)=>{
    let communityId = $(event.target).val();
    sessionStorage.communityId= communityId;
    this.router.navigate(['/home/propaganda-statistics',{communityId:communityId}]);
  };//进入社区

  addCommunity=()=>{
    if(this.newcommunityInfo.password!=this.newcommunityInfo.rePassword){
      layer.msg("密码输入不一致");
      return;
    }
    this.newcommunityInfo.city = this.newCid;
    this.newcommunityInfo.sex = $('input[type="radio"]:checked').val();
    if(!this.newcommunityInfo.communityName){
      layer.msg('请输入城市名称');return
    }else if(!this.newcommunityInfo.city){
      layer.msg('请选择城市所在地');return
    } else if(!this.newcommunityInfo.address){
      layer.msg('请输入城市具体地址');return
    }else if(!this.newcommunityInfo.phoneNumber){
      layer.msg('请输入电话号码');return
    }else if(!this.newcommunityInfo.description){
      layer.msg('请输入城市描述');return
    }else if(!this.newcommunityInfo.accountNo){
      layer.msg('账号不能为空');return
    }else if(!this.newcommunityInfo.password){
      layer.msg('密码不能为空');return
    }else if(!this.newcommunityInfo.alias){
      layer.msg('管理员姓名不能为空');return
    }

    this.requestService.addCommunity(
      this.newcommunityInfo.communityName,
      this.newcommunityInfo.city,
      this.newcommunityInfo.address,
      this.newcommunityInfo.phoneNumber,
      this.newcommunityInfo.description,
      this.newcommunityInfo.accountNo,
      this.newcommunityInfo.password,
      this.newcommunityInfo.alias,
      this.newcommunityInfo.sex,
      this.tokenId,
      this.accountid
    ).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      } else {
        // console.log(res.json());
        layer.msg('添加成功');
        $('.btn-close').click();
        this.getAllCommunity();
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//新建社区

  seeCommunity=(event)=>{
    this.communityId = $(event.target).attr('name');
    this.requestService.getCommunity(this.communityId,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.updateCommunityInfo = res.json().target.community;
        // console.log( this.updateCommunityInfo)
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        // this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//查看社区

  updateCommunity=()=>{
    this.requestService.updateCommunity(
      this.updateCommunityInfo.communityName,
      this.communityId,
      this.updateCommunityInfo.description,
      this.newCid,
      this.updateCommunityInfo.address,
      this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        layer.msg('修改成功');
        $('.btn-close').click();
        this.getAllCommunity();
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//修改社区信息

  deleteCommunity=(event)=>{
    let communityId= $(event.target).attr('value');
    let that = this;
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteCommunity(that.accountid,that.tokenId,communityId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          layer.msg('删除成功');
          that.getAllCommunity();
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
  };//删除社区

}
