$(function(){
	 var buttons=$('<div class="but"><a href="#" class="savabut" id="savabut"></a><a href="#" class="resetbut" id="resetbut"></a></div>').appendTo($("body"));
	 var savebut =buttons.find("a[id='savabut']");
	 var resetbut=buttons.find("a[id='resetbut']");
	 //登录按钮
   	 savebut.linkbutton({
			width:80,
			height:40,
			text:'登录',
			iconCls:'icon-tux',
			onClick:function(){
				$('#ff').form('enableValidation');
				if($('#ff').form('validate')){
					var datas=$('#ff').serializeArray();
					$.ajax({  
					    url:"",    //请求的url地址  
					    dataType:"json",   //返回格式为json  
					    data:datas,    //参数值  
					    type:"post",   //请求方式 get 或者post  
					    beforeSend:function(){  
					        //请求前的处理  
					       showProgress('正在尝试登录，请稍候...');
					    },  
					    success:function(res){  
					    	closeProgress();
					        if(res.status==1){
					        	showProgress('正在跳转到系统首页，请稍候...','登录成功');
					        	window.setTimeout(function(){location.href = res.url},3000);
					        }else{
					        	showAlert('登录失败',res.msg,'error');
					        	return false;
					        }
					    },  
					    timeout: 6000,//请求时间最长为6秒
					    error:function(xhr, status){  
					    	closeProgress();
					        if (status == "timeout") {
					        	showAlert('登录失败','您的网络好像很糟糕，请刷新页面重试!','warning');
								return false;
							}
							else {
								showAlert('登录失败','服务器内部错误，请重试!','error');
								return false;
							}
						}
					});  
				}
			}
     });
     //重置信息按钮
     resetbut.linkbutton({
			width:80,
			height:40,
			text:'重置',
			iconCls:'icon-undo',
			onClick:function(){
				$('#ff').form('reset');
			}
     });
	$('#dlg').dialog({
		width:600,    
  		height:290,  
	    title : '中小学校园管理系统-后台登录',
	    iconCls:'icon-photo',
	    collapsible:false,//可折叠按钮
	    minimizable:false,//最小化按钮
	    maximizable:false, //最大化按钮
	    closable:false,//关闭按钮
	    draggable:false,//是否可拖翟
	    buttons : buttons
	});
	
	$('#ff').form('disableValidation');
	$('#codeimg').click(function(){
		var ts = Date.parse(new Date())/1000;
		var src=$(this)[0].src;
		$(this).attr("src", src+'?r='+ts);
	});
	
	
	//浏览器改变大小时触发
	$(window).resize(function () {
	    $('#dlg').dialog('center');
	});
});
	
