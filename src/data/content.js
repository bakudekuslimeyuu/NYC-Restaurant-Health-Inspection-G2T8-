// Site content: edit text, team names and Tableau links here.
export const CONTENT = {
  siteName: "Restaurant Health Inspection Analysis",
  // Street photo from the base44 site. To use your own, put hero.jpg in public/ and set this to "hero.jpg".
  heroImage: "https://media.base44.com/images/public/6ae0c7d1eaacca254cee908c/f93a37096_generated_image.png",
  heroTitle: "Can New York diners trust Yelp reviews to eat safely?",
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
      overviewIntro:"This dashboard brings all the charts together to answer one part of our wider question: **does the grade on the door give a complete and current picture of the inspection?** After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.",
      views:[{label:"Grade posted vs. inspection score", url:"https://public.tableau.com/views/Dashboard_1_v5/Dashboard1"}],
      insights:[
        ["The letter can trail the latest inspection.", "Edit: how often the posted grade comes from an older inspection cycle."],
        ["“Grade pending” hides the newest result.", "Edit: restaurants whose most recent inspection is unresolved."],
        ["An A can sit alongside serious violations.", "Edit: serious findings recorded within A-graded cycles."]
      ],
      takeaway:"The letter is the end of a process, not a live reading of the kitchen." },
    { n:2, owner:"Mei Yu", nav:"Stars vs. Citations",
      title:"You can’t rely on the Yelp stars either",
      intro:[
        "Diners have two quick ways to judge a restaurant: **the inspection grade on the door, and Yelp**.",
        "Earlier, we saw that **a good grade can hide the problems inspectors found**, and may be out of date. So a diner might turn to Yelp instead: the star rating is quick, familiar and kept up to date by thousands of other diners.",
        "This page asks **whether higher Yelp stars mean cleaner inspections**. To find out, we matched 19,237 Yelp restaurants to their DOHMH inspection records from 2023 onwards, and compared their stars with what inspectors found. The charts by star level cover the 18,865 restaurants rated 2 to 5 stars."
      ],
      source:"Yelp star ratings matched to DOHMH inspection history, 2023–2026",
      question:"Can diners rely on Yelp stars to tell how clean a restaurant is?",
      overviewIntro:"This dashboard brings all the charts together to answer one part of our wider question: **can diners rely on Yelp stars to tell how clean a restaurant is?** After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.",
      // Overview: the whole dashboard, switched with the buttons above the frame.
      views:[
        {label:"Main findings", url:"https://public.tableau.com/views/Dashboard2-Public/Dashboard2-Dostarsmeanclean"},
        {label:"Why citations rise", url:"https://public.tableau.com/views/Dashboard2b-Public/Dashboard2b-Whycitationsrisewithstars"}
      ],
      // Walkthrough: one chart at a time, below the overview (same format as Dashboard 3).
      // howToReadBelow: the chart comes first, with how to read next to what we found.
      howToReadBelow:true,
      steps:[
        {question:"Do grade C restaurants get lower Yelp stars?", chart:"Yelp rating by inspection grade", url:"https://public.tableau.com/views/Dashboard2-Public/D2eRatingbygradedots", height:520,
          howToRead:[
            "Each dot is one restaurant, grouped by its latest inspection grade: A (15,941 restaurants), B (1,502) and C (460).",
            "The vertical axis shows the restaurant’s Yelp star rating, from 1 to 5 stars.",
            "The grey box covers the middle half of the restaurants in each grade, and the line inside it marks the median rating.",
            "Grade A means the inspection scored 13 points or fewer, grade B 14 to 27, and grade C 28 or more. More points mean more or worse problems."
          ],
          found:"The three boxes sit at almost the same height. The median rating is 3.9 stars at every grade, and the average is 3.75 at grade A, 3.74 at grade B and 3.76 at grade C. Grade C restaurants are even slightly more likely to have 4 stars or more (48%) than grade A ones (47%). This suggests that a poor grade costs a restaurant almost nothing on Yelp, so a diner who only checks the stars gets no warning about a C.",
          next:"The stars do not follow the grade. However, the grade comes from a single inspection and, as we saw in Dashboard 1, may be out of date. A fairer test is to compare the stars with each restaurant’s whole inspection record since 2023, which we do next."},
        {question:"Do higher-rated restaurants have cleaner inspections?", chart:"Inspection measures by star rating", url:"https://public.tableau.com/views/Dashboard2-Public/D2dSamecitationsateverystarlevel", height:480,
          howToRead:[
            "Each column is a Yelp star level, from 2 to 5 stars.",
            "Each row is one inspection measure, averaged over the restaurants at that star level: citations per inspection, critical citations per inspection, the average inspection score, and the share of restaurants without an A grade.",
            "For every row, a higher value is worse. A darker cell means a higher value compared with the rest of that row."
          ],
          found:"From 3 to 5 stars, the numbers barely move: 3.38 to 3.47 citations and 1.81 to 1.85 critical citations per inspection, and an average score between 16.8 and 17.6. A 5-star restaurant is cited about as often as a 3-star one. The only clear difference is at the bottom: 2-star restaurants look the cleanest, with 2.86 citations per inspection and an average score of 13.4. This suggests that more stars do not mean a cleaner kitchen.",
          next:"Averages can hide the worst cases. Even if highly rated restaurants are cited about as often on average, they might still avoid the most serious results. Next, we look at how often restaurants at each star level have a poor inspection record."},
        {question:"Do 5-star restaurants avoid poor inspection records?", chart:"Inspection record by star rating", url:"https://public.tableau.com/views/Dashboard2-Public/D2gInspectionrecordbystars", height:520,
          howToRead:[
            "Each bar is one star level, split by the restaurant’s inspection record: Good (green), Fair (yellow) and Poor (red).",
            "The record uses the same cut-offs as the grades: Good is an inspection score of 0 to 13, Fair 14 to 27, and Poor 28 or more.",
            "Each bar adds up to 100%, so compare the size of the red portion across the bars."
          ],
          found:"The share of restaurants with a Poor record rises from 6% at 2 stars to 9% at 2.5 stars, stays at 11% to 12% from 3 to 4.5 stars, and is highest at 5 stars: 15%, or 145 of 936 restaurants. The share with a Good record falls from 67% at 2 stars to between 41% and 49% at 3 stars and above. This suggests that high stars do not protect a diner from a poorly inspected restaurant; if anything, the top-rated restaurants have the most Poor records.",
          next:"Could one part of the city be driving this? A borough with many highly rated restaurants and strict inspections could pull the whole result one way. Next, we check each borough on its own."},
        {question:"Is it the same in every borough?", chart:"Stars and inspection score by borough", url:"https://public.tableau.com/views/Dashboard2-Public/D2fCorrelationbyborough", height:420,
          howToRead:[
            "Each bar is one borough. Its length is the correlation (r) between a restaurant’s Yelp stars and its average inspection score.",
            "A correlation of 0 means no link at all, and 1 means a perfect link. Grand Total is all five boroughs together."
          ],
          found:"The correlation is between 0.04 and 0.12 in every borough, and 0.06 for the whole city. A correlation this close to 0 means that knowing a restaurant’s stars tells you almost nothing about its inspection score. This suggests that the result is not driven by any one borough: anywhere in New York, the stars say very little about hygiene.",
          next:"Across the city, stars and inspections are barely linked. But one pattern from the second chart still needs explaining: 2-star restaurants look cleaner than 5-star ones, so citations seem to rise slightly with stars. Does a good rating really go with a dirtier kitchen? We believe the answer lies in which restaurants get low stars, so we look at that next."},
        {question:"Which restaurants get low stars?", chart:"Chain share by star rating", url:"https://public.tableau.com/views/Dashboard2b-Public/D2zStep2Chainshare", height:480,
          howToRead:[
            "Each bar is one star level, split into chains (blue) and independent restaurants (orange).",
            "A chain is a restaurant name with 5 or more locations in the data.",
            "Each bar adds up to 100%, so compare the size of the blue portion across the bars."
          ],
          found:"Chains make up 76% of 2-star restaurants (457 of 604) and 48% of 2.5-star ones, but only 5% of 4.5-star and 5-star restaurants. The low-star group is mostly chains, while almost every highly rated restaurant is independent. This suggests that the averages for 2-star restaurants mostly describe chains.",
          next:"If chains also have cleaner inspections, that alone would make the low-star group look cleaner. We compare chains and independent restaurants next."},
        {question:"Are chains cleaner than independent restaurants?", chart:"Inspection score, chains vs. independents", url:"https://public.tableau.com/views/Dashboard2b-Public/D2yStep2Chainvsindependent", height:480,
          howToRead:[
            "Each line shows the average inspection score at each star level: chains in blue and independent restaurants in orange.",
            "A lower score means fewer or less serious problems."
          ],
          found:["Chains score cleaner than independent restaurants at every star level: 11.5 vs. 19.5 at 2 stars, and 15.8 vs. 17.7 at 5 stars. Because 2-star restaurants are mostly chains, their average looks clean. If every star level had the same share of chains, the rise disappears: the average score would go from 18.3 at 2 stars to 17.4 at 5 stars. This suggests that citations seem to rise with stars because low-rated restaurants are mostly chains, not because a good rating goes with a dirtier kitchen.",
            "We also checked whether cuisine explains it, since Asian restaurants get higher inspection scores on average (19.6 vs. 16.3). With the same share of Asian restaurants at every star level, the score still rises from 14.4 to 17.7, so cuisine does not account for it."],
          note:"Chain scores do rise with stars, from 11.5 at 2 stars to 15.8 at 5 stars, but only 49 chains are rated 5 stars, so the chain line at 5 stars rests on few restaurants."}
      ],
      takeaway:"Yelp stars are not a reliable signal of food safety. Grade C restaurants are rated as highly as grade A ones, 5-star restaurants have Poor inspection records at least as often as any other star level, and the link between stars and inspection scores is close to zero in every borough. The slight rise in citations with stars comes from chains, not from cleaner low-rated kitchens. A good rating tells diners that people enjoyed the food, not that the kitchen is clean." },
    { n:3, owner:"Zheng Long", nav:"Review Text",
      title:"You can’t rely on what reviewers write either",
      intro:[
        "Diners have two quick ways to judge a restaurant: **the inspection grade on the door, and Yelp**.",
        "Earlier, we saw that **a good grade can hide the problems inspectors found**, and may be out of date. Yelp’s star rating, which many diners check first because it is quick and familiar, fares no better: **it stays almost the same whether a restaurant’s inspections are good or poor**.",
        "However, Yelp offers more than just a star rating. **A star rating compresses a whole dining experience into a single number**, and we believe many diners rate based on the one part that mattered most to them, such as rude service or an outstanding dish, which can push the rating up or down regardless of everything else.",
        "Review text gives diners room to describe the whole visit, including what they noticed about cleanliness: a dirty table, a cockroach or food poisoning, details that a single star cannot carry. This page asks **whether review text gives New Yorkers a reliable signal of food safety**. To find out, we analysed 776,637 Yelp reviews of 9,553 restaurants (reviews from 2023 onwards, restaurants with more than 20 reviews) and compared what they say with what inspectors found at the same restaurants."
      ],
      source:"Yelp review text (keyword matching, sentiment scores and word frequencies) matched to DOHMH inspections, 2023–2026",
      question:"Does review text give New Yorkers a reliable signal of food safety?",
      overviewIntro:"This dashboard brings all the charts together to answer one part of our wider question: **does review text give New Yorkers a reliable signal of food safety?** After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.",
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
            "The star-rating dropdown filters the chart to restaurants rated 4 to 5, 3 to 3.9 or 1 to 2.9 stars, and the title updates to match."
          ],
          found:["Across all restaurants, inspectors cite each of the seven problems in 8% to 52% of routine inspections, yet no problem is mentioned in more than 0.80% of reviews. The widest gap is for dirty surfaces: found in 52% of inspections, but mentioned in only about 1 in 1,000 reviews (0.10%). Even food temperature, the most-mentioned problem, appears in under 1% of reviews, and many of those mentions (“lukewarm”, “undercooked”) are likely complaints about taste rather than safety. This suggests that a diner reading Yelp reviews would rarely learn about the problems inspectors record.",
            "The gap holds at every star rating. Even at restaurants rated 1 to 2.9 stars, no problem is mentioned in more than 1.68% of reviews, while inspectors cite these problems in 8% to 62% of inspections. This suggests that even at the lowest-rated restaurants, reviews rarely reflect what inspectors find."],
          next:"Why is the gap so large? We believe one reason is that most of these problems happen in the kitchen, where diners cannot see them. For example, raw food left out of the fridge for too long is unlikely to be noticed by anyone in the dining room, so it is not surprising that reviews rarely mention it. Live pests are different: mice and cockroaches do not stay in the kitchen, and diners can see them. If reviews were to reflect any problem, it should be this one, so we look at it more closely next."},
        {question:"Do Yelp reviews mention pests where inspectors keep finding them?", chart:"Repeated live pests", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepPests", height:630,
          howToRead:[
            "The chart covers the 1,556 restaurants that inspectors cited for live pests (rats, mice, cockroaches or flies) three or more times since 2023.",
            "Each bar is one borough, split by whether any of its restaurants’ reviews mention pests.",
            "The {grey:grey portion} shows the share of restaurants where not a single review mentions pests. The {orange:orange portion} shows the share where at least one review does.",
            "The bars are sorted from the largest grey share (Staten Island) to the smallest (Manhattan). The bigger the grey portion, the more often repeated pest problems went unmentioned in Yelp text reviews."
          ],
          found:"Of the 1,556 restaurants, 1,140 (73%) never received a single review mentioning pests, even though inspectors cited each of them for pests at least three times. The share ranges from 71% in Manhattan to 85% in Staten Island. Across all reviews of these restaurants, only 597 of 126,327 (0.47%) mention pests, and the restaurants that do have a mention usually have just one. This suggests that a New Yorker who chooses one of these restaurants on Yelp would most likely find no mention of its pest history in the reviews.",
          note:"Restaurants with more reviews are more likely to have at least one mention, yet even among those with 100 or more reviews, 55% have none. A review counts as mentioning pests if it uses words such as “cockroach”, “rat”, “mice”, “rodent”, “bugs”, “flies” or “infested”.",
          next:"We expected pests to give the clearest answer, since diners can see them, yet reviewers rarely write about them. Rather than assume which problem diners notice, we let the data decide. Next, we check each of the seven problems in turn, to see whether restaurants cited for any one of them stand out with lower stars, less positive reviews, or both."},
        {question:"Do restaurants cited for hygiene problems get lower stars or less positive reviews?", chart:"Stars vs. review positivity", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepScatter", height:630,
          howToRead:[
            "Each circle is one restaurant with more than 20 Yelp reviews.",
            "The horizontal axis shows review positivity: the average score of the restaurant’s reviews based on their wording, from −1 (very negative) to +1 (very positive).",
            "The vertical axis shows the restaurant’s average Yelp star rating, from 1 to 5 stars.",
            "The circles are see-through, so darker areas are where many restaurants overlap.",
            "The “Show restaurants cited for” dropdown shows only restaurants that inspectors cited at least once for one problem since 2023. The title then updates with the number of restaurants shown and the share with 4+ stars and positivity of 0.5 or more (the top-right area), to compare with the share for all restaurants."
          ],
          found:"Stars and review positivity move closely together (correlation 0.90). Most restaurants sit in the top right: 60% have 4+ stars and positivity of 0.5 or more. Choosing a problem in the dropdown barely changes this: 57% to 59% of cited restaurants are still in the top right, compared with 60% to 65% of restaurants never cited for that problem. This suggests that a citation makes, at most, a small difference to a restaurant’s stars and to how its reviews read.",
          note:"Positivity is scored with VADER, a standard tool that rates text by the positive and negative words it contains. It can misread sarcasm, but its close match with the stars suggests that this potential limitation does not distort the scores much here.",
          next:"So far on this page, we have compared Yelp reviews with the problems inspectors cite, and looked at how stars and review text relate to each other. What we have not yet compared is review text against the inspection grade itself: is the review text of a grade C restaurant any less positive than that of a grade A restaurant?"},
        {question:"Is review text less positive at grade C restaurants?", chart:"Review positivity by grade", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3StepGrades", height:630,
          howToRead:[
            "The chart’s title begins with “…but” because it continues the previous chart’s title: stars and review text agree with each other, but neither tracks the inspection.",
            "Each bar groups restaurants by their latest inspection grade: A (7,840 restaurants), B (762) and C (231). The 688 restaurants without a grade yet are left out.",
            "Grade A means the inspection scored 13 points or fewer, grade B 14 to 27, and grade C 28 or more. More points mean more or worse problems.",
            "The height of each bar is the average review positivity, on the same −1 to +1 scale as the previous chart.",
            "Hover over a bar for the number of restaurants behind it."
          ],
          found:"Review text is almost equally positive at every grade: 0.69 at grade A, 0.68 at grade B and 0.67 at grade C, a difference of only 0.02 on a scale from −1 to +1. This suggests that a diner reading the reviews of a grade C restaurant would find them almost as positive as those of a grade A one.",
          next:"If reviews do not track hygiene, what do they reflect instead? To find out, we identify the words that best distinguish 1-star reviews from 5-star reviews, shown as two word clouds."},
        {question:"What do Yelp reviewers write about instead?", chart:"Words in 1-star and 5-star reviews", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Words", height:980,
          howToRead:[
            "The top cloud shows 60 words typical of 1-star reviews, and the bottom cloud shows 60 words typical of 5-star reviews.",
            "A word is large when it is both common in its group and much more common there than in the other group.",
            "{orange:Orange} words are about hygiene (“poison” and “hair”); {grey:grey} words are about everything else."
          ],
          found:"1-star reviews are mostly about service and money: “rude” appears in 13% of them, along with words such as “charge”, “pay” and “manager”. Hygiene words are far rarer: “poison” (almost always in “food poisoning”) and “hair” each appear in under 2% of 1-star reviews. 5-star reviews praise taste, staff and atmosphere (“delicious”, “friendly”, “attentive”), and no hygiene word appears in the 5-star cloud. This suggests that ratings are driven by what diners experience at the table rather than by hygiene, even in the most negative reviews.",
          note:"Word forms are merged (“refund” and “refunds” count as one, and “poisoning” counts as “poison”). Common or general words such as “the”, “good” or “terrible” are removed, because they do not show what a review is about."}
      ],
      takeaway:"Review text is not a reliable signal of food safety. Reviews rarely mention the problems inspectors find, even repeated pests. They are also almost as positive at grade C restaurants as at grade A. Together with the star ratings, this means Yelp, as it is used today, gives New Yorkers little help in finding restaurants with high food safety standards." },
    { n:4, owner:"Shanice", nav:"What to Check Instead",
      title:"What to check instead",
      intro:"If both familiar signals are weak, some others still carry information. This part looks at when violations happen and which kinds of restaurants are cited, so a diner knows what is actually worth checking.",
      source:"DOHMH NYC Restaurant Inspection Results, by month and restaurant type",
      question:"If both signals are weak, what should a diner actually use?",
      overviewIntro:"This dashboard brings all the charts together to answer one part of our wider question: **if neither signal is enough, what should diners look at instead?** After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.",
      views:[{label:"Seasons, Cuisine Types and Chain Status", url:"https://public.tableau.com/views/Dashboard4Project_17938628387700/Dashboard1"}],
      insights:[
        ["Violations rise in the summer.", "Edit: monthly pattern of violations."],
        ["Chains and established restaurants differ.", "Edit: citation rates for chains vs. long-running independents."],
        ["The inspection date matters as much as the letter.", "Edit: how recency changes what a grade means."]
      ],
      takeaway:"Check when the restaurant was last inspected and what was found — not just the letter or the stars." }
  ],

  // Introduction page (address #introduction; the old #problem still works). Text uses the same formatting as the dashboards: **bold**.
  introduction: {
    title:"Do the sources New Yorkers rely on reflect what inspectors find?",
    intro:[
      "New Yorkers eat out **more than a billion times a year** (DOHMH, 2019), and each meal relies on food safety practices that diners cannot easily check for themselves. Between 2012 and 2022, the Department of Health and Mental Hygiene (DOHMH) confirmed **268 foodborne illness outbreaks** linked to the city’s eating and drinking establishments, and it notes that the true number is likely much higher, because many cases go unreported (DOHMH, 2026b).",
      "To manage this risk, the DOHMH carries out random inspections of the city’s restaurants and publishes its findings: a **letter grade posted at the entrance**, and the full record of every inspection on NYC Open Data.",
      "That record is detailed, but it is published as a dataset of almost 300,000 rows, one for each violation cited, with codes and regulatory descriptions. Checking a single restaurant means searching that dataset or the city’s lookup tool, a step that is impractical for a quick decision about where to eat. The signals diners actually see are quicker, but it is not clear whether they tell diners what the record does."
    ],
    signals:[
      { t:"The grade on the door",
        offers:"Official, issued by inspectors and posted where every diner can see it." },
      { t:"Yelp",
        offers:"Familiar and quick: a star rating and written reviews from other diners. Most consumers read online reviews before choosing a local business (BrightLocal, 2026)." }
    ],
    approach:"We test each signal against what inspectors actually recorded. First, we check whether the grade on the door gives a complete and current picture of the inspection behind it. We then test whether Yelp’s star ratings and review text reflect what inspectors found at the same restaurants.",
    prior:[
      { who:"Pulaski (2020); Vaghani (2018)",
        found:"Both compared inspection grades with Yelp star ratings for New York restaurants and found no clear relationship: some C-graded restaurants earned 4 to 5 stars, while some A-graded restaurants earned 1 or 2. Vaghani attributed this to diners weighing taste and service more heavily than hygiene." },
      { who:"Farronato and Zervas (2022)",
        found:"Linked DOHMH inspections to Yelp review text and used machine learning to predict violations from review language. Accuracy (AUC) ranged from 0.51 to 0.68 across the 20 most common violation codes, only slightly better than chance for most." },
      { who:"Mathayomchan and Taecharungroj (2020)",
        found:"Analysed over 900,000 Google Maps reviews of 5,010 restaurants in London, Birmingham and Manchester, using VADER sentiment analysis and logistic regression to compare what drives positive and negative reviews across four attributes: food, service, atmosphere and value. Hygiene was not one of them." }
    ],
    adds:[
      { t:"All five boroughs",
        d:"Pulaski studied roughly 3,900 restaurants in Manhattan alone. We cover restaurants across all five boroughs." },
      { t:"Change over time",
        d:"Earlier studies compared grades and ratings at a single point in time. We also look at whether ratings move after a citation, and whether the same violations return at later inspections." },
      { t:"Hygiene in review text",
        d:"Building on Mathayomchan and Taecharungroj, we add hygiene to the attributes studied in reviews, and analyse whether diners write about it as well as how they rate." },
      { t:"A practical outcome",
        d:"We turn our findings into a proposed redesign of how Yelp displays inspection results." }
    ]
  },

  // Overview page. Numbers come from the project data (inspections and reviews from 1 January 2023 onwards).
  overview: {
    title:"How we tested the signals diners rely on",
    intro:"We combined the DOHMH’s official inspection record with Yelp reviews we collected ourselves, then tested each signal against what inspectors found. We present our findings in four interactive dashboards, each answering one part of our question, followed by a proposed redesign of how Yelp displays inspection results.",
    stats:[
      { n:"88,828", label:"DOHMH inspections", sub:"of 27,245 restaurants, January 2023 to September 2026" },
      { n:"1,103,426", label:"Yelp reviews collected", sub:"from 19,781 restaurants matched to the inspection record" },
      { n:"776,637", label:"reviews analysed", sub:"of 9,553 restaurants: reviews from 2023 onwards, restaurants with more than 20 reviews" }
    ],
    steps:[
      { href:"#dash-1", label:"Grade on the Door", q:"Does the grade on the door give a complete and current picture of the inspection?", data:"DOHMH inspections" },
      { href:"#dash-2", label:"Stars vs. Citations", q:"Can diners rely on Yelp stars to tell how clean a restaurant is?", data:"Yelp star ratings and DOHMH inspections" },
      { href:"#dash-3", label:"Review Text", q:"Does review text give New Yorkers a reliable signal of food safety?", data:"Yelp review text and DOHMH inspections" },
      { href:"#dash-4", label:"What to Check Instead", q:"If neither signal is enough, what should diners look at instead?", data:"DOHMH inspections by season, cuisine and chain status" },
      { href:"#redesign", label:"Redesign Proposal", q:"How could Yelp show inspection results so that diners notice them?", data:"Yelp’s current listing pages" }
    ],
    readNote:"Each dashboard page opens with the full dashboard, followed by a walkthrough that explains each chart one at a time: how to read it, and what it shows."
  },

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
