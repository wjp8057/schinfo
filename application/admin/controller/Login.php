<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use app\admin\model\User as userModel;

class Login extends Controller
{
    public function index(){
        if(request()->isAjax()){
            $result=array('status'=>0,'msg'=>'','url'=>'');
            if(captcha_check(input('code'))){//验证码通过返回true
                $result['msg']='验证码错误,请重新输入';
                echo json_encode($result);
                exit();
            }
            $user=new userModel;
            $res=$user->checkLogin( input('post.'));   
            echo json_encode($res);
            exit();
        }
        return $this->fetch();
    }
    
    //退出系统，销毁session
    public function loginout(){
        $result=array('status'=>0,'msg'=>'');
        if(request()->isAjax()){
            session(NULL);
            $result['msg']='注销成功';
            $result['status']=1; 
            $result['url']=request()->root(true).'/admin/login/index';;
        }else{
            $this->error('非法操作');
            exit();
        }
        echo json_encode($result);
        exit();
    }
}
