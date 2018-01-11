<?php

namespace app\admin\model;
use think\Model;

class User extends Model{
	public function checkLogin($data){
        $result=array('status'=>0,'msg'=>'');
        $msg='';
        $res= User::getByLoginName($data['username']);
        if($res){
            if( md5($data['password'])==$res['login_passwd']){
                if($res['user_state']!=1){
                    $msg='此账号已冻结，请联系管理员';
                }else{
                    session('id', $res['id']);
                    session('login_name', $res['login_name']);
                    session('user_name', $res['user_name']);
                    $result['status']=1;
                    $msg='登录成功,正在跳转到系统首页...';
                    $result['url']= request()->root(true).'/admin/index/index';
                }
            }else{
                $msg='登录密码错误，请重新输入';
            }
        }else{
            $msg='此账号不存在';
        }
        $result['msg']=$msg;
        return $result;
	}
}
