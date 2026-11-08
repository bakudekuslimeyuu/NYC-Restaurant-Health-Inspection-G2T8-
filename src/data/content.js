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
      views:[{label:"Grade posted vs. inspection score", url:"https://public.tableau.com/views/Dashboard1_17934406077990/Dashboard1"}],
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
      views:[{label:"Yelp stars vs. inspection results", url:"https://public.tableau.com/views/Dashboard2-Public/Dashboard2-Dostarsmeanclean"}],
      insights:[
        ["C-grade places get the same stars as A-grade ones.", "The Yelp ratings for A, B and C restaurants look almost the same, so a bad grade doesn't seem to hurt a restaurant's rating."],
        ["From 3 to 5 stars, the inspections barely change.", "Citations per inspection stay at about 3.4 to 3.5 and the average score stays around 17. A 5-star place isn't any cleaner than a 3-star one."],
        ["5-star restaurants still have Poor records.", "15% of inspection records for 5-star restaurants are Poor, which is actually the highest out of all the star levels."],
        ["It's the same in every borough.", "The correlation between stars and inspection score is only 0.04 to 0.12 in all five boroughs, which is basically no link."]
      ],
      takeaway:"A good Yelp rating means people liked the food, not that the kitchen is clean. If hygiene matters to you, check the inspection record instead of the stars." },
    { n:3, owner:"Zheng Long", nav:"Why Reviewers Miss It",
      title:"Reviewers don’t see the kitchen",
      intro:"If neither the letter nor the stars warn a diner, the reason is probably in what reviewers actually describe. This part reads the review text itself — what it talks about, and how it feels — and compares that with the inspection record for the same restaurants.",
      source:"Topic and sentiment analysis of Yelp review text, matched to inspection outcomes",
      question:"Why is there no relationship between stars and citations?",
      views:[{label:"Review topics & sentiment", url:""}],
      insights:[
        ["Reviews are about food, service and price.", "Edit: share of review text by topic."],
        ["Hygiene is rarely mentioned.", "Edit: how often cleanliness or pest terms appear."],
        ["Sentiment doesn’t shift after a citation.", "Edit: sentiment before vs. after an inspection."]
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
      takeaway:"Check when the restaurant was last inspected and what was found — not just the letter or the stars." },
    { n:5, owner:"Zheng Seng", nav:"Insights",
      title:"Making health information readable",
      intro:"This part brings the findings together and asks what should change in how health information is shown to diners — on the door, and on the review platforms they already use.",
      source:"Synthesis of dashboards 01–04",
      question:"What should change in how health information is displayed?",
      views:[{label:"Insights", url:""}],
      insights:[
        ["Neither signal warns a diner today.", "The letter can be stale. The stars don’t respond to citations."],
        ["The data already exists.", "Platforms already publish inspection results. The problem is placement and wording."],
        ["The fix is a display change.", "Put the grade beside the stars, flag pending results, and write findings in plain English."]
      ],
      takeaway:"Show the inspection record where diners are already looking." }
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
