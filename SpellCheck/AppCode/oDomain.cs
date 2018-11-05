using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Data;
using System.Diagnostics;
using System.Collections.Specialized;

namespace SpellCheck.AppCode
{

    public class DomainInfo
    {
	    public DomainInfo()
	    {
		    //
		    // TODO: Add constructor logic here
		    //
	    }

	    public DomainInfo(string pWebConfigSectionName)
	    {
            NameValueCollection mSections = (NameValueCollection)System.Configuration.ConfigurationManager.GetSection("domain");
            Domain = mSections.Get("Domain");
            Uid = mSections.Get("Uid");
            Pwd = mSections.Get("Pwd");
            Pwd = Library2.Sys.Security.Rijndael.Decrypt(Pwd, (new Library2.LibConfig()).RjKey2DecryptPwdKey());
		    mSections = null;
	    }

        public DomainInfo(string pDomain, string pUid, string pPwd)
	    {
            Domain = pDomain;
		    Uid = pUid ;
		    Pwd = pPwd;
	    }

	    private string mDomain;
	    public string Domain {
            get { return mDomain.ToLower(); }
            set { mDomain = value; }
	    }

	    private string mUid;
	    public string Uid {
            get { return mUid.ToLower(); }
            set { mUid = value; }
	    }

	    private string mPwd;
	    internal string Pwd {
            get { return mPwd; }
            set { mPwd = value; }
	    }

    }

}