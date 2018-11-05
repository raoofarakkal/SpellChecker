tinyMCEPopup.requireLangPack();

var YouTubeDialog = {
	init : function() {
	},

	insert : function() {
		// Insert the contents from the input into the document
		//var embedCode = '<object width="'+document.forms[0].youtubeWidth.value+'" height="'+document.forms[0].youtubeHeight.value+'"><param name="movie" value="http://www.youtube.com/v/'+'o7r8wrKiw9s'+'&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+document.forms[0].youtubeID.value+'&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="'+document.forms[0].youtubeWidth.value+'" height="'+document.forms[0].youtubeHeight.value+'"></embed></object><br><p>babar</p>';
		var embedCode = '<object width="'+document.forms[0].youtubeWidth.value+'" height="'+document.forms[0].youtubeHeight.value+'"><param name="movie" value="http://www.youtube.com/v/'+document.forms[0].youtubeID.value+'&rel=0&fs=0&showinfo=0"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+document.forms[0].youtubeID.value+'&rel=0&fs=0&showinfo=0" type="application/x-shockwave-flash" wmode="transparent" width="'+document.forms[0].youtubeWidth.value+'" height="'+document.forms[0].youtubeHeight.value+'"></embed></object>';

		tinyMCEPopup.editor.execCommand('mceInsertRawHTML', false, embedCode);
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(YouTubeDialog.init, YouTubeDialog);
