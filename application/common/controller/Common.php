<?php
namespace app\common\controller;
use think\Controller;
use think\Cookie;


class Common extends Controller
{
    public function _initialize()
    {
//        echo Cookie::has('cookSchinfo.user_id');die;
//        if((!session('sessSchinfo.login_name')&&!session('sessSchinfo.user_id')&&!session('sessSchinfo.user_name'))
//            ||(!Cookie::has('cookSchinfo.user_id')&&!Cookie::has('cookSchinfo.login_name')&&!Cookie::has('cookSchinfo.user_name'))){
//            $this->error('您尚未登录系统，请先去登录...','admin/login/index');
//        }
        if(!session('sessSchinfo.login_name')&&!session('sessSchinfo.user_id')&&!session('sessSchinfo.user_name')){
            $this->redirect('admin/login/index');
        }
    }
}
