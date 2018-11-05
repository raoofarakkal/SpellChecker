<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ScV2.aspx.cs" Inherits="SpellCheck.ScV2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Spellcheck V2</title>

    <link href="styles/jquery-ui.css" rel="stylesheet" type="text/css"/>
    <link href="styles/ScV2.css" rel="stylesheet" />

    <script src="scripts/jquery-1.8.0.min.js"></script>
    <script src="scripts/jquery-ui.min.js"></script>
    <script src="scripts/common.js"></script>
    <script src="scripts/ScV2.js"></script>
</head>
<body style="margin:0px;  height: 430px;overflow: hidden;" onclick="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();" onscroll="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();">
    <form id="form1" runat="server">
    <div>
        <div id="dvScBodyWorkArea" class="ScWorkArea" onclick="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();" onscroll="javascript:SpellChecker.SpellCheckForm.SugContextMenuClear();"></div>
        <div class="ScToolbar">
            <div class="ScToolbarItem" style="width:650px;height:15px;">
                <div id="dic" runat="server" style="width:145px;height:15px;float:left;color:gray;font-size:12px;margin-top:8px;"></div>
                <div id="progressbar" class="ScProgressbar" style="width:500px;height:15px;float:left;"></div>
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
</html>
