/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//检查字符串是否为空
function checkNullOrEmpty(str) {
    var result = false;
    if (str == null)
        result = true;
    str = str.replace(/(^\s*)|(\s*$)/g, "");
    if (str.length == 0)
        result = true;
    return result;
}

//验证密码长度
function checkPwdLength(str){
     if(str.length<=20&&str.length>=4){
        return false;
     }
     return true;
}

//特殊字符检查
function checkRegExp(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (pattern.test(str)){
        return true;
    }
    return false;
}

//检查是否含有特殊字符
function checkValueHashRxp(ctrlId) {
    var iu, iuu, regArray = new Array("◎", "■", "●", "№", "↑", "→", "↓" +
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "|", "", "[", "]", "？", "~", "`" +
    "!", "<", ">", "‰", "→", "←", "↑", "↓", "¤", "§", "＃", "＆", "＆", "＼", "≡", "≠" +
    "≈", "∈", "∪", "∏", "∑", "∧", "∨", "⊥", "‖", "‖", "∠", "⊙", "≌", "≌", "√", "∝", "∞", "∮" +
    "∫", "≯", "≮", "＞", "≥", "≤", "≠", "±", "＋", "÷", "×", "/" +
    "╄", "╅", "╇", "┻", "┻", "┇", "┭", "┷", "┦", "┣", "┝", "┤", "┷", "┷", "┹", "╉", "╇", "【", "】" +
    "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "┌", "├", "┬", "┼", "┍", "┕", "┗", "┏", "┅", "—" +
    "〖", "〗", "←", "〓", "☆", "§", "□", "‰", "◇", "＾", "＠", "△", "▲", "＃", "℃", "※", ".", "≈", "￠");
    iuu = regArray.length;
    var obj = document.getElementById(ctrlId);
    for (iu = 1; iu <= iuu; iu++) {
        if (regArray[iu] != "") {
            if (obj.value.indexOf(regArray[iu]) != -1) {
                return true;
            }
        }
    }
    return false;
}

//去除字符串中的多个空白符
trim = function(str)
{
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
}



