using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SpellCheck
{
    public partial class LoadTest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SpellCheck.SpellChecker sc = new SpellCheck.SpellChecker();
            string mOut = sc.ContentSuggest(this.divTest.InnerText);
            Write(mOut);
        }

        private void Write(string pStr)
        {
            this.Page.Response.Write(pStr);
        }
    }
}