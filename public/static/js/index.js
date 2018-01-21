$.extend($.messager.defaults,{
    ok:"确定",
    cancel:"取消"
});
$(function(){
	$("#password-edit").dialog('close');
})


//菜单	
$('#menu').tree({
	url:ThinkPHP['ROOT']+'/admin/index/getmenu',
	lines : true,
    animate : true,
    onClick:function(node){
        if (node.url !== undefined&&node.url!=''&&node.url!=null) {
            addTab(node.text,node.url,node.iconCls);    
        }                                                                
    }
}); 

$('#contentTabs').tabs({
			fit:true,
			border:false,
	     //为tabs其附加鼠标右键事件
	        onContextMenu: function(e,title,index){
	　　　　　　　//该方法通知浏览器不要执行与此事件关联的默认动作
	　　　　　　　//即屏蔽了浏览器在tab页上的鼠标右键事件
	            e.preventDefault();
	            var mm = $("#Rmenu");
	            //显示右键菜单
	            mm.menu("show",{
	                top: e.pageY,
	                left: e.pageX
	            });
	            if(index==0){
	            	mm.menu('disableItem',$('#closecur'));
	            }
	            //为右键菜单选项绑定事件
	            mm.menu({
	                onClick: function(item){
	                    debugger;               
	                }
	            });
	        }
});

//
function addTab(title, url,icon){
    if ($('#contentTabs').tabs('exists', title)){
        $('#contentTabs').tabs('select', title);
    } else {
//      var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
        $('#contentTabs').tabs('add',{
            title:title,
            iconCls:icon,
            href:url,
//          content:content,
            closable:true,
            selected:true
        });
    }
}

//显示的时间
function showtime(){
      var date=new Date();
      var year=date.getFullYear();//年
      //判断小于10，前面补0
      if(year<10){
         year="0"+year;
      }
      var month=date.getMonth()+1;//月
      //判断小于10，前面补0
      if(month<10){
         month="0"+month;
      }
      var day=date.getDate();//日
      //判断小于10，前面补0
      if(day<10){
        day="0"+day;
      }
      var hour=date.getHours();//时
      //判断小于10，前面补0
      if(hour<10){
        hour="0"+hour;
      }
      var minutes=date.getMinutes();//分
      //判断小于10，前面补0
      if(minutes<10){
        minutes="0"+minutes;
      }
      var seconds=date.getSeconds();//秒
      //判断小于10，前面补0
      if(seconds<10){
        seconds="0"+seconds;
      }
      var weeks=date.getDay();//星期
      var weekday;
      switch(weeks){
      	case 0: weekday = '星期日';break;
        case 1: weekday = '星期一';break;
        case 2: weekday = '星期二';break;
        case 3: weekday = '星期三';break;
        case 4: weekday = '星期四';break;
        case 5: weekday = '星期五';break;
        case 6: weekday = '星期六';break;
      }
      var date_str = year+"年"+month+"月"+day+"日 "+hour+":"+minutes+":"+seconds+" "+weekday;
       //显示在id为datetime的容器里
       $("#datetime").html(date_str);
   }
     //设置1秒调用一次show_cur_times函数
setInterval("showtime()",100);

//退出登录
$("#out").click(function(){
	$.messager.confirm('操作提醒','是否退出系统？',function(flag){
        if(flag){
            var url=ThinkPHP['ROOT']+'/admin/login/loginout';
		    var param={};
		    pubAjax(url,param);
        }
    });
});

//修改密码
$("#editpwd").click(function(){
    $("#password-edit").dialog('open');

});

//密码修改面板
$("#password-edit").dialog({
    width : 400,
    height : 280,
    title : '修改密码',
    iconCls : 'icon-edit',
    draggable:false,
    modal : true,
    closed : true,
    onClose:function(){
        $('#password-edit').form('reset');
    },
    buttons : [
        {
            'text' : '保存',
            iconCls : 'icon-save',
            width:55,
            height:30,
            handler : function(){
                if($('#password-edit').form('validate')){
                     var postdata={};
                    postdata.user_id=$('#user_id').val();
                    postdata.login_passwd=$('#user_pwd').val();
                    postdata.login_passwd2=$('#user_pwd2').val();
                    var url=ThinkPHP['ROOT']+'/admin/index/editpwd';
                    pubAjax(url,postdata,successfun('password-edit'));
                }
            }
        },{
            'text' : '取消',
            iconCls : 'icon-cancel',
            width:55,
            height:30,
            handler : function(){
                $("#password-edit").dialog('close');
            }
        }
    ],
});


//用户名
$("#user_name").textbox({
    width : 220,
    height : 32,
    required : true,
    readonly:true
});

//密码
$("#user_pwd").textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'minLength[3]',
    missingMessage : '请输入账号密码',
    invalidMessage : '账号密码至少3位'
});

//确认密码
$("#user_pwd2").textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'equals["#user_pwd"]',
    missingMessage : '请输入确认密码',
    invalidMessage : '确认密码和密码不一致'
});

//判断两个字段是否一致的扩展
$.extend($.fn.validatebox.defaults.rules, {
    equals : {
        validator : function(value, param)
        {
            return value == $(param[0]).val();
        },
        message: '密码和密码确认必须一致'
    },
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: '请至少输入{0}个字符'
    }
});

//修改密码成功后的回调 函数
function successfun(id){
    $("#"+id).dialog('close');
}

$(window).resize(function () {
    $('#password-edit').dialog('center');
});
