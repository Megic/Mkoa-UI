/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["avalon","../mkoaAjax/mkoaAjax","../mkoaBase/base"], function (avalon,$a,base) {
    avalon.component("mkoa:option",{
        url:"",//数据获取地址
        field:"id|name",//显示字段名称
        $select:'',
        id:'',
        currentPage:1,
        perPages:100,
        totalItems:0,
        watchvm:'',
        watchdata:'',
        //插件模板
        list:[],
        $template:'{{$select|html}}',
        $init:function(vm,node){
            vm.id=vm.$id;
            vm.url=base.getUrl(vm.url);
            //监控值
            if(vm.watchvm!=''){
                var duplex=node.innerHTML.match(/ms-duplex="(.*)"/).toString().split('"')[1];//获取绑定的字符串
                avalon.vmodels[vm.watchvm].$watch(vm.watchdata,function(value, oldValue){
                    getData();
                });
            }
            getData();
            function getData(){
                var option={};
                option['currentPage']=vm.currentPage;//当前页码
                option['perPages']=vm.perPages;//每页页数
                option['model']=vm.model;//查询模型
                option['field']=vm.field;//显示字段
                option['t']=new Date().getTime();
                var go=true;
                if(vm.watchvm!=''){
                    var objstr=vm.watchdata.split('.');
                    var len=objstr.length;
                    option[objstr[len-1]]=avalon.vmodels[vm.watchvm];
                    for(var i=0;i<len;i++){//ajax请求带上监控属性
                        option[objstr[len-1]]=option[objstr[len-1]][objstr[i]];
                    }

                    if(!option[objstr[len-1]]){
                        go=false;
                        vm.list.removeAll();
                        //重置绑定的ms-duplex
                        var duplexArr=duplex.split('.');
                        var duplexlen=duplexArr.length;
                        var duplexObj=avalon.vmodels[vm.watchvm];
                        for(var k=0;k<duplexlen-1;k++){
                            duplexObj= duplexObj[duplexArr[k]];
                        }
                        duplexObj[duplexArr[duplexlen-1]]='';
                    }
                }
                if(go) {
                    $a.getJSON(vm.url, option, function (data) {//获取列表数据
                        if (!data.error) {
                            vm.totalItems = data.data.count;
                            vm.list = data.data.rows;
                        }
                    });
                }
            }


        }
    });

    return avalon;
});