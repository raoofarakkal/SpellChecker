

//FUNCTION getUrlPara()
//USAGE:
//var UrlPara = getUrlPara();
//var IP = UrlPara["ip"]; // "127.0.0.1"

function getUrlPara() {
    var para = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if (hash.length > 1) {
            para.push(hash[0].toLowerCase());
            para[hash[0].toLowerCase()] = hash[1].toLowerCase();
        } else {
            para = undefined;
            break;
        }
    }
    return para;
}

function getUrlParaCaseSensitive() {
    var para = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if (hash.length > 1) {
            para.push(hash[0]);
            para[hash[0]] = hash[1];
        } else {
            para = undefined;
            break;
        }
    }
    return para;
}




//function HtmlFindReplaceJ(sourceControlName, searchTerm, highlightStartTag, highlightEndTag) {
//    //jquery.ba-replacetext.js required
//    //SOURCE
//    //http://www.benalman.com/projects/jquery-replacetext-plugin/

//    //DOCUMENTATION
//    //http://code.tutsplus.com/tutorials/spotlight-jquery-replacetext--net-17905

//    searchRegex = new RegExp("\\b" + searchTerm + "\\b", 'gi');
//    $("#"+sourceControlName+" *").replaceText(searchRegex, highlightStartTag + searchTerm + highlightEndTag);

//    ///jQueryObjSource.replaceText(/\b(text)\b/gi, '<span class="red">$1<\/span>');
//}



//HTML Highlight
$.fn.highlight = function (str, highlightStartTag, highlightEndTag,avoidDupInClass) {
    var regex = new RegExp("\\b" + str + "\\b", "gi");
    return this.each(function () {
        $(this).contents().filter(function () {
            var mRet = (this.nodeType == 3 && regex.test(this.nodeValue));
            if (this.nodeValue) {
                if (this.nodeValue.length > 2) {
                    if (this.parentNode) {
                        if (this.parentNode.className) {
                            if (this.parentNode.className == avoidDupInClass) {
                                mRet = false;
                            }
                        }
                    }
                }
            }
            return mRet;
        }).replaceWith(function () {
            return (this.nodeValue || "").replace(regex, function (match) {
                //return "<span class=\"" + className + "\">" + match + "</span>";
                return highlightStartTag + match + highlightEndTag;
            });
        });
    });
};
                                // Json.Words[i].Word, "ScMistakes", sug, SpellChecker.SpellCheckForm.getWordIdx
$.fn.highlightCustom = function (str,className,sug, WordIdIncFunc) {
    var regex = new RegExp("\\b" + str + "\\b", "gi"); //only highlight words
    //var regex = new RegExp(str, "gi"); //highlight even part of word
    return this.each(function () {
        try{
            $(this).contents().filter(function () {
                var mRet = false;
                var ignoreList = ["iframe", "blockquote", "script"];
                try {
                    mRet = (this.nodeType == 3 && regex.test(this.nodeValue));
                    if (mRet && this.nodeValue) {
                        if (this.nodeValue.length >= 2) {

                            if (this.className == className) {
                                mRet = false;
                            }

                            if (this.parentNode) {

                                if (this.parentNode.nodeName) {
                                    if ($.inArray(this.parentNode.nodeName.toLowerCase(), ignoreList) >= 0) {
                                        mRet = false;
                                    }
                                }

                                if (this.parentNode.className) {
                                    if (this.parentNode.className == className) {
                                        mRet = false;
                                    }
                                }
                            }
                        }
                    }
                } catch (e) { }
                return mRet;
            }).replaceWith(function () {
                return (this.nodeValue || "").replace(regex, function (match) {
                    return "<span id=\"ScMistake_" + WordIdIncFunc() + "\" class=\"" + className + "\" sug=\"" + sug + "\">" + match + "</span>";
                });
            });
        } catch (e) { }
    });
};


//HTML Highlight
//http://stackoverflow.com/questions/857079/search-text-in-other-text-and-highlight-it-using-javascript
//http://www.nsftools.com/misc/SearchAndHighlight.htm
//view-source:http://www.nsftools.com/misc/SearchAndHighlight.htm
function HtmlHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) {
    // the highlightStartTag and highlightEndTag parameters are optional
    if ((!highlightStartTag) || (!highlightEndTag)) {
        highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
        highlightEndTag = "</font>";
    }

    // find all occurences of the search term in the given text,
    // and add some "highlight" tags to them (we're not using a
    // regular expression search, because we want to filter out
    // matches that occur within HTML tags and script blocks, so
    // we have to do a little extra validation)
    var newText = "";
    var i = -1;
    var lcSearchTerm = searchTerm.toLowerCase();
    var lcBodyText = bodyText.toLowerCase();

    while (bodyText.length > 0) {
        i = lcBodyText.indexOf(lcSearchTerm, i + 1);
        if (i < 0) {
            newText += bodyText;
            bodyText = "";
        } else {
            // skip anything inside an HTML tag
            if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
                // skip anything inside a <script> block
                if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {

                    if (validText(bodyText.substr(i + searchTerm.length, 1))) {
                        if (validText(bodyText.substr(i-1, 1))) {
                            newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
                        } else {
                            newText += bodyText.substring(0, i) + bodyText.substr(i, searchTerm.length);
                        }
                    }else{
                        newText += bodyText.substring(0, i) + bodyText.substr(i, searchTerm.length);
                    }

                    bodyText = bodyText.substr(i + searchTerm.length);
                    lcBodyText = bodyText.toLowerCase();

                    i = -1;

                }
            }
        }
    }
    return newText;
}

function validText(chr) {
    if(chr.length >0){
        var s = " .;,\r\n'\"<>";
        if (s.indexOf(chr) != -1) {
            return true;
        } else {
            return false;
        }
    }else{
        return true;
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//function HtmlReplaceBkp(bodyText, searchTerm, highlightStartTag, highlightEndTag) {
//    // the highlightStartTag and highlightEndTag parameters are optional
//    if ((!highlightStartTag) || (!highlightEndTag)) {
//        highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
//        highlightEndTag = "</font>";
//    }

//    // find all occurences of the search term in the given text,
//    // and add some "highlight" tags to them (we're not using a
//    // regular expression search, because we want to filter out
//    // matches that occur within HTML tags and script blocks, so
//    // we have to do a little extra validation)
//    var newText = "";
//    var i = -1;
//    var lcSearchTerm = searchTerm.toLowerCase();
//    var lcBodyText = bodyText.toLowerCase();

//    while (bodyText.length > 0) {
//        i = lcBodyText.indexOf(lcSearchTerm, i + 1);
//        if (i < 0) {
//            newText += bodyText;
//            bodyText = "";
//        } else {
//            // skip anything inside an HTML tag
//            if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
//                // skip anything inside a <script> block
//                if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
//                    newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
//                    bodyText = bodyText.substr(i + searchTerm.length);
//                    lcBodyText = bodyText.toLowerCase();
//                    i = -1;
//                }
//            }
//        }
//    }
//    return newText;
//}
