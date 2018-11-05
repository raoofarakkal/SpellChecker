using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SpellCheck
{
    public partial class ScV2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.dic.InnerText = "Dictionary: "+SpellCheck.AppCode.webConfig.DefaultDictionaryInString();
        }
    }
}