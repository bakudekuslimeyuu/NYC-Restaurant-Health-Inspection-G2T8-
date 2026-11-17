// Site content: edit text, team names and Tableau links here.
export const CONTENT = {
  siteName: "Restaurant Health Inspection Analysis",
  // Street photo from the base44 site. To use your own, put hero.jpg in public/ and set this to "hero.jpg".
  heroImage: "https://media.base44.com/images/public/6ae0c7d1eaacca254cee908c/f93a37096_generated_image.png",
  heroTitle: "Can you trust a restaurant’s health grade or its Yelp stars?",
  heroSub: "We compared NYC inspection records with Yelp reviews to find out.",
  members: ["Xuan Wei", "Mei Yu", "Zheng Long", "Shanice", "Zheng Seng"],
  dataNote: "DOHMH New York City Restaurant Inspection Results · Yelp restaurant records, star ratings & public review text",

  // Paste each Tableau Public link into `url`, e.g. https://public.tableau.com/views/Workbook/Dashboard1
  // (In Tableau Public: open the viz → Share → copy the Link. Anything after "?" is ignored.)
  // Set each dashboard to Size → Fixed size, width 980, in Tableau; the frame then grows to the dashboard's height.
  // Automatic-size dashboards can set `height` (px) on a view instead, e.g. { label:"…", url:"…", height:1100 }.
  dashboards: [
    { n:1, owner:"Xuan Wei", nav:"Grade on the Door",
      title:"You can’t rely on the grade on the door",
      intro:"This part looks only at the official record: the DOHMH inspection results for New York City restaurants. Nothing here comes from Yelp. The question is whether the letter on the door — the signal almost every diner already uses — is an accurate picture of the kitchen behind it.",
      source:"DOHMH NYC Restaurant Inspection Results",
      question:"Does the letter on the door match what the inspection record actually says?",
      views:[{label:"Grade posted vs. inspection score", url:"https://public.tableau.com/views/Dashboard_1_v5/Dashboard1"}],
      insights:[
        ["The letter can trail the latest inspection.", "Edit: how often the posted grade comes from an older inspection cycle."],
        ["“Grade pending” hides the newest result.", "Edit: restaurants whose most recent inspection is unresolved."],
        ["An A can sit alongside serious violations.", "Edit: serious findings recorded within A-graded cycles."]
      ],
      takeaway:"The letter is the end of a process, not a live reading of the kitchen." },
    { n:2, owner:"Mei Yu", nav:"Stars vs. Citations",
      title:"You can’t rely on the Yelp stars either",
      intro:"If the grade on the door isn't reliable, maybe diners can just look at Yelp instead. I matched Yelp restaurants to their DOHMH inspection records to see whether higher-rated places actually have cleaner inspections.",
      source:"Yelp star ratings matched to DOHMH inspection history",
      question:"If the letter is stale, does the star rating tell a diner what the record does not?",
      views:[
        {label:"Main findings", url:"https://public.tableau.com/views/Dashboard2-Public/Dashboard2-Dostarsmeanclean"},
        {label:"Why citations rise", url:"https://public.tableau.com/views/Dashboard2b-Public/Dashboard2b-Whycitationsrisewithstars",
          insights:[
            ["The rise comes from chains.", "76% of 2★ restaurants are chains, but only 5% of 5★ ones are, and chains get cleaner scores. If every star level had the same share of chains, the rise disappears (18.3 at 2★, 17.4 at 5★)."],
            ["Asian cuisine isn't what drives it.", "Asian restaurants do get higher inspection scores (19.6 vs 16.3), but they stay around 19 to 20 at every star level. With the same share of Asian restaurants at every star level, the score still rises from 14.4 to 17.7."]
          ]}
      ],
      insights:[
        ["C-grade places get the same stars as A-grade ones.", "The Yelp ratings for A, B and C restaurants look almost the same, so a bad grade doesn't seem to hurt a restaurant's rating."],
        ["From 3 to 5 stars, the inspections barely change.", "Citations per inspection stay at about 3.4 to 3.5 and the average score stays around 17. A 5-star place isn't any cleaner than a 3-star one."],
        ["5-star restaurants still have Poor records.", "15% of inspection records for 5-star restaurants are Poor, which is actually the highest out of all the star levels."],
        ["It's the same in every borough.", "The correlation between stars and inspection score is only 0.04 to 0.12 in all five boroughs, which is basically no link."]
      ],
      takeaway:"A good Yelp rating means people liked the food, not that the kitchen is clean. If hygiene matters to you, check the inspection record instead of the stars." },
    { n:3, owner:"Zheng Long", nav:"Review Text",
      title:"You can’t rely on what reviewers write either",
      intro:[
        "Diners have two quick ways to judge a restaurant: **the inspection grade on the door, and Yelp**.",
        "Earlier, we saw that **a good grade can hide the problems inspectors found**, and may be out of date. Yelp’s star rating, which many diners check first because it is quick and familiar, fares no better: **it stays almost the same whether a restaurant’s inspections are good or poor**.",
        "However, Yelp offers more than stars. **A star rating compresses a whole dining experience into a single number**, and we believe many diners rate based on the one part that mattered most to them, such as rude service or an outstanding dish, which can push the rating up or down regardless of everything else.",
        "Review text gives diners room to describe the whole visit, including what they noticed about cleanliness: a dirty table, a cockroach or food poisoning, details that a single star cannot carry. This page asks **whether review text gives New Yorkers a reliable signal of food safety**. To find out, we analysed 776,637 Yelp reviews of 9,553 restaurants (reviews from 2023 onwards, restaurants with more than 20 reviews) and compared what they say with what inspectors found at the same restaurants."
      ],
      source:"Yelp review text (keyword matching, sentiment scores and word frequencies) matched to DOHMH inspections, 2023–2026",
      question:"Does review text give New Yorkers a reliable signal of food safety?",
      // Overview: the whole dashboard, switched with the buttons above the frame.
      views:[
        {label:"Yelp reviews and stars", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Overview", height:980},
        {label:"Words in 1★ and 5★ reviews", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Words", height:980}
      ],
      // Walkthrough: one chart at a time, below the overview. Each step: a question, its chart, how to read it,
      // what we found, and a line leading into the next step. Leave `url` empty until the chart is published.
      steps:[
        {question:"Do Yelp reviews mention the problems inspectors find?", chart:"Inspections vs. reviews", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepGap", height:630,
          howToRead:[
            "Each row is one type of hygiene problem that inspectors cite, from dirty surfaces to worker hygiene.",
            "The {purple:purple dots}, on the right, show the share of routine inspections (2023 onwards) that found each problem.",
            "The {orange:orange dots}, on the left, show the share of reviews that mention it.",
            "The longer the line between the two dots, the bigger the gap between what inspectors find and what reviews mention.",
            "Hover over a dot to see its exact percentage, to two decimal places, and examples of the words counted as a mention.",
            "The star-rating dropdown filters the chart to restaurants rated 4 to 5, 3 to 3.9 or 1 to 2.9 stars, and the title updates to match. Whichever rating you choose, the gap stays large for every problem."
          ],
          found:"Across all restaurants, inspectors cite each of the seven problems in 8% to 52% of routine inspections, yet no problem is mentioned in more than 0.80% of reviews. The widest gap is for dirty surfaces: found in 52% of inspections, but mentioned in only about 1 in 1,000 reviews (0.10%). Even food temperature, the most-mentioned problem, appears in under 1% of reviews, and many of those mentions (“lukewarm”, “undercooked”) are likely complaints about taste rather than safety. This suggests that a diner reading Yelp reviews would rarely learn about the problems inspectors record.",
          note:"Mentions are found by keyword matching, so some complaints worded differently will be missed. Mentions are still far too rare to close a gap this large.",
          next:"Why is the gap so large? We believe one reason is that most of these problems happen in the kitchen, where diners cannot see them. For example, raw food left out of the fridge for too long is unlikely to be noticed by anyone in the dining room, so it is not surprising that reviews rarely mention it. Live pests are different: mice and cockroaches do not stay in the kitchen, and diners can see them. If reviews were to reflect any problem, it should be this one, so we look at it more closely next."},
        {question:"Do Yelp reviews mention pests where inspectors keep finding them?", chart:"Repeated live pests", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepPests", height:630,
          howToRead:[
            "The chart covers only restaurants that inspectors cited for live pests (rats, mice, cockroaches or flies) three or more times since 2023: 1,556 restaurants.",
            "Each bar is one borough, split by whether any of its restaurants’ reviews mention pests.",
            "The {grey:grey portion} shows the share of restaurants where not a single review mentions pests. The {orange:orange portion} shows the share where at least one review does.",
            "The bars are sorted from the largest grey share (Staten Island) to the smallest (Manhattan). The bigger the grey portion, the more often repeated pest problems went unmentioned in Yelp text reviews."
          ],
          found:"Of the 1,556 restaurants, 1,140 (73%) never received a single review mentioning pests, even though inspectors cited each of them for pests at least three times. The share ranges from 71% in Manhattan to 85% in Staten Island. Across all reviews of these restaurants, only 597 of 126,327 (0.47%) mention pests, and the restaurants that do have a mention usually have just one. This suggests that at most restaurants where inspectors keep finding pests, a diner reading Yelp would see no warning.",
          note:"Restaurants with more reviews are more likely to have at least one mention, yet even among those with 100 or more reviews, 55% have none. A review counts as mentioning pests if it uses words such as “cockroach”, “rat”, “mice”, “rodent”, “bugs”, “flies” or “infested”.",
          next:"Reviewers rarely write about pests, even where inspectors keep finding them. However, a diner who saw a mouse might not describe it, and instead leave a lower star rating or a more negative review. So next we look beyond specific words, and ask whether the stars, or how positive the reviews are overall, drop at restaurants that inspectors cited."},
        {question:"Do restaurants cited for hygiene problems get lower stars or less positive reviews?", chart:"Stars vs. review positivity", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepScatter", height:630,
          howToRead:[
            "Each circle is one restaurant with more than 20 Yelp reviews (9,521 restaurants).",
            "Across: review positivity, the average score of its reviews based on their wording, from −1 (very negative) to +1 (very positive). Up: its average Yelp stars.",
            "The circles are see-through, so darker areas are where many restaurants overlap.",
            "The “Show restaurants cited for” dropdown shows only restaurants that inspectors cited at least once for one problem since 2023. The title then updates with the number of restaurants shown and the share with 4+ stars and positivity of 0.5 or more (the top-right area), to compare with 60% for all restaurants."
          ],
          found:"Stars and review positivity agree closely (correlation 0.90): the more positive the reviews read, the higher the stars, so positivity is a fair measure of how diners felt. Most restaurants sit in the top right: 60% have 4+ stars and positivity of 0.5 or more. Choosing a problem in the dropdown barely changes this: 57% to 59% of cited restaurants are still in the top right, compared with 60% to 65% of restaurants never cited for that problem. This suggests that a citation makes, at most, a small difference to a restaurant’s stars and to how its reviews read.",
          note:"Positivity is scored with VADER, a standard tool that rates text by the positive and negative words it contains. It can misread sarcasm, but its close match with the stars suggests it works well here.",
          next:"Being cited at least once is common: 7,614 of the 9,521 restaurants were cited for dirty surfaces alone. A stronger test is the grade on the door. A grade C means inspectors found many or serious problems, so if reviews reflect hygiene anywhere, grade C restaurants should read more negatively."},
        {question:"Do reviews read less positively at grade C restaurants?", chart:"Review positivity by grade", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepGrades", height:630,
          howToRead:[
            "Each bar groups restaurants by their latest inspection grade: A (7,840 restaurants), B (762) and C (231). The 688 restaurants without a grade yet are left out.",
            "Grade A means the inspection scored 13 points or fewer; grade C means 28 or more, where more points mean more or worse problems.",
            "The height of each bar is the average review positivity, on the same −1 to +1 scale as the previous chart.",
            "If reviews reflected what inspectors find, the grade C bar would be clearly lower than the grade A bar. Hover over a bar for the number of restaurants behind it."
          ],
          found:"Reviews read almost equally positive at every grade: 0.69 at grade A, 0.68 at grade B and 0.67 at grade C, a difference of only 0.02 on a scale from −1 to +1. Average stars barely differ either: 4.00 at grade A, and 3.96 at both grade B and grade C. This suggests that a diner reading the reviews of a grade C restaurant would find them almost as positive as those of a grade A one.",
          note:"The grade is the latest one, while reviews go back to 2023, so some reviews were written under an earlier grade. Grouping restaurants by their average inspection score since 2023 instead gives the same result (0.69, 0.68 and 0.68).",
          next:"If reviews do not track hygiene, what do they track? To find out, we compare the words that set 1-star reviews apart from 5-star reviews. If hygiene problems drove the worst ratings, hygiene words should top the 1-star list."},
        {question:"What do Yelp reviewers write about instead?", chart:"Words in 1-star and 5-star reviews", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Words", height:980,
          howToRead:[
            "The top cloud shows the 60 words that most set 1-star reviews apart from 5-star reviews; the bottom cloud shows the 60 words that most set 5-star reviews apart.",
            "The clouds are built from 40,000 randomly chosen 1-star reviews and 40,000 randomly chosen 5-star reviews, from 2023 onwards.",
            "A word is large when it is both common in its group and much more common there than in the other group.",
            "{orange:Orange} words are about hygiene (“poison”, “hair” and “dirty”); {grey:grey} words are about everything else.",
            "Word forms are merged (“refund” and “refunds” count as one, and “poisoning” counts as “poison”). Common or general words such as “the”, “good” or “terrible” are removed, because they do not show what a review is about."
          ],
          found:"1-star reviews are mostly about service and money: “rude” appears in 13% of them, followed by “charge”, “pay”, “manager”, “minute” and “money”. The first hygiene word, “poison” (as in “food poisoning”), ranks only 38th and appears in under 2% of 1-star reviews; “hair” and “dirty” rank 55th and 57th. 5-star reviews praise taste, staff and atmosphere (“delicious”, “friendly”, “attentive”), and no hygiene word is among their top 60. This suggests that ratings are driven by what diners experience at the table rather than by hygiene, even in the most negative reviews.",
          note:"The clouds show the words that differ most between the two groups, not every word used, so hygiene complaints worded in other ways (such as “something crawling”) do not appear."}
      ],
      takeaway:"Review text is not a reliable signal of food safety. Reviews rarely mention the problems inspectors find, even repeated pests, and read almost as positively at grade C restaurants as at grade A. Together with the star ratings, this means Yelp, as it is used today, gives New Yorkers little help in finding restaurants with high food safety standards." },
    { n:4, owner:"Shanice", nav:"What to Check Instead",
      title:"What to check instead",
      intro:"If both familiar signals are weak, some others still carry information. This part looks at when violations happen and which kinds of restaurants are cited, so a diner knows what is actually worth checking.",
      source:"DOHMH NYC Restaurant Inspection Results, by month and restaurant type",
      question:"If both signals are weak, what should a diner actually use?",
      views:[{label:"Seasons, Cuisine Types and Chain Status", url:"https://public.tableau.com/views/Dashboard4Project_17938628387700/Dashboard1"}],
      insights:[
        ["Violations rise in the summer.", "Edit: monthly pattern of violations."],
        ["Chains and established restaurants differ.", "Edit: citation rates for chains vs. long-running independents."],
        ["The inspection date matters as much as the letter.", "Edit: how recency changes what a grade means."]
      ],
      takeaway:"Check when the restaurant was last inspected and what was found — not just the letter or the stars." }
  ],

  // Redesign Proposal page. `img` files live in public/redesign/.
  redesign: {
    motivation: "In our research, we found no meaningful reaction to a citation. Across the citations, ratings moved by only 0.02 and complaints about pests, dirt, food temperature or illness did not rise. Nothing in the stars or the reviews warns a diner, so Yelp’s listing should carry the inspection result itself.",
    changes: [
      { t:"Relocate the hygiene grade to sit beside the stars",
        d:"Today the health score is filed under “Amenities and More”, next to delivery and take-out. The proposal moves it into the rating row, where every diner already looks.",
        principle:"Proximity / visual hierarchy",
        why:"Items placed together are read together, and readers scan the top of a page first.",
        refs:"Wertheimer 1923; Nielsen 2006",
        img:"redesign/01-grade-beside-stars.png",
        alt:"Katz’s Delicatessen on Yelp today, with the health score under Amenities, beside the proposed listing with an NYC health inspection badge in the rating row." },
      { t:"Redesign the existing hygiene grade card",
        d:"Yelp’s card shows a bare letter under “Powered by Health Department Intelligence”. The proposal uses the familiar NYC window-card style for A, B and C, plus a Grade Pending card.",
        principle:"Recognition over recall / preattentive cues",
        why:"A familiar symbol needs no learning, and colour plus enclosure stand out before conscious attention.",
        refs:"Nielsen 1994; Ware 2012",
        img:"redesign/02-grade-card.png",
        alt:"Yelp’s current Health Score card with a large letter A, beside proposed NYC window-card style cards for A, B, C and Grade Pending." },
      { t:"Lead the inspection data with the newest inspection",
        d:"Yelp opens on an older graded inspection, so the first thing a diner reads may be out of date. The proposal puts the newest full inspection first, with its score, issues and pending status.",
        principle:"Recency / reading order",
        why:"People take the first item shown as the current state, so the newest result must come first.",
        refs:"Nielsen 2006; Tufte 2001",
        img:"redesign/03-newest-inspection-first.png",
        alt:"Yelp’s inspection history headed by a February 2025 inspection, beside the proposed view headed by the July 13, 2026 inspection with a pending grade." },
      { t:"Give the hygiene score more context",
        d:"A score of 20 means little on its own. The proposal shows it on a bar with the A, B and C bands and a dashed benchmark for similar restaurants nearby.",
        principle:"“Compared with what?” / bullet graph",
        why:"A number only means something next to a reference; a band bar shows value and range in one line.",
        refs:"Tufte 2006; Few 2006",
        img:"redesign/04-score-context.png",
        alt:"Yelp’s table of inspection scores, beside a proposed score bar with A, B and C bands and a benchmark for similar Manhattan sandwich shops." },
      { t:"Simplify the violations text",
        d:"Yelp repeats the DOHMH legal wording, cut off after two lines. The proposal writes each finding in everyday words and labels it Serious or Minor with both text and an icon.",
        principle:"Redundant encoding / plain language",
        why:"About 1 in 12 men has a colour-vision deficiency, so colour cannot carry meaning alone; everyday wording cuts reading effort.",
        refs:"WCAG 2.2 SC 1.4.1; plainlanguage.gov",
        img:"redesign/05-plain-violations.png",
        alt:"Yelp’s long regulatory violation text, beside a proposed list of plain-English findings tagged Serious or Minor." }
    ]
  }
};
