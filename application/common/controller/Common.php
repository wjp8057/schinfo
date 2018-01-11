<?php
namespace app\common\controller;
use think\Controller;


class Common extends Controller
{
    public function _initialize()
    {
        if(!session('login_name')&&!session('id')&&!session('user_name')){
            $this->error('您尚未登录系统，请先去登录...','admin/login/index');
        }
    }
}
