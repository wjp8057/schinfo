<?php

namespace app\admin\model;
use think\Model;
use think\Request;

class User extends Model{
	public function checkLogin($data){
        $result=array('status'=>0,'msg'=>'');
        $msg='';
        $res=User::query("SELECT * FROM jld_user where login_name='".$data['username']."' AND isnull(is_delete,0)=0");
        if($res){
            if( md5($data['password'])==$res[0]['login_passwd']){
                if($res[0]['user_state']!=1){
                    $msg='此账号已冻结审核状态，请联系管理员';
                }else{
                	// 启动事务
                	$updateData=array();
                	$updateData['login_ip']=Request::instance()->ip();
                	$updateData['login_sum']=$res[0]['login_sum']==''?1:((int)$res[0]['login_sum']+1);
                	$updateData['login_time']=date('Y-m-d H:i:s');
					User::startTrans();
					try{
					    User::where('user_id', $res[0]['user_id'])->update($updateData);
					    // 提交事务
					    User::commit();    
					} catch (\Exception $e) {
					    // 回滚事务
					    User::rollback();
					}
                    session('user_id', $res[0]['user_id']);
                    session('login_name', $res[0]['login_name']);
                    session('user_name', $res[0]['user_name']);
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
