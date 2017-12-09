import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule, Http} from '@angular/http';
import { RequestService} from '../../services/request.service';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {

  tokenId=  sessionStorage.tokenId;

  pid:any=2652;
  provinces:any;
  areas : any;
  cities : any;
  cid:any=2653;
  communitys:any;
  communityId:any;
  residents:any;
  name:any;
  queryName:any='';

  constructor(private http:Http,private requestService:RequestService,private router:Router) {}

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.communityId = sessionStorage.communityId;
    // this.getArea();
    // this.getAreaCity(this.pid);
    // this.getQueryCommunity(this.cid);
    this.getAllResident(1);
    // this.getSimpleResident(this.userId);
  }
  getArea=()=>{
    this.requestService.getQueryArea('').subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
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
      }else {
        // console.log(res.json());
        this.cities = res.json().target.secondAreas;
        // this.newCitise = res.json().target.secondAreas;
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取二级城市
  // getQueryCommunity=(cid)=>{
  //   if(this.cid == ''){
  //     layer.msg('请先选择城市');
  //     return;
  //   }
  //   this.requestService.getQueryCommunity(cid,this.tokenId).subscribe(res=>{
  //         if(res.json().code!=0){
  //         // layer.msg('账号或密码错误');
  //         layer.msg(res.json().text);return;
  //       }else {
  //         console.log(res.json());
  //         this.communitys = res.json().target;
  //       }
  //     },erro=>{
  //      layer.msg('获取网络信息失败，请检查网络');
  //     })
  //   };  //获取城市的社区}
  getAllResident=(page)=>{
    let that =this;
    $('#loading_con').fadeIn();
    this.requestService.getAllResident(this.communityId,page,'',this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {

        this.residents =  res.json().target.users;
        $('#loading_con').fadeOut();
        // console.log(this.residents)
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
            that.getAllResident(page);
          }
        });
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  }


  queryResident=(page)=>{
    let that =this;
    this.requestService.queryResident(this.queryName,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {

        this.residents =  res.json().target.users;
        // console.log(res.json())
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
            that.queryResident(page);
          }
        });
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };
  deleteUser2(id){
    // console.log(id);
    const that= this;
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteResident(id,that.tokenId).subscribe(res=>{
        // console.log(res.json());
      },erro =>{
        if(erro.type==3){
          layer.msg('登录超时，请重新登录');
          this.router.navigate(['/login']); return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      });
      layer.close(index);
    });
  }

}
