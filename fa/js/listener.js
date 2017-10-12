/**
 * Created by deepdot on 2017/5/23.
 */
'use strict';

// 关闭弹窗
$('#closeModel').on("click",function () {
    $(".chooseFor").show(100);
});

// 上传照片
$("#uploadImg").on("change",function () {
    // 显示弹出层
    // $('.task').eq(0).fadeIn(200);
    // $('.model').animate({width:"auto",height:"100px"},3000);
    // 创建表单
    let formData=new FormData();
    let file=this.files[0];
    // 填充表单
    /*
	 * params userkey String 应用key params pic InputStream 图片文件
	 */
    formData.append("userkey",config.appKey);
    formData.append("pic",file);
    // formData.append("bibi","bibi")  
    // formData.setAttribute('enctype','multipart/form-data')
    console.log(formData);
    
    // 上传图片
    $.ajax({
        type:"POST",
        async:true,
        url:"/apiServer/facetrackManage/reverse",
        data:formData,
        contentType:false,
        processData : false,
        success:(res)=>{
             console.log(res);
             if(res.msg=="SUCC"){
              $("#task").show();
            }else{
              console.log(res.msg);
              // location.reload()
            }
             
             // 获取返回值中的图片信息，并展示（有多选框）
        },
        error:(error)=>document.write(error.responseText)
        })
});


// $("input[type=checkbox]").on('click',addTask);

// function addTask() {
// alert($(this).val())
// }
// checkBox
$(".comparePicture").on("click",".imgList",function () {
   console.log($(this));
   let current=$(this).attr("id");
   let par=$(this).parent();
   if($(this).find(".checkTask").css("display")=="none"){
       // $(this).find("input[type=checkbox]").click();
       $(this).find(".checkTask").css("display","block");
       $(this).find("img").addClass('checked');
       // $(this).find("input[type=checkbox]").attr('check',"yes")
   }
   else{
       // $(this).find("input[type=checkbox]").click();
       $(this).find(".checkTask").css("display","none");
       $(this).find("img").removeClass('checked');
       // $(this).find("input[type=checkbox]").attr('check',"no")
   }

});


function totalCheck() {
    // alert('1')
    $('.imgList').find('input[type=checkbox]').each(function () {
        // console.log($(this).attr('check'))
        if($(this).attr('check')!="no"&&typeof $(this).attr('check')!="undefined"){
            console.log("success")
        }else{
            console.log("failed")
        }
    })
}