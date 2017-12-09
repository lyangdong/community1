import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare let layer:any;
declare let $:any;

@Component({
  selector: 'app-child-channel',
  templateUrl: './child-channel.component.html',
  styleUrls: ['./child-channel.component.css']
})
export class ChildChannelComponent implements OnInit {

  tokenId:any;
  userId:any;
  communityId:any;
  pid:any;

  childChannels:any;
  copeChannelId:any="";
  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) {
    // this.pid= this.activatedRoute.params['value'].pid;
  }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.userId = sessionStorage.accountid;
    this.communityId = sessionStorage.communityId;
    this.getUrl();
    this.getChannel();
  }
  getChannel=()=>{
    $('#loading_con').fadeIn();
    this.requestService.getChannel(this.communityId,this.pid,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        $('#loading_con').fadeOut();
        this.childChannels = res.json().target;
      }
    },erro =>{
      $('#loading_con').fadeOut();
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取子频道信息
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
  };//删除频道
  getUrl=()=>{
    this.activatedRoute.params.subscribe(params=>{
      this.pid = params.id;
    })
  };//获取pid

  copyUrl=(event)=> {
    this.copeChannelId = $(event.target).attr('value');
    // console.log($('#url1').val());
    setTimeout(function () {
      $('#url1').select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      layer.msg('已复制链接')
    },300);

  };// 复制链接
}

