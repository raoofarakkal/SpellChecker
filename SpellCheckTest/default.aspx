<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SpellCheckTest._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="scripts/TinyMCE/349/tiny_mce.js"></script>
    <script src="scripts/jquery-1.8.0.min.js"></script>
    <style type="text/css">
        #body1 {
            height: 500px;
            width: 600px;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(

            function () {

                tinyMCE.init({ mode: "textareas", theme: "advanced", editor_selector: "mceEditor", plugins: "OryxSpellCheck,inlinepopups", theme_advanced_buttons1: "OryxSpellCheck" });
                setTimeout('autoload()', 100);
            }

        );


        var win;
        var content;

        function autoload() {
            reset1('body1');
        }

        function reset1(elemID) {

            var test = document.getElementById('divTest3');
            tinyMCE.getInstanceById('body1').setContent(test.innerHTML);
        }


    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <textarea id="body1" class="mceEditor">sdfsdfsdf</textarea>
        <div style="cursor:pointer;color:blue;" onclick="reset1('body1')">click here to reset data</div>

        <div id="divTest2" style="display:none;visibility:hidden;">
            <p>rya's rye's labour and Labor Haret we go, can i see raoofabdul raoofabduls raoofabdulla.</p>
            <p>lats do sume specyfic SPECIFYC SPECYFIC test on thes subjacts and chekt tha details</p>
            <p>queanslend queenslend queansland organization</p>
            <p>organisationals</p>
            <hr/>
            <p>haret we go, can i see raoofabdul.</p>
            <p>lats do sume specyfic test on thes subjacts and chekt tha details</p>
            <p>queanslend queenslend queansland organization</p>
            <p>organisationals, No mistekes mistaks mistakes found rustlar's rustlars .</p>
            <hr/>
            <p>haret we go, can i see raoofabdul.</p>
            <p>lats do sume specyfic test on thes subjacts and chekt tha details</p>
            <p>queanslend queenslend queansland organization</p>
            <p>organisationals, No mistekes mistaks mistakes found rustlar's rustlars .</p>
        </div>

        <div id="divTest" style="display:none;visibility:hidden;">
            <p>What immediately strikes the reader when seeing this opening paragraph is the unabashedly European character and disposition of the thing the author calls "philosophy today" - thus laying a claim on both the subject and time that is peculiar and in fact an exclusive property of Europe.</p>
            <p>What immediately strikes the reader when seeing this opening paragraph is the unabashedly European character and disposition of the thing the author calls "philosophy today" - thus laying a claim on both the subject and time that is peculiar and in fact an exclusive property of Europe.</p>
            <p>What immediately strikes the reader when seeing this opening paragraph is the unabashedly European character and disposition of the thing the author calls "philosophy today" - thus laying a claim on both the subject and time that is peculiar and in fact an exclusive property of Europe.</p>
            <p>What immediately strikes the reader when seeing this opening paragraph is the unabashedly European character and disposition of the thing the author calls "philosophy today" - thus laying a claim on both the subject and time that is peculiar and in fact an exclusive property of Europe.</p>
            <p>What immediately strikes the reader when seeing this opening paragraph is the unabashedly European character and disposition of the thing the author calls "philosophy today" - thus laying a claim on both the subject and time that is peculiar and in fact an exclusive property of Europe.</p>

            <p>Testimp Testimp Practice practice European european Europian europian There this What In of 1here 'here' /here/ @here "here" (here) [here] {here} </p>
            <p>In a lovely little panegyric for the distinguished European philosopher Slavoj Zizek, <a class="internallink" href="http://www.aljazeera.com/indepth/opinion/2012/12/20121224122215406939.html" target="_blank">published recently on Al Jazeera</a>, we read:</p>
            <blockquote>
            <p><em>There are many important and active philosophers today: Judith Butler in the United States, Simon Critchley in England, Victoria Camps in Spain, Jean-Luc Nancy in France, Chantal Mouffe in Belgium, Gianni Vattimo in Italy, Peter Sloterdijk in Germany and in Slovenia, Slavoj Zizek, not to mention others working in Brazil, Australia and China.</em></p>
            </blockquote>
            <p>What immediately strikes the reader when seeing this opening paragraph is the unabashedly European character and disposition of the thing the author calls "philosophy today" - thus laying a claim on both the subject and time that is peculiar and in fact an exclusive property of Europe.</p>
            <p>Even Judith Butler who is cited as an example from the United States is decidedly a product of European philosophical genealogy, thinking somewhere between Derrida and Foucault, brought to bear on our understanding of gender and sexuality.</p>
            <p>To be sure, China and Brazil (and Australia, which is also a European extension) are cited as the location of other philosophers worthy of the designation, but none of them evidently merits a specific name to be sitting next to these eminent European philosophers.</p>
            <p>The question of course is not the globality of philosophical visions that all these prominent European (and by extension certain American) philosophers indeed share and from which people from the deepest corners of Africa to the remotest villages of India, China, Latin America, and the Arab and Muslim world ("deep and far", that is, from a fictive European centre) can indeed learn and better understand their lives.</p>
            <p>That goes without saying, for without that confidence and self-consciousness these philosophers and the philosophical traditions they represent can scarce lay any universal claim on our epistemic credulities, nor would they be able to put pen to paper or finger to keyboard and write a sentence.</p>
            <p><strong>Thinkers outside Europe </strong></p>
            <p>These are indeed not only eminent philosophers, but the philosophy they practice has the globality of certain degrees of self-conscious confidence without which no thinking can presume universality.</p>
            <p>The question is rather something else: What about other thinkers who operate outside this European philosophical pedigree, whether they practice their thinking in the European languages they have colonially inherited or else in their own mother tongues - in Asia, in Africa, in Latin America, thinkers that have actually earned the dignity of a name, and perhaps even the pedigree of a "public intellectual" not too dissimilar to Hannah Arendt, Jean-Paul Sartre, and Michel Foucault that in this piece on Al Jazeera are offered as predecessors of Zizek?</p>
            <p><!-- PAGELOADEDSUCCESSFULLY--></p>
            <table class="Skyscrapper_Body" style="border-style: solid; border-color: white; width: 250px; float: right; border-collapse: collapse; background-color: #fb9d04;" border="10">
            <tbody>
            <tr>
            <td>
            <p><span style="font-family: arial, helvetica, sans-serif;"><span style="color: white; font-size: 10pt;"><strong>"Why is European philosophy 'philosophy', but African philosophy 'ethnophilosophy'</strong></span><span style="color: white; font-size: 10pt;"><strong>?"</strong></span></span></p>
            </td>
            </tr>
            </tbody>
            </table>
            <p><!-- PAGELOADEDSUCCESSFULLY-->What about thinkers outside the purview of these European philosophers; how are we to name and designate and honour and learn from them with the epithet of "public intellectual" in the age of globalised media?</p>
            <p>Do the constellation of thinkers from South Asia, exemplified by leading figures like Ashis Nandy, Partha Chatterjee, Gayatri Spivak, Ranajit Guha, Sudipta Kaviraj, Dipesh Chakrabarty, Homi Bhabha, or Akeel Bilgrami, come together to form a nucleus of thinking that is conscious of itself? Would that constellation perhaps merit the word "thinking" in a manner that would qualify one of them - as a South Asian - to the term "philosopher" or "public intellectuals"?</p>
            <p>Are they "South Asian thinkers" or "thinkers", the way these European thinkers are? Why is it that if Mozart sneezes it is "music" (and I am quite sure the great genius even sneezed melodiously) but the most sophisticated Indian music ragas are the subject of "ethnomusicology"?</p>
            <p>Is that "ethnos" not also applicable to the philosophical thinking that Indian philosophers practice - so much so that their thinking is more the subject of Western European and North American anthropological fieldwork and investigation?</p>
            <p>We can turn around and look at Africa. What about thinkers like Henry Odera Oruka, Ngugi wa Thiong'o, Wole Soyinka, Chinua Achebe, Okot p'Bitek, Taban Lo Liyong, Achille Mbembe, Emmanuel Chukwudi Eze, Souleymane Bachir Diagne, V.Y. Mudimbe: Would they qualify for the term "philosopher" or "public intellectuals" perhaps, or is that also "ethnophilosophy"?</p>
            <p>Why is European philosophy "philosophy", but African philosophy ethnophilosophy, the way Indian music is ethnomusic - an ethnographic logic that is based on the very same reasoning that if you were to go to the New York Museum of Natural History (popularised in Shawn Levy's <em>Night at the Museum</em> [2006]), you only see animals and non-white peoples and their cultures featured inside glass cages, but no cage is in sight for white people and their cultures - they just get to stroll through the isles and enjoy the power and ability of looking at taxidermic Yaks, cave dwellers, elephants, Eskimos, buffalo, Native Americans, etc, all in a single winding row.</p>
            <p>The same ethnographic gaze is evident in the encounter with the intellectual disposition of the Arab or Muslim world: Azmi Bishara, Sadeq Jalal Al-Azm, Fawwaz Traboulsi, Abdallah Laroui, Michel Kilo, Abdolkarim Soroush. The list of prominent thinkers and is endless.</p>
            <p>In Japan, Kojan Karatani, in Cuba, Roberto Fernandez Retamar, or even in the United States people like Cornel West, whose thinking is not entirely in the European continental tradition - what about them? Where do they fit in? Can they think - is what they do also thinking, philosophical, pertinent, perhaps, or is that also suitable for ethnographic examinations?</p>
            <p>The question of Eurocentricism is now entirely blase. Of course Europeans are Eurocentric and see the world from their vantage point, and why should they not? They are the inheritors of multiple (now defunct) empires and they still carry within them the phantom hubris of those empires and they think their particular philosophy is "philosophy" and their particular thinking is "thinking", and everything else is - as the great European philosopher Immanuel Levinas was wont of saying - "dancing".</p>
            <p>The question is rather the manner in which non-European thinking can reach self-consciousness and evident universality, not at the cost of whatever European philosophers may think of themselves for the world at large, but for the purpose of offering alternative (complementary or contradictory) visions of reality more rooted in the lived experiences of people in Africa, in Asia, in Latin America - counties and climes once under the spell of the thing that calls itself "the West" but happily no more.</p>
            <p>The trajectory of contemporary thinking around the globe is not spontaneously conditioned in our own immediate time and disparate locations, but has a much deeper and wider spectrum that goes back to earlier generations of thinkers ranging from Jos&eacute; Marti to Jamal al-Din al-Afghani, to Aime Cesaire, W.E.B. DuBois, Liang Qichao, Frantz Fanon, Rabindranath Tagore, Mahatma Gandhi, etc.</p>
            <p>So the question remains why not the dignity of "philosophy" and whence the anthropological curiosity of "ethnophilosophy"?</p>
            <p>Let's seek the answer from Europe itself - but from the subaltern of Europe.</p>
            <p><strong>'The Intellectuals as a Cosmopolitan Stratum'</strong></p>
            <p>In his <em>Prison Notebooks</em>, Antonio Gramsci has a short discussion about Kant's famous phrase in <em>Groundwork of the Metaphysics of Morals</em> (1785) that is quite critical in our understanding of what it takes for a philosopher to become universally self-conscious, to think of himself as the measure and yardstick of globality. Gramsci's stipulation is critical here - and here is how he begins:</p>
            <blockquote>
            <p><em>Kant's maxim "act in such a way that your conduct can become a norm for all men in similar conditions" is less simple and obvious than it appears at first sight. What is meant by 'similar conditions'?</em></p>
            </blockquote>
            <p>To be sure, and as Quintin Hoare and Geoffrey Nowell Smith (the editors and translators of the English translation of Gramsci's <em>Prison Notebooks</em>) note, Gramsci here in fact misquotes Kant, and that "similar conditions" does not appear in the original text, where the German philosopher says: "I am never to act otherwise than so that I could also will that my maxim should become a universal law." This principle, called "the categorical imperative", is in fact the very foundation of Kantian ethics.</p>
            <p>So where Kant says "universal law", Gramsci says, "a norm for all men", and then he adds an additional "similar conditions", which is not in the German original.</p>
            <table class="Skyscrapper_Body" style="border-style: solid; border-color: white; width: 250px; float: right; border-collapse: collapse; background-color: #fb9d04;" border="10">
            <tbody>
            <tr>
            <td>
            <p><span style="font-family: arial, helvetica, sans-serif;"><span style="color: white; font-size: 10pt;"><strong>"The world at large, and the Arab and Muslim world in particular, is going through world historic changes - these changes have produced thinkers, poets, artists, and public intellectuals at the centre of their moral and politcial imagination</strong></span><strong><span style="color: white; font-size: 13px;">.</span></strong><span style="color: white; font-size: 10pt;"><strong>"</strong></span></span></p>
            </td>
            </tr>
            </tbody>
            </table>
            <p><!-- PAGELOADEDSUCCESSFULLY-->That misquoting is quite critical here. Gramsci's conclusion is that the reason Kant can say what he says and offer his own behaviour as measure of universal ethics is that "Kant's maxim presupposes a single culture, a single religion, a 'world-wide' conformism... Kant's maxim is connected with his time, with the cosmopolitan enlightenment and the critical conception of the author. In brief, it is linked to the philosophy of the intellectuals as a cosmopolitan stratum".</p>
            <p>What in effect Gramsci discovers, as a southern Italian suffering in the dungeons of European fascism, is what in Brooklyn we call <em>chutzpah</em>, to think yourself the centre of universe, a self-assuredness that gives the philosopher that certain panache and authority to think in absolutists and grand narrative terms.</p>
            <blockquote>
            <p><em>Therefore the agent is the bearer of the "similar conditions" and indeed their creator. That is, he "must" act according to a "model" which he would like to see diffused among all mankind, according to a type of civilisation for whose coming he is working-or for whose preservation he is "resisting" the forces that threaten its disintegration.</em></p>
            </blockquote>
            <p>It is precisely that self-confidence, that self-consciousness, that audacity to think yourself the agent of history that enables a thinker to think his particular thinking is "Thinking" in universal terms, and his philosophy "Philosophy" and his city square "The Public Space", and thus he a globally recognised Public Intellectual.</p>
            <p>There is thus a direct and unmitigated structural link between an empire, or an imperial frame of reference, and the presumed universality of a thinker thinking in the bosoms of that empire.</p>
            <p>As all other people, Europeans are perfectly entitled to their own self-centrism.</p>
            <p>The imperial hubris that once enabled that Eurocentricism and still produces the infomercials of the sort we read in Al Jazeera for Zizek are the phantom memories of the time that "the West" had assured confidence and a sense of its own universalism and globality, or as Gramsci put it, "to a type of civilisation for whose coming he is working".</p>
            <p>But that globality is no more - people from every clime and continent are up and about claiming their own cosmopolitan worldliness and with it their innate ability to think beyond the confinements of that Eurocentricism, which to be sure is still entitled to its phantom pleasures of thinking itself the centre of the universe. The Gramscian superimposed "similar conditions" are now emerging in multiple cites of the liberated humanity.</p>
            <p>The world at large, and the Arab and Muslim world in particular, is going through world historic changes - these changes have produced thinkers, poets, artists, and public intellectuals at the centre of their moral and politcial imagination - all thinking and acting in terms at once domestic to their immediate geography and yet global in its consequences.</p>
            <p>Compared to those liberating tsunamis now turning the world upside down, cliche-ridden assumption about Europe and its increasingly provincialised philosophical pedigree is a tempest in the cup. Reduced to its own fair share of the humanity at large, and like all other continents and climes, Europe has much to teach the world, but now on a far more leveled and democratic playing field, where its philosophy is European philosophy not "Philosophy", its music European music not "Music", and no infomercial would be necessary to sell its public intellectuals as "Public Intellectuals".</p>
            <p><strong><em>Hamid Dabashi is the Hagop Kevorkian Professor of Iranian Studies and Comparative Literature at Columbia University in New York. Among his most recent books is </em><a class="internallink" href="http://www.amazon.com/The-World-Persian-Literary-Humanism/dp/0674066715" target="_blank">The World of Persian Literary Humanism</a><em> (2012).</em></strong></p>
            <p style="width: 100%;">2068</p>
            <div>
            <p><strong><em>The views expressed in this article are the author's own and do not necessarily reflect Al Jazeera's editorial policy.</em></strong></p>
            </div>

        </div>

        <div id="divTest3"  style="display:none;visibility:hidden;">
All foreign airlines flying to Baghdad have cancelled flights landing at the city's international airport after a FlyDubai passenger jet was shot at while approaching the Iraq capital.

Etihad Etihad Etihad Etihad Etihad Etihad 
An aviation official and a security official told Reuters news agency that two passengers were lightly injured when three or four bullets hit the body of the plane on Monday evening but they were unable to specify the source of the gunfire.

Etihad Etihad Etihad Etihad Etihad Etihad 

Flydubai, Emirates Airlines, Sharjah's Air Arabia and Abu Dhabi's Etihad Airways were the first to suspend flights following the incident, in line with a directive from the United Arab Emirates' civil aviation authority.
Etihad Etihad Etihad Etihad Etihad Etihad 


        </div>

    </div>
    </form>
</body>
</html>
