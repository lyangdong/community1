import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';


declare let layer:any;


@Injectable()

export class RequestService {
  IP: any;
  constructor(private http: Http) {
    // this.IP ='http://116.62.166.183:8090';
    // this.IP ='http://112.124.15.205:8090';

      // this.IP ='http://192.168.0.204:8095'; //本地服务器地址
    this.IP = 'http://116.62.166.183:8090' //线上
  }

  login(accountNo,password){
    const url = this.IP +'/land';
    let body = 'accountNo='+accountNo+'&password='+password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 登录

  getCode(email){
    const url = this.IP +'/getCode?email='+email;
    return this.http.get(url);
  }
  // 获取验证码

  verificationCode(email,code){
    const url = this.IP+'/verificationCode';
    let body = 'email='+email+'&code='+code;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 验证验证码(POST)

  forgetPassword(email,code,password){
    const url = this.IP+'/forgetPassword';
    let body = 'email='+email+'&code='+code+'&password='+password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 忘记密码=>修改密码(POST)

  updatePassword(accountNo,old,newPwd,tokenId){
    const url = this.IP+'/web/updatePassword';
    let body = 'accountNo='+accountNo+'&oldPassword='+old+'&newPassword='+newPwd+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 修改密码(POST)

  /*   getAllPublishByClassification(communityId : any, pid : any) {
        const url = this.IP + '/web/getPublishByClassification?communityId=' + communityId + '&pid=' + pid
        return this.http.get(url);
      }//获取文章内容(政务告知)*/

  getPublishByClassification(communityId : any, pid : any,page : any, businessId : any,tokenId) {
    const url = this.IP + '/web/getPublishByClassification?communityId=' + communityId + '&pid=' + pid+'&page='+page+ '&businessId=' + businessId+'&tokenId='+tokenId;
    return this.http.get(url);
  }//获取文章内容

  getClassification(communityId : any, pid : any,tokenId) {
    const url = this.IP + '/web/getClassification?communityId=' + communityId + '&pid=' + pid+'&tokenId='+tokenId;
    return this.http.get(url);
  }//获取文章内容


  // updatePublish()
  // 编辑文章

  deletePublish(publishId,tokenId) {
    const url = this.IP + '/web/deltePublish?publishId=' + publishId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }//删除文章


  addGoverDealClass(name,communityId,tokenId){
    const url = this.IP+'/web/addMatter';
    let body='name='+name+'&communityId='+communityId+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 添加分类(政务办理)

  getGoverDealClass(communityId,tokenId){
    const url = this.IP+'/web/getMatter?communityId='+communityId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 获取分类(政务办理)

  getPopulationInformation(communityId,page,tokenId){
    const url = this.IP+'/web/getPopulationInformation?communityId='+communityId+'&page='+page+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 获取所有待办事项信息

  getSimplePopulationInformation(communityId,informationId,tokenId){
    const url = this.IP+'/web/getSimplePopulationInformation?informationId='+informationId+'&communityId='+communityId+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 获取单个待办事项信息

  getPopulationInformationByClassification(communityId,businessId,page,tokenId){
    const url = this.IP+'/web/getPopulationInformationByClassification?businessId='+businessId+'&page='+page+'&communityId='+communityId+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 通过分类获取待办事项信息

  getPopulationInformationByStatus(communityId,businessId,status,page,tokenId){
    const url = this.IP+'/web/getPopulationInformationByStatus?businessId='+businessId+'&status='+status+'&page='+page+'&communityId='+communityId+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 通过状态获取待办事项信息

  updateStatus(populationInformationId,status,tokenId){
    const url = this.IP+'/web/updateStatus';
    let body = 'populationInformationId='+populationInformationId+'&status='+status+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 待办事项信息状态修改(POST)


  deletePopulationInformation(informationId,tokenId){
    const url = this.IP+'/web/deletePopulationInformation';
    let body = 'informationId='+informationId+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 删除待办事项(POST)

  getParentClassification(tokenId){
    const url = this.IP+'/web/getParentClassification?tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 获取右侧主菜单


  addMember(){

  }
  // 新建小区成员

  /*post(url:string){//获取access_token
      let body = 'grant_type=client_credentials&client_id='+this.client_id+'&client_secret='+this.client_secret;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      return this.http.post(url,body,{headers: headers});
    }*/



  getAllDeparent(communityId,level,parentId,tokenId) {
    const url = this.IP + '/web/getAllDepartment?communityId=' +communityId+'&level='+level+'&parentId='+parentId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }//获取部门

  deleteDepartment(communityId,departmentId,tokenId) {
    const url = this.IP + '/web/deleteDepartment?';
    let body = 'communityId=' +communityId+'&departmentId='+departmentId+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//删除部门(POST)

  updateDepartment(departmentId,name,tokenId) {
    const url = this.IP + '/web/updateDepartment';
    let body = 'departmentId='+departmentId+'&name='+name+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//修改部门名字(POST)

  copyMemberToOtherDepartment(departmentId,userIds,communityId,tokenId) {
    const url = this.IP + '/web/copyMemberToOtherDepartment';
    let body = 'departmentId='+departmentId+'&userIds='+userIds+'&communityId='+communityId +'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//移动人员(POST)

  getMembers(communityId,departmentId,page,tokenId) {
    const url = this.IP + '/web/getMembers?communityId=' +communityId+'&departmentId='+departmentId+'&page='+page+'&tokenId='+tokenId;;
    return this.http.get(url);
  }//获取小区成员

  getSimpleMember(accountid,tokenId) {
    const url = this.IP + '/web/getSimpleMember?accountid=' +accountid+'&tokenId='+tokenId;;
    return this.http.get(url);
  }//查看小区成员信息

  changeMembersInfo(accountid,alias,sex,accountNo,tokenId) {
    const url = this.IP + '/web/updateMember';
    let body = 'accountid=' +accountid+'&alias='+alias+'&sex='+sex+'&accountNo='+accountNo +'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//修改小区成员信息(POST)


  addManager(communityId,accountNo,password,alias,sex,tokenId) {
    const url = this.IP + '/web/addManager';
    let body = 'communityId=' +communityId+'&accountNo=' +accountNo+'&alias='+alias+'&password='+password +'&sex='+sex+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//新增管理员(POST)

  getManager(communityId,page,tokenId) {
    const url = this.IP + '/web/getManager?communityId=' +communityId+'&page='+page+'&tokenId='+tokenId;
    return this.http.get(url);
  }//获取社区管理员

  getCommunity(communityId,tokenId){
    const url = this.IP + '/web/getSimpleCommunity?communityId=' +communityId+ '&tokenId='+tokenId;
    return this.http.get(url);
  }

  getSimpleManager(accountid,tokenId) {
    const url = this.IP + '/web/getSimpleManager?accountid=' +accountid+'&tokenId='+tokenId;
    return this.http.get(url);
  }//查看单个社区管理员

  updateManager(communityId,accountid,accountNo,password,alias,sex,tokenId) {
    const url = this.IP + '/web/updateManager';
    let body = 'communityId=' +communityId+'&accountid=' +accountid+'&accountNo=' +accountNo+'&alias='+alias+'&password='+password +'&sex='+sex+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//修改单个社区管理员(POST)

  deleteManager(communityId,accountNo,password,alias,sex,tokenId) {
    const url = this.IP + '/web/deleteManager';
    let body = 'communityId=' +communityId+'accountNo=' +accountNo+'&alias='+alias+'&password='+password +'&sex='+sex+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }//修改单个社区管理员(POST)






  getContent(communityId,tokenId){
    const url = this.IP+'/web/getContent?communityId='+communityId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 获取电子屏内容

  getSimpleElectronicScreen(contentId,tokenId){
    const url = this.IP+'/web/getSimpleElectronicScreen?contentId='+contentId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 获取单个电子屏内容


  addContent(name,picId,introduce,pid,businessId,templateId,communityId,classificationName,tokenId){
    const url = this.IP + '/web/addContent';
    let body = 'name=' +name+'&picId='+picId+'&introduce='+introduce+'&pid='+pid+'&businessId='+businessId+'&templateId='+templateId+'&communityId='+communityId+'&classificationName='+classificationName+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 新增电子屏内容管理

  addVideo(communityId,videoId,tokenId){
    const url = this.IP+'/web/addVideo';
    let body = 'communityId='+communityId+'&videoId='+videoId+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 添加视频(POST)

  getVideo(communityId,tokenId){
    const url = this.IP+'/web/getVideo?communityId='+communityId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 获取视频信息

  deleteVideo(videoId,tokenId){
    const url = this.IP+'/web/deleteVideo';
    let body = 'videoId='+videoId+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 删除视频(POST)

  deleteContent(contentId,tokenId){
    const url = this.IP+'/web/deleteContent';
    let body = 'contentId='+contentId+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 删除电子屏内容(POST)

  updateContent(contentId,name,picId,businessId,pid,introduce,templateId,classificationName,tokenId){
    const url = this.IP+'/web/updateContent';
    let body = 'contentId='+contentId+'&name='+name+'&picId='+picId+'&businessId='+businessId+'&pid='+pid+'&introduce='+introduce+'&templateId='+templateId+'&classificationName='+classificationName+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 修改电子屏内容(POST)

  getAllDevice(communityId,page,tokenId){
    const url = this.IP+'/web/getAllDevice?communityId='+communityId+'&page='+page+'&tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 获取所有设备


  // addDevice(communityId,deviceSN,name,address,creatorName,tokenId){
  //   const url = this.IP+'/web/addDevice';
  //   let body = 'communityId='+communityId+'&deviceSN='+deviceSN+'&name='+name+'&address='+address+'&creatorName='+creatorName+'&tokenId='+tokenId;;
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  //   return this.http.post(url,body,{headers: headers});
  // }
  // 添加设备(POST)



  uploadImg(file ){//获取access_token
    const url = this.IP+'/upload.do';
    let body = 'file='+file;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 上传图片、文件

  getAllCommunity(tokenId){
    const url = this.IP+'/web/getAllCommunity?tokenId='+tokenId;
    return this.http.get(url);
  }
  // 超级管理员获取所有社区

  changeLand(communityId,tokenId){
    const url = this.IP+'/web/changeLand?communityId='+communityId+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 根据ID获取社区名字



  addCommunity(communityName,city,address,phoneNumber,description,accountNo,password,alias,sex,tokenId,accountid){
    const url = this.IP+'/web/addCommunity';
    let body = 'communityName='+communityName+'&city='+city+'&address='+address+'&phoneNumber='+phoneNumber+
      '&description='+description+'&accountNo='+accountNo+'&password='+password+'&alias='+alias+'&sex='+sex+'&tokenId='+tokenId+'&accountid='+accountid;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 超级管理员新建社区

  deleteCommunity(accountid,tokenId,communityId){
    const url = this.IP+'/web/deleteCommunity';
    let body = 'accountid='+accountid+'&tokenId='+tokenId+'&communityId='+communityId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 超级管理员删除社区

  getSimpleCommunity(communityId,tokenId){
    const url = this.IP+'/web/getSimpleCommunity?communityId='+communityId+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 超级管理员获取单个社区


  updateCommunity(communityName,communityId,description,areaId,address,tokenId){
    const url = this.IP+'/web/updateCommunity';
    let body = 'communityName='+communityName+'&communityId='+communityId+'&description='+description+'&areaId='+areaId+'&address='+address+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 超级管理员修改社区(POST)


  getArea(province,tokenId){
    const url = this.IP+'/web/getArea?province='+province+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 获取地域

  getWebAddress(communityId,tokenId){
    const url = this.IP+'/web/getWebAddress?communityId='+communityId+'&tokenId='+tokenId;;
    return this.http.get(url);
  }
  // 后台获取公众号配置地址


  exitLand(tokenId){
    const url = this.IP+'/exitLand?tokenId='+tokenId;
    return this.http.get(url);
  }
  // 退出登录

  uploadFile(file){
    const url = this.IP+'/upload.do';
    let body = file;
    let headers = new Headers();
    // headers.append('ContentType=false','processData=false', 'application/x-www-form-urlencoded;charset=utf-8');
    headers.append('ContentType', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //文件上传

  dataAnalysis(communityId,tokenId){
    const url= this.IP + '/web/dataAnalysis?communityId='+communityId+'&tokenId='+tokenId;
    return this.http.get(url)
  }
//获取首页信息
  getQueryArea(pid){
    const url =this.IP +'/api/queryArea?pid='+pid;
    return this.http.get(url)
  }
 //获取城市
  getQueryCommunity(cid,tokenId){
    const url = this.IP + '/web/queryCommunity?areaId='+cid+'&tokenId='+tokenId;
    return this.http.get(url)
  }
  //获取社区

  getChannel(communityId,pid,tokenId){
    const url = this.IP + '/api/channels?communityId='+communityId+'&pid='+pid+'&tokenId='+tokenId;
    return this.http.get(url)
  }
  //获取频道
  addChannel(name,introduce,columnIds,temId,userId,communityId,show,order,pid,tokenId){
    const url = this.IP+'/api/channels';
    let body = 'name='+name+'&introduce='+introduce+'&columnIds='+columnIds+'&temId='+temId+'&userId='+userId
      +'&communityId='+communityId+'&show='+show+'&order='+order+'&pid='+pid+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //添加频道以及子频道添加
  getChannelDetails(id){
    const url = this.IP+'/api/getSimpleChannel?id='+id;
    return this.http.get(url)
  }
  //获取单个频道详细信息

  updateChannel(id,name,introduce,columnIds,temId,userId,communityId,show,order,pid,tokenId){
    const url = this.IP+'/api/updateChannel';
    let body = 'id='+id+'&name='+name+'&introduce='+introduce+'&columnIds='+columnIds+'&temId='+temId+'&userId='+userId
      +'&communityId='+communityId+'&show='+show+'&order='+order+'&pid='+pid+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }

  deleteChannel(id,tokenId){
    const url = this.IP+'/api/deleteChannel';
    let body = 'id='+id+ '&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  };
  //删除频道

  getCategorysDeatil(id){
    const url = this.IP + '/api/category/detail?id='+id;
    return this.http.get(url)
  };
  //获取分类详细信息
  getCategorys(communityId,parentId){
    const url = this.IP + '/api/categorys?parentId='+parentId+'&communityId='+communityId;
    return this.http.get(url)
  }
  //获取分类列表

  addCategroys(name,desc,communityId,order,parentId,logoId,refUrl,ref,flag,temId){
    const url = this.IP+'/api/categorys';
    let body = 'name='+name+ '&desc='+desc+ '&communityId='+communityId+ '&order='+order
      + '&parentId='+parentId+ '&logoId='+logoId+ '&refUrl='+refUrl+ '&ref='+ref+ '&flag='+flag+ '&temId='+temId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //添加分类
  delectCategroys(id){
    const url = this.IP+'/api/category/delete';
    let body = 'id='+id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //删除分类
  updateCategroys(pid,id,name,desc,order,logoId,type,ref,refUrl,flag,temId){
    const url = this.IP+'/api/category/update';
    let body ='parentId='+pid+ '&id='+id+'&name='+name+ '&desc='+desc+ '&order='+order+ '&logoId='+logoId+ '&type='+type+ '&ref='+ref+ '&refUrl='+refUrl+ '&flag='+flag+ '&temId='+temId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //修改分类
  getAllcatcontents(communityId,categoryId,title){
    const url = this.IP + '/api/allcatcontents?communityId='+communityId+'&categoryId='+categoryId+'&title='+title;
    return this.http.get(url)
  }
  getTitlecatcontents(communityId,categoryId,title){
    const url = this.IP+'/api/allcatcontents';
    let body ='communityId='+communityId+'&categoryId='+categoryId+ '&title='+title
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //获取分类下内容

  addCatContent(communityId,businessId,title,coverId,abstractTxt,content,refUrl,isTop,isActive,order,businessType,userId,flag){
    const url = this.IP+'/api/catcontents';
    let body ='communityId='+communityId+'&businessId='+businessId+ '&title='+title+'&coverId='+coverId+ '&abstractTxt='+abstractTxt
      + '&content='+content+ '&refUrl='+refUrl+ '&isTop='+isTop + '&isActive='+isActive+ '&order='+order+ '&businessType='+businessType+'&userId='+userId+'&flag='+flag;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //添加内容
  getContentDetails(id){
    const url = this.IP + '/api/catcontent/detail?id='+id;
    return this.http.get(url)
  }
  //获取文章详情
  updatecatcontent(id,title,coverId,abstractTxt,content,refUrl,isTop,isActive,order,businessId,flag){
    const url = this.IP+'/api/catcontent/update';
    let body ='id='+id+'&title='+title+ '&coverId='+coverId+'&abstractTxt='+abstractTxt+ '&content='+content+
    '&refUrl='+refUrl+ '&isTop='+isTop + '&isActive='+isActive+ '&order='+order+'&businessId='+businessId+'&flag='+flag;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  updatecatcontentTop(id,top){
    const url = this.IP+'/api/updateTop';
    let body ='id='+id+'&top='+top;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //修改文章详情
  deleteCatContent(id){
    const url = this.IP+'/api/catcontent/delete';
    let body ='id='+id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //删除文章
  getChildChannelDetails(id){
    const url = this.IP + '/api/getSimpleChannel?id='+id;
    return this.http.get(url)
  }
  //获取单个频道信息
  updateChildChannelDetails(id,name,introduce,columnIds,temId,show,order,tokenId){
    const url = this.IP+'/api/updateChannel';
    let body ='id='+id+'&name='+name+ '&introduce='+introduce+'&columnIds='+columnIds+ '&temId='+temId+
      '&show='+show+ '&order='+order+ '&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //修改频道信息

  addKindOfUser(tokenId,accountNo,alias,password,type,sex,communityId){
    const url = this.IP+ '/web/addKindOfUser';
    let body ='tokenId='+tokenId+'&accountNo='+accountNo+ '&alias='+alias+'&password='+password+ '&type='+type+
      '&sex='+sex+ '&communityId='+communityId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //添加管理员
  queryAccount(tokenId,accountNo,type,page){
    const url = this.IP + '/web/queryUserByTypeAndAccountNo?tokenId='+tokenId+ '&accountNo='+accountNo+ '&type='+type+ '&page='+page;
    return this.http.get(url)
  }
  getAccountDetails(tokenId,accountId){
    const url = this.IP + '/web/getSimpleUser?tokenId='+tokenId+ '&accountId='+accountId;
    return this.http.get(url)
  }
  //获取账号详情
  updateAccount(tokenId,accountNo,alias,password,sex,accountId,communityId){
    const url = this.IP+ '/web/updateUser';
    let body ='tokenId='+tokenId+'&accountNo='+accountNo+'&alias='+alias+'&password='+password+'&sex='+sex+'&accountId='+accountId+'&communityId='+communityId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //修改账号详情
  deleteUser(tokenId,accountId){
    const url = this.IP+ '/web/deleteUser';
    let body ='tokenId='+tokenId+'&accountId='+accountId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }

  getAllResident(communityId,page,name,tokenId){
    const url = this.IP + '/web/getAllResident?communityId='+communityId+'&page='+page+'&name='+name+'&tokenId='+tokenId;
    return this.http.get(url)
  }
  //获取所有居民
  getSimpleResident(userId,tokenId){
    const url = this.IP + '/api/getSimpleResident?userId='+userId+'&tokenId='+tokenId;
    return this.http.get(url)
  }
  //获取单个居民
  deleteResident(userId,tokenId){
    const url = this.IP+'/api/deleteResident';
    let body ='userId='+userId+'&tokenId'+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //删除单个居民
  updateResident(userId,openId,name,sex,nation,idCard,birthday,culture,postcode,phone,telPhone,permanentAddress,residentialAddress,communityId,tokenId){
    const url = this.IP+'/api/updateResident';
    let body ='userId='+userId+'&openId='+openId+'&name='+name+"&sex="+sex+'&nation='+nation+'&idCard='+idCard+'&birthday='+birthday+'&culture='+culture+'&postcode='+postcode+'&phone='+phone+'&telPhone='+telPhone+'&permanentAddress='+permanentAddress+"&residentialAddress="+residentialAddress+"&communityId="+communityId+"&tokenId="+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  //修改居民
  queryResident(name,tokenId){
    const url = this.IP+'/web/getAllResident';
    let body ='name='+name+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }

  getDevice(communityId,tokenId,page){
    const url = this.IP + '/web/getAllDevice?communityId='+communityId+'&tokenId='+tokenId+'&page='+page;
    return this.http.get(url)
  }//获取所有设备
  addDevice(deviceSN,name,address,creatorName,webAddress,communityId,tokenId){
    const url = this.IP+'/web/addDevice';
    let body ='deviceSN='+deviceSN+'&name='+name+'&address='+address+"&creatorName="+creatorName+'&webAddress='+webAddress+"&communityId="+communityId+"&tokenId="+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  getSimpleDevice(deviceId,tokenId){
    const url = this.IP+'/web/getSimpleDevice?deviceId='+deviceId+'&tokenId='+tokenId;
    return this.http.get(url);
  }
  // 获取单个设备
  updateDevice(deviceId,deviceSN,name,createName,address,webAddress,tokenId){
    const url = this.IP+'/web/updateDevice';
    let body = 'deviceId='+deviceId+'&deviceSN='+deviceSN+'&name='+name+'&createName='+createName+'&address='+address+'&webAddress='+webAddress+'&tokenId='+tokenId;;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
  // 修改设备信息
  deleteDevice(deviceId,tokenId){
    const url = this.IP+'/web/deleteDevice';
    let body = 'deviceId='+deviceId+'&tokenId='+tokenId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    return this.http.post(url,body,{headers: headers});
  }
}
