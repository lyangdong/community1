import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  userId:any;
  tokenId:any;
  communityId:any;
  id:any;
  channelId:any;

  channels:any;
  copeChannelId:any='';
  addChannelInfo:any={};
  columnIds:any=1;
  temId:any=1;
  showNo:any;
  show:any;
  order:any;

  undateChannelInfo:any={show:'1',temId:'1',columnIds:''};

  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) {
    // this.communityId= this.activatedRoute.params['value'].communityId;
    // this.id= this.activatedRoute.params['value'].id;
    // console.log(this.communityId);
    // console.log(this.id)
  }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.userId = sessionStorage.accountid;
    this.communityId = sessionStorage.communityId;

    this.getChannel();
  }

  copyUrl=(event)=> {
    this.copeChannelId = $(event.target).attr('value');
    // console.log($('#url1').val());
    setTimeout(function () {
      $('#url1').select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      layer.msg('已复制链接')
    },300);

  };// 复制链接

  getChannel=()=>{
    $('#loading_con').fadeIn();
    this.requestService.getChannel(this.communityId,-1,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.channels = res.json().target;
        $('#loading_con').fadeOut();
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
      $('#loading_con').fadeOut();
    })
  };//获取频道信息
  addChannel=()=>{
     this.show = $('input[type="radio"]:checked').val();
     // console.log(this.show);
     if(this.show=="0"){
       this.show = true
     }else {
       this.show = false
     }
    if(!this.addChannelInfo.name){
      layer.msg('请输入频道名称');return
    }else if(!this.addChannelInfo.introduce){
      layer.msg('请输入频道描述');return
    }else if(!this.order){
      layer.msg('请输入选择顺序');return
    }
    this.requestService.addChannel(
      this.addChannelInfo.name,
      this.addChannelInfo.introduce,
      this.columnIds,
      this.temId,
      this.userId,
      this.communityId,
      true,
      this.order,
      -1,
      this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else if(res.json().code==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']);
      }else {
        this.getChannel();
        // console.log(res.json());
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
  };//添加频道

  getChannelDetails=(event)=>{
    this.channelId = $(event.target).attr('value');
    this.requestService.getChannelDetails(this.channelId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        this.undateChannelInfo = res.json().target;
        // console.log(this.undateChannelInfo);
      }
    },erro =>{
      // if(erro.type==3){
      //   layer.msg('登录超时，请重新登录');
      //   this.router.navigate(['/login']); return;
      // }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取单个频道信息

  updateChannel=()=>{
    this.requestService.updateChannel(
      this.channelId,
      this.undateChannelInfo.name,
      this.undateChannelInfo.introduce,
      this.columnIds,
      this.temId,
      this.userId,
      this.communityId,
      true,
      this.undateChannelInfo.order,
      -1,
      this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      } else {
        // console.log(res.json());
        layer.msg('修改成功');
        $('.btn-close').click();
        this.getChannel();
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//修改频道

  deleteChannel=(event)=>{
    let that =this;
    let id = $(event.target).attr('value');
    // console.log(id);
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteChannel(id,this.tokenId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);
        }else {
          // console.log(res.json());
          layer.msg('删除成功');
          that.getChannel();
        }
      },erro =>{
        if(erro.type==3){
          layer.msg('登录超时，请重新登录');
          that.router.navigate(['/login']); return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      })

      layer.close(index);
    });
    // this.requestService.deleteChannel(id,this.tokenId).subscribe(res=>{
    //   if(res.json().code!=0){
    //     // layer.msg('账号或密码错误');
    //     layer.msg(res.json().text);return;
    //   } else {
    //     // console.log(res.json());
    //     layer.msg('删除成功');
    //     this.getChannel();
    //   }
    // },erro =>{
    //   layer.msg('获取网络信息失败，请检查网络');
    // })
  };//删除频道

}
