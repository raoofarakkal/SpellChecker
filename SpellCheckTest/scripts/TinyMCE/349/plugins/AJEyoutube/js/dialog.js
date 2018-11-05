 tinyMCEPopup.requireLangPack();

 var AJEyoutubeDialog = {
     init: function () {
     },

     insert: function () {
         // Insert the contents from the input into the document
         //var embedCode = '<object width="'+document.forms[0].AJEyoutubeWidth.value+'" height="'+document.forms[0].AJEyoutubeHeight.value+'"><param name="movie" value="http://www.AJEyoutube.com/v/'+'o7r8wrKiw9s'+'&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.AJEyoutube.com/v/'+document.forms[0].AJEyoutubeID.value+'&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="'+document.forms[0].AJEyoutubeWidth.value+'" height="'+document.forms[0].AJEyoutubeHeight.value+'"></embed></object><br><p>babar</p>';
         var skin = '&skin=/AJEPlayer/skins/default.swf';
         var preImage = '&image=' + document.forms[0].PreImageURL.value;
         var playerHeight = document.forms[0].AJEyoutubeHeight.value;
         var playerWidth = document.forms[0].AJEyoutubeWidth.value;


         var otherControls;
         var otherControlsEmbed;
         if (document.forms[0].rbSingle.checked) {
             var videoId = document.forms[0].AJEyoutubeID.value;
             if (document.forms[0].NoControlBar.checked) {
                 otherControls = '&controlbar=none&plugins=none&mute=false&volume=50';
                 otherControlsEmbed = '&controlbar=none&plugins=none&mute=false&volume=50';
             }
             else {
                 var html = ['&lt;object width=&quot;'];
                 html.push(playerWidth + '&quot; height=&quot;' + playerHeight + '&quot; &gt;')
                 html.push();
                 html.push('&lt;param name=&quot;movie&quot; value=&quot;http://www.youtube.com/v/');
                 html.push(videoId);
                 html.push('&quot; &gt;&lt;/param&gt;');
                 html.push('&lt;param name=&quot;allowFullScreen&quot; value=&quot;true&quot;&gt;&lt;/param&gt;');
                 html.push('&lt;param name=&quot;allowscriptaccess&quot; value=&quot;always&quot;&gt;&lt;/param&gt;');
                 // html.push('&lt;embed &#115;&#114;&#99;=&quot;http://www.youtube.com/v/');
                 html.push('&lt;embed src  =&quot;http://www.youtube.com/v/');
                 html.push(videoId);
                 html.push('&quot; ');
                 html.push('type=&quot;application/x-shockwave-flash&quot; allowscriptaccess=&quot;always&quot; ');
                 html.push('allowfullscreen=&quot;true&quot; width=&quot;' + playerWidth + '&quot; height=&quot;' + playerHeight + '&quot;&gt;&lt;/embed&gt;');
                 html.push('&lt;/object&gt;');

                 if (document.forms[0].NoEmbedCode.checked) {
                     otherControlsEmbed = '&plugins=viral-2&viral.onpause=true&viral.allowmenu=true&viral.functions=link&viral.email_footer=Al Jazeera Network';
                     otherControls = '&plugins=viral-2&viral.onpause=true&viral.allowmenu=true&viral.functions=link&viral.email_footer=Al Jazeera Network';
                 }
                 else {
                     otherControlsEmbed = '&plugins=viral-2&viral.onpause=true&viral.allowmenu=true&viral.functions=embed,link&viral.email_footer=Al Jazeera Network&viral.embed=' + html.join('');
                     otherControls = '&plugins=viral-2&viral.onpause=true&viral.allowmenu=true&viral.functions=embed,link&viral.email_footer=Al Jazeera Network&viral.embed=' + html.join('');
                 }
             }

             var abtText = '&abouttext=Aljazeera';
             var abtURL = '&aboutlink=http://english.aljazeera.net/aboutus';
             var options = '&stretching=fill';
             var embedCode = '<object id="plyr_' + videoId + '" width="' + playerWidth + '" height="' + playerHeight + '"><param name="movie" value="/AJEPlayer/player-licensed-viral.swf" /><param name="wmode" value="transparent"><param name="allowfullscreen" value="true"><param name="flashvars" value="file=http://www.youtube.com/watch?v=' + videoId + preImage + abtText + abtURL + skin + options + otherControls + '" /><embed id="plyr2_" src="/AJEPlayer/player-licensed-viral.swf" wmode="transparent" allowfullscreen="true" flashvars="file=http://www.youtube.com/watch?v=' + videoId + preImage + abtText + abtURL + skin + options + otherControlsEmbed + '" width="' + playerWidth + '" height="' + playerHeight + '"></embed></object>';


         }
         else {
             var playlistUrl = document.forms[0].AJEPlaylist.value;
             var playlistSize = document.forms[0].AJEPlaylistSize.value;
             var abtText = '&abouttext=Aljazeera';
             var abtURL = '&aboutlink=http://english.aljazeera.net/aboutus';
             var options = '&stretching=fill&playlist=bottom&backcolor=000000&frontcolor=b48310&lightcolor=333333&screencolor=000000&playlistsize=' + playlistSize;
             otherControls = '&plugins=none';
             var embedCode = '<object id="playlist_" width="' + playerWidth + '" height="' + playerHeight + '"><param name="movie" value="/AJEPlayer/player-licensed-viral.swf" /><param name="wmode" value="transparent"><param name="allowfullscreen" value="true"><param name="flashvars" value="file=' + playlistUrl + abtText + abtURL + skin + options + otherControls + '" /><embed id="playlist2_" src="/AJEPlayer/player-licensed-viral.swf" wmode="transparent" allowfullscreen="true" flashvars="file=' + playlistUrl + abtText + abtURL + skin + options + otherControls + '" width="' + playerWidth + '" height="' + playerHeight + '"></embed></object>';

         }
         tinyMCEPopup.editor.execCommand('mceInsertRawHTML', false, embedCode);
         tinyMCEPopup.close();
     }
 };

tinyMCEPopup.onInit.add(AJEyoutubeDialog.init, AJEyoutubeDialog);