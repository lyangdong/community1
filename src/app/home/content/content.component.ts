import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  communityId:any;
  tokenId:any;
  parentName:any;
  treeData:any;
  treeDataCheck:any
  classifyName:any="选择分类";
  allId:any=1;
  title:any;
  id:any;
  isTop:any;
  zNodesCheck:any;
  settingCheck:any;

  treeCheckedInfos:any=[];
  columnIds:any='';
  columnInfos:any=[];
  contentId:any;

  catcontents:any=[];


  constructor(private http: Http, private router: Router, private requestService: RequestService) { }

  ngOnInit() {
    let that= this;
    this.communityId= sessionStorage.communityId;
    this.tokenId = sessionStorage.tokenId;

    // let arr =[1,2,3];
    // arr.splice(1,1);

    var setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      callback : {
        onClick : function(evt,treeId,treeNode){
          that.fadeout();
          that.classifyName = treeNode.name;
          that.allId= treeNode.id;
          that.getAllcatcontents(that.allId);
        }
      }
    };
    // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
    var zNodes = [];
    this.requestService.getCategorys(this.communityId,-1).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        if(res.json().target[0]){
          this.allId = res.json().target[0].id;
          this.classifyName = res.json().target[0].name;
          this.getAllcatcontents(this.allId);//初始化
        }
        this.treeData = this.sort2(res.json().target);
        zNodes = this.treeData;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    });//获取节点



    $(document).ready(function () {
      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    });//初始化


    var settingCheck = {
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
          var treeObjCheck = $.fn.zTree.getZTreeObj("treeDemoCheck");
          var nodesCheck = treeObjCheck.getCheckedNodes(true);
          that.treeCheckedInfos = nodesCheck;
          // console.log(that.treeCheckedInfos)
        }
      }
    };
    var code;

    this.requestService.getCategorys(this.communityId,-1).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        // this.treeDataCheck = this.sort2Check(res.json().target);
        this.zNodesCheck =this.sort2Check(res.json().target);
        this.settingCheck = settingCheck;

        console.log(this.zNodesCheck);
        $.fn.zTree.init($("#treeDemoCheck"),  this.settingCheck, this.zNodesCheck);
        setCheck();
        $("#py").bind("change", setCheck);
        $("#sy").bind("change", setCheck);
        $("#pn").bind("change", setCheck);
        $("#sn").bind("change", setCheck);
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    });
    function setCheck() {
      var zTree = $.fn.zTree.getZTreeObj("treeDemoCheck"),
        py = $("#py").attr("checked") ? "p" : "",
        sy = $("#sy").attr("checked") ? "s" : "",
        pn = $("#pn").attr("checked") ? "p" : "",
        sn = $("#sn").attr("checked") ? "s" : "",
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
      $.fn.zTree.init($("#treeDemoCheck"), this.settingCheck, this.zNodesCheck);
      setCheck();
      $("#py").bind("change", setCheck);
      $("#sy").bind("change", setCheck);
      $("#pn").bind("change", setCheck);
      $("#sn").bind("change", setCheck);
    });
  }


  getTitlecatcontents=()=>{
    this.requestService.getTitlecatcontents(this.communityId,this.allId,this.title).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        if(res.json().target){
          this.catcontents = res.json().target;
        }else {
          layer.msg('没有对应文章');
        }
        // console.log( this.catcontents);
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
        return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    });
  };//按标题查询

  getAllcatcontents=(categoryId)=>{
    $('#loading_con').fadeIn();
    let that = this;
    this.requestService.getAllcatcontents(this.communityId,categoryId,'').subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        let arr =res.json().target;
        // let arr  = res.json().target;
        // this.catcontents = res.json().target;
        for(let i=0;i<arr.length;i++){
          if(arr[i].top==true){
            // console.log(i);
            let arrNew = arr[i];
            arr.splice(i,1);
            arr.unshift(arrNew);
            // console.log(arr);
          }
        }
        this.catcontents = arr;
        $('#loading_con').fadeOut();
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
        $('#loading_con').fadeOut();
        return;
      }
      $('#loading_con').fadeOut();
      layer.msg('获取网络信息失败，请检查网络');
    });
  };//获取分类文章列表

  deleteCatContent=(event)=>{
    let that =this;
    let id = $(event.target).attr('value');
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteCatContent(id).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          layer.msg('删除成功');
          that.getAllcatcontents(that.allId);
        }
      },erro =>{
        if(erro.json().code==3){
          that.router.navigate(['/login']);
          layer.msg('登录超时，请重新登录');
          return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      });
      layer.close(index);
    });
  };//删除文章

  stickPost=(event)=> {
    let id =$(event.target).attr('value');
    this.requestService.updatecatcontentTop(id,1).subscribe(res => {
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        layer.msg('修改成功');
        this.getAllcatcontents(this.allId);
      }
    }, erro => {
      if (erro.type == 3) {
        // this.router.navigate(['/login']);
        return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    });
  };
  pushContent=(event)=>{
    // console.log($(event.target).attr('value'))
    this.contentId = $(event.target).attr('value')
  };推送

  cancelStickPost=(event)=> {
    let id =$(event.target).attr('value');
    this.requestService.updatecatcontentTop(id,0).subscribe(res => {
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        layer.msg('修改成功');
        this.getAllcatcontents(this.allId);
      }
    }, erro => {
      if (erro.type == 3) {
        // this.router.navigate(['/login']);

      }
      layer.msg('获取网络信息失败，请检查网络');
    });
  };



  sure=()=>{
    let columnIds = [];
    for(let i=0 ;i<$('.column-add-box a').length;i++){
      let str = $('.column-add-box a').eq(i).attr('value');
      columnIds.push(str);
    }//获取栏目数组
    this.columnIds = columnIds.toString();
    this.requestService.pushContent(this.columnIds,this.contentId).subscribe(res=>{
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        layer.msg('推送成功');
      }
    }, erro => {
      if (erro.type == 3) {
        // this.router.navigate(['/login']);
        return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    });
    $('.btn-close').click();
  };// 传递栏目值

  fadeout(){
    $('.ztree').toggle()
  }
  sort2(all) {
    var arr = [];
    var parentId = -1;
    for(var i=0;i < all.length;i++){
      if(parentId == all[i].p_id){
        const node = {name: all[i].name, pId: 0, id: all[i].id,open:true};
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
  };

  sort2Check(all) {
    var arr = [];
    var parentId = -1;
    for(var i=0;i < all.length;i++){
      if(parentId == all[i].p_id){

        const node = {name: all[i].name, pId: 0, id: all[i].id,open:true};
        const children = all[i].items;
        arr.push(node);
        this.sortNode2Check(node.id, children, arr);
      }
    }
    return arr;
  }
  sortNode2Check(pid, children, arr){
    for(var i=0;i<children.length;i++){
      if(pid == children[i].p_id){
        const node = {name: children[i].name,pId: pid, id: children[i].id};
        const children2 = children[i].items;
        arr.push(node);
        this.sortNode2Check(node.id, children2, arr);
      }
    }
  }

  getDateTen=(time)=>{
    return time.substr(0,10);
  }
}
