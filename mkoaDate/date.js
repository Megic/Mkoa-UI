/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["./laydate/laydate"], function (laydate) {
    var iskin=false;
    function newlay(option,skin){
        skin=skin?skin:'default';
        if(!iskin){
            require(['css!./mkoaDate/laydate/skins/'+skin+'/laydate',"css!./mkoaDate/laydate/need/laydate"]);
            iskin=true;
        }
        laydate(option);
    }

    return {
        run:newlay,
        now:laydate.now,
        reset:laydate.reset
    };
});