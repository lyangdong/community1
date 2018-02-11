import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  communityId:any;
  comments:any=[];
  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.communityId = sessionStorage.communityId
    $('#loading_con').fadeOut();
    this.getComment(1);
  }
  getComment=(page)=>{
    let that = this;
    this.requestService.getComment(this.communityId,page).subscribe(res=>{
      if(res.json().code!=0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        $('#loading_con').fadeOut();
        return;
      }else {
        $('#loading_con').fadeOut();
        this.comments = res.json().target.commentBeans;
        console.log(this.comments);
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
            that.getComment(page);
          }
        });
      }
    },erro=>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
      $('#loading_con').fadeOut();
    })
  };

  deleteComment=(event)=>{
    let that= this;
    let commentId= $(event.target).attr('value');
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteComment(commentId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);
        }else {
          // console.log(res.json());
          layer.msg('删除成功');
          that.getComment(1);
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
