import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare let $:any;
declare let layer:any;
declare let editor2:any;

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  // ckeditorContent='';
  // config = {
  //   filebrowserBrowseUrl: '&&&&&',
  //   filebrowserUploadUrl: 'http://192.168.0.204:8095/upload.do'
  // };

  userId:any;
  communityId:any;
  tokenId:any;
  parentName:any='选择分类';
  treeData:any;
  flag:any=0;
  content:any;

  title:any;
  catcontents:any={businessId:'',title:'',coverId:'',abstractTxt:'',content:'',link:'',isTop:'0',isActive:'1',order:'1',businessType:'0'};
  logoId:any;

  constructor(private http: Http, private router: Router, private requestService: RequestService) { }
  ngOnInit() {
    $('#loading_con').fadeOut();
    this.isStart();
    this.stateChoose();
    let that= this;
    this.userId= sessionStorage.accountid;
    this.communityId= sessionStorage.communityId;
    this.tokenId = sessionStorage.tokenId;
    var setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      callback : {
        onClick : function(evt,treeId,treeNode){
          that.fadeout();
          that.parentName = treeNode.name;
          that.catcontents.businessId = treeNode.id;
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

    let script1 = document.createElement('script');
    script1.type = 'text/javascript-lazy';
    script1.src = "assets/js/wangEditor.min.js";
    $('body').append(script1);

    let script3 = document.createElement('script');
    script3.type = 'text/javascript-lazy';
    script3.src = "assets/js/wangEditor-fullscreen-plugin.js";
    $('body').append(script3);

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
          that.catcontents.coverId = res.data.fid;
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

  addCatContent=()=>{
    let content = editor2.txt.html();
    content= encodeURIComponent(content);
    let state = $('input[name="state"]:checked').val();
    if(!this.catcontents.title){
      layer.msg('请输入内容标题');return
    }else if(!this.catcontents.coverId){
      layer.msg('请选择封面图片');return
    }else if(!this.catcontents.businessId){
      layer.msg('请选择所属分类');return
    }else if(!this.catcontents.abstractTxt && this.flag==0){
      layer.msg('请输入文章摘要');return
    }else if(!content && this.flag==0){
      layer.msg('请输入正文内容');return
    }else if(!this.catcontents.order){
      layer.msg('请选择顺序');return
    }else if(!this.catcontents.link && this.flag==1){
      layer.msg('请输入链接');return
    }

    this.requestService.addCatContent(
      this.communityId,
      this.catcontents.businessId,
      this.catcontents.title,
      this.catcontents.coverId,
      this.catcontents.abstractTxt,
      content,
      state,
      this.catcontents.link,
      this.catcontents.isTop,
      this.catcontents.isActive,
      this.catcontents.order,
      this.catcontents.businessType,
      this.userId,
      this.flag
    ).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        layer.msg('添加成功');
        this.catcontents = {businessId:'',title:'',coverId:'',abstractTxt:'',content:'',link:'',isTop:'0',isActive:'1',order:'',businessType:'0'};
        this.router.navigate(['/home/content'])
      }
    },erro =>{
      if(erro.json().code==3){
        this.router.navigate(['/login']);
        layer.msg('登录超时，请重新登录');return;
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
        that.flag  = 0;
      }
      if(isStart=='start'){
        $('input[name="link"]').attr('disabled',false);
        that.flag  = 1;
      }
    });
    // let isStart =  $('input[type="radio"]:checked').attr('name');
    // // console.log(isStart);
  };


  fadeout(){
    $('.ztree').toggle();
    $('.ztree').css('z-index','100000')
  };
  stateChoose=()=>{
    $('.checkSingel').click(function () {
      $('.checkSingel').removeClass('on');
      $(this).addClass('on');
    })
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
}
