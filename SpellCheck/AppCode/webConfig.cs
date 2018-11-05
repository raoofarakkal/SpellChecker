using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpellCheck.AppCode
{
    public static class webConfig
    {
        public enum _DefaultDictionary
        {
            en_GB = 1,
            en_US = 2,
            en_Collins = 3
        }

        public static string DefaultDictionaryInString()
        {
            string ret = "";
            switch (AppCode.webConfig.DefaultDictionary())
            {
                case AppCode.webConfig._DefaultDictionary.en_GB:
                    {
                        ret = "UK English";
                        break;
                    }
                case AppCode.webConfig._DefaultDictionary.en_US:
                    {
                        ret = "US English";
                        break;
                    }
                case AppCode.webConfig._DefaultDictionary.en_Collins:
                    {
                        ret = "Collins English";
                        break;
                    }
                default:
                    {
                        ret = "UK English";
                        break;
                    }
            }
            return ret;
        }

        public static _DefaultDictionary DefaultDictionary()
        {
            _DefaultDictionary ret = _DefaultDictionary.en_GB;
            string temp = System.Web.Configuration.WebConfigurationManager.AppSettings["DefaultDictionary"].ToString();
            switch (temp.ToLower())
            {
                case "en-gb":
                    {
                        ret = _DefaultDictionary.en_GB;
                        break;
                    }
                case "en-us":
                    {
                        ret = _DefaultDictionary.en_US;
                        break;
                    }
                case "en-collins":
                    {
                        ret = _DefaultDictionary.en_Collins;
                        break;
                    }
                default:
                    {
                        ret = _DefaultDictionary.en_GB;
                        break;
                    }
            }
            return ret;

        }

        public static string SearchPattern()
        {
            return System.Web.Configuration.WebConfigurationManager.AppSettings["SearchPattern"].ToString();
        }

        public static DomainInfo DomainInformation() 
        {
            return new DomainInfo("domain");//, "ajcms");

        }
    }
}