var SpellChecker = (function (spellChecker) {

    spellChecker.Init = function () {
        this.Source.Init();
        this.SpellCheckForm.Init(this.Source.Controls());

    };

    spellChecker.Busy = function (busy) {
        if (busy) {
            $('#AjaxLoader').show();
        } else {
            $('#AjaxLoader').hide();
        }
    };

    //Source Object
    spellChecker.Source = (function (source) {
        var mSourceCtrls;

        source.Init = function () {
            mSourceCtrls = getCtrls();
        };

        source.Controls = function () {
            if (!mSourceCtrls) {
                this.Init();
            }
            return mSourceCtrls;
        };

        function getCtrls() {
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
                        var mCtrlContent = "";
                        if (mCtrlType && mCtrlType.toLowerCase() == "tinymce") {
                            mtype = "tinymce";
                            try {
                                mCtrlContent = window.parent.tinyMCE.get(mCtrlName).getContent();
                            } catch (ex) { }
                        } else {
                            mtype = "html";
                            try {
                                mCtrlContent = window.parent.$('#' + mCtrlName).val();
                            } catch (ex) { }
                        }
                        mControls.push({ name: mCtrlName, dispName: mDispName, type: mtype, content: mCtrlContent })
                    }
                }
            } catch (ex) { }
            return mControls;
        }

        source.Update = function () {

            var mScMistakes = $(".ScMistakes");
            mScMistakes.replaceWith(function () {
                return $('<arakkal/>', {
                    html: this.innerHTML
                });
            });

            var regex = new RegExp("<arakkal>", "g");
            var mHtml = $("#dvScBodyWorkArea").html();
            mHtml = mHtml.replace(regex, "");
            regex = new RegExp("</arakkal>", "g");
            mHtml = mHtml.replace(regex, "");
            //$("#dvScBodyWorkArea").html(mHtml); // commented because if any javascript exist in mHTml, it will execute and throw error
            document.getElementById('dvScBodyWorkArea').innerHTML = mHtml;

            var mControls = mSourceCtrls;
            if (mControls.length > 0) {
                for (i = 0; i < (mControls.length) ; i++) {
                    if (mControls[i].type == "tinymce") {
                        try {
                            var mContentHtml = $("#dvScBodyWorkArea #SC_" + mControls[i].name + "_content").html();
                            window.parent.tinyMCE.get(mControls[i].name).setContent(mContentHtml);
                        } catch (ex) { }
                    } else {
                        try {
                            var mContentPlain = $("#dvScBodyWorkArea #SC_" + mControls[i].name + "_content").text();
                            window.parent.$("#" + mControls[i].name).val(mContentPlain)
                        } catch (ex) { }
                    }
                }
            } else {
                var mContent = '';
                mContent = $('#dvScBodyWorkArea').html();
                window.parent.tinyMCE.activeEditor.setContent(mContent);

                mIsCalledFromTinyMCE = true;
            }

            closeSc();

            function closeSc() {
                try{
                    window.parent.tinyMCE.activeEditor.windowManager.close(this);
                } catch (e) { }
                try{
                    window.parent.clearPopUp();
                } catch (e) { }
            }

        };

        return source;
    }(spellChecker.Source || {}));


    //SpellCheckForm Object
    spellChecker.SpellCheckForm = (function (spellCheckForm) {
        var SplitContentsIdx = 0;
        var SplitContents;
        var SubmitContentDelay = 5;
        var MaxWordsInSingleBatch = 100;
        var mWordIdx = 0;

        spellCheckForm.Init = function (pSourceCtrls) {
            if (pSourceCtrls) {
                if (pSourceCtrls.length > 0) {
                    renderMultiple(pSourceCtrls);
                } else {
                    render(window.parent.tinyMCE.activeEditor.getContent());
                }
            } else {
                render(window.parent.tinyMCE.activeEditor.getContent());
            }
        };

        spellCheckForm.getWordIdx = function () {
            mWordIdx = mWordIdx+1;
            return mWordIdx;
        };

        function renderMultiple(pControls) {
            var mScScripts = "";
            var mHtmlContent = "";
            var mContent = "";
            var mSep = "";
            var elemWa = document.getElementById('dvScBodyWorkArea');
            for (idx in pControls) {
                if (pControls[idx].content) {
                    var mHead = unescape(pControls[idx].dispName.toUpperCase());
                    mHtmlContent += mSep;
                    //mHtmlContent += "<div id=\"SC_" + pControls[idx].name + "\" title=\"" + pControls[idx].name + "\">";
                    mHtmlContent += "<div id=\"SC_" + pControls[idx].name + "\">";
                    mHtmlContent += "<div id=\"SC_" + pControls[idx].name + "_name\" class=\"ScBodyWorkAreaFieldTitle\">" + mHead + "</div>";
                    mHtmlContent += "<div id='SC_" + pControls[idx].name + "_content' class=\"ScBodyWorkAreaFieldContent\">" + pControls[idx].content + "</div>";
                    mHtmlContent += "</div>";
                    mSep = "<div style='height:10px;'></div>";

                    elemWa.innerHTML = "";
                    elemWa.innerHTML = pControls[idx].content;
                    mContent += $(elemWa).text();
                    mContent += " ";
                }
            }
            elemWa.innerHTML = mHtmlContent;
            spellChecker.Busy(true);
            Prepare4Submit(CleanContent(mContent));
        }

        function render(pHtml) {
            var elemWa = document.getElementById('dvScBodyWorkArea');
            elemWa.innerHTML = pHtml;
            spellChecker.Busy(true);
            Prepare4Submit(CleanContent($(elemWa).text()));
        }

        function CleanContent(pContent) {
            var mSc = new Array();
            var mContents = new Array();

            pContent = pContent.replace(/\  /g, ' ');
            pContent = pContent.replace(/\n/g, ' ');
            pContent = pContent.replace(/&/g, ' ');
            mSc = pContent.split(' ');

            var cnt = MaxWordsInSingleBatch;
            var mTempStr = "";

            for (idx in mSc) {
                if (mSc[idx].length > 0) {
                    if (mSc[idx].trim().length > 1) {
                        mTempStr += mSc[idx] + " ";
                        if (cnt > 0) {
                            cnt--;
                        } else {
                            mContents.push(mTempStr);
                            mTempStr = "";
                            cnt = MaxWordsInSingleBatch;
                        }
                    }
                }
            }
            mContents.push(mTempStr);
            return mContents;
        }

        function Prepare4Submit(pContent) {
            SplitContents = pContent;
            SubmitContent();
        }


        function SubmitContent() {
            if (!isContentValid(SplitContents[SplitContentsIdx])) {
                //alert('Content : ' + SplitContents[SplitContentsIdx]);
                SplitContentsIdx++;
                if (SplitContentsIdx < SplitContents.length) {
                    setTimeout(SubmitContent, SubmitContentDelay);
                } else {
                    progress(null);
                    processDone();
                }
            } else {
                var percent = (SplitContentsIdx * 100) / (SplitContents.length);
                progress(percent);//document.getElementById('lbStat').innerText = "Processing " + percent.toFixed(0).toString() + "%";//SplitContentsIdx.toString() + " out of " + (SplitContents.length - 1).toString();
                $.ajax({
                    type: "POST"
                    , async: true
                    , url: "Suggest.ashx"
                    , data: "cmd=getSuggestions&content=" + SplitContents[SplitContentsIdx]
                    , async: true
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
                        spellChecker.Busy(false);
                        var JSON = null;
                        try {
                            JSON = jQuery.parseJSON(response);
                        }
                        catch (e) {
                            JSON = null;
                            //document.getElementById('lbStat').innerText = e.message;
                            alert('JSON parse Error. ' + e.message + '. ' + response);
                        }
                        if (JSON && JSON != undefined) {
                            var sT = document.getElementById('dvScBodyWorkArea').scrollTop;
                            var sL = document.getElementById('dvScBodyWorkArea').scrollLeft;
                            process(JSON);
                            document.getElementById('dvScBodyWorkArea').scrollTop = sT;
                            document.getElementById('dvScBodyWorkArea').scrollLeft = sL;
                            SplitContentsIdx++;
                            if (SplitContentsIdx < SplitContents.length) {
                                setTimeout(SubmitContent, SubmitContentDelay);
                            } else {
                                progress(null);// document.getElementById('lbStat').innerText = "";
                                processDone();
                            }
                        } else {
                            alert("JSON undefined. " + response);
                        }

                    }
                });
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
        };

        function process(Json) {
            if (Json.TotalWords > 0) {
                for (i = 0; i < Json.TotalWords; i++) {
                    var sug = "";
                    var comma = "";
                    for (s = 0; s < Json.Words[i].TotalSuggestions; s++) {
                        sug += comma + Json.Words[i].Suggestions[s];
                        comma = ",";
                    }
                    $("#ScWordsFound").text($("#ScWordsFound").text() + " " + Json.Words[i].Word)
                    try{
                        $("#dvScBodyWorkArea *").highlightCustom(Json.Words[i].Word, "ScMistakes", sug, SpellChecker.SpellCheckForm.getWordIdx);
                    } catch (e) {
                        //alert(e.message);
                    }

                    $(".ScMistakes").off("contextmenu");
                    $(".ScMistakes").on("contextmenu", function () {
                        SugContextMenu(this);
                        return false;
                    });
                }
            }
            else {
                //alert('No mistakes found.');
            }
        }

        function processDone() {
            $(".ScMistakes").off("contextmenu");
            $(".ScMistakes").on("contextmenu", function () {
                SugContextMenu(this);
                return false;
            });
        }


        function SugContextMenu(pSpanObj) {
            spellCheckForm.SugContextMenuClear();
            //var mOffset = $(pSpanObj).offset();
            var mParentDoc = parent.document;// opener.document;
            var mParentWindow = parent.window;// opener.window;

            var mCntxtMnCntnr = $("#divIframeMisc", mParentDoc); // opener.document);
            mCntxtMnCntnr.html("");
            mCntxtMnCntnr.append("<div id=\"divIframeMiscCm\" style=\"display:none;\"></div>");
            var mCm =  $("#divIframeMiscCm", mParentDoc);
            mCm.attr("class", "SpellcheckContextMenu");
            mCm.append("<div class=\"SpellcheckContextMenuHd\">Suggested words</div>");
            var mSug = $(pSpanObj).attr("sug").split(',');
            var mNoSug = false;
            var mItems = new Array();
            for(i in mSug)
            {
                //capitalizeFirstLetter is source word first letter is capital
                if ($(pSpanObj).text()[0] == $(pSpanObj).text()[0].toUpperCase()) {
                    mSug[i] = mSug[i].capitalizeFirstLetter();
                }
                if (mSug[i].toLowerCase() != "no suggestions found") {
                    mItems.push("<div class=\"SpellcheckContextMenuItem\" onclick=\"$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScReplaceWord('" + pSpanObj.id + "','" + $(pSpanObj).text().replace(/\'/g, "\\'") + "','" + mSug[i].replace(/\'/g, "\\'") + "')\">" + mSug[i] + "</div>");
                } else {
                    mItems.push("<div class=\"SpellcheckContextMenuItemNc\">No suggestions found.</div>");
                    mNoSug = true;
                }
            }
            mCm.append("<div class=\"SpellcheckContextMenuItemContainer\">" + mItems.join("") + "</div>");
            mCm.append("<div class=\"hLine\"></div>");
            mCm.append("<div class=\"SpellcheckContextMenuItemNc\"><span onclick=\"$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScAddToDic('" + $(pSpanObj).text().replace(/\'/g, "\\'") + "')\" style=\"cursor:pointer;color:#6186BD;\">Add <span style=\"font-weight:bold;color:red;\">" + $(pSpanObj).text() + "</span> to dictionary?</span></div>");

            mCm.append("<div class=\"hLine\"></div>");
            mCm.append("<div class=\"SpellcheckContextMenuItemNc\"><input id=\"scCustRepl\" value=\"" + $(pSpanObj).text() + "\" type=\"text\" style=\"height:16px !important;\"/>&nbsp;<input type=\"button\" value=\"Replace\" title=\"Replace and Add to dictionary\"  onclick=\"$('#divIframe iframe')[0].contentWindow.SpellChecker.SpellCheckForm.ScReplaceWord('" + pSpanObj.id + "','" + $(pSpanObj).text().replace(/\'/g, "\\'") + "', $('#scCustRepl').val())\"/></div>");

            if (!mNoSug) {
                mRpts = getRepeatedWordsCount($(pSpanObj).text());
                if (mRpts > 1) {
                    mCm.append("<div class=\"hLine\"></div>");
                    mCm.append("<div style=\"margin:5px;\"><input id=\"chkScContextMenuReplaceAll\" type=\"checkbox\" /><label style=\"padding-left:3px;color:green;font-weight:bold;\">Replace all <span style=\"color:red;\">" + mRpts + "</span> occurrence</label></div>");
                }
            }
            var mTop = $(pSpanObj).position().top+50;
            var mLeft = $(pSpanObj).position().left;
            mCm.css({ "top": mTop, "left": mLeft });// .offset({ position: "absolute", top: 1, left: 1 })
            mCm.show();
            $(pSpanObj).removeClass("ScSelected");
            $(pSpanObj).addClass("ScSelected");

            var mFixT = 135;
            if ( ($(mParentWindow).height()-mFixT) <= ($("#divIframeMiscCm", mParentDoc).position().top + $("#divIframeMiscCm", mParentDoc).height()))
            {
                var mMinus = ($("#divIframeMiscCm", mParentDoc).position().top + $("#divIframeMiscCm", mParentDoc).height()) - ($(mParentWindow).height()-mFixT);
                if (mMinus > 0) {
                    var mT = (mTop - mMinus);
                    var mL = mLeft + $(pSpanObj).width();
                    mT = mT < 0 ? 0 : mT;
                    mL = mL < 0 ? 0 : mL;
                    $("#divIframeMiscCm", mParentDoc).animate({ top: mT, left: mL });
                }
            }
            var mFixL = 130;
            if (($(mParentWindow).width()-mFixL) <= ($("#divIframeMiscCm", mParentDoc).position().left + $("#divIframeMiscCm", mParentDoc).width())) {
                var mMinus = ($("#divIframeMiscCm", mParentDoc).position().left + $("#divIframeMiscCm", mParentDoc).width()) - ($(mParentWindow).width()-mFixL);
                if (mMinus > 0) {
                    var mL = (mLeft - mMinus);
                    mL = mL < 0 ? 0 : mL;
                    if (mL < $(pSpanObj).position().left && (mL + $("#divIframeMiscCm", mParentDoc).width()) > mL) {
                        var mL = ($(pSpanObj).position().left - $("#divIframeMiscCm", mParentDoc).width()) - 10;
                        mL = mL < 0 ? 0 : mL;
                        $("#divIframeMiscCm", mParentDoc).animate({ left: mL });
                    } else {
                        $("#divIframeMiscCm", mParentDoc).animate({ left: mL });
                    }
                }
            }



        }

        function getRepeatedWordsCount(pWord) {
            var mRet = 0;
            var mScMistakes = $(".ScMistakes");
            for (i = 0; i < mScMistakes.length; i++) {
                var jObj = $(mScMistakes[i]);
                if (jObj.text().toLowerCase() == pWord.toLowerCase()) {
                    mRet++;
                }
            }
            return mRet;
        }
        
        spellCheckForm.ScReplaceWord = function (pSpnObjId, pOrgWord, pSelectedWord) {
            var mParentDoc = parent.document;// opener.document;
            var mReplaceAll = $("#chkScContextMenuReplaceAll", mParentDoc).is(":checked");
            if (mReplaceAll) {
                var mScMistakes = $(".ScMistakes");
                for (i = 0; i < mScMistakes.length; i++) {
                    var jObj = $(mScMistakes[i]);
                    if (jObj.text().toLowerCase() == pOrgWord.toLowerCase()) {
                        jObj.removeAttr("sug");
                        jObj.attr("title", "Resolved");
                        jObj.attr("class", "ScMistakes ScResolved");
                        jObj.text(pSelectedWord);
                    }
                }
            } else {
                var jObj = $("#"+pSpnObjId);
                if (jObj.text().toLowerCase() == pOrgWord.toLowerCase()) {
                    jObj.removeAttr("sug");
                    jObj.attr("title", "Resolved");
                    jObj.attr("class", "ScMistakes ScResolved");
                    jObj.text(pSelectedWord);
                }
            }
            //adding selected word to dictionary
            spellCheckForm.ScAddToDic(pSelectedWord);
            spellCheckForm.SugContextMenuClear();
        }

        spellCheckForm.ScAddToDic = function(pWord) {
            if (pWord.length > 0) {
                $.ajax(
                    {
                        type: "POST"
                        , async: true
                        , url: "Suggest.ashx"
                        , data: "cmd=add2dictionary&word=" + pWord
                        , error: function (xhr, ajaxOptions, thrownError) {
                            alert('Failed to add word \'' + pWord + '\' to dictionary');
                            //document.write('Error: Suggest.ashx ' + xhr.status + ' ' + thrownError + ' ' + xhr.responseText);
                        }
                        , success: function (response) {
                            if (response == "Added") {
                                ScIgnoreAdded2Dictionary(pWord);
                            }
                        }
                    }
                );
            }
        }

        function ScIgnoreAdded2Dictionary(pWord) {
            var mScMistakes = $(".ScMistakes");
            for (i = 0; i < mScMistakes.length;i++) {
                var jObj = $(mScMistakes[i]);
                if (jObj.text().toLowerCase() == pWord.toLowerCase()) {
                    jObj.removeAttr("sug");
                    jObj.attr("title", "Added to dictionary");
                    jObj.attr("class", "ScMistakes ScAdded2Dic");
                }
            }
            spellCheckForm.SugContextMenuClear();
        }

        spellCheckForm.SugContextMenuClear = function () {
            var mParentDoc = parent.document;// opener.document;
            var mCntxtMnCntnr = $("#divIframeMisc", mParentDoc); // opener.document);
            mCntxtMnCntnr.html("");

            var mScMistakes = $(".ScMistakes");
            for (i = 0; i < mScMistakes.length; i++) {
                $(mScMistakes[i]).removeClass("ScSelected");
            }
        };

        return spellCheckForm;
    }(spellChecker.SpellCheckForm || {}));

    return spellChecker;
}(SpellChecker || {}));


$(document).ready(function () {
    SpellChecker.Init();
});
