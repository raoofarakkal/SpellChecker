////Peter Norvig's Spell Corrector(http://norvig.com/spell-correct.html) 
////C# version : https://github.com/lorenzo-stoakes/spell-correct/tree/master/cs 

//Developer: Abdulraoof Arakkal
//Created on: 06-Dec-2012


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;
using System.IO;

namespace SpellCheck
{

    internal static class DictionaryBase
    {

        public static string SelectedDictionary()
        {
            string ret = "~/Dictionary/UK/";
            switch(AppCode.webConfig.DefaultDictionary())
            {
                case AppCode.webConfig._DefaultDictionary.en_GB:
                    {
                        ret = "~/Dictionary/UK/";
                        break;
                    }
                case AppCode.webConfig._DefaultDictionary.en_US:
                    {
                        ret = "~/Dictionary/US/";
                        break;
                    }
                case AppCode.webConfig._DefaultDictionary.en_Collins:
                    {
                        ret = "~/Dictionary/Collins/";
                        break;
                    }
                default:
                    {
                        ret = "~/Dictionary/UK/";
                        break;
                    }
            }
            return ret;
        }


        public static string SearchPattern()
        {
            return AppCode.webConfig.SearchPattern();// "[0-9a-z']+";
        }
    }

    internal interface ICorpus
    {
        int Rank(string word);
        bool Contains(string word);
        IEnumerable<string> Known(IEnumerable<string> words);
    }

    internal static class StringExtensions
    {
        public static string From(this string str, int n)
        {
            if (str == null) return null;

            var len = str.Length;

            if (n >= len) return "";
            if (n == 0 || -n >= len) return str;

            return str.Substring((len + n) % len, (len - n) % len);
        }

        public static string To(this string str, int n)
        {
            if (str == null) return null;

            var len = str.Length;

            if (n == 0 || -n >= len) return "";
            if (n >= len) return str;

            return str.Substring(0, (len + n) % len);
        }
    }

    internal class Corpus : ICorpus
    {
        private readonly Dictionary<string, int> rankings;

        private static IEnumerable<string> ExtractWords(string str)
        {
            return Regex.Matches(str, DictionaryBase.SearchPattern(), RegexOptions.IgnoreCase)
                        .Cast<Match>()
                        .Select(m => m.Value);
            //return Regex.Matches(str, "[a-z' ]+", RegexOptions.IgnoreCase) //space added for supporting words with space inside: example: Abdulraoof Arakkal
            //            .Cast<Match>()
            //            .Select(m => m.Value);
        }

        public Corpus(string sample) : this(ExtractWords(sample)) { }

        public Corpus(IEnumerable<string> sample)
        {
            rankings = sample.Select(w => w.ToLower())
                             .GroupBy(w => w)
                             .ToDictionary(w => w.Key, w => w.Count());
        }

        public int Rank(string word)
        {
            int ret;
            return rankings.TryGetValue(word, out ret) ? ret : 1;
        }

        public bool Contains(string word)
        {
            return rankings.ContainsKey(word);
        }

        public IEnumerable<string> Known(IEnumerable<string> words)
        {
            return words.Where(Contains);
        }
    }

    internal class SpellCorrect
    {
        private readonly ICorpus corpus;

        public SpellCorrect(ICorpus corpus)
        {
            this.corpus = corpus;
        }

        private const string Alphabet = "abcdefghijklmnopqrstuvwxyz";

        private IEnumerable<string> Edits(string word)
        {
            //var splits = from i in Enumerable.Range(0, word.Length) 
            //             select new { a = word.To(i), b = word.From(i) }; // commented by raoof and added new one below for returning more suggestions by +4 added to length (word.Length + 4)
            
            var splits = from i in Enumerable.Range(0, word.Length + 4)
                         select new { a = word.To(i), b = word.From(i) };

            var deletes = from s in splits
                          where s.b != "" // Guaranteed not null
                          select s.a + s.b.From(1);
            var transposes = from s in splits
                             where s.b.Length > 1
                             select s.a + s.b[1] + s.b[0] + s.b.From(2);
            var replaces = from s in splits
                           from c in Alphabet
                           select s.a + c + s.b.From(1);
            var inserts = from s in splits
                          from c in Alphabet
                          select s.a + c + s.b;

            return deletes
            .Union(transposes)
            .Union(replaces)
            .Union(inserts);
        }

        private IEnumerable<string> Corrections(string word)
        {
            //if (corpus.Contains(word)) return new[]{ word };
            if (corpus.Contains(word.ToLower())) return new[] { "No Spelling mistake found" };// { word };

            var edits = Edits(word);

            var knownEdits = corpus.Known(edits);
            if (knownEdits.Any()) return knownEdits;

            var secondPass = from e1 in edits
                             from e2 in Edits(e1)
                             where corpus.Contains(e2)
                             select e2;
            return secondPass.Any() ? secondPass : new[]{"No Suggestions Found"} ;// new[] { word };
        }

        public string Correct(string word)
        {
            var corrections = Corrections(word).OrderByDescending(corpus.Rank);

            return corrections.First();
        }

        public List<string> Suggest(string word)
        {
            List<string> ret = new List<string>();
            var corrections = Corrections(word.ToLower()).OrderByDescending(corpus.Rank);
            foreach (string str in corrections.ToList().Distinct().ToList())
            {
                ret.Add(str.ToLower());
            }
            return ret;

        }

    }

    public class SpellChecker
    {
        public SpellChecker()
        {

        }

        
        private static SpellCheck.SpellCorrect[] mSc = null;
        private SpellCheck.SpellCorrect spelling(string word) {
            int a = (char)97;
            if (mSc == null)
            {
                mSc = new SpellCheck.SpellCorrect[26];
                int z = (char)122;
                for (int i = a; i <= z; i++)
                {
                    string DictionaryFile = HttpContext.Current.Server.MapPath(DictionaryBase.SelectedDictionary()) + (char)i + ".txt";
                    if (!File.Exists(DictionaryFile))
                    {
                        throw new Exception("Failed to locate Dictionary File. " + DictionaryFile);
                    }

                    var fileContent = File.ReadAllText(DictionaryFile);
                    var corpus = new SpellCheck.Corpus(fileContent);
                    mSc[i-a] = new SpellCheck.SpellCorrect(corpus);
                }
            } 
            if (!string.IsNullOrWhiteSpace(word))
            {
                //int i = 0;
                //char alpha = Convert.ToChar(word.ToLower().Substring(0, 1));
                //i = alpha;
                return mSc[findFirstChar(word)- a];
            }
            else
            {
                return null;
            }
        }

        private char findFirstChar(string word)
        {
            char mRet = 'a';
            //int a = (char)97;
            //int z = (char)122;
            foreach (int c in word.ToLower())
            {
                if(c >=97 && c<=122)
                {
                    mRet = (char)c;
                    break;
                }
            }
            return mRet;
        }

        public string Correct(string word)
        {
            if (!string.IsNullOrWhiteSpace(word))
            {
                return spelling(word).Correct(word);

            }
            else
            {
                return word;
            }
        }

        public List<string> Suggest(string word) 
        {
            if (!string.IsNullOrWhiteSpace(word))
            {
                return spelling(word).Suggest(word);
            }
            else
            {
                return new List<string>{word};
            }
        }

        public string SuggestTest(string word)
        {
            if (!string.IsNullOrWhiteSpace(word))
            {
                string mRet = word;
                foreach (string m in spelling(word).Suggest(word))
                {
                    mRet += "@"+m;
                }
                return mRet;
            }
            else
            {
                return "";
            }
        }


        private bool isNumeric(string str)
        {
            bool mRet = false;
            double mN = 0;
            if (Double.TryParse(str, out mN))
            {
                mRet = true;// it is a number
            }
            return mRet;
        }

        public string ContentSuggest(string content)
        {
            string ret1 = "";
            string words = "";
            string comma = "";
            int wordCount = 0;
            IEnumerable<string> Contents = Regex.Matches(content, DictionaryBase.SearchPattern(), RegexOptions.IgnoreCase)
                            .Cast<Match>()
                            .Select(m => m.Value);

            //IEnumerable<string> Contents2= Regex.Matches(content, DictionaryBase.SearchPattern(), RegexOptions.IgnoreCase)
            //                .Cast<Match>()
            //                .Select(m => SuggestTest(m.Value));
            //var m1 = Contents2.ToArray();

            List<string> wordsAdded = new List<string>();
            DateTime d = DateTime.Now;
            foreach (string word in Contents)
            {
                //try
                //{
                    if (!string.IsNullOrWhiteSpace(word))
                    {
                        string w = "";
                        w = word.Replace("\r", ""); ;
                        w = w.Replace("\n", "");
                        if (!string.IsNullOrWhiteSpace(w))
                        {
                            if (!isNumeric(w) && !isNumeric(w[0].ToString()))
                            {
                                if (!exist(w.ToLower(), wordsAdded))
                                {
                                    List<string> wordSuggestions = Suggest(w);
                                    if (wordSuggestions.Count() >= 1)
                                    {
                                        bool go = true;
                                        if (wordSuggestions.Count() == 1)
                                        {
                                            if (wordSuggestions[0].ToString() == "no spelling mistake found")
                                            {
                                                go = false;
                                            }

                                        }
                                        if (exist(word.ToLower(), wordsAdded))
                                        {
                                            go = false;
                                        }
                                        if (go)
                                        {
                                            string comma2 = "";
                                            words += comma + "{\"Word\":\"" + word + "\",\"TotalSuggestions\":\"" + wordSuggestions.Count() + "\",\"Suggestions\":[";
                                            comma = ",";
                                            foreach (string str in wordSuggestions)
                                            {
                                                words += comma2 + "\"" + str + "\"";
                                                comma2 = ",";
                                            }
                                            wordsAdded.Add(word.ToLower());
                                            words += "]}";
                                            wordCount++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                //}
                //catch (Exception) 
                //{
                //}
            }
            DateTime dd = DateTime.Now;
                System.TimeSpan tt = dd-d;
            ret1 = "{\"TotalWords\":\"" + wordCount + "\",\"Words\":[" + words;
            ret1 += "]}";
            return ret1;

        }

        private bool exist(string word,List<string> wordlist)
        {
            bool ret = false;
            //var result = (from e in wordlist where e.Contains(word) select new { }).Count();
            var result = (from e in wordlist where e.ToLower() == word select new { }).Count();
            ret = (result > 0);
            return ret;
        }

        
        public bool initDictionary()
        {
            mSc = null;
            return true;
        }

        public bool Add2Dictionary(string word,string user)
        {
            List<string> mS = Suggest(word);
            bool go = false;
            if (mS == null)
            {
                go = true;
            }
            else
            {
                if (mS.Count > 0)
                {
                    if (mS.Count == 1)
                    {
                        if (mS[0].ToLower() != "no spelling mistake found")
                        {
                            go = true;
                            foreach (string s in mS)
                            {
                                if (s.ToLower() == word.ToLower())
                                {
                                    go = false;
                                    break;  
                                }
                            }
                        }
                    }
                    else
                    {
                        go = true;
                    }
                }
            }
            if (go)
            {
                AppCode.DomainInfo mDomain = AppCode.webConfig.DomainInformation();
                if (string.IsNullOrWhiteSpace(mDomain.Uid))
                {
                    add2Dictionary(word, user);
                }
                else
                {
                    _Library._System._Security.clsImpersonate imp;
                    if (string.IsNullOrWhiteSpace(mDomain.Domain))
                    {
                        imp = new _Library._System._Security.clsImpersonate(mDomain.Uid, mDomain.Pwd);
                    }
                    else
                    {
                        imp = new _Library._System._Security.clsImpersonate(mDomain.Uid, mDomain.Pwd, mDomain.Domain);
                    }
                    imp.BeginImpersonation();
                    try
                    {
                        add2Dictionary(word, user);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    finally
                    {
                        imp.EndImpersonation();
                    }
                }
                mSc = null;
            }
            return go;
        }

        private void add2Dictionary(string word,string user)
        {
            char alpha = Convert.ToChar(word.Substring(0, 1));
            string DictionaryFile = HttpContext.Current.Server.MapPath(DictionaryBase.SelectedDictionary()) + alpha + ".txt";
            if (!File.Exists(DictionaryFile))
            {
                throw new Exception("Cannot find Dictionary File. " + DictionaryFile);
            }
            string fileContent = File.ReadAllText(DictionaryFile);
            fileContent += "\r\n" + word;
            File.WriteAllText(DictionaryFile, fileContent);
            add2CustomDictionary(word,user);
        }

        private void add2CustomDictionary(string word,string user)
        {
            char alpha = Convert.ToChar(word.Substring(0, 1));
            string UawFile = HttpContext.Current.Server.MapPath(DictionaryBase.SelectedDictionary()) + alpha + ".uaw";
            if (!File.Exists(UawFile))
            {
                FileStream fs = File.Create(UawFile);
                fs.Close();
                fs.Dispose();
                if (!File.Exists(UawFile))
                {
                    throw new Exception("Cannot find Dictionary File. " + UawFile);
                }
            }

            string fileContent = File.ReadAllText(UawFile);
            fileContent += string.Format("\r\n{0} [added by:{1} on:{2}]", word ,user,DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss"));
            File.WriteAllText(UawFile, fileContent);
        }

    
    }



}
