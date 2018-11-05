<%@ Page Language="C#" ValidateRequest="false" AutoEventWireup="true" CodeBehind="Sc.aspx.cs" Inherits="SpellCheck.Sc" %>

<%@ Register Src="~/UC/UcFindReplaceSpelling.ascx" TagPrefix="uc1" TagName="UcFindReplaceSpelling" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Spellcheck</title>

    <link href="styles/FindReplace.css" rel="stylesheet" />
    <link href="styles/jquery-ui.css" rel="stylesheet" type="text/css"/>

    <script src="scripts/jquery-1.8.0.min.js"></script>
    <script src="scripts/jquery-ui.min.js"></script>
    <script src="scripts/common.js"></script>
    <script src="scripts/ScFr.js"></script>
</head>
<body style="margin:2px;">
    <form id="form1" runat="server">
    <div>
        <uc1:UcFindReplaceSpelling runat="server" ID="UcFindReplaceSpelling" />
    </div>
    </form>
</body>
</html>
