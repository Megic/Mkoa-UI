//ä¯ÀÀÆ÷¼ì²â
(function(){
    function isMobile(){
        return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? !0 : /(Android)/i.test(navigator.userAgent) ? !0 : !1;
    }

    var html=document.getElementsByTagName('html')[0];
    var str;
    if(isMobile()){
        str='isMC';
    }else{
        str='isPC';
    }
//Ìí¼Óä¯ÀÀÆ÷ÀàÐÍÅÐ¶Ï
    html.className=html.className?html.className + " "+str:str;
    var htmlClass=html.className;

    function resize(html){
        var c = "";
        //¼ì²âÆÁÄ»¿í¶È
        var d = document.documentElement.clientWidth;
        1600 > d && (c += " lt1600");
        1400 > d && (c += " lt1400");
        1200 > d && (c += " lt1200");
        1e3 > d && (c += " lt1000");
        960 > d && (c += " lt960");
        640 > d && (c += " lt640");
        500 > d && (c += " lt500");
        400 > d && (c += " lt400");
        html.className = htmlClass + c;
    }
    resize(html);
    window.onresize = function(event) {
        resize(html);
    };

})();