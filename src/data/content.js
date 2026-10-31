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
      intro:"This part asks whether the star rating does the job instead. We matched Yelp restaurant records to the DOHMH inspection history and compared stars against citations: before and after a restaurant is cited, and against comparable restaurants that are never cited at all.",
      source:"Yelp star ratings matched to DOHMH inspection history",
      question:"If the letter is stale, does the star rating tell a diner what the record does not?",
      views:[{label:"Star rating vs. number of citations", url:""}],
      insights:[
        ["There is no relationship between stars and citations.", "Highly rated and poorly rated restaurants are cited at similar rates."],
        ["A citation barely moves a rating.", "Average ratings move by about 0.02 stars after a citation."],
        ["The reviews don’t react either.", "Related complaints do not rise in the reviews that follow a citation."]
      ],
      takeaway:"Stars measure the meal, not the kitchen. They should not carry a public health signal they were never built for." },
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
      views:[{label:"Seasonality", url:""},{label:"Chains vs. established", url:""}],
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

  // `principle` = the course concept behind each change — edit to match what your Prof taught.
  changes: [
    { t:"Put the grade next to the stars", d:"The record sits where a diner is already looking, not under Amenities.", principle:"Information hierarchy", why:"The most decision-relevant fact belongs where attention already is." },
    { t:"Show “Grade pending” when a newer inspection is unresolved", d:"A pending result becomes a state a diner can read, not a stale letter.", principle:"Displaying uncertainty", why:"A missing or unresolved result is information too." },
    { t:"List findings in plain English, marked Serious or Minor", d:"Short descriptions, with severity carried by a label.", principle:"Plain language + severity encoding", why:"Reading effort drops when severity is a tag, not a paragraph." },
    { t:"Compare with similar restaurants", d:"A grade alone means little. Next to similar places nearby, it becomes readable.", principle:"Reference classes", why:"A number needs a comparison before it says anything." },
    { t:"Allow filtering by grade in the initial search", d:"Grade becomes part of how a diner chooses, not a footnote found later.", principle:"Dynamic queries / filtering", why:"Let people narrow options by what matters to them, up front." },
    { t:"Show the grade on every search result", d:"The information arrives at the point of comparison — in the results list.", principle:"Information at the point of decision", why:"Facts shown while options are compared get used." }
  ]
};
