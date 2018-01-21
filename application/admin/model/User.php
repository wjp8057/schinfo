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
                    session('sessSchinfo.user_id', $res[0]['user_id']);
                    session('sessSchinfo.login_name', $res[0]['login_name']);
                    session('sessSchinfo.user_name', $res[0]['user_name']);
                    if ($data['auto']=='on'){
                        cookie('cookSchinfo.user_id', $res[0]['user_id'],7*24*3600);
                        cookie('cookSchinfo.login_name', $res[0]['login_name'],7*24*3600);
                        cookie('cookSchinfo.user_name', $res[0]['user_name'],7*24*3600);
                    }
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

	//根据user_id修改密码
    public function editpwd($params){
	    $result=array('status'=>0,'msg'=>'','data'=>'');
        if(empty($params)){
            $result['msg']='缺少必要的参数，修改失败';
            return $result;
        }
        if($params['login_passwd']!=$params['login_passwd2']){
            $result['msg']='两次密码输入不一致';
            return $result;
        }
        unset($params['login_passwd2']);
        $params['login_passwd']=md5($params['login_passwd']);
        //开启事务
        $this->startTrans();
        $trans=$this->where('user_id',$params['user_id'])->update(['login_passwd'=>$params['login_passwd']]);//tp5中create方法会自动根据是否有主键来判断是否新增还是修改
        //判断事务是否成功
        if ($trans==false){
            $this->rollback();
            $result['msg']='服务器内部错误，修改失败!';
            return $result;
        }
        //提交事务
        $this->commit();
        session(NULL);
        cookie(null);
        $result['status']=1;
        $result['msg']='修改成功，正在退出系统重新登录...';
        $result['data']=array('url'=>request()->root(true).'/admin/index/index');
        return $result;
//        }else{
//            $result['msg']='服务器内部错误，请重试!';
//            return $result;
//        }
    }
}
