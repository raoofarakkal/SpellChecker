//Developer: Abdulraoof Arakkal
//Created on: 06-Dec-2012

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.SessionState;


namespace SpellCheck
{
    /// <summary>
    /// Summary description for Suggest
    /// </summary>
    public class Suggest : IHttpHandler, IReadOnlySessionState
    {
        protected HttpContext thisContext;

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        private void Write(string pStr)
        {
            thisContext.Response.Write(pStr);
        }

        public void ProcessRequest(HttpContext context)
        {
            thisContext = context;
            thisContext.Response.ContentType = "text/plain";
            NameValueCollection parameters;
            if (thisContext.Request.Form.HasKeys())
            {
                parameters = thisContext.Request.Form;
            }
            else if (thisContext.Request.QueryString.HasKeys())
            {
                parameters = thisContext.Request.QueryString;
            }
            else
            {
                parameters = null;
            }

            if (parameters != null)
            {
                string command = parameters["cmd"];
                switch (command)
                {
                    case "correct":
                        {
                            SpellCheck.SpellChecker sc = new SpellCheck.SpellChecker();
                            if (string.IsNullOrWhiteSpace(parameters["word"]))
                            {
                                Write("parameter word required ");
                                thisContext.Response.End();
                            }
                            string word = parameters["word"];
                            Write(sc.Correct(word));
                            break;
                        }
                    case "suggest":
                        {
                            SpellCheck.SpellChecker sc = new SpellCheck.SpellChecker();
                            if (string.IsNullOrWhiteSpace(parameters["word"]))
                            {
                                Write("parameter word required ");
                                thisContext.Response.End();
                            }
                            string word = parameters["word"];
                            string comma = "";
                            int item = 0;
                            string JSON = "";
                            foreach (string mW in sc.Suggest(word))
                            {
                                JSON += comma + "\"" + mW + "\"";
                                comma = ",";
                                item++;
                            }
                            JSON += "]}";
                            Write("{\"total\":\"" + item + "\",\"sug\":[" + JSON);
                            break;
                        }
                    case "getSuggestions":
                        {
                            if (string.IsNullOrWhiteSpace(parameters["content"]))
                            {
                                Write("parameter content required ");
                                thisContext.Response.End();
                            }
                            string content = parameters["content"];
                            if (!string.IsNullOrWhiteSpace(content))
                            {
                                SpellCheck.SpellChecker sc = new SpellCheck.SpellChecker();
                                Write(sc.ContentSuggest(content));
                                
                            }
                            break;
                        }
                    case "add2dictionary":
                        {
                            SpellCheck.SpellChecker sc = new SpellCheck.SpellChecker();
                            if (string.IsNullOrWhiteSpace(parameters["word"]))
                            {
                                Write("parameter word required ");
                                thisContext.Response.End();
                            }
                            string word = parameters["word"];
                            try
                            {
                                if (sc.Add2Dictionary(word,thisContext.Request.ServerVariables["REMOTE_USER"]))
                                {
                                    Write("Added");
                                }
                                else
                                {
                                    Write(string.Format("Failed to add to dictionary. Word '{0}' might be already exist in the dctionary", word));
                                }
                            }
                            catch (Exception ex)
                            {
                                throw new Exception(string.Format("Failed to add to dictionary. Word '{0}'. {1}",word, ex.Message));
                                //Write(ex.Message);
                            }
                            break;
                        }
                    case "initdictionary":
                        {
                            SpellCheck.SpellChecker sc = new SpellCheck.SpellChecker();
                            if (sc.initDictionary())
                            {
                                Write("Dictionary Re-Initialized");
                            }
                            else
                            {
                                Write("Failed to initalize dictionary.");
                            }
                            break;
                        }
                    default:
                        {
                            Write("Invalid cmd");
                            break;
                        }
                }
            }
            else
            {
                Write("Parameters required");
            }

        }


    }
}