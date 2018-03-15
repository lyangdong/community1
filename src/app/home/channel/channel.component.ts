import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';
import {ActivatedRoute } from '@angular/router';

declare let $:any;
declare let layer:any;

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  userId:any;
  tokenId:any;
  communityId:any;
  id:any;
  channelId:any;

  channels:any;
  copeChannelId:any='';
  addChannelInfo:any={};
  columnIds:any=1;
  temId:any=1;
  showNo:any;
  showOther:any;
  order:any;
  logoId:any;
  updateLogoUrl:any;
  updateShowOther:any;

  undateChannelInfo:any={show:'1',temId:'1',columnIds:''};

  constructor(private http: Http, private router: Router, private requestService: RequestService,private activatedRoute:ActivatedRoute) {
    // this.communityId= this.activatedRoute.params['value'].communityId;
    // this.id= this.activatedRoute.params['value'].id;
    // console.log(this.communityId);
    // console.log(this.id)
  }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;
    this.userId = sessionStorage.accountid;
    this.communityId = sessionStorage.communityId;

    this.getChannel();
  }

  copyUrl=(event)=> {
    this.copeChannelId = $(event.target).attr('value');
    // console.log($('#url1').val());
    setTimeout(function () {
      $('#url1').select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      layer.msg('已复制链接')
    },300);

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
          that.logoId = res.data.src;
          console.log(res.data)
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
          that.undateChannelInfo.logoUrl = res.data.src;
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

  getChannel=()=>{
    $('#loading_con').fadeIn();
    this.requestService.getChannel(this.communityId,-1,this.tokenId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        $('#loading_con').fadeOut();
        layer.msg(res.json().text);return;
      }else {
        // console.log(res.json());
        this.channels = res.json().target;
        $('#loading_con').fadeOut();
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
      $('#loading_con').fadeOut();
    })
  };//获取频道信息

  addChannel=()=>{
     this.showOther = $('input[name="showOther"]:checked').val();

     // console.log(this.show);
     if(this.showOther==1){
       this.showOther = true
     }else {
       this.showOther = false
     }
    // console.log(this.logoId,this.showOther,this.addChannelInfo.topName)
    if(!this.addChannelInfo.name){
      layer.msg('请输入频道名称');return
    }else if(!this.addChannelInfo.introduce){
      layer.msg('请输入频道描述');return
    }else if(!this.order){
      layer.msg('请输入选择顺序');return
    }
    this.requestService.addChannelPartent(
      this.addChannelInfo.name,
      this.addChannelInfo.introduce,
      this.columnIds,
      this.temId,
      this.userId,
      this.communityId,
      true,
      this.showOther,
      this.order,
      -1,
      this.tokenId,
      this.logoId,
      this.addChannelInfo.topName).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else if(res.json().code==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']);
      }else {
        $('#filesImg img').attr('src','');
        this.getChannel();
        // console.log(res.json());
        layer.msg('添加成功');
        $('.btn-close').click();
      }
    },erro =>{
      if(erro.type==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']); return;
    }
        layer.msg('获取网络信息失败，请检查网络');
    })
  };//添加频道

  getChannelDetails=(event)=>{
    this.channelId = $(event.target).attr('value');
    this.requestService.getChannelDetails(this.channelId).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      }else {
        this.undateChannelInfo = res.json().target;
        if(this.undateChannelInfo.showOther){
          $('#updateShowOtherYse').attr('checked',true)
        }else {
          $('#updateShowOtherNo').attr('checked',true)
        }
        console.log(this.undateChannelInfo);
      }
    },erro =>{
      // if(erro.type==3){
      //   layer.msg('登录超时，请重新登录');
      //   this.router.navigate(['/login']); return;
      // }
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//获取单个频道信息

  updateChannel=()=>{
    this.updateShowOther = $('input[name="updateShowOther"]:checked').val();

    // console.log(this.show);
    if(this.updateShowOther==1){
      this.updateShowOther = true
    }else {
      this.updateShowOther = false
    }
    this.requestService.updateChannelPartent(
      this.channelId,
      this.undateChannelInfo.name,
      this.undateChannelInfo.introduce,
      this.columnIds,
      this.temId,
      this.userId,
      this.communityId,
      true,
      this.undateChannelInfo.order,
      -1,
      this.tokenId,
      this.undateChannelInfo.topName,
      this.undateChannelInfo.logoUrl,
      this.updateShowOther).subscribe(res=>{
      if(res.json().code!=0){
        // layer.msg('账号或密码错误');
        layer.msg(res.json().text);return;
      } else {
        // console.log(res.json());
        layer.msg('修改成功');
        $('.btn-close').click();
        this.getChannel();
      }
    },erro =>{
      layer.msg('获取网络信息失败，请检查网络');
    })
  };//修改频道

  deleteChannel=(event)=>{
    let that =this;
    let id = $(event.target).attr('value');
    // console.log(id);
    layer.confirm('确定删除吗？', function(index){
      that.requestService.deleteChannel(id,this.tokenId).subscribe(res=>{
        if(res.json().code!=0){
          // layer.msg('账号或密码错误');
          layer.msg(res.json().text);
        }else {
          // console.log(res.json());
          layer.msg('删除成功');
          that.getChannel();
        }
      },erro =>{
        if(erro.type==3){
          layer.msg('登录超时，请重新登录');
          that.router.navigate(['/login']); return;
        }
        layer.msg('获取网络信息失败，请检查网络');
      })

      layer.close(index);
    });
    // this.requestService.deleteChannel(id,this.tokenId).subscribe(res=>{
    //   if(res.json().code!=0){
    //     // layer.msg('账号或密码错误');
    //     layer.msg(res.json().text);return;
    //   } else {
    //     // console.log(res.json());
    //     layer.msg('删除成功');
    //     this.getChannel();
    //   }
    // },erro =>{
    //   layer.msg('获取网络信息失败，请检查网络');
    // })
  };//删除频道

}
