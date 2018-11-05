using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;

namespace IDM.SkPublish.API.Handler
{
    public class CollinsHandler : Library2.Cs.Web.HttpHandlerBase
    {
        public CollinsHandler()
        {
            base.onProcessRequest += ProdHandler_onProcessRequest;
        }

        void ProdHandler_onProcessRequest(string Command, EventArgs e)
        {
            ThisContext.Response.ContentType = "text/json";
            switch (Command)
            {
                case "searchfirst":
                    {
                        string word = Parameters["word"];
                        if (!string.IsNullOrWhiteSpace(word))
                        {
                            try
                            {
                                NameValueCollection mSection = (NameValueCollection)System.Configuration.ConfigurationManager.GetSection("CollinsDictionary");

                                string baseUrl = mSection.Get("baseURL") + "/api/v1/";
                                string accessKey = mSection.Get("accessKey");
                                string dictionaryCode = mSection.Get("dictionaryCode");

                                SkPublishAPI api = new SkPublishAPI(baseUrl, accessKey);

                                IDictionary<string, object> bestMatch = JsonToObject(api.SearchFirst(dictionaryCode, word, "html"));
                                Write(JsonResponse.CreateSuccess(ObjectToJson(bestMatch)));
                            }
                            catch (Exception ex)
                            {
                                Write(JsonResponse.CreateError(ex.Message));
                            }
                        }
                        else
                        {
                            Write(JsonResponse.CreateError("searchtext required"));
                        }
                        break;
                    }
                default:
                    {
                        Write(JsonResponse.CreateError("Command not implemented"));
                        break;
                    }

            }
        }

        private static IDictionary<string, object> JsonToObject(string json)
        {
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            IDictionary<string, object> obj = jsonSerializer.Deserialize<IDictionary<string, object>>(json);
            return obj;
        }

        private static IList<IDictionary<string, object>> JsonToArray(string json)
        {
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            IList<IDictionary<string, object>> array = jsonSerializer.Deserialize<IList<IDictionary<string, object>>>(json);
            return array;
        }

        private static string ObjectToJson(object obj)
        {
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
            string json = jsonSerializer.Serialize(obj);
            return json;
        }
    }
}
