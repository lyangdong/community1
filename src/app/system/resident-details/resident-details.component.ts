import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare let layer:any;
declare let $:any;

@Component({
  selector: 'app-resident-details',
  templateUrl: './resident-details.component.html',
  styleUrls: ['./resident-details.component.css']
})
export class ResidentDetailsComponent implements OnInit {

  tokenId=  sessionStorage.tokenId;

  pid:any;
  userId:any;
  name: any;
  resident:any;
  SimpleResident:any;
  openId:any;
  nation:any;
  sex:any;
  birthday:any;
  culture:any;
  postcode:any;
  phone:any;
  telPhone:any;
  permanentAddress:any;
  residentialAddress:any;
  communityId:any='';
  idCard:any;
  accountId:any;


  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.userId = sessionStorage.accountid;
    $("#change").click(function(){
      $("input").removeAttr("disabled");
      $("select").removeAttr("disabled");
    });
    $("#queding").click(function(){
      $("input").attr("disabled", true);
      $("select").attr("disabled", true);
    });
    this.resident={alias:""}
    this.getUrl();
    // this.getSimpleResident(this.userId);
  }
  getUrl=()=>{
    this.activatedRoute.params.subscribe(params=>{
      // this.pid = params.id;
      // console.log(params);
      this.getSimpleResident(params['id']);
    })
  };//获取pid
  getSimpleResident=(userId)=>{
    this.requestService.getSimpleResident(userId,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        console.log(res.json());

        this.resident = res.json().target;
        this.name = res.json().target.alias;
        this.openId = res.json().target.accountNo;
        this.idCard = res.json().target.idCard;
        this.sex = res.json().target.sex;
        this.birthday = res.json().target.birthday;
        this.nation = res.json().target.nation;
        this.culture = res.json().target.culture;
        this.postcode = res.json().target.postcode;
        this.telPhone = res.json().target.telPhone;
        this.phone = res.json().target.phone;
        this.accountId= res.json().target.accountid
        this.permanentAddress = res.json().target.permanentAddress;
        this.residentialAddress = res.json().target.residentialAddress;
        // console.log(this.resident);
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login'])
        return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取单个
  updateResident=()=>{
    // console.log(this.name);
    this.requestService.updateResident(this.accountId,this.openId,this.name,this.sex,this.nation,this.idCard,this.birthday,this.culture,this.postcode,this.phone,this.telPhone,this.permanentAddress,this.residentialAddress,this.communityId,this.tokenId).subscribe(res=>{
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
}
