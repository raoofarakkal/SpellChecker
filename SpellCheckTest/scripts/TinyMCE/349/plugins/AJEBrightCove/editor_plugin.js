(function () {
    tinymce.PluginManager.requireLangPack('AJEBrightCove');
    tinymce.create('tinymce.plugins.AJEBrightCovePlugin',
        { init: function (ed, url) {
            ed.addCommand('mceAJEBrightCove',
            function () {
                ed.windowManager.open({ file: url + '/dialog.htm', width: 890 + parseInt(ed.getLang('AJEBrightCove.delta_width', 0)), height: 580 + parseInt(ed.getLang('AJEBrightCove.delta_height', 0)), inline: 1 },
                    {plugin_url:url,some_custom_arg:'custom arg'});});ed.addButton('AJEBrightCove',{title:'AJEBrightCove.desc',cmd:'mceAJEBrightCove',image:url+'/img/icon.png'});ed.onNodeChange.add(function(ed,cm,n){cm.setActive('AJEBrightCove',n.nodeName=='IMG');});},createControl:function(n,cm){return null;},getInfo:function(){return{longname:'AJEBrightCove plugin',author:'Babar Mustafa',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/AJEBrightCove',version:"2.0"};}});tinymce.PluginManager.add('AJEBrightCove',tinymce.plugins.AJEBrightCovePlugin);})();