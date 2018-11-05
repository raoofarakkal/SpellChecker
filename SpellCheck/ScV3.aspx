<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ScV3.aspx.cs" Inherits="SpellCheck.ScV3" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Spellcheck V2</title>

    <link href="styles/jquery-ui.css" rel="stylesheet" type="text/css"/>
    <link href="styles/ScV2.css" rel="stylesheet" />
     <link href="styles/definition.css" rel="stylesheet" />
    <script src="scripts/jquery-1.8.0.min.js"></script>
    <script src="scripts/jquery-ui.min.js"></script>
    <script src="scripts/common.js"></script>
    <script src="scripts/ScV3.js"></script>
</head>
    <body style="margin:0px;  height: 430px;overflow: hidden;" onclick="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();" onscroll="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();">
    <form id="form1" runat="server">
    <div>
        <div id="dvScBodyWorkArea" class="ScWorkArea" onclick="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();" onscroll="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();"></div>
        <div class="ScToolbar">
            <div class="ScToolbarItem" style="width:650px;height:15px;">
                <div id="progressbar" class="ScProgressbar" style="width:650px;height:15px;"></div>
            </div>
            <div class="ScToolbarItem" style="width:114px;margin-left:12px;">
                <input id="btUpdate" onclick="SpellChecker.Source.Update()" type="button" class="ButtonMedium ToolButton" value="Apply & Close"  />
            </div>
        </div>    
        <div id="AjaxLoader" class="AjaxLoader" style="background-color:#ffffff;display:none;left: 0;top: 0;position: absolute;width: 825px;height: 430px;" >
            <div style="text-align:center;padding-top:80px;font-weight:bold;font-size:14pt;">
                <div style="display:block;color:#6186BD;">Analyzing content please wait...</div>
                <div style="padding-top:60px;"><img class="imgAjaxLoader" src="images/ajax-loader.gif" style="width:100px;"/></div>
            </div>
        </div>
        <div id="ScWordsFound" style="display:none;"></div>
    </div>
    </form>
</body>
<%--<body style="margin:0px;  height: 430px;overflow: hidden;" onclick="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();" onscroll="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();">--%>
    <div id="divIframeMiscCm" style="top: 246px; left: 593.625px;" class="SpellcheckContextMenu">
<%--<div class="SpellcheckContextMenuHd">Suggested words</div>--%>
<%--<div class="SpellcheckContextMenuItemContainer">--%>
<%--<div class="spellCheckerWordContainer">
<%--  <div id="wrap">
    <div class="SpellcheckContextMenuItem" onClick="$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScReplaceWord('ScMistake_3','UNHCR','Unbar')"> Amman
      <div class="defineWord"> <a href="#">Define</a>
        <div class="arrow-down"></div>
        <div class="arrow-up"></div>
      </div>

    </div>
     <div class="defineWordContent"></div>
  </div>--%>
 
  <!-- end wrap -->
  
<%--  <div id="Div1"> --%>
    <!-- 2 -->
<%--    <div class="SpellcheckContextMenuItem" onClick="$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScReplaceWord('ScMistake_3','UNHCR','Unbar')">Doha
     
                      <div class="defineWordContent">
    
   
        
         <div class="defineWord"><a href="#" >Define</a>
        <div class="arrow-down"></div>
        <div class="arrow-up"></div>
      </div>
                           </div>
    </div>--%>


     <%-- <div id="dvDefinition" style="display:none;">



      </div>--%>
      
<%--    <div class="defineWordContent">
      <div class="entry_container">
        <div class="entry lang_en-gb" id="Div2"><span class="inline">
          <h1 class="hwd">incongruity</h1>
          <span> (</span><span class="pron" type="">ËŒÉªnkÉ’Å‹ËˆÉ¡ruËÉªtÉª<a href="#" class="playback"><img src="https://api.collinsdictionary.com/external/images/redspeaker.gif?version=2015-05-03-1835" alt="Pronunciation for incongruity" class="sound" title="Pronunciation for incongruity" style="cursor: pointer"></a>
          <audio type="pronunciation" title="incongruity">
            <source type="audio/mpeg" src="https://api.collinsdictionary.com/media/sounds/sounds/2/281/28132/28132.mp3">
            Your browser does not support HTML5 audio.</audio>
          </span><span>)</span></span>
          <div class="hom" id="Div3"><span class="gramGrp"><span> </span><span class="pos">noun</span></span><span class="inline"><span> </span><span class="lbl">plural</span><span> </span><span class="orth">ties</span></span>
            <div class="sense"><span class="sensenum"> 1 </span><span class="def">something incongruous</span></div>
            <div class="sense"><span class="sensenum"> 2 </span><span class="def">the state or quality of being incongruous</span></div>
            not found. End of DIV sense</div>
          not found.- End of DIV entry lang_en-gb</div>
      </div>
      
      <!-- /2 --> 
    </div>--%>
<%--  </div>--%>
  <!-- end wrap -->
  
<%--  <div id="Div4"> 
    <!-- 2 -->
    <div class="SpellcheckContextMenuItem" onClick="$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScReplaceWord('ScMistake_3','UNHCR','Unbar')">Hog
      <div class="defineWord"> <a href="#">Define</a>
        <div class="arrow-down"></div>
        <div class="arrow-up"></div>
      </div>
    </div>
    <div class="defineWordContent">
      <div class="entry_container">
        <div class="entry lang_en-gb" id="Div5"><span class="inline" id="spn">
     </span>
          <div class="hom" id="Div6"><span class="gramGrp"><span> </span><span class="pos">noun</span></span><span class="inline"><span> </span><span class="lbl">plural</span><span> </span><span class="orth">ties</span></span>
            <div class="sense"><span class="sensenum"> 1 </span><span class="def">something incongruous</span></div>
            <div class="sense"><span class="sensenum"> 2 </span><span class="def">the state or quality of being incongruous</span></div>
            not found. End of DIV sense</div>
          not found.- End of DIV entry lang_en-gb</div>
      </div>
      
      <!-- /2 --> 
    </div>
  </div>--%>
  <!-- end wrap -->
  
<%--  <div class="hLine"></div>
  <div class="SpellcheckContextMenuItemNc"><span onClick="$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScAddToDic('UNHCR')" style="cursor:pointer;color:#6186BD;">Add <span style="font-weight:bold;color:red;">Amman</span> to dictionary?</span></div>
  <div class="hLine"></div>
  <div class="SpellcheckContextMenuItemNc">
    <input id="scCustRepl" value="UNHCR" type="text">
    &nbsp;
    <input type="button" value="Replace" title="Replace and Add to dictionary" onClick="$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScReplaceWord('ScMistake_3', 'UNHCR', $('#scCustRepl').val())">
  </div>--%>
 <%--</div> --%>
<script>
    var xx = 0;
    $('.arrow-up').css('display', 'none');
    $(".").mousedown(function defineWord() {
        $(this).show();
        if ($('.SpellcheckContextMenuItem').hasClass('selected')) {
           
            $('#wrap .defineWordContent').not($(this)).slideUp();
            if ($(this).parent().hasClass('selected')) {
                $('.arrow-down').not($(this)).show();
                $('.arrow-up').not($(this)).hide();
                $('.SpellcheckContextMenuItem').removeClass('selected');
                return;
            }
        }
        $('.arrow-down').not($(this)).show();
        $('.arrow-up').not($(this)).hide();
        $(this).parent().next().slideDown();
        $('.SpellcheckContextMenuItem').removeClass('selected');
        
     
        
        $(this).parent().addClass('selected');
        SpellChecker.SpellCheckForm.ScDefineWord($('.selected')[0].innerText.replace('Define', '').trim());
        //$(".selected").append($('.defineWordContent'));
        xx = 1;
        if ($(this).parent().hasClass('selected')) {
            $(this).find('.arrow-up').show();
            $(this).find('.arrow-down').hide();
            $('.defineWord').not($(this)).hide();

        }

    });

    $(".SpellcheckContextMenuItem").mouseover(function () {
        if ($(this).find('.arrow-down').css('display') == 'none')
        { xx = 1; } else { xx = 0; }
        $(this).find('.defineWord').show();

    });
    $(".SpellcheckContextMenuItem").mouseout(function () {
        $(this).find('.defineWord').hide();
        if (xx == 1) {
            $(this).find('.defineWord').show();
        } else if (xx == 0)
        { $(this).find('.defineWord').hide(); }
    });


</script>
</html>
