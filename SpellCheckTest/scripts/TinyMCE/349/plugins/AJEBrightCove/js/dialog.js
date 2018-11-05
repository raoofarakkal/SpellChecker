 tinyMCEPopup.requireLangPack();

 var AJEBrightCoveDialog = {
     init: function () {
     },

     insert: function () {

         var playerHeight = document.forms[0].AJEBrightCoveHeight.value;
         var playerWidth = document.forms[0].AJEBrightCoveWidth.value;
         var videoId = document.forms[0].AJEBrightCoveID.value;

         var w = document.forms[0].AJEBrighCoveAlign.selectedIndex;
         var boxAlign = document.forms[0].AJEBrighCoveAlign.options[w].text;

         var playerId = "1659202290001"; //default player with 300 x 156

         var playerKey = "'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbsvGhBF2HH9AIl2IepBSbw'";

         if (playerWidth == 680) {
             playerId = "1659202292001";
             playerKey = "'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbsT0Mq3k9H8GCa4jV3vL4M'";
         }

         if (playerWidth == 330) {
             playerId = "1659202291001";
             playerKey = "'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJaOnnPgAFUa3RPnyd849QP8'";
         }

         if (playerWidth == 300) {
             playerId = "1659202290001";
             playerKey = "'AQ~~,AAAAmtVJIFk~,TVGOQ5ZTwJbsvGhBF2HH9AIl2IepBSbw'";
         }

         var html = ['<div class="mceVideoBox" style="width:' + playerWidth + ';height:' + playerHeight + ';float:' + boxAlign + ';">'];
         html.push('<div id="bc_' + videoId + '" style="width:' + playerWidth + ';height:' + playerHeight + ';" >')
         html.push('<!-- --></div>');
         html.push('<script type="text/javascript">');
         html.push('RenderGeneralBCVideo(' + videoId + ',' + playerId + ',' + playerKey + ',' + playerWidth + ',' + playerHeight + ', "bc_' + videoId + '");');
         html.push('brightcove.createExperiences();');
         html.push('</script></div><p>&nbsp;</p>');
         
         tinyMCEPopup.editor.execCommand('mceInsertRawHTML', false, html.join(''));
         tinyMCEPopup.close();
     }
 };

tinyMCEPopup.onInit.add(AJEBrightCoveDialog.init, AJEBrightCoveDialog);