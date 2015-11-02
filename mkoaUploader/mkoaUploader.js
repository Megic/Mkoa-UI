/**
 * Created by Megic on 2015/9/16 0016.
 */
define(["avalon","./Q.uploader","../mkoaQuery/mkoaQuery"], function(avalon,Q,$M){
    function heredoc(fn) {
        return fn.toString()
            .replace(/^[^\/]+\/\*!?\s?/, '')
            .replace(/\*\/[^\/]+$/, '')
    }
    var Uploader = Q.Uploader;

    avalon.component("mkoa:uploader", {
        $tpl:'',
        files:[],//文件数据
        url:'http://localhost:3000/upload?type=file',
        button:".upload-button",//上传按钮选择器
        postData:{},
        allows:'',
        disallows: "",
        //插件模板
        $template: heredoc(function (vm) {
            /*{{$tpl|html}}*/
        }),
        $ready:function(vm,dom){
            new Uploader({
                //--------------- 必填 ---------------
                url: vm.url,            //上传路径
                target: $M(vm.button),
                //view: document.getElementById("upload-view"),
                //target: element,    //上传按钮
                //view: element,      //上传任务视图(若自己实现UI接口，则无需指定此参数)
                //--------------- 可选 ---------------
                html5: true,       //是否启用html5上传,若浏览器不支持,则自动禁用
                multiple:true,    //选择文件时是否允许多选,若浏览器不支持,则自动禁用(仅html5模式有效)
                clickTrigger:true, //是否启用click触发文件选择 eg: input.click() => ie9及以下不支持
                auto: true,        //添加任务后是否立即上传
                data: vm.postData,          //上传文件的同时可以指定其它参数,该参数将以POST的方式提交到服务器
                dataType: "json",  //服务器返回值类型
                workerThread: 4,   //同时允许上传的任务数(仅html5模式有效)
                upName: "upfile",  //上传参数名称,若后台需要根据name来获取上传数据,可配置此项
                allows: vm.allows,        //允许上传的文件类型(扩展名),多个之间用逗号隔开
                disallows:vm.disallows,     //禁止上传的文件类型(扩展名)
                //container:element, //一般无需指定
                //getPos:function,   //一般无需指定
                /*
                 上传回调事件：
                 init,          //上传管理器初始化完毕后触发

                 select,        //点击上传按钮准备选择上传文件之前触发,返回false可禁止选择文件
                 add[Async],    //添加任务之前触发,返回false将跳过该任务
                 upload[Async], //上传任务之前触发,返回false将跳过该任务
                 send[Async],   //发送数据之前触发,返回false将跳过该任务

                 cancel,        //取消上传任务后触发
                 remove,        //移除上传任务后触发

                 progress,      //上传进度发生变化后触发(仅html5模式有效)
                 complete       //上传完成后触发
                 */
                on: {
                    //添加之前触发
                    add: function (task) {
                        if (task.disabled) return alert("允许上传的文件格式为：" + this.ops.allows);
                        //log(task.name + ": 已添加!");
                    },

                    //任务移除后触发
                    remove: function (task) {
                        //log(task.name + ": 已移除!");
                    },

                    //上传之前触发
                    upload: function (task){
                        //exe文件可以添加，但不会上传
                        if (task.ext == ".exe") return false;
                        //
                        ////可针对单独的任务配置参数(POST方式)
                        //task.data = { name: task.name + "_" + Date.now() };
                    },

                    //上传完成后触发
                    complete: function (task) {
                        var index=task.id-1;//下标
                        if (task.state != Uploader.COMPLETE){
                            vm.files[index].state=3;
                            return console.log(task.name + ": 上传失败!");
                        }
                        if (!json||task.json.error){
                            alert(task.json.error);//提示错误信息
                            vm.files[index].state=3;
                            return console.log("返回数据有误");
                        }else{
                            vm.files[index].resData=task.json.data;
                        }
                        //var json = task.json;

                    //    if (!json) return log(task.name + ": 服务器未返回正确的数据");
                    //
                    //    log("服务器返回:  " + (task.response || ""));
                    //    log();
                    }
                },
                UI:{
                    //init,
                    draw:function(task){
                        vm.files.push({
                            id:task.id,
                            name:task.name,
                            ext:task.ext,
                            size:task.size,
                            state:1,//1正在上传  2上传成功  3上传失败
                            //一下属性可能不存在
                            total:task.total?task.total:'',
                            loaded:task.loaded?task.loaded:'',
                            speed:task.speed?task.speed:'',
                            avgSpeed:task.avgSpeed?task.avgSpeed:'',
                            timeStart:task.timeStart?task.timeStart:'',
                            timeEnd:task.timeEnd?task.timeEnd:""
                        })
                    },
                    update:function(task){
                        var index=task.id-1;
                        vm.files[index].total=task.total?task.total:'';
                        vm.files[index].loaded=task.loaded?task.loaded:'';
                        vm.files[index].speed=task.speed?task.speed:'';
                        vm.files[index].avgSpeed=task.avgSpeed?task.avgSpeed:'';
                        vm.files[index].timeStart=task.timeStart?task.timeStart:'';
                        vm.files[index].timeEnd=task.timeEnd?task.timeEnd:"";

                    }   //更新任务界面
                    //over        //任务上传完成
                }
                //UI接口(function),若指定了以下方法,将忽略默认实现
                //UI:{
                //    init,       //执行初始化操作
                //    draw,       //添加任务后绘制任务界面
                //    update,     //更新任务界面
                //    over        //任务上传完成
                //}
            });

        }
    });

    return avalon;
});