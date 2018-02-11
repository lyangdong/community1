import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';
declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-bespeak',
  templateUrl: './bespeak.component.html',
  styleUrls: ['./bespeak.component.css']
})
export class BespeakComponent implements OnInit {

  tokenId:any;
  communityId:any;
  type:any='';
  reserves:any=[];
  id:any;
  updateType:any;

  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.communityId = sessionStorage.communityId;
    this.getReserve(1);
    $('#loading_con').fadeOut();
  }
  getReserve=(page)=>{
    let that = this;
    this.requestService.getReserve(this.communityId,this.tokenId,this.type,page).subscribe(res=>{
      if(res.json().code!=0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        $('#loading_con').fadeOut();
        return;
      }else {
        $('#loading_con').fadeOut();
        // console.log(res.json().target);
        this.reserves = res.json().target;
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
            that.getReserve(page);
          }
        });
      }
    },erro => {
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
      $('#loading_con').fadeOut();
    })
  };

  updateReserve=(event)=>{
    this.id  =$(event.target).attr('value');
  };
  update=()=>{
    this.requestService.updateReserve(this.tokenId,this.updateType,this.id).subscribe(res=>{
      if(res.json().code!=0) {
        layer.msg(res.json().text);
        return;
      }else {
        layer.msg('修改成功');
        this.getReserve(1);
        $('.close').click()
      }
    },erro => {
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
      $('#loading_con').fadeOut();
    })
  };
  deleteReserve=(event)=>{
    let id  =$(event.target).attr('value');
    let that = this;
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteReserve(that.tokenId,id).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          layer.msg('删除成功');
          that.getReserve(1);
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
  };
}
