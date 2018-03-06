import { Component, OnInit ,Inject ,Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute} from '@angular/router'
import {inject} from "@angular/core/testing";
import {DOCUMENT} from "@angular/common";
import { Ng2Ueditor } from 'ng2-ueditor';



declare let $:any;
declare let layer:any;
declare let Ueditor:any;
declare let editor2:any;

@Component({
  selector: 'app-content-modify',
  templateUrl: './content-modify.component.html',
  styleUrls: ['./content-modify.component.css']
})
export class ContentModifyComponent implements OnInit {
  @ViewChild('ueditor') ueditor: Ng2Ueditor;
  // ckeditorContent = '';
  //
  //
  // config = {
  //   filebrowserBrowseUrl: '',
  //   filebrowserUploadUrl: this.requestService.IP+'/api/upload.do',
  //   extraPlugins: 'divarea',
  //   height:500
  // };
  content:any
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
    $('#loading_con').fadeOut();
    $('.cke_button_icon').click(function () {
        // console.log(1)
    });
    let that= this;
    this.isStart();
    this.getUrl();
    this.getContentDetails();
    this.stateChoose();

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

    // let script1 = document.createElement('script');
    // script1.type = 'text/javascript-lazy';
    // script1.src = "assets/js/wangEditor.min.js";
    // $('body').append(script1);
    // let script3 = document.createElement('script');
    // script3.type = 'text/javascript-lazy';
    // script3.src = "assets/js/wangEditor-fullscreen-plugin.js";
    // $('body').append(script3);
    //
    // let script2 = document.createElement('script');
    // script2.type = 'text/javascript-lazy';
    // script2.src = "assets/js/edit.js";
    // $('body').append(script2);
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
        console.log(res.json());
        console.log(this.updateContents.state);
        if(this.updateContents.state ==1){
          // $('#unbespeak').css('checked','checked');
          $('.bespeak').click()
        }else {
          $('.unbespeak').click()
        }
        this.updateContents.abstract_txt =res.json().target.abstract_txt;
        this.updateContents.coverId =res.json().target.cover_id;
        this.updateContents.businessId = res.json().target.business_id;
        this.content = res.json().target.content;
        // editor2.txt.html(res.json().target.content);
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
    let content = this.content;
    content= encodeURIComponent(content);
    this.updateContents.link = encodeURIComponent(this.updateContents.link);
    let state = $('input[name="state"]:checked').val();
    if(!this.updateContents.title){
      layer.msg('请输入内容标题');return
    }else if(!this.updateContents.coverId){
      layer.msg('请选择封面图片');return
    }else if(!this.updateContents.businessId){
      layer.msg('请选择所属分类');return
    }else if(!this.updateContents.abstract_txt && this.updateContents.flag==0){
      layer.msg('请输入文章摘要');return
    }else if(!content && this.updateContents.flag==0){
      layer.msg('请输入正文内容');return
    }else if(!this.updateContents.order){
      layer.msg('请选择顺序');return
    }else if(!this.updateContents.link && this.updateContents.flag==1){
      layer.msg('请输入链接');return
    }
    this.requestService.updatecatcontent(
      this.pid,
      this.updateContents.title,
      this.updateContents.coverId,
      this.updateContents.abstract_txt,
      content,
      this.updateContents.ref_url,
      this.updateContents.isTop,
      this.updateContents.isActive,
      this.updateContents.order,
      this.updateContents.businessId,
      this.updateContents.flag,
      state
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

  stateChoose=()=>{
    $('.checkSingel').click(function () {
      $('.checkSingel').removeClass('on');
      $(this).addClass('on');
    })
  };

  isStart=()=>{
    let that =this;
    $('input[name="radioLink"]').change(function () {
      let isStart =  $('input[name="radioLink"]:checked').attr('class');
      if(isStart=='stop'){
        $('input[name="link"]').attr('disabled',true);
        that.updateContents.flag = 0
      }
      if(isStart=='start'){
        $('input[name="link"]').attr('disabled',false);
        that.updateContents.flag= 1
      }
    });
    // let isStart =  $('input[type="radio"]:checked').attr('name');
    // console.log(isStart);
  };
  fadeout(){
    $('.ztree').toggle();
    $('.ztree').css('z-index','100000')
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


