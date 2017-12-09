      // var IP='http://116.62.166.183:8090';
      var IP= 'http://192.168.0.204:8095';//本地地址
      var editor2 = new E('#editCon');
      // editor2.customConfig.uploadImgShowBase64 = true
      // editor2.customConfig.uploadImgServer = 'http://112.124.15.205:8090/upload.do'

      // $('body').off('click').on('click',()=>{
      //   $('.w-e-text-container').off('click').on('click',function(){
      //     $(this).addClass('active');
      //     return false;
      //     /*if(!$('.w-e-text-container').hasClass('active')){
      //       $(this).addClass('active');
      //     }else{
      //       $('.w-e-text-container').removeClass('active');
      //     }*/
      //    })
      //   $('.w-e-text-container').removeClass('active');
      // })
      editor2.customConfig.uploadImgServer = IP+'/api/upload.do';
      editor2.customConfig.uploadFileName = 'upload';
      editor2.customConfig.uploadImgParams = {
      };
      editor2.customConfig.uploadImgHooks = {
        fail: function (xhr, editor, result) {
            layer.msg('图片上传失败，请稍后重试');
        },
        error: function (xhr, editor) {
            layer.msg('网络错误，请稍后重试');
        },
        customInsert: function (insertImg, result, editor) {
           var url = result.target.src;//result.url
           insertImg(url);
        }
      }

      editor2.customConfig.customAlert = function (info) {
          // info 是需要提示的内容
      };
      editor2.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            // 'list',  // 列表
            // 'justify',  // 对齐方式
            'quote',  // 引用
            // 'emoticon',  // 表情
            'image',  // 插入图片
            // 'table',  表格
            //'video',  插入视频
            //'code',  插入代码
            'undo',  // 撤销
            'redo'  // 重复
    ]
   editor2.create();
   $('#editCon').attr('style','height:auto;');
