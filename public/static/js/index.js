//退出系统
function loginout(){
   var url=ThinkPHP['ROOT']+'/admin/login/loginout';
   var param={};
   pubAjax(url,param);
}

//菜单	
$('#menu').tree({
	url:ThinkPHP['ROOT']+'/admin/index/getmenu',
	lines : true,
    animate : true
}); 

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