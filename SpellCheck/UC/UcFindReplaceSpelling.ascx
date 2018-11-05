<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UcFindReplaceSpelling.ascx.cs" Inherits="SpellCheck.UC.UcFindReplaceSpelling" %>

<div class="dvMain" >
    <div>

        <table id="dvScMain">
            <tr>
                <td>
                    <div id="dvScBodyWorkArea" class="divFindPane_ScBody divScBody">
                    </div>
                    <div id="dvScBodyWorkAreaScripts" style="display:none;"></div>
                </td>
                <td>
                    <div id="dvFindPane" class="divFindPane_ScBody divFindPane" style="display:block;">
                        <div class="FindPaneLabel">Not in Dictionary</div>
                        <div>
                            <input id="tbWrongWord" type="text" Class="FindPaneData" readonly="readonly"/>
                            <input id="btAdd2Dictionary" onclick="Add2Dictionary()" type="button" Class="ButtonMedium" value="Add to Dictionary" style="width:120px;" /></div>
                        <div class="Hspacer"></div>
                        <div class="FindPaneLabel">Suggestions</div>
                        <div>
                            <select id="lbSuggestions" size="10" style="width:365px; overflow:auto;color:darkgreen;font-weight:bold;" onchange="ReadyToReplace(this);" onDblClick="if(ReadyToReplace(this)) replace();"  >
                            </select>
                        </div>
                        <div class="Hspacer"></div>
                        <div class="FindPaneLabel">Replace with</div>
                        <div>
                            <input id="tbReplaceWord" type="text" Class="FindPaneData" style="color:maroon;"/>
                            <input id="hfReplaceWordId" type="hidden" Class="FindPaneData"/>
                            <input id="btReplace" onclick="replace()" type="button" Class="ButtonMedium" value="Replace" style="width:120px;" />
                        </div>
                        <div  class="Hspacer2">
                            <div style="padding-top:10px;color:#666;">
                                <div id="progressbar" style="width:366px;height:15px;"></div>

<%--                                <span style="font-weight:bold">Dictionary : <asp:Label ID="lbCurDc" runat="server" Text=""></asp:Label></span>
                                &nbsp;&nbsp;<span style="color:red;font-weight:bold;" ID="lbStat"></span>--%>

                            </div>
                        </div>
                        <div>
                            <div style="float:left;width:114px"><input id="btPrevious" onclick="PreviousSc()" type="button" Class="ButtonMedium ToolButton" value="Previous"  /></div>
                            <div style="float:left;width:114px;margin-left:12px;"><input id="btNext" onclick="nextSc()" type="button" Class="ButtonMedium ToolButton" value="Next"  /></div>
                            <div style="float:left;width:114px;margin-left:12px;"><input id="btUpdate" onclick="UpdateCaller()" type="button" Class="ButtonMedium ToolButton" value="Apply & Close"  /></div>
                        </div>
                        <div style="clear:both;display:none" id="splchkWordsFound"></div>
                    </div>
                    <div id="AjaxLoader" class="divFindPane_ScBody divFindPane" style="background-color:#ffffff;display:none;" >
                        <div style="text-align:center;padding-top:80px;font-weight:bold;font-size:14pt;">
                            <div style="display:none;">L O A D I N G . . . </div>
                            <div style="padding-top:60px;"><img src="images/ajax-loader.gif" style="width:100px;"/></div>
                        </div>
                    </div>

                </td>
            </tr>

        </table>
    </div>
</div>


