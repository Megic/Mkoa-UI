/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["avalon","css!./mkoa.tab.css"], function (avalon) {
    avalon.component("mkoa:tab",{
        tabstr:"",//数据获取地址
        cur:0,
        $tpl:'',
        tabevent:'mouseover',
        //插件模板
        tabs:[],
        changeCur:avalon.noop,
        $template:'<div class="koa-tab"><span class="koa-tab-span" ms-on-mouseover="changeCur($index)" ms-class="on:cur==$index" ms-repeat="tabs">{{el}}</span></div>{{$tpl|html}}',
        $$template:function(tpl){//替换tab事件
            if(this.tabevent!='mouseover')tpl=tpl.replace('mouseover',this.tabevent);
            return tpl;
        },
        $init:function(vm){
            console.log(avalon.vmodels)
           vm.tabs=vm.tabstr.toString().split('|');
           vm.changeCur=function($index){
            vm.cur=$index;
           }

        }
    });
    return avalon;
});