﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SpellCheck.UC
{
    public partial class UcFindReplaceSpelling : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //this.lbCurDc.Text = AppCode.webConfig.DefaultDictionaryInString();
            }
        }
    }
}