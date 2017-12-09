function getZTreeData(){
  var zNodes = [{id : "all","pId" : "-1",name : "所有分类",isParent:true,icon:"../img/diy/1_open.png"}];
  var zNodeDatas =this.getParentCategorys(-1);
  $(zNodeDatas).each(function(idx,item){
    var obj = new Object();
    obj.id = item.id;
    obj.pId = item.pid;
    obj.name = item.name;
    obj.open = true;
    if(item.pid == "-1"){
      obj.isParent = true;
      obj.iconOpen = "../img/diy/1_open.png";
      obj.iconClose = "../img/diy/1_close.png";
    }else{
      obj.icon = "../img/diy/2.png";
    };
    zNodes.push(obj);
  });
  return zNodes;
}
