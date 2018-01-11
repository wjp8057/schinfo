<?php
namespace app\admin\controller;
use app\common\controller\Common;
use app\admin\model\Menus;

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
}
