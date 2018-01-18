import { Component, OnInit ,Inject ,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute} from '@angular/router'
import {inject} from "@angular/core/testing";
import {DOCUMENT} from "@angular/common";


declare let $:any;
declare let layer:any;
declare let CKEDITOR:any;
declare let editor2:any;

@Component({
  selector: 'app-content-modify',
  templateUrl: './content-modify.component.html',
  styleUrls: ['./content-modify.component.css']
})
export class ContentModifyComponent implements OnInit {
  ckeditorContent = '';

  // config = {
  //   filebrowserBrowseUrl: '',
  //   filebrowserUploadUrl: this.requestService.IP+'/api/upload.do',
  //   extraPlugins: 'divarea',
  //   height:500
  // };

  userId:any;
  communityId:any;
  tokenId:any;
  parentName:any='选择分类';
  treeData:any;
  pid:any;

  title:any;
  // catcontents:any={businessId:'',title:'',coverId:'',abstractTxt:'',content:'',link:'',isTop:'0',isActive:'1',order:'1',businessType:'0'};
  updateContents:any={businessId:'',title:'',coverId:'',abstractTxt:'',content:'',link:'',isTop:'',isActive:'',order:'1',businessType:'0'};
  logoId:any;

  constructor(private http: Http, private router: Router, private requestService: RequestService,
              private activatedRoute: ActivatedRoute,private _renderer2 :Renderer2,@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    $('.cke_button_icon').click(function () {
        // console.log(1)
    });
    let that= this;
    this.isStart();
    this.getUrl();
    this.getContentDetails();
    this.userId= sessionStorage.accountid;
    this.communityId= sessionStorage.communityId;
    this.tokenId = sessionStorage.tokenId;

    // console.log(this.communityId);
    var setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      callback : {
        onClick : function(evt,treeId,treeNode){
          that.fadeout();
          // that.parentName = treeNode.name;
          that.updateContents.businessId = treeNode.id;
          that.updateContents.name = treeNode.name;
        }
      }
    };
    // zTree 的数据属性
    var zNodes = [];

    this.requestService.getCategorys(this.communityId,-1).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.treeData = this.sort2(res.json().target);
        zNodes = this.treeData;

        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    });//初始化
    // const s = this._renderer2.createElement("script")
    // s.text = `
    //
    //    CKEDITOR.replace('contentEditor', {
    //      //清空预览区域显示内容
    //     image_previewText: ' ',
    //     //图片上传
    //     filebrowserUploadUrl: 'http://116.62.166.183:8090/test/upload.do'
    //     // CKEDITOR.tools.callFunction(callback
    //     // + "," + fileName + ",'')
    //
    // });
    //
    //              `;


    // this._renderer2.appendChild(this._document.body,s);

    let script1 = document.createElement('script');
    script1.type = 'text/javascript-lazy';
    script1.src = "assets/js/wangEditor.min.js";
    $('body').append(script1);

    let script2 = document.createElement('script');
    script2.type = 'text/javascript-lazy';
    script2.src = "assets/js/edit.js";
    $('body').append(script2);
  }

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
          that.updateContents.coverId = res.data.fid;
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

  getContentDetails=()=>{
    this.requestService.getContentDetails(this.pid).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        this.updateContents = res.json().target;
        // console.log(res.json());
        this.updateContents.abstractTxt =res.json().target.abstract_txt;
        this.updateContents.coverId =res.json().target.cover_id;
        this.updateContents.businessId = res.json().target.business_id;
        // this.ckeditorContent = res.json().target.content;
        editor2.txt.html(res.json().target.content);
        // console.log(this.updateContents.content );
        this.updateContents.flag = res.json().target.flag;
        this.updateContents.isActive=res.json().target.is_active;
        this.updateContents.isTop=res.json().target.is_top;
        if(this.updateContents.flag==1){
          $('input[name="link"]').attr('disabled',false);
          $('input.start').attr('checked',true)
        }
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    });
  };//修改时获取信息

  updatecatcontent=()=> {
    let content = editor2.txt.html();
    content= encodeURIComponent(content);
    this.requestService.updatecatcontent(
      this.pid,
      this.updateContents.title,
      this.updateContents.coverId,
      this.updateContents.abstractTxt,
      content,
      this.updateContents.ref_url,
      this.updateContents.isTop,
      this.updateContents.isActive,
      this.updateContents.order,
      this.updateContents.businessId,
      this.updateContents.flag
    ).subscribe(res => {
      if (res.json().code != 0) {
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);
        return;
      } else {
        layer.msg('修改成功');
        // location.reload();
        this.router.navigate(['/home/content'])
      }
    }, erro => {
      if (erro.type == 3) {
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');
        return;
      }
      layer.msg('获取网络信息失败，请检查网络');
    });
  };

  isStart=()=>{
    let that =this;
    $('input[type="radio"]').change(function () {
      let isStart =  $('input[type="radio"]:checked').attr('class');
      if(isStart=='stop'){
        $('input[name="link"]').attr('disabled',true);
        that.updateContents.flag = 0
      }
      if(isStart=='start'){
        $('input[name="link"]').attr('disabled',false);
        that.updateContents.flag= 1
      }
    });
    let isStart =  $('input[type="radio"]:checked').attr('name');
    // console.log(isStart);
  };
  fadeout(){
    $('.ztree').toggle()
  };
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
  };
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
  getUrl=()=>{
    this.activatedRoute.params.subscribe(params=>{
      this.pid = params.id;
    })
  };

  // reLoad=()=> {
  //   location.reload();
  // }
};


