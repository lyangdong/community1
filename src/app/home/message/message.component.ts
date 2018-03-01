import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {RequestService} from '../../services/request.service';
import {ActivatedRoute} from '@angular/router';
import {isUndefined} from "util";

declare let $: any;
declare let layer: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  tokenId: any;
  communityId: any;
  sendId: any;
  reverceId: any;
  toggleReplay:number;
  messages:any;
  replayContent:any='';
  subMessage:any;
  newContent:any='';

  constructor(private http: Http, private router: Router, private requestService: RequestService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.communityId = sessionStorage.communityId;
    this.sendId = sessionStorage.accountid;
    this.getUrl();
    this.getMessage();
    $('#loading_con').fadeOut();
    this.onInt();
  }

  getMessage = () => {
    let that =this
    this.requestService.getMessage(this.reverceId).subscribe(res => {
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        console.log(res.json())
        this.messages = res.json().target
        this.subMessage = res.json().target.subMessage
        setTimeout(function () {
          that.onInt()
        },10)

      }
    }, erro => {
      if (erro.json().code == 3) {
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };

  sendMessage=(event)=>{
    let messageId = $(event.target).attr('value')
    let receiverId = $(event.target).attr('receiverId')
    if(this.replayContent==''){
      layer.msg('回复不能为空')
      return
    }
    this.requestService.sendMseeage(
      messageId,
      this.sendId,
      receiverId,
      this.replayContent,
      this.reverceId,
    ).subscribe(res => {
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        this.toggleReplay = -1;
        this.getMessage()
      }
    }, erro => {
      if (erro.json().code == 3) {
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  }

  sendNewMessage=()=>{
    let messageId ='';
    let receiverId = '';
    if(this.newContent==''||this.newContent==undefined){
      layer.msg('消息不能为空')
      return
    }
    this.requestService.sendMseeage(
      messageId,
      this.sendId,
      receiverId,
      this.newContent,
      this.reverceId,
    ).subscribe(res => {
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        this.toggleReplay = -1;
        this.getMessage();
        $('.close').click()
      }
    }, erro => {
      if (erro.json().code == 3) {
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  }
  toggleBox = (i) =>{
    this.replayContent='';
    if(this.toggleReplay ==i){
      this.toggleReplay = -1
    }else {
      this.toggleReplay = i
    }
  };
  sendModal=()=>{
    this.newContent='';
  }

  contentClick=(event)=>{
    $(event.target).html($(event.target).text())
  };
  onInt=()=>{
    $('.content').click()
  }

  getUrl = () => {
    this.activatedRoute.params.subscribe(params => {
      this.reverceId = params.id;
      console.log(this.reverceId)
      // console.log(this.childChannelId)
    })
  };//获取pid

}
