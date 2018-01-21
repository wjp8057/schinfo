<?php
namespace app\admin\controller;
use app\common\controller\Common;
use app\admin\model\Menus;
use app\admin\model\User;
use think\Db;

class Index extends Common
{
    public function index()
    {
		return $this->fetch();
    }
    
    public function getmenu(){
		$menu=new Menus;
		echo json_encode($menu->getmenus());
		exit();
    }

    //修改密码
    public function editpwd(){
        if (request()->isAjax()){
            $user=new User;
            echo json_encode($user->editpwd(input('post.')));
            exit();
        }else{
            echo back_result(0,'非法提交');
            exit();
        }
    }
}
