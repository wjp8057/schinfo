//关闭进度条
function closeProgress(){
	$.messager.progress('close');
}

//进度条
function showProgress(text='',title='',msg='',interval=300){
	$.messager.progress({
		title:title,
		text:text,
		msg:msg,
		interval:interval
	});
}

//alert对话框
function showAlert(title='',msg='',icon='info',fn=''){
	if(fn!=''){
		$.messager.alert({
			title:title,
			msg:msg,
			icon:icon,
			fn:fn
		});
	}else{
		$.messager.alert({
			title:title,
			msg:msg,
			icon:icon
		});
	}	
}

function showMessage(msg='',title='消息提示',timeout=5000,showSpeed=300,showType='fade',width=300,height=100){
	$.messager.show({
		msg:msg,//信息内容
		title:title,//标题
		timeout:timeout,//多少豪秒之后关闭
		showType:showType,//显示类型
		width:300,//宽度
		height:100,//高度
		showSpeed:showSpeed,//窗口显示的过度时间
		model:true,
		style:{
			right:'',
			top:document.body.scrollTop+document.documentElement.scrollTop,
			bottom:''
		}
	});
}

//公共的ajax方法
function pubAjax(url,params,callbackfun){
	var hasbackfun = false;
	if(callbackfun && typeof callbackfun =='function'){
		hasbackfun = true;
	}
	$.ajax({  
	    url:url,    //请求的url地址  
	    dataType:"json",   //返回格式为json  
	    data:params,    //参数值  
	    type:"post",   //请求方式 get 或者post  
	    success:function(res){  
	        if(res.status==1){
	        	if(hasbackfun){
					callbackfun(res,callbackparmes);
				}
	        	if(res.msg !=undefined && res.msg != ''){
					showMessage(res.msg);
					if (res.data.url!=undefined){
						window.setTimeout(function(){location.href = res.data.url},3000);
					}
					return true;
				}
				if (res.data.url!=undefined){
					location.href = res.data.url;
				}
	        }else{
	        	showMessage(res.msg);
	        }
	        return false;
	    },  
	    timeout: 6000,//请求时间最长为6秒
	    error:function(xhr, status){  
	    	closeProgress();
	        if (status == "timeout") {
	        	showAlert('操作提示','您的网络好像很糟糕，请刷新页面重试!','warning');
				return false;
			}
			else {
				showAlert('操作提示','服务器内部错误，请重试!','error');
				return false;
			}
		}
   });  
}
