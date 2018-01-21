<?php

namespace app\admin\model;
use think\Model;

class Menus extends Model{
	
	public function getmenus(){
        //返回节点对象
        $sql="SELECT * FROM jld_menus where isnull(dr,0)=0 order by level,id";
        $object=$this->query($sql);
        //创建一个树数组
        $tree = array();
        //筛选出根节点
        foreach($object as $val){
            if($val['parent_id'] == 0||empty($val['parent_id'])){
                $temp=null;
                $temp['id']=$val['id'];
                $temp['text']=$val['name'];
                $temp['iconCls']=$val['icon'];
                $temp['checked']='false';
                $temp['state']='open';
//              $temp['url']=$val['url'];
                $temp['level']=$val['level'];
                $temp['parent_code']='';
                $temp['parent_id']=$val['parent_id'];
                $temp['attributes']['code']=$val['code'];
                $temp['attributes']['name']=$val['name'];
                array_push($tree,$temp);
            }else{
            	for($i=0;$i<count($tree);$i++){
            		$this->fill_menu_list($tree[$i],$val);
            	}
            }
        } 
        return $tree;
   }
   
   public function fill_menu_list(&$obj,$val){
   		if($val['parent_id']==$obj['id']){
            $temp['id']=$val['id'];
            $temp['text']=$val['name'];
            $temp['iconCls']=$val['icon'];
            $temp['checked']='false';
            $temp['state']='open';
            $temp['url']=$val['url'];
            $temp['level']=$val['level'];
            $temp['parent_code']=$val['code'];
            $temp['parent_id']=$val['parent_id'];
            $temp['attributes']['code']=$val['code'];
            $temp['attributes']['name']=$val['name'];
            if(empty($obj['children'])){
            	$obj['children']=array();
            }
            array_push($obj['children'],$temp);
   		}else{
   			if(!empty($obj['children'])){
   				for($i=0;$i<count($obj['children']);$i++){
   					$this->fill_menu_list($obj['children'][$i],$val);
   				}
   			}
   		}
   }
   
// public function  fill_show_menu(&$obj,$result){
//      if($result['parent_id']==$obj['id']){
//          $temp['id']=$result['id'];
//          $temp['code']=$result['code'];
//          $temp['name']=$result['name'];
//          $temp['php_url']=$result['php_url'];
//          $temp['icon']=$result['icon'];
//          if(empty($obj['children'])){
//              $obj['children']=array();
//          }
//          array_push($obj['children'],$temp);
//      }else{
//          if (!empty($obj['children'])){
//              for ($i=0;$i<count($obj['children']);$i++){
//                  $this->fill_show_menu($obj['children'][$i],$result);
//              }
//          }
//      }
//  }
}
