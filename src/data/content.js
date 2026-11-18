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
      intro:[
        "Every restaurant in New York City must post its **inspection grade at the entrance**, and it is the signal almost every diner already uses to judge how clean a restaurant is. **A single letter seems to sum up what the inspector found**.",
        "This page looks only at the official inspection record. It asks **whether the grade on the door gives a complete and current picture of the inspection**. To find out, we used the DOHMH inspection results for restaurants in all five boroughs from January 2023 to September 2026, and compared the letter each restaurant posts with what its inspections actually recorded."
      ],
      source:"DOHMH NYC Restaurant Inspection Results, five boroughs, Jan 2023–Sep 2026",
      question:"Does the grade on the door give a complete and current picture of the inspection?",
      overviewIntro:"This dashboard brings all the charts together to answer one part of our wider question: **does the grade on the door give a complete and current picture of the inspection?** After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.",
      // Overview: the whole dashboard.
      views:[{label:"Grade on the door vs. the record", url:"https://public.tableau.com/views/Dashboard_1_v5/Dashboard1"}],
      // Walkthrough: one chart at a time, below the overview (same format as Dashboard 3).
      // TODO (Xuan Wei): publish each chart as its own sheet on Tableau Public and paste its link into `url`.
      // Until then, an empty `url` shows a placeholder slot. Add `height` (px) if a chart needs more room.
      steps:[
        {question:"Does an A mean the inspector found no serious problems?", chart:"Violations at A-grade inspections", url:"https://public.tableau.com/app/profile/ng.xw/viz/chart1_17950060861600/2_Violationsfound?publish=yes",
          howToRead:[
            "The chart covers routine inspections that ended in an A grade.",
            "Each bar is one type of violation, and its length is the share of those A inspections where inspectors cited it.",
            "The grey bars are food-handling problems, such as food-contact surfaces not cleaned or cold food held too warm. The dark bars are live pests: mice, flies, roaches and rats.",
            "The title gives two totals: the share of A inspections with at least one critical violation, and the share that found pests of any kind."
          ],
          found:"81% of inspections that ended in an A still recorded at least one critical violation, and 16% found pests. The most common problems were food-contact surfaces not cleaned (18%) and food not protected (16%), followed by cold food held too warm (11%) and hot food held too cold (10%). Mice were found at 7% of A inspections and flies at 6%. This suggests that an A tells a diner the restaurant stayed under the points limit, not that the inspector found nothing serious.",
          note:"“Critical” is DOHMH’s label for violations more likely to cause illness.",
          next:"If an A can sit alongside critical violations and pests, how do so many restaurants end up with one? A restaurant does not have to earn its A at the first visit. Next, we follow restaurants from their first inspection to the card they finally post."},
        {question:"How many restaurants earn their A at the first visit?", chart:"Grade at each stage", url:"https://public.tableau.com/app/profile/ng.xw/viz/chart2_17950062256780/5_GradeJourney?publish=yes",
          howToRead:[
            "Each line is one grade: A (yellow, 0 to 13 points), B (orange, 14 to 27) and C (red, 28 or more). More points mean more or worse problems.",
            "Read the chart from left to right. The three stages are the grade a restaurant would get at its first visit, the grade after a re-inspection, and the card finally posted on the door.",
            "A restaurant that scores a B or C at its first visit is not graded straight away. It gets a re-inspection first, and only then receives a card.",
            "The gap between the first and last point of the yellow line shows how many A cards were won on a retry."
          ],
          found:"Only 60% of restaurants score an A at their first visit. After re-inspection, 82% do, and 86% of the cards on the door show an A. Over the same steps, the share of B falls from 22% to 7%, and the share of C from 18% to 2%. This suggests that many of the A cards a diner sees were earned on a second attempt, not at the first inspection.",
          next:"The retry explains why A cards are so common. But once a restaurant has its A, does it keep the standard that earned it? Next, we check what happens at the following routine inspection."},
        {question:"Do restaurants with an A keep it at their next inspection?", chart:"Next grade after an A", url:"https://public.tableau.com/app/profile/ng.xw/viz/chart3_17950063053780/6_NextInspection?publish=yes", height:325,
          howToRead:[
            "The 100 squares stand for 100 restaurants that held an A.",
            "Each square is coloured by the grade the restaurant earned at its next routine inspection, about 16 months later: yellow for A, orange for B and red for C.",
            "The orange and red squares are restaurants that slipped from an A to a B or C."
          ],
          found:"Out of every 100 restaurants with an A, 29 fall to a B or C at their next routine inspection. This suggests that an A describes the kitchen on the day it was inspected, and that close to a third of A restaurants do not keep that standard until the next visit.",
          next:"If the grade can change at the next inspection, then the age of the card matters. Until that next inspection, the old A stays on the door. Next, we look at how old the A cards on the door actually are."},
        {question:"How old is the A on the door?", chart:"Age of A cards on the door", url:"https://public.tableau.com/app/profile/ng.xw/viz/chart4_17950063639390/7_CardAgeCurve?publish=yes",
          howToRead:[
            "The horizontal axis shows the number of months since the A was issued.",
            "The vertical axis shows the share of A cards on the door that are at least that old. The curve starts at 100% and falls as cards get older.",
            "The vertical line marks one year. Where it meets the curve shows the share of A cards that are more than a year old."
          ],
          found:"1 in 3 A cards on the door (33%) is more than a year old, and some are more than two years old. This suggests that a diner reading the card is often looking at an inspection from over a year ago, during which time the kitchen may have changed a great deal.",
          next:"An A can be old, and close to a third of A restaurants slip at their next inspection. One reason may be that many A’s were never far from a B in the first place. Next, we look at the inspection scores behind the grades."},
        {question:"How close are A restaurants to a B?", chart:"Inspection scores", url:"https://public.tableau.com/app/profile/ng.xw/viz/chart5_17950150120590/1_ScoreHistogram?publish=yes",
          howToRead:[
            "Each bar is one inspection score, and its height is the number of inspections that received that score.",
            "A lower score means fewer or less serious problems. Scores of 0 to 13 earn an A, 14 to 27 a B, and 28 or more a C.",
            "The bars are coloured by grade, in the same colours as the earlier charts.",
            "The tall bars at 12 and 13 sit just below the cut-off for a B at 14 points."
          ],
          found:"40% of A inspections scored 12 or 13, one or two points away from a B. The scores pile up just under the cut-off, and drop sharply right after it. This suggests that a large share of A restaurants only just made the grade, so the same letter on the door covers both near-perfect kitchens and kitchens one violation away from a B."}
      ],
      takeaway:"The grade on the door is not a complete or current picture of the inspection. An A still allows critical violations and pests, many A’s are earned only on a retry, close to a third slip at the next inspection, a third of A cards are more than a year old, and many A’s sit just one or two points from a B. The letter shows that a restaurant passed at some point, not what its kitchen looks like today." },
    { n:2, owner:"Mei Yu", nav:"Stars vs. Citations",
      title:"You can’t rely on the Yelp stars either",
      intro:[
        "In Dashboard 1 we saw that the letter grade on the door can hide what inspectors actually found. Many diners skip the grade and check Yelp instead, so this page asks a simple question: **do restaurants with more stars have cleaner inspections?**",
        "We matched 19,237 restaurants on Yelp to their DOHMH inspections from 2023 onwards. The charts by star rating use the 18,865 restaurants rated between 2 and 5 stars."
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
      // Keep each part short: how to read = only what isn't obvious from the chart; found = the answer first, then the numbers.
      steps:[
        {question:"Do grade C restaurants get lower Yelp stars?", chart:"Yelp rating by inspection grade", url:"https://public.tableau.com/views/Dashboard2-Public/D2eRatingbygradedots", height:520,
          howToRead:[
            "Each dot is one restaurant, grouped by its latest inspection grade.",
            "The grey box shows where the middle half of ratings fall. The line inside it is the median."
          ],
          found:["No. The median rating is 3.9 stars for A, B and C restaurants alike.",
            "Average ratings are 3.75 (A), 3.74 (B) and 3.76 (C). Grade C restaurants are even slightly more likely to have 4 stars or more: 48%, against 47% for grade A."],
          next:"A grade only reflects one inspection. Next, we compare stars with each restaurant’s full inspection history since 2023."},
        {question:"Do restaurants with more stars get fewer citations?", chart:"Inspection measures by star rating", url:"https://public.tableau.com/views/Dashboard2-Public/D2dSamecitationsateverystarlevel", height:480,
          howToRead:[
            "Columns are star ratings. Rows are four inspection measures, and higher is worse for all of them.",
            "A darker cell means a worse result compared with the rest of its row."
          ],
          found:["Not really. From 3 to 5 stars, the numbers barely move: about 3.4 citations per inspection and an average score of about 17.",
            "The odd one out is 2 stars, which looks the cleanest of all (average score 13.4). Steps 5 and 6 explain why."],
          next:"Averages can hide the worst cases, so next we look at how many restaurants at each rating have a poor record."},
        {question:"Are 5-star restaurants less likely to have a poor record?", chart:"Inspection record by star rating", url:"https://public.tableau.com/views/Dashboard2-Public/D2gInspectionrecordbystars", height:520,
          howToRead:[
            "Each bar splits one star rating into Good, Fair and Poor records. These use the same score cut-offs as grades A, B and C.",
            "Compare the red sections across the bars."
          ],
          found:["No. 5-star restaurants have the highest share of poor records: 15%, or 145 of 936.",
            "At 2 stars it is 6%, and between 3 and 4.5 stars it stays at 11–12%."],
          next:"Could one borough be skewing this? We check each one separately next."},
        {question:"Is it the same in every borough?", chart:"Stars and inspection score by borough", url:"https://public.tableau.com/views/Dashboard2-Public/D2fCorrelationbyborough", height:420,
          howToRead:[
            "Each bar is the correlation between stars and inspection score in one borough. 0 means no link and 1 means a perfect one."
          ],
          found:["Yes. The correlation is between 0.04 and 0.12 in every borough, and 0.06 across the city.",
            "Wherever you are in New York, a restaurant’s rating tells you almost nothing about its inspection score."],
          next:"That leaves one odd result from step 2: why do 2-star restaurants look the cleanest? It comes down to which restaurants end up with low ratings."},
        {question:"What kind of restaurants get low stars?", chart:"Chain share by star rating", url:"https://public.tableau.com/views/Dashboard2b-Public/D2zStep2Chainshare", height:480,
          howToRead:[
            "Each bar splits one star rating into chains (blue) and independent restaurants (orange).",
            "We count a restaurant as a chain if its name appears at 5 or more locations."
          ],
          found:["Mostly chains. They make up 76% of 2-star restaurants, but only 5% of those rated 4.5 or 5 stars.",
            "So the 2-star averages are mostly describing chains."],
          next:"If chains also get cleaner inspections, that would explain the 2-star result."},
        {question:"Do chains get cleaner inspections?", chart:"Inspection score, chains vs. independents", url:"https://public.tableau.com/views/Dashboard2b-Public/D2yStep2Chainvsindependent", height:480,
          howToRead:[
            "Average inspection score at each star rating, for chains (blue) and independent restaurants (orange). Lower is cleaner."
          ],
          found:["Yes, at every star rating: 11.5 against 19.5 at 2 stars, and 15.8 against 17.7 at 5 stars.",
            "That is why low-rated restaurants look cleaner overall. With the same mix of chains at every rating, the average score goes from 18.3 at 2 stars to 17.4 at 5 stars, so the rise disappears. We also tested cuisine, since Asian restaurants score higher on average, and it does not explain the pattern."],
          note:"Only 49 chains have 5 stars, so read the last point on the blue line with caution."}
      ],
      takeaway:"Yelp stars tell you whether people enjoyed the food, not whether the kitchen is clean. Grade C restaurants are rated as highly as grade A ones, and 5-star restaurants have the most poor inspection records. If food safety matters to you, check the inspection history, not the stars." },
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
      intro:["Dashboards 1 to 3 showed that neither the grade on the door nor Yelp’s stars and reviews reliably tell a diner how a kitchen performs on inspection. This page asks what **diners can check instead**.", 
        "We look at three things a diner can see before choosing a restaurant: **when** it is inspected (the season), **what kind** of restaurant it is (chain or independent, and its cuisine), and **where** it is (its ZIP code). For each one, we ask whether it is linked to how often a routine inspection ends in a citation. Here, a **citation** means a routine inspection score of 14 or more, which is a grade B or C. We use 44,765 routine inspections of 22,064 restaurants from January 2023 onwards, and monthly temperatures for Central Park from NOAA."],
      source:"DOHMH NYC Restaurant Inspection Results, by seasons, restaurant type and ZIP code, 2023-2026; NOAA monthly average temperature",
      question:"If both signals are weak, what should a diner actually use?",
      overviewIntro:"This dashboard brings all the charts together to answer one part of our wider question: **if neither signal is enough, what should diners look at instead?** After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.",
      views:[{label:"Seasons, Cuisine Types and Chain Status", url:"https://public.tableau.com/views/Dashboard4ProjectWorkbook/Dashboard1"}],
      steps:[
        {question:"Are chain restaurants cited less often than independent ones?", chart:"Restaurants cited, chains vs. independents", url:"https://public.tableau.com/views/Dashboard4ProjectWorkbook/Citationinchainsvsnonchains", height:420,
          howToRead:[
            "Each bar is one group of restaurants: chains or independents. We count a restaurant as a chain if its name appears at 2 or more locations.",
            "A bar is split into the share of restaurants that were {orange:cited at least once} since 2023 and the share that never were (blue).",
            "A restaurant counts as cited if any of its routine inspections scored 14 or more (grade B or C)."
          ],
          found:["Yes. 54% of chain restaurants were cited at least once, against 62% of independents (3,397 chains and 9,901 independents were cited)."],
          next:"Chain status is easy to spot, but it is not the only thing a diner can check to determine if a restaurant is likely have been cited. Next, we look at something that has nothing to do with the restaurant itself but rather what the season is during the visit."},
        {question:"Are citations more common in summer?", chart:"Citation rate and temperature by month", url:"https://public.tableau.com/views/Dashboard4ProjectWorkbook/Citationrateagainstmonth", height:520,
          howToRead:[
            "The bars show the share of routine inspections that ended in a citation in each month, with every year since 2023 combined. {orange:Orange} bars are the summer months: June to August.",
            "The red line shows the average temperature in Central Park for that month, in °C, on the right-hand axis. The two axes use different scales, so compare the shapes of the bars and the line, not their heights.",
            "The grey line marks the average citation rate across all months."
          ],
          found:["Yes, modestly. 43% of summer inspections ended in a citation, against 38% in winter (December to February). July is the highest month at 45%, and December the lowest at 36%.",
            "Hotter months go with higher citation rates: across the 12 months, there is a clear visual correlation between temperature and citation rate."],
          note:"This shows an association, not that heat causes citations: busier summer trade or the timing of inspections could produce the same pattern. It is also not the same every summer. It is just that, on average, restaurants will be cited more during the summer.",
          next:"Season is not something a diner can choose in a whim, but the type of restaurant is. Next, we check whether some cuisines are cited more often than others."},
        {question:"Do some cuisines get cited more often than others?", chart:"Citation rate by cuisine", url:"https://public.tableau.com/views/Dashboard4ProjectWorkbook/Citationratepercuisine", height:560,
          howToRead:[
            "Each bar is one cuisine: the share of its routine inspections that ended in a citation (score of 14 or more). Cuisines with fewer than 100 inspections are left out.",
            "The bars are sorted from the highest rate to the lowest. Hover over a bar to see the exact rate."
          ],
          found:["Yes, by a wide margin. The rate runs from 18% for donut shops to 77% for Indian restaurants, with African (65%) and Indian (64%) close behind. Salads (21%), Hamburgers (22%), and Tex-Mex (24%) places are among the lowest.",
            "Chain status explains part of this: 95% of donut-shop inspections (486 restaurants) and 83% of hamburger-place inspections (365 restaurants) are at chains, while an almost insignificant number of Bangladeshi (6 restaurants) or African restaurant (3 restaurants) in the data is a chain."],
          note:"A cuisine’s rate describes the group, not any one restaurant, and says nothing about the food.",
          next:"The last thing a diner can see is where the restaurant is. We check whether neighbourhoods with more restaurants are cited more often."},
        {question:"Does the neighbourhood matter?", chart:"Restaurants and citations by ZIP code", url:"https://public.tableau.com:/views/Dashboard4ProjectWorkbook/Citationratesagainstnumberofrestaurantsinanarea", height:640,
          howToRead:[
            "Each shape is one ZIP code. The darker the shape, the more restaurants it has.",
            "The {orange:dot} on each ZIP code shows how many of its restaurants were cited at least once. A bigger dot means a higher citation rate.",
            "ZIP codes with fewer than 30 restaurants are left out. Hover over a ZIP code to see its numbers."
          ],
          found:["Looking at the big picture, across the 167 ZIP codes with at least 30 restaurants, more restaurants in a ZIP code does not equate to more citations or a higher citation rate. This shows that there might not be bias from the inspectors when conducting inspections in these areas.", 
            "However, taking a closer look at the Manhatten area, especially Lower Manhatten, the ZIP codes with the highest concentration of restaurants seem to have the lowest citation rates."],}
      ],
      takeaway:"Season, chain status, cuisine, and neighbourhood each shift the odds that an inspection ends in a citation. Rates are higher in summer, at independents and for cuisines such as Thai and Indian, with restaurants in Lower Manhatten being less likely to be cited. These are patterns across groups, not a verdict on any one kitchen, and together they predict a citation only modestly. They are still a better starting point on food safety than Yelp stars, which tell a diner almost nothing." }
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
