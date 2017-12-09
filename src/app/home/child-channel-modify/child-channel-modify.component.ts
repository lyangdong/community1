import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare  let $:any;
declare let layer:any;

@Component({
  selector: 'app-child-channel-modify',
  templateUrl: './child-channel-modify.component.html',
  styleUrls: ['./child-channel-modify.component.css']
})
export class ChildChannelModifyComponent implements OnInit {

  pid:any;
  childChannelId:any;
  show:any;
  temId:any;
  userId:any;
  communityId:any;
  order:any;
  tokenId:any;
  obj:any={};
  treeData: any;
  treeCheckedInfos:any=[];
  columnInfos:any=[];
  channelDetails:any={columnIds:''};

  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    let that=this;
    this.tokenId = sessionStorage.tokenId;
    this.userId = sessionStorage.accountid;
    this.communityId = sessionStorage.communityId;
    this.getUrl();
    this.getChildChannelDetails();
    $('#loading_con').fadeOut();
    // this.getParentCategorys();
    // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
    var setting = {
      check: {
        enable: true
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback : {
        onCheck : function(evt,treeId,treeNode){
          var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
          var nodes = treeObj.getCheckedNodes(true);
          that.treeCheckedInfos = nodes;
          // console.log(that.treeCheckedInfos)
        }
      }
    };
    // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）


    var zNodes = [
      // {id: 1, pId: 0, name: "can check 1",},
      // {id: 11, pId: 1, name: "can check 1-1",},
      // {id: 111, pId: 11, name: "can check 1-1-1"},
      // {id: 112, pId: 11, name: "can check 1-1-2"},
      // {id: 12, pId: 1, name: "can check 1-2", open: true},
      // {id: 121, pId: 12, name: "can check 1-2-1"},
      // {id: 122, pId: 12, name: "can check 1-2-2"},
      // {id: 2, pId: 0, name: "can check 2", checked: true, open: true},
      // {id: 21, pId: 2, name: "can check 2-1"},
      // {id: 22, pId: 2, name: "can check 2-2", open: true},
      // {id: 221, pId: 22, name: "can check 2-2-1", checked: true},
      // {id: 222, pId: 22, name: "can check 2-2-2"},
      // {id: 23, pId: 2, name: "can check 2-3"}
    ];
// zNodes = this.treeData;
    var code;

    this.requestService.getCategorys(this.communityId,-1).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.treeData = this.sort2(res.json().target);
        zNodes = this.treeData;

        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        setCheck();
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    });
    function setCheck() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        type = { "Y" : "s", "N" : "s" };
        zTree.setting.check.chkboxType = type;
        showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
    }

    function showCode(str) {
      if (!code) code = $("#code");
      code.empty();
      code.append("<li>" + str + "</li>");
    }

    $(document).ready(function () {
      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      setCheck();
      $("#py").bind("change", setCheck);
      $("#sy").bind("change", setCheck);
      $("#pn").bind("change", setCheck);
      $("#sn").bind("change", setCheck);
    });

  }


  getParentCategorys=()=>{
    this.requestService.getCategorys(this.communityId,-1).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.treeData = this.sort2(res.json().target);
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取分类列表

  // addChildChannel=()=>{
  //   let columnIds = [];
  //   for(let i=0 ;i<$('.column-title').length;i++){
  //     let str = $('.column-title').eq(i).attr('value');
  //     columnIds.push(str);
  //   }
  //   this.columnIds= columnIds.toString();
  //   this.requestService.addChannel(
  //     this.addChannelInfo.name,
  //     this.addChannelInfo.introduce,
  //     this.columnIds,
  //     this.temId,
  //     this.userId,
  //     this.communityId,
  //     true,
  //     this.order,
  //     this.pid,
  //     this.tokenId).subscribe(res=>{
  //     if(res.json().code!=0){
  //       // layer.msg('账号或密码错误');
  //       layer.msg(res.json().text);return;
  //     }else {
  //       console.log(res.json());
  //       layer.msg('添加成功');
  //     }
  //   },erro =>{
  //     layer.msg('获取网络信息失败，请检查网络');
  //   })
  // };//添加频道

  getChildChannelDetails=()=>{
    this.requestService.getChildChannelDetails(this.childChannelId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json().target);
        this.channelDetails = res.json().target;
        this.show = this.channelDetails.show;
        if(this.show ==false){
          $('#channelFade').attr('checked',true)
        }
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
      }
      layer.msg('获取网络信息失败，请检查网络');
    })
};//获取子频道详细信息

  updateChildChannelDetails=()=>{
    let columnIds = [];
    for(let i=0 ;i<$('.column-title').length;i++){
      let str = $('.column-title').eq(i).attr('value');
      columnIds.push(str);
    }
    if(columnIds.length>1&&parseInt(this.channelDetails.temId)<4){
      layer.msg('当频道关联多个栏目时，请选择多栏目模板');
      return;
    }
    if(columnIds.length==1&&parseInt(this.channelDetails.temId)>4){
      layer.msg('当频道关联单个栏目时，请选择单栏目模板');
      return;
    }
    this.channelDetails.columnIds= columnIds.toString();

    this.show = $('input[type="radio"]:checked').val();
    // console.log(this.show);
    this.requestService.updateChildChannelDetails(
      this.childChannelId,
      this.channelDetails.name,
      this.channelDetails.introduce,
      this.channelDetails.columnIds,
      this.channelDetails.temId,
      this.show,
      this.channelDetails.order,
      this.tokenId
     ).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {

        layer.msg('保存成功');
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//修改子频道信息

  sort2(all) {
    var arr = [];
    var parentId = -1;
    for(var i=0;i < all.length;i++){
      if(parentId == all[i].p_id){
        const node = {name: all[i].name, pId: 0, id: all[i].id};
        const children = all[i].items;
        arr.push(node);
        this.sortNode2(node.id, children, arr);
      }
    }
    return arr;
  }
  sortNode2(pid, children, arr){
    for(var i=0;i<children.length;i++){
      if(pid == children[i].p_id){
        const node = {name: children[i].name,pId: pid, id: children[i].id};
        const children2 = children[i].items;
        arr.push(node);
        this.sortNode2(node.id, children2, arr);
      }
    }
  }
  sure=()=>{
    this.channelDetails.column= this.treeCheckedInfos;
    $('.btn-close').click();
  };// 传递栏目值
  getUrl=()=>{
    this.activatedRoute.params.subscribe(params=>{
      this.childChannelId = params.id;
      this.pid = params.pid;
      // console.log(this.childChannelId)
    })
  };//获取pid
}
