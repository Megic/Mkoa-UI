/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["avalon","../mkoaBase/base","../draggable/avalon.draggable","css!./layer.css"], function (avalon,base) {
    avalon.component("mkoa:layer",{
        url:"",//数据获取地址
        $tpl:"",
        $fvm:"",//父vm名称
        open:false,//关闭状态
        title:"信息",
        width:260,
        height:150,
        layerTpl:'',
        changeTpl:avalon.noop,
        layerOpen:avalon.noop,
        closeLayer:avalon.noop,
        openUrl:avalon.noop,
        draggable: {
        handle: function(e){
            var el = e.target;
            do{
                if(el.className === "layui-layer-title"){
                    return el
                }
            }while(el = el.parentNode)
        },
        $skipArray:["draggable"]
    },
    //插件模板
        $template: base.heredoc(function (vm) {
            /*
            {{$tpl|html}}
             <div ms-if="open" class="layui-layer-shade layui-anim layui-anim-05" >&nbsp;</div>
             <div ms-draggable data-draggable-containment="window"  data-draggable-handle="handle" class="layui-layer layui-anim layui-layer-dialog " ms-css-margin-left="-{{width/2}}" ms-css-margin-top="-{{height/2}}" ms-css-width="width" ms-css-height="height" ms-if="open">
             <div class="layui-layer-title" style="cursor: move;" move="ok">{{title}}</div>
             <div class="layui-layer-content" ms-css-height="height-43"> <div class="layui-layer-content-padding" ms-if="layerTpl" data-include-loaded="changeTpl" ms-include-src="layerTpl"></div></div>
             <span class="layui-layer-setwin"><a class="layui-layer-close" ms-click="closeLayer" href="javascript:;">X</a></span>
             </div>
             */
        }),
        $init:function(vm){
            vm.layerTpl=base.getUrl(vm.layerTpl);
            //切换模板
            vm.openUrl=function(url,title){
                if(url)vm.layerTpl=base.getUrl(url);
                if(title)vm.title=title;
            };
            //关闭弹出层
            vm.closeLayer=function(){
                vm.open=false;
            };
            //关闭弹出层打开VM弹出层
            vm.layerOpen=function(tpl){
                vm.open=true;
                vm.layerTpl=tpl;
            };
            //模板修改
            vm.changeTpl=function(tmpl){
                if(vm.$fvm!=''){
                    tmpl=tmpl.replace(/%fvm%/g,vm.$fvm);
                    tmpl=tmpl.replace(/%layervm%/g,vm.$id);
                }
                return tmpl;

            }


        }
    });




    return avalon;
});