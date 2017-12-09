import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';
import {noUndefined} from "@angular/compiler/src/util";

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {


  parentCategorys:any;
  communityId:any;
  name:any;
  desc:any;
  order:any;
  ref:any='';
  refUrl:any='';
  logoId:any;
  tokenId:any;
  flag:any=0;
  temId:any;


  parentId:any=-1;
  pid:any=1;
  treeData:any;
  childInfo:any={name:'请新增'};
  parentName:any;
  categorysModify:any={};
  modifyId:any;
  p_idModify:any;
  updateRef:any;
  flagUpdate:any;
  number:any=0;
  setting:any={};

  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) { }


  ngOnInit() {
    let that= this;
    this.communityId= sessionStorage.communityId;
    this.tokenId = sessionStorage.tokenId;

    this.isStart();
    this.isUpdateStart();
    this.getParentCategorys(this.parentId);


    // console.log(this.communityId);
    this.setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      callback : {
        onClick : function(evt,treeId,treeNode){
          that.fadeout();
          that.getParentCategorys(treeNode.id);
          that.getCategorysDeatil(treeNode.id);
          that.parentId = (treeNode.id);
          that.parentName = treeNode.name;
        }
      }
    };
    // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）


// zNodes = this.treeData;

    this.getTreeData();
    // this.requestService.getCategorys(this.communityId,-1).subscribe(res=>{
    //   if(res.json().code!=0){
    //     // layer.msg('账号或密码错误');
    //     layer.msg(res.json().text);return;
    //   }else {
    //     console.log(res.json());
    //     this.treeData = this.sort2(res.json().target);
    //     zNodes = this.treeData;
    //
    //     $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    //   }
    // },erro =>{
    //   layer.msg('获取网络信息失败，请检查网络');
    // });

    $(document).ready(function () {
    });
   // function  getTreeData(){
   //    that.requestService.getCategorys(that.communityId,-1).subscribe(res=>{
   //      if(res.json().code!=0){
   //        // layer.msg('账号或密码错误');
   //        layer.msg(res.json().text);return;
   //      }else {
   //        // console.log(res.json());
   //        that.treeData = that.sort2(res.json().target);
   //        zNodes = that.treeData;
   //
   //        $.fn.zTree.init($("#treeDemo"), that.setting, zNodes);
   //      }
   //    },erro =>{
   //      layer.msg('获取网络信息失败，请检查网络');
   //    });
   //  };

  }
  getTreeData=()=>{
    let that = this;
    that.requestService.getCategorys(that.communityId,-1).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        that.treeData = that.sort2(res.json().target);
        let zNodes = that.treeData;

        $.fn.zTree.init($("#treeDemo"), that.setting, zNodes);
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    });
  };//获取树节点

  copyUrl=()=> {
    let that = this;
    if(this.childInfo.flag==0){
      $('#url1').select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      layer.msg('已粘贴')
    }else if(this.childInfo.flag==1){
      $('#url1').val(that.childInfo.url);
      //console.log(that.childInfo.url);
      $('#url1').select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      layer.msg('已粘贴')
    }
  };// 复制链接

  previewHead=()=>{
    let that = this;
    //预览
    $("#classifyImg").change(function () {
      let fil = this.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(fil);
      reader.onload = function () {
        let date = reader.result;
        $('#filesImg img').attr('src', date);
        that.uploadLogo();
      };
    })
  }; //图片预览

  uploadLogo=()=>{
    let that = this;
      let formData = new FormData();
      let name = $("#classifyImg").val();
      formData.append("file", $("#classifyImg")[0].files[0]);
      formData.append("name", name);
    $.ajax({
      type: 'post',
      url: this.requestService.IP+'/upload.do',
      data: formData,
      processData: false,
      contentType: false,
      rossDomain: true,
      xhrFields: {            //带上Cookie
        withCredentials: true
      },

      success: (res) => {
        if (res.code == 1) {
          layer.msg('请重新登录');
          that.router.navigate(['/login']);
          return;
        } else if (res.code == 0) {
          that.logoId = res.data.fid;
          // console.log(that.logoId)
        } else if (res.code == 1009) {
          layer.msg('文件太大')
        } else if (res.code == 1010) {
          layer.msg('文件类型不支持')
        } else if (res.code == 500) {
          layer.msg('上传出错')
        }
      },
      error: () => {
        layer.msg('上传失败，请检查网络')
      }
    });
  };//图片上传，获取图片ID

  previewHeadModiyf=()=>{
    let that = this;
    //预览
    $("#classifyImgModify").change(function () {
      let fil = this.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(fil);
      reader.onload = function () {
        let date = reader.result;
        $('#filesImgModify img').attr('src', date);
        that.uploadLogoModify();
      };
    })
  }; //图片预览

  uploadLogoModify=()=>{
    let that = this;
    let formData = new FormData();
    let name = $("#classifyImgModify").val();
    formData.append("file", $("#classifyImgModify")[0].files[0]);
    formData.append("name", name);
    $.ajax({
      type: 'post',
      url: this.requestService.IP+'/upload.do',
      data: formData,
      processData: false,
      contentType: false,
      rossDomain: true,
      xhrFields: {            //带上Cookie
        withCredentials: true
      },

      success: (res) => {
        if (res.code == 1) {
          layer.msg('请重新登录');
          that.router.navigate(['/login']);
          return;
        } else if (res.code == 0) {
          that.logoId = res.data.fid;
          // console.log(that.logoId)
        } else if (res.code == 1009) {
          layer.msg('文件太大')
        } else if (res.code == 1010) {
          layer.msg('文件类型不支持')
        } else if (res.code == 500) {
          layer.msg('上传出错')
        }
      },
      error: () => {
        layer.msg('上传失败，请检查网络')
      }
    });
  };//图片上传，获取图片ID

  getCategorysDeatil=(pid)=>{
    $('#loading_con').fadeIn();
    this.requestService.getCategorysDeatil(pid).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        this.childInfo = res.json().target;
        $('#loading_con').fadeOut();
        // console.log(res.json());
      }
    },erro =>{
      $('#loading_con').fadeOut();
      layer.msg('获取网络信息失败，请检查网络');
    })
  }; //获取分类信息

  getCategorysDeatilModify=(event)=>{
    this.modifyId = $(event.target).attr('value');
    this.requestService.getCategorysDeatil(this.modifyId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        this.categorysModify = res.json().target;
        // console.log(this.categorysModify);
        this.p_idModify = res.json().target.p_id;
        this.logoId = res.json().target.logo_id;
        this.updateRef = res.json().target.url;
        this.flagUpdate = res.json().target.flag;
        if(this.flagUpdate==1){
          $('input[name="updateRef"]').attr('disabled',false);
          $('input.startUp').attr('checked',true)
        }
        if(this.flagUpdate==0){
          $('input[name="updateRef"]').attr('disabled',true);
          $('input.startUp').attr('checked',false)
        }
        // console.log(this.categorysModify);

      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };// 更改时获取信息

  updateCategorys=()=>{
    if(!this.categorysModify.name){
      layer.msg('请输入分类名称');return
    }else if(!this.categorysModify.desc){
      layer.msg('请输入分类描述');return
    } else if(!this.categorysModify.order){
      layer.msg('请输入显示顺序');return
    }
    this.requestService.updateCategroys(this.p_idModify,this.modifyId,this.categorysModify.name,this.categorysModify.desc,
      this.categorysModify.order,this.logoId,3,this.updateRef,this.updateRef,this.flagUpdate,this.categorysModify.temId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        $('.btn-close').click();
        layer.msg('修改成功');
        // this.getCategorysDeatil(this.pid);
        this.getTreeData();
        // console.log(this.parentId)
        this.getParentCategorys(this.parentId);
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//修改分类

  getParentCategorys=(parentId)=>{
    this.requestService.getCategorys(this.communityId,parentId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.parentCategorys = res.json().target;
        // this.parentId = res.json().target.p_id;
        // console.log(this.parentId);
        if(res.json().target[0]&&this.number==0){
          this.pid = res.json().target[0].id;
          this.getCategorysDeatil(this.pid);
        }
        if(this.number==0){
          this.getParentCategorys(this.pid);
          this.number = 1;
          // console.log("检测")
        }//只执行一次
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取分类列表

  deleteCategorys=(event)=>{
    let that =this;
    let id = $(event.target).attr('value');
    layer.confirm('确定删除吗？', function(index){
      that.requestService.delectCategroys(id).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          // console.log(this.pid);
          that.getParentCategorys(this.pid);
          that.getCategorysDeatil(this.pid);
          that.getTreeData();
          layer.msg('删除成功')
          // console.log(res.json());
        }
      },erro =>{
        layer.msg('获取网络信息失败，请检查网络');
      });
      layer.close(index);
    });
  };//删除分类
  // layer.confirm('确定删除吗？', function(index){
  //
  //
  //   layer.close(index);
  // });
  fadeTogoleParent=()=>{
    $('.parent-classify').css('display','none');
    $('.child-classify').css('display','inline-block');
    $('.parentTogole').css('display','block');
    this.parentId = this.childInfo.id;
  };//添加分类显示

  fadeTogoleChild=()=>{
    $('.parent-classify').css('display','inline-block');
    $('.child-classify').css('display','none');
    $('.parentTogole').css('display','none');
    this.parentId = -1;
  };//添加分类隐藏大分类

  addCategorys=()=>{
    if(!this.name){
      layer.msg('请输入分类名称');return
    }else if(!this.desc){
      layer.msg('请输入分类描述');return
    } else if(!this.order){
      layer.msg('请输入显示顺序');return
    }else if(!this.temId){
      layer.msg('请选择模板');return
    }else if(!this.logoId){
      layer.msg('请选择图片');return
    }
    this.requestService.addCategroys(this.name,this.desc,this.communityId,this.order,this.parentId,this.logoId,this.refUrl,this.ref,this.flag,this.temId)
      .subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);return;
        }else {
          if(this.parentId!=-1){
            this.getParentCategorys(this.parentId);
          }
          this.getTreeData();
          $('.btn-close').click();
          layer.msg('添加成功')
        }
      },erro=>{
        layer.msg('获取网络信息失败，请检查网络');
      })
  };//添加分类

  isStart=()=>{
    let that =this;
    $('input[name="radio"]').change(function () {
      let isStart =  $('input[type="radio"]:checked').attr('class');
      if(isStart=='stop'){
        that.flag = 0;
        $('input[name="link"]').attr('disabled',true);
      }
      if(isStart=='start'){
        $('input[name="link"]').attr('disabled',false);
        that.flag = 1;
      }
    });

  };// 启用外部链接

  isUpdateStart=()=>{
    let that =this;
    $('input[name="radio-modify"]').change(function () {
      let isStart =  $('.update-type input[type="radio"]:checked').attr('class');
      if(isStart=='stopUp'){
        that.flagUpdate = 0;
        $('input[name="updateRef"]').attr('disabled',true);
      }
      if(isStart=='startUp'){
        that.flagUpdate = 1;
        $('input[name="updateRef"]').attr('disabled',false);
      }
    });
  };// 修改时启用外部链接

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

  fadeout(){
    $('.ztree').toggle()
  }// 开关节点树
}
