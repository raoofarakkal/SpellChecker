/*
 * Copyright (c) 2012, IDM
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *     * Neither the name of the IDM nor the names of its contributors may be used to endorse or
 *       promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Web.Script.Serialization;

namespace IDM.SkPublish.API
{
    public class ApiTest
    {
        public static int Main(string[] args)
        {
            if (args.Count() < 2)
            {
                Console.Error.WriteLine("Need baseurl and accesskey in parameters");
                return 1;
            }

            string baseUrl = args[0] + "/api/v1/";
            string accessKey = args[1];

            SkPublishAPI api = new SkPublishAPI(baseUrl, accessKey);

            Console.WriteLine("*** Dictionaries");
            IList<IDictionary<string, object>> dictionaries = JsonToArray(api.GetDictionaries());
            Console.WriteLine(ObjectToJson(dictionaries));

            IDictionary<string, object> dictionary = dictionaries[0];
            Console.WriteLine(ObjectToJson(dictionary));
            string dictionaryCode = (string) dictionary["dictionaryCode"];

            Console.WriteLine("*** Search");
            Console.WriteLine("*** Result list");
            IDictionary<string, object> results = JsonToObject(api.Search(dictionaryCode, "ca", 1, 1));
            Console.WriteLine(ObjectToJson(results));
            Console.WriteLine("*** Spell checking");
            IDictionary<string, object> spellResults = JsonToObject(api.DidYouMean(dictionaryCode, "dorg", 3));
            Console.WriteLine(ObjectToJson(spellResults));
            Console.WriteLine("*** Best matching");
            IDictionary<string, object> bestMatch =JsonToObject(api.SearchFirst(dictionaryCode, "ca", "html"));
            Console.WriteLine(ObjectToJson(bestMatch));

            Console.WriteLine("*** Nearby Entries");
            IDictionary<string, object> nearbyEntries = JsonToObject(api.GetNearbyEntries(dictionaryCode, (string) bestMatch["entryId"], 3));
            Console.WriteLine(ObjectToJson(nearbyEntries));

            return 0;
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
