import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  tokenId:any;
  userId:any;
  communityId:any;
  devices:any;
  addDeviceInfo:any={deviceSN:'',name:'',address:'',creatorName:'',webAddress:''};
  updateDeviceInfo:any={deviceSN:'',name:'',address:'',creatorName:'',webAddress:''};
  deviceId:any;


  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.userId = sessionStorage.accountid;
    this.communityId = sessionStorage.communityId;
    $('#loading_con').fadeOut();
    this.getDevice(1);
  }
  getDevice=(page)=>{
    let that = this;
    this.requestService.getDevice(this.communityId,this.tokenId,page).subscribe(res=>{
      if(res.json().code!=0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      }else {
        console.log(res.json());
        this.devices = res.json().target.devices;
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
            that.getDevice(page);
          }
        });
      }
    },erro=>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
      })
  };
  getDeviceDetails=(event)=>{
    this.deviceId= $(event.target).attr('value');
    this.requestService.getSimpleDevice(this.deviceId,this.tokenId).subscribe(res=>{
      if(res.json().code!=0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      }else {
        console.log(res.json());
        this.updateDeviceInfo = res.json().target;
      }
    },erro=>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
    // console.log( this.deviceId)
  };
  addDevice=()=>{
    this.requestService.addDevice(
      this.addDeviceInfo.deviceSN,
      this.addDeviceInfo.name,
      this.addDeviceInfo.address,
      this.addDeviceInfo.creatorName,
      this.addDeviceInfo.webAddress,
      this.communityId,
      this.tokenId).subscribe(res=>{
      if(res.json().code!=0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      }else {
        $('.btn-close').click();
        this.getDevice(1);
        layer.msg('修改成功');return;
        // console.log(res.json());
      }
    },erro=>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//添加新设备

  updateDevice=()=>{
    this.requestService.updateDevice(
      this.deviceId,
      this.updateDeviceInfo.deviceSN,
      this.updateDeviceInfo.name,
      this.updateDeviceInfo.address,
      this.updateDeviceInfo.creatorName,
      this.updateDeviceInfo.webAddress,
      this.tokenId).subscribe(res=>{
      if(res.json().code!=0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      }else {
        $('.btn-close').click();
        this.getDevice(1);
        layer.msg('添加成功');return;
        // console.log(res.json());
      }
    },erro=>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//更新设备信息

  deleteDevice=(event)=>{
    let that= this;
    let diviceId= $(event.target).attr('value');
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteDevice(diviceId,that.tokenId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);
        }else {
          // console.log(res.json());
          layer.msg('删除成功');
          that.getDevice(1);
        }
      },erro =>{
        if(erro.type==3){
          layer.msg('登录超时，请重新登录');
          that.router.navigate(['/login']); return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      });
      layer.close(index);
    });

  }
}
