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
    { n:3, owner:"Zheng Long", nav:"Why Reviewers Miss It",
      title:"Reviewers don’t see the kitchen",
      intro:"If neither the letter nor the stars warn a diner, the reason is probably in what reviewers actually write. This part reads 776,637 Yelp reviews of 9,553 restaurants (reviews from 2023 onwards, restaurants with more than 20 reviews) and compares what they mention with what inspectors found at the same restaurants.",
      source:"Yelp review text (keyword matching, sentiment scores and word frequencies) matched to DOHMH inspections, 2023–2026",
      question:"Why is there no relationship between stars and citations?",
      views:[
        {label:"Found vs. mentioned", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Mentions",
          howToRead:{
            ask:"Do Yelp reviews mention the problems that inspectors find?",
            charts:[
              {title:"Left · Inspections vs. reviews", points:[
                "Each row is one type of problem inspectors cite: dirty surfaces, unclean utensils and dishes, food temperature, contaminated food, conditions that attract pests, live pests, and worker hygiene.",
                "Purple dot: the share of routine inspections (2023 onwards) that found the problem. Orange dot: the share of reviews that mention it. The longer the line between them, the bigger the gap.",
                "Hover over a dot for its exact value and examples of the words counted as a mention.",
                "Use the star-rating dropdown above the chart to see only restaurants rated 4 to 5, 3 to 3.9 or 1 to 2.9 stars. It changes this chart only, and the title updates to match."
              ]},
              {title:"Right · Repeated live pests", points:[
                "Only restaurants that inspectors cited for live pests (rats, mice, roaches or flies) three or more times: 1,556 restaurants with more than 20 Yelp reviews.",
                "Each bar is one borough. Grey: not one review of the restaurant mentions pests. Orange: at least one review does.",
                "The bigger the grey part, the more often repeated pest problems went unseen by reviewers."
              ]}
            ],
            note:"A mention is found by keyword matching, so it can miss reviews that describe a problem in other words. Even so, mentions are far too rare to close a gap this large."
          },
          insights:[
            ["Inspectors find hygiene problems often; reviewers almost never mention them.", "Each of the seven problem types is found in 8% to 52% of routine inspections, but no type is mentioned in more than 0.80% of reviews. The gap holds at every star level: at most 0.63% of reviews at 4 to 5 star restaurants and 1.68% at 1 to 2.9 star restaurants."],
            ["Even repeated pest problems go unmentioned.", "Among restaurants cited for live pests three or more times, 71% to 85% never get a single review mentioning pests, depending on the borough."]
          ]},
        {label:"What reviews talk about", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Words",
          howToRead:{
            ask:"When diners write a review, what do they actually talk about?",
            charts:[
              {title:"1-star cloud", points:[
                "The 90 words that most set 1-star reviews apart from 5-star reviews.",
                "A word is large when it is both common in 1-star reviews and much more common there than in 5-star reviews."
              ]},
              {title:"5-star cloud", points:[
                "The reverse: the 90 words that most set 5-star reviews apart from 1-star reviews.",
                "Read it the same way. Large words are what happy diners write about most."
              ]}
            ],
            notes:[
              "Orange words are about hygiene (for example dirty, hair, sick); grey words are about everything else. The fewer orange words, the less reviewers talk about hygiene.",
              "Word forms are merged (refunds and refund count as one word). Common words such as the and and, and general words such as good, terrible or experience, are removed so the clouds show what reviews are about rather than how strongly they feel."
            ]
          },
          insights:[
            ["Bad reviews are about service and money, not hygiene.", "The words most typical of 1-star reviews are about rude staff, waiting, charges and refunds. The first hygiene word, poison, ranks only 38th; hair, dirty and sick rank 55th, 57th and 66th."],
            ["Good reviews are about taste, staff and atmosphere.", "No hygiene word is among the 90 most typical words in 5-star reviews. Diners praise what reaches the table."]
          ]},
        {label:"Stars vs. grades", url:"https://public.tableau.com/views/FoodHygieneandYelpReviewsinNYC/D3Stars",
          howToRead:{
            ask:"Do stars and review tone reflect what inspectors found?",
            charts:[
              {title:"Left · Stars vs. review tone", points:[
                "Each circle is one restaurant with more than 20 Yelp reviews (9,521 restaurants).",
                "Across: how positive its reviews read, from −1 (very negative) to +1 (very positive), scored from the review text. Up: its average Yelp stars.",
                "Circles in the top right have high stars and positive reviews. The tighter the cloud of circles hugs a diagonal, the more closely stars and tone agree.",
                "Use the dropdown above the chart to show only restaurants inspectors cited for one problem. If reviews reacted to that problem, the circles would shift down and to the left; the title gives the number shown and the share in the top right (4+ stars and tone of 0.5+), to compare with 60% for all restaurants."
              ]},
              {title:"Right · Review tone by grade", points:[
                "Average review tone, on the same −1 to +1 scale, for restaurants grouped by their latest inspection grade (8,833 restaurants with a grade).",
                "If reviews reflected the kitchen, grade C bars would be clearly lower than grade A. Hover over a bar for the number of restaurants behind it."
              ]}
            ],
            note:"Read the two titles together: the left headline ends where the right one begins."
          },
          insights:[
            ["Stars and review tone agree with each other.", "A restaurant’s average stars and how positive its reviews read move together closely (correlation 0.90), so the text tells the same story as the stars."],
            ["Cited restaurants look like everyone else.", "Whichever problem inspectors cited, 57% to 59% of those restaurants still have 4+ stars and positive reviews, against 60% of all restaurants. Pick a problem in the dropdown to see it."],
            ["Neither tracks the inspection grade.", "Reviews read almost equally positive at grade A, B and C restaurants (0.69, 0.68 and 0.67 on a −1 to +1 scale)."]
          ]}
      ],
      takeaway:"Diners review what they experience at the table. The kitchen is out of sight, so it is out of the reviews." },
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
