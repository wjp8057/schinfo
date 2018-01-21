<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
if ( ! function_exists('back_result'))
{
    function back_result($status=200,$msg='success',$data=array()) {
        $msg = array(
            'status' => $status,
            'msg' => $msg,
            'data' => $data,
        );
        return die(json_encode($msg));
    }
}