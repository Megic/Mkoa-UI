/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["avalon"], function (avalon) {
    var base={};
    //ÐÞ¸´µØÖ·Ç°×º
    base['getUrl']=function(url){
        var $HOST='http://'+window.location.host;
        if((url.indexOf('http://')==-1)&&(url.indexOf('../')==-1)&&(url.indexOf('./')==-1)){
            if(url.indexOf('/')!=0)$HOST=$HOST+'/';
            return $HOST+url;
        }else{
            return url;
        }
    };
    //avalon²å¼þ×¢ÊÍ×ª³ÉÄ£°å×Ö·û´®
    base['heredoc']=function(fn){
        return fn.toString()
            .replace(/^[^\/]+\/\*!?\s?/, '')
            .replace(/\*\/[^\/]+$/, '')
    };
    return base;
});