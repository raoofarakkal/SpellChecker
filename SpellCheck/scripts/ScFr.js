
var currentViewIndex = -1;
var SplitContents;
var SplitContentsIdx;
var SubmitContentDelay = 5;
var Processed = new Array();


$(document).ready(function () {
    var mControlNames;
    var mControls = getControls();
    if (mControls.length > 0) {
        setArticleBodyContentFromArray(mControls);
    } else {
        //setArticleBodyContent(document.getElementById('divTest').innerHTML); //testing purpose only
        setArticleBodyContent(window.parent.tinyMCE.activeEditor.getContent());
    }
});

function getControls() {
    var mControls = [];
    var mControlNames = [];
    try {
        var mTemp = getUrlParaCaseSensitive()['Controls'];
        if (mTemp) {
            //Controls=<ControlName>;<DisplayName>;<Type of Control>,<ControlName>;<DisplayName>;<Type of Control>,...     |||||| Type of Control = html|TinyMCE
            //example: Controls=historic;historic title;html,body1;Main Story;tinyMCE,body2;Summary Data;html
            mControlNames = mTemp.split(',');
        }
        for (i = 0; i < mControlNames.length; i++) {
            if (mControlNames[i]) {
                var mCtrlName = mControlNames[i].split(';')[0];
                var mDispName = mControlNames[i].split(';')[1];
                var mCtrlType = mControlNames[i].split(';')[2];
                var mtype;
                var mCtrlContent="";
                if (mCtrlType && mCtrlType.toLowerCase() == "tinymce") {
                    mtype = "tinymce";
                    try{
                        mCtrlContent = window.parent.tinyMCE.get(mCtrlName).getContent();
                    }catch(ex){}
                } else {
                    mtype = "html";
                    try{
                        mCtrlContent = window.parent.$('#' + mCtrlName).val();
                    }catch(ex){}
                }
                mControls.push({ name: mCtrlName, dispName: mDispName, type: mtype, content: mCtrlContent })
            }
        }
    } catch (ex) { }
    return mControls;
}

function UpdateCaller() {
    var Elms = $('.BODYSCTEXT');
    var mIsCalledFromTinyMCE = false;
    if (Elms != null) {
        if (Elms.length > 0) {
            var lookFor = new Array(Elms.length);
            var replaceWith = new Array(Elms.length);
            for (i = 0; i < Elms.length; i++) {
                $(Elms[i]).removeAttr('style');
                $(Elms[i]).removeAttr('id');
                $(Elms[i]).removeAttr('title');
                $(Elms[i]).removeAttr('class');
                lookFor[i] = Elms[i].outerHTML;
                replaceWith[i] = Elms[i].innerHTML;
            }

            for (i = 0; i < lookFor.length; i++) {
                var changed = $('#dvScBodyWorkArea').html().replace(lookFor[i], replaceWith[i]);
                //$('#dvScBodyWorkArea').html(changed);
                document.getElementById('dvScBodyWorkArea').innerHTML = changed;
            }

            var mControls = getControls();
            if (mControls.length > 0) {
                for (i = 0; i < (mControls.length) ; i++) {
                    var mContent = $("#dvScBodyWorkArea #SC_" + mControls[i].name + "_content").html();
                    if (mControls[i].type == "tinymce") {
                        try{
                            window.parent.tinyMCE.get(mControls[i].name).setContent(mContent);
                        }catch(ex){}
                    } else {
                        try{
                            window.parent.$("#" + mControls[i].name).val(mContent)
                        }catch(ex){}
                    }
                }
            } else {
                var mContent = '';
                mContent = $('#dvScBodyWorkArea').html();
                window.parent.tinyMCE.activeEditor.setContent(mContent);

                mIsCalledFromTinyMCE = true;
            }

        }
    }
    closeSc(mIsCalledFromTinyMCE);
}

function closeSc(pFromTinyMCE) {
    if (pFromTinyMCE) {
        window.parent.tinyMCE.activeEditor.windowManager.close(this);
    } else {
        window.parent.clearPopUp();
    }
}

function Busy(busy) {
    if (busy) {
        $('#AjaxLoader').show();
        $('#dvFindPane').hide();
    } else {
        $('#dvFindPane').show();
        $('#AjaxLoader').hide();
    }
}

function progress(pVal) {
    if (pVal != null) {
        if (isNumber(pVal)) {
            if (pVal > 0 && pVal < 100) {
                $("#progressbar").show();
                $("#progressbar").progressbar({ value: pVal });
            } else {
                $("#progressbar").hide();
            }
        } else {
            $("#progressbar").hide();
        }
        //document.getElementById('lbStat').innerText = "Processing " + value.toString() + "%";//.toFixed(0).toString() + "%";//SplitContentsIdx.toString() + " out of " + (SplitContents.length - 1).toString();
    } else {
        $("#progressbar").hide();
        //document.getElementById('lbStat').innerText = "";
    }
}

function isContentValid(pCont) {
    var mRet = false
    if (pCont != null) {
        if (pCont != '') {
            if ($.trim(pCont).length > 0) {
                if (!isNumber($.trim(pCont))) {
                    mRet = true;
                }
            }
        }
    }
    return mRet;
}

function setArticleBodyContentFromArray(pArray) {
    var mScScripts = "";
    var mContent = "";
    var mContentSC = "";
    var mSep = "";
    for (i = 0; i < (pArray.length) ; i++) {
        if (pArray[i].content) {
            mContent += mSep;
            mContent += "<div id='SC_" + pArray[i].name + "' title='" + pArray[i].name + "'>";
            mContent += "<div id='SC_" + pArray[i].name + "_name' style='padding:5px;background-color:#6186BD;color:White;border:1px solid #6186BD;font-weight:bold'></div>";
            mScScripts += "\n$('#SC_" + pArray[i].name + "_name').html(unescape('" + pArray[i].dispName.toUpperCase() + "'));";
            mContent += "<div id='SC_" + pArray[i].name + "_content'>" + pArray[i].content + "</div>";
            mContent += "</div>";
            mContentSC += " " + pArray[i].content;
            mSep = "<div style='height:10px;'></div>";
        }
    }
    $("#dvScBodyWorkAreaScripts").html(mScScripts);
    setArticleBodyContent(mContent, mContentSC);
}

function setArticleBodyContent(pContentWa, pContent4SC) {
    Busy(true);
    currentViewIndex = -1;
    if (!pContent4SC) {
        pContent4SC = pContentWa;
    }
    var elemWa = document.getElementById('dvScBodyWorkArea');
    elemWa.innerHTML = pContent4SC;
    pContent4SC = $(elemWa).text().split('.');
    elemWa.innerHTML = pContentWa;
    if ($(elemWa).text().length > 0) {
        SplitContents = pContent4SC; //$(elemWa).text().split('.');
        //SplitContents = $(elemWa).text().split('\n');
        SplitContentsIdx = 0;
        //alert('test');
        SubmitContent();
    }
    //if (elemWa.innerText.length > 0) {
    //    SplitContents = elemWa.innerText.split('\n');
    //    SplitContentsIdx=0;
    //    //alert('test');
    //    SubmitContent();
    //}

}




function SubmitContent() {
    //alert('Content : ' + SplitContents[SplitContentsIdx]);

    if (!isContentValid(SplitContents[SplitContentsIdx])) {
        //alert('Content : ' + SplitContents[SplitContentsIdx]);
        SplitContentsIdx++;
        if (SplitContentsIdx < SplitContents.length) {
            setTimeout(SubmitContent, SubmitContentDelay);
        } else {
            progress(null);
        }
    } else {
        var percent = (SplitContentsIdx * 100) / (SplitContents.length - 1);
        progress(percent);//document.getElementById('lbStat').innerText = "Processing " + percent.toFixed(0).toString() + "%";//SplitContentsIdx.toString() + " out of " + (SplitContents.length - 1).toString();
        $.ajax(
        {
            type: "POST"
                , async: true
                , url: "Suggest.ashx"
                , data: "cmd=getSuggestions&content=" + SplitContents[SplitContentsIdx]
                , async:true
                , error: function (xhr, ajaxOptions, thrownError) {
                    currentViewIndex = -1;
                    //alert('Error on request. Generica handler articlefr');
                    if (xhr.status == 500) {
                        document.write('Error: Suggest.ashx. xhr.status: ' + xhr.status + '.  thrownError: ' + thrownError + '. xhr.responseText: ' + xhr.responseText);// alert('Error: Suggest.ashx ' + xhr.status + ' ' + thrownError + ' ' + xhr.responseText);
                    } else {
                        //alert('Error: Suggest.ashx. xhr.status: ' + xhr.status + '.  thrownError: ' + thrownError + '. xhr.responseText: ' + xhr.responseText);
                        document.write('Error: Suggest.ashx. xhr.status: ' + xhr.status + '.  thrownError: ' + thrownError + '. xhr.responseText: ' + xhr.responseText);// alert('Error: Suggest.ashx ' + xhr.status + ' ' + thrownError + ' ' + xhr.responseText);
                    }
                }
                , success: function (response) {
                    Busy(false);
                    var JSON = null;
                    //currentViewIndex = -1;
                    try {
                        JSON = jQuery.parseJSON(response);
                        if (JSON != undefined) {
                            var sT = document.getElementById('dvScBodyWorkArea').scrollTop;
                            var sL = document.getElementById('dvScBodyWorkArea').scrollLeft;
                            process(JSON);
                            document.getElementById('dvScBodyWorkArea').scrollTop = sT;
                            document.getElementById('dvScBodyWorkArea').scrollLeft = sL;
                            if (currentViewIndex == -1) {
                                var Elms = getBodyScTextElements();//$('.BODYSCTEXT')
                                if (Elms != null) {
                                    if (Elms.length > 0) {
                                        currentViewIndex = 0;
                                        FocusSc();
                                    }
                                }

                            }
                            SplitContentsIdx++;
                            if (SplitContentsIdx < SplitContents.length) {
                                //setInterval(function () { SubmitContent(); }, 1000);
                                setTimeout(SubmitContent, SubmitContentDelay);
                            } else {
                                progress(null);// document.getElementById('lbStat').innerText = "";
                            }
                        } else {
                            alert("JSON undefined. " + response);
                        }
                    }
                    catch (e) {
                        //document.getElementById('lbStat').innerText = e.message;
                        alert('JSON parse Error. '+e.message+'. '+response);
                    }
                }
            }
        );
    }
}


//Discontinued for paragraph based process
//function setArticleBodyContent2(content) {
//    Busy(true);
//    currentViewIndex = -1;
//    var elemWa = document.getElementById('dvScBodyWorkArea');
//    elemWa.innerHTML = content;
//    if ($(elemWa).text().length > 0) {

//        $.ajax(
//            {
//                type: "POST"
//                , async: true
//                , url: "Suggest.ashx"
//                , data: "cmd=getSuggestions&content=" + $(elemWa).text()
//                , error: function (xhr, ajaxOptions, thrownError) {
//                    currentViewIndex = -1;
//                    //alert('Error on request. Generica handler articlefr');
//                    alert('Error: Suggest.ashx ' + xhr.status + ' ' + thrownError + ' ' + xhr.responseText);
//                }
//                , success: function (response) {
//                    //alert(response);
//                    Busy(false);
//                    var JSON = null;
//                    currentViewIndex = -1;
//                    try {
//                        JSON = jQuery.parseJSON(response);
//                        if (JSON != undefined) {
//                            process(JSON);
//                        }
//                    }
//                    catch (e) {
//                    }
//                }
//            }
//        );

//    } else {
//        Busy(false);
//        //alert('Empty text found');
//    }
//}


function isPorcessed(word) {
    var ret = false;
    for (var i = Processed.length - 1; i >= 0; i--) {
        if (Processed[i] === word) {
            ret = true;
            break;
        }
    }
    return ret;
}

function process(Json) {
    if (Json.TotalWords > 0) {
        for (i = 0; i < Json.TotalWords; i++) {
            var sug = "";
            var comma = "";
            for (s = 0; s < Json.Words[i].TotalSuggestions; s++) {
                sug += comma + Json.Words[i].Suggestions[s];
                comma = ",";
            }
            if (!isPorcessed(Json.Words[i].Word.toLowerCase())) {

                //Commended on 4-Jun-2015 ----- repeated words are not highlighted, using below code: $("#dvScBodyWorkArea *").highlight instead
                //var change = HtmlHighlight($('#dvScBodyWorkArea').html(), Json.Words[i].Word, '<span class=\'BODYSCTEXT\' title="' + sug + '" style=\'border-bottom:1px dashed red;\'>', '</span>');
                ////$('#dvScBodyWorkArea').html(change); //commented because sometimes its throw this error 'Could not complete the operation due to error 80020101'
                //document.getElementById('dvScBodyWorkArea').innerHTML = change;

                //introduced on 4-Jun-2105 -- to highlight repeated words
                $("#dvScBodyWorkArea *").highlight(Json.Words[i].Word, "<span class=\"BODYSCTEXT\" title=\"" + sug + "\" style=\"border-bottom:1px dashed red;\">", "</span>", "BODYSCTEXT");



                Processed[Processed.length] = Json.Words[i].Word.toLowerCase();
                pushWordsFound(Json.Words[i].Word);
            }
        }
        //currentViewIndex = 0;
        //FocusSc();
        eval($("#dvScBodyWorkAreaScripts").html());
    } else {
        //alert('No mistakes found.');
    }
}

function pushWordsFound(pWord) {
    var mSep = "";
    if (pWord) {
        if (pWord.trim().length > 0) {
            if ($("#splchkWordsFound").text()) {
                if ($("#splchkWordsFound").text().length > 0) {
                    mSep = " , ";
                }
            }
            $("#splchkWordsFound").text($("#splchkWordsFound").text() + mSep + pWord);
        }
    }
}

function getBodyScTextElements() {
    var Elms = $('.BODYSCTEXT')
    if (Elms != null) {
        if (Elms.length > 0) {
            for (i = (Elms.length - 1) ; i >= 0; i--) {
                if (Elms[i].title == '') {
                    Elms.splice(i, 1);
                }
            }
        }
    }
    return Elms;
}

function FocusSc() {
    var Elms = getBodyScTextElements();//$('.BODYSCTEXT')
    if (Elms != null) {
        if (Elms.length > 0) {
            for (i = 0; i < Elms.length; i++) {
                $(Elms[i]).css('background-color', '');
                $(Elms[i]).css('color', '');
                $(Elms[i]).css('border-top', '');
                $(Elms[i]).css('border-bottom', '1px dashed red');
                $(Elms[i]).css('line-height', '');
                if ($(Elms[i]).attr("id")==null) {
                    $(Elms[i]).attr("id", "BODY_SC_" + i);
                }
            }
            if (currentViewIndex >= 0 && currentViewIndex < Elms.length) {
                $(Elms[currentViewIndex]).css('background-color', 'yellow');
                $(Elms[currentViewIndex]).css('color', 'black');
                $(Elms[currentViewIndex]).css('border-top', '1px dashed red');
                //$(Elms[currentViewIndex]).css('line-height', '25px');


                //Working fine except when there is table object
                document.getElementById('dvScBodyWorkArea').scrollTop = Elms[currentViewIndex].offsetTop;



                setRightPane(Elms[currentViewIndex]);
            }
        }
    }
}



function nextSc() {
    var Elms = getBodyScTextElements();
    if (Elms != null) {
        if (Elms.length > 0) {
            if (currentViewIndex < (Elms.length - 1)) {
                currentViewIndex++;
            }
            FocusSc();
        }
    }
}

function PreviousSc() {
    var Elms = getBodyScTextElements();
    if (Elms != null) {
        if (Elms.length > 0) {
            if (currentViewIndex > 0) {
                currentViewIndex--;
            }
            FocusSc();
        }
    }
}

function setRightPane(elem) {
    document.getElementById('tbWrongWord').value = $(elem).text();
    document.getElementById('tbReplaceWord').value = $(elem).text();
    var lbSuggestions = document.getElementById('lbSuggestions')
    lbSuggestions.options.length = 0;
    var Suggestions;

    var sug = $(elem).attr("title").split(",");
    for (i = 0;i<sug.length;i++){
        Suggestions = document.createElement("Option");
        var sugg = setCorrectCase($(elem).text(), sug[i]);
        Suggestions.text = sugg;
        Suggestions.value = sugg; //elem.id;
        lbSuggestions.add(Suggestions);
    }
    document.getElementById('hfReplaceWordId').value = elem.id;
}

function setCorrectCase(sourceWord, Sug) {
    if (sourceWord.substring(0, 1) == sourceWord.substring(0, 1).toUpperCase()) {
        if (sourceWord == sourceWord.toUpperCase()) {
            return Sug.toUpperCase();
        }
        else {
            return UppercaseFirst(Sug);
        }
    }
    else {
        return Sug;
    }
}

function UppercaseFirst(s){
    if (s != "") {
        if (s.length > 1) {
            return s.substring(0, 1).toUpperCase() + s.substring(1);
        } else {
            return s;
        }
    } else {
        return s;
    }
}

function ReadyToReplace(lb) {
    if (lb[lb.selectedIndex].text != "no suggestions found") {
        document.getElementById('tbReplaceWord').value = lb[lb.selectedIndex].text;
        return true;
    }else{
        return false;
    }
}

function replace() {

    var tbReplaceWord = document.getElementById('tbReplaceWord');
    var hfReplaceWordId = document.getElementById('hfReplaceWordId');
    var BodyScSelectedText = document.getElementById(hfReplaceWordId.value)
    BodyScSelectedText.innerHTML = tbReplaceWord.value;
    $(BodyScSelectedText).removeAttr('style');
    var id = $(BodyScSelectedText).attr("id");
    $(BodyScSelectedText).attr("id", id.replace('BODY_SC_', 'BODY_SC_R_'));
    $(BodyScSelectedText).removeAttr('title');
    $(BodyScSelectedText).attr("style", "border-bottom:1px dashed green;");

    tbReplaceWord.value = "";
    hfReplaceWordId.value = '';
    var lbSuggestions = document.getElementById('lbSuggestions')
    lbSuggestions.options.length = 0;
    document.getElementById('tbWrongWord').value = '';
    FocusSc();
}

function Add2Dictionary() {
    var word = document.getElementById('tbWrongWord').value;
    //
    //word
    if (word.length > 0) {
        $.ajax(
            {
                type: "POST"
                , async: true
                , url: "Suggest.ashx"
                , data: "cmd=add2dictionary&word=" + word
                , error: function (xhr, ajaxOptions, thrownError) {
                    alert('Failed to add word \'' + word + '\' to dictionary');
                    //document.write('Error: Suggest.ashx ' + xhr.status + ' ' + thrownError + ' ' + xhr.responseText);
                }
                , success: function (response) {
                    //alert(response);
                    if (response == "Added") {
                        //document.getElementById('tbReplaceWord').value = word;
                        //replace();
                        IgnoreAdded2Dictionary(word);
                    }
                }
            }
        );
    }
}

function IgnoreAdded2Dictionary(pWord) {
    var tbReplaceWord = document.getElementById('tbReplaceWord');
    var hfReplaceWordId = document.getElementById('hfReplaceWordId');
    $('.BODYSCTEXT').each(function () {
        var mObj = $(this);
        if (mObj.text() == pWord) {
            mObj.removeAttr('style');
            var id = mObj.attr("id");
            mObj.attr("id", id.replace('BODY_SC_', 'BODY_SC_R_'));
            mObj.removeAttr('title');
            mObj.attr("style", "border-bottom:1px dashed green;");
        }
    });
    tbReplaceWord.value = "";
    hfReplaceWordId.value = '';
    var lbSuggestions = document.getElementById('lbSuggestions')
    lbSuggestions.options.length = 0;
    document.getElementById('tbWrongWord').value = '';
    FocusSc();
}