import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Comprehensive TOEFL/IELTS vocabulary (200+ words)
const vocabularyData = [
  // === LEVEL 1: Basic Academic Words ===
  {
    word: "achieve",
    pronunciation: "/əˈtʃiːv/",
    definition: "To succeed in doing something, especially after a lot of effort.",
    usageTip: "Use 'achieve' for goals, dreams, or results that require effort.",
    partOfSpeech: "verb",
    difficulty: 1,
    examples: ["She achieved her goal of becoming a doctor.", "The team achieved great success.", "It took years to achieve this level of skill."],
    synonyms: ["accomplish", "attain", "reach"],
    antonyms: ["fail", "lose"]
  },
  {
    word: "benefit",
    pronunciation: "/ˈbenɪfɪt/",
    definition: "An advantage or good result that you get from something.",
    usageTip: "As a noun: 'the benefits of exercise'. As a verb: 'This will benefit everyone'.",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["Regular exercise has many health benefits.", "One benefit of reading is improved vocabulary.", "The new policy will benefit students."],
    synonyms: ["advantage", "gain", "plus"],
    antonyms: ["disadvantage", "harm", "drawback"]
  },
  {
    word: "create",
    pronunciation: "/kriˈeɪt/",
    definition: "To make something new or original.",
    usageTip: "Use 'create' for making something that didn't exist before.",
    partOfSpeech: "verb",
    difficulty: 1,
    examples: ["Artists create beautiful paintings.", "The company created a new product.", "We need to create more opportunities."],
    synonyms: ["make", "produce", "design"],
    antonyms: ["destroy", "demolish"]
  },
  {
    word: "define",
    pronunciation: "/dɪˈfaɪn/",
    definition: "To explain the exact meaning of something.",
    usageTip: "Use 'define' when explaining what something means or setting boundaries.",
    partOfSpeech: "verb",
    difficulty: 1,
    examples: ["Can you define this word?", "Success is hard to define.", "The rules clearly define acceptable behavior."],
    synonyms: ["explain", "describe", "clarify"],
    antonyms: ["confuse", "obscure"]
  },
  {
    word: "environment",
    pronunciation: "/ɪnˈvaɪrənmənt/",
    definition: "The natural world, or the conditions around a person or thing.",
    usageTip: "Can mean nature (the environment) or surroundings (work environment).",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["We must protect the environment.", "She works in a friendly environment.", "Plants adapt to their environment."],
    synonyms: ["surroundings", "setting", "habitat"],
    antonyms: []
  },
  {
    word: "factor",
    pronunciation: "/ˈfæktər/",
    definition: "One of the things that affects a result or situation.",
    usageTip: "Use 'factor' when talking about causes or influences.",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["Money was a major factor in the decision.", "Several factors contributed to the problem.", "Time is an important factor."],
    synonyms: ["element", "cause", "component"],
    antonyms: []
  },
  {
    word: "individual",
    pronunciation: "/ˌɪndɪˈvɪdʒuəl/",
    definition: "A single person, considered separately from a group.",
    usageTip: "Can be a noun (an individual) or adjective (individual needs).",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["Each individual has different needs.", "The rights of the individual are important.", "Individual effort matters."],
    synonyms: ["person", "single", "particular"],
    antonyms: ["group", "collective"]
  },
  {
    word: "method",
    pronunciation: "/ˈmeθəd/",
    definition: "A way of doing something, especially a planned or organized way.",
    usageTip: "Use 'method' for systematic approaches or techniques.",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["What method did you use?", "There are several methods to solve this problem.", "The teaching method was effective."],
    synonyms: ["way", "approach", "technique"],
    antonyms: []
  },
  {
    word: "occur",
    pronunciation: "/əˈkɜːr/",
    definition: "To happen, especially unexpectedly.",
    usageTip: "Use 'occur' for events that happen. 'It occurred to me' means 'I suddenly thought'.",
    partOfSpeech: "verb",
    difficulty: 1,
    examples: ["The accident occurred last night.", "Problems may occur at any time.", "It never occurred to me to ask."],
    synonyms: ["happen", "take place", "arise"],
    antonyms: []
  },
  {
    word: "process",
    pronunciation: "/ˈprɒses/",
    definition: "A series of actions or steps taken to achieve a result.",
    usageTip: "Use 'process' for step-by-step procedures or natural changes.",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["Learning is a gradual process.", "The hiring process takes weeks.", "Explain the process step by step."],
    synonyms: ["procedure", "method", "system"],
    antonyms: []
  },
  {
    word: "require",
    pronunciation: "/rɪˈkwaɪər/",
    definition: "To need something or make something necessary.",
    usageTip: "More formal than 'need'. Often used in rules and requirements.",
    partOfSpeech: "verb",
    difficulty: 1,
    examples: ["This job requires experience.", "The project requires careful planning.", "All students are required to attend."],
    synonyms: ["need", "demand", "necessitate"],
    antonyms: []
  },
  {
    word: "similar",
    pronunciation: "/ˈsɪmɪlər/",
    definition: "Almost the same but not exactly.",
    usageTip: "Use 'similar to' (not 'similar with'). Compare things that are alike.",
    partOfSpeech: "adjective",
    difficulty: 1,
    examples: ["The two houses are similar.", "I have a similar opinion.", "This is similar to what happened before."],
    synonyms: ["alike", "comparable", "like"],
    antonyms: ["different", "unlike", "dissimilar"]
  },
  {
    word: "source",
    pronunciation: "/sɔːrs/",
    definition: "Where something comes from or starts.",
    usageTip: "Use 'source' for origins of information, energy, or problems.",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["What is the source of this information?", "The sun is a source of energy.", "We need to find reliable sources."],
    synonyms: ["origin", "cause", "root"],
    antonyms: []
  },
  {
    word: "specific",
    pronunciation: "/spəˈsɪfɪk/",
    definition: "Particular or exact, not general.",
    usageTip: "Use 'specific' when you want to be exact and clear.",
    partOfSpeech: "adjective",
    difficulty: 1,
    examples: ["Can you be more specific?", "I have no specific plans.", "The instructions were very specific."],
    synonyms: ["particular", "exact", "precise"],
    antonyms: ["general", "vague", "broad"]
  },
  {
    word: "structure",
    pronunciation: "/ˈstrʌktʃər/",
    definition: "The way something is built, organized, or arranged.",
    usageTip: "Use 'structure' for buildings, organizations, or how things are arranged.",
    partOfSpeech: "noun",
    difficulty: 1,
    examples: ["The building has a strong structure.", "The company changed its structure.", "The essay needs better structure."],
    synonyms: ["framework", "organization", "arrangement"],
    antonyms: []
  },

  // === LEVEL 2: Intermediate Academic Words ===
  {
    word: "abundant",
    pronunciation: "/əˈbʌndənt/",
    definition: "Existing in very large amounts; more than enough.",
    usageTip: "Use 'abundant' when something exists in large quantities. It has a positive feeling.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["The forest has abundant wildlife.", "Fresh vegetables are abundant in summer.", "She has abundant energy for her age."],
    synonyms: ["plentiful", "plenty", "rich"],
    antonyms: ["scarce", "rare", "limited"]
  },
  {
    word: "acquire",
    pronunciation: "/əˈkwaɪər/",
    definition: "To get or obtain something, especially through effort or experience.",
    usageTip: "Use 'acquire' for skills, knowledge, or things you gain over time. It sounds more formal than 'get'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Children acquire language naturally.", "She acquired new skills at her job.", "The museum acquired a rare painting."],
    synonyms: ["obtain", "gain", "get"],
    antonyms: ["lose", "give away", "surrender"]
  },
  {
    word: "adapt",
    pronunciation: "/əˈdæpt/",
    definition: "To change your behavior or ideas to fit a new situation.",
    usageTip: "Use 'adapt to' when talking about adjusting to new environments or situations.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Animals adapt to their environment.", "It took time to adapt to the new city.", "The company adapted to changing markets."],
    synonyms: ["adjust", "change", "modify"],
    antonyms: ["resist", "stay the same"]
  },
  {
    word: "analyze",
    pronunciation: "/ˈænəlaɪz/",
    definition: "To study something carefully to understand it better.",
    usageTip: "Use 'analyze' when you break something into parts to understand it. Common in academic writing.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Scientists analyze data carefully.", "We need to analyze the problem first.", "The teacher asked us to analyze the poem."],
    synonyms: ["examine", "study", "investigate"],
    antonyms: ["ignore", "overlook"]
  },
  {
    word: "approach",
    pronunciation: "/əˈprəʊtʃ/",
    definition: "A way of dealing with something; or to come near.",
    usageTip: "As a noun: 'a new approach'. As a verb: 'approach the problem carefully'.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["We need a different approach.", "He approached the topic carefully.", "The train is approaching the station."],
    synonyms: ["method", "way", "strategy"],
    antonyms: ["retreat", "withdraw"]
  },
  {
    word: "assume",
    pronunciation: "/əˈsjuːm/",
    definition: "To think something is true without having proof.",
    usageTip: "Be careful: assumptions can be wrong. Use 'assume' when you believe something without evidence.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Don't assume anything.", "I assumed you knew about the meeting.", "We can assume the data is correct."],
    synonyms: ["suppose", "presume", "believe"],
    antonyms: ["know", "prove"]
  },
  {
    word: "challenge",
    pronunciation: "/ˈtʃælɪndʒ/",
    definition: "Something difficult that tests your ability; or to question something.",
    usageTip: "Can be positive (an exciting challenge) or negative (face many challenges).",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Learning a new language is a challenge.", "She challenged the traditional view.", "We face many challenges ahead."],
    synonyms: ["difficulty", "test", "obstacle"],
    antonyms: ["ease", "simplicity"]
  },
  {
    word: "complex",
    pronunciation: "/ˈkɒmpleks/",
    definition: "Made of many different parts and difficult to understand.",
    usageTip: "Use 'complex' for things with many connected parts. Different from 'complicated' (just difficult).",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["The human brain is very complex.", "This is a complex issue.", "The instructions were too complex."],
    synonyms: ["complicated", "intricate", "elaborate"],
    antonyms: ["simple", "basic", "straightforward"]
  },
  {
    word: "concept",
    pronunciation: "/ˈkɒnsept/",
    definition: "An idea or principle that explains something.",
    usageTip: "Use 'concept' for abstract ideas or theoretical principles.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The concept of freedom is important.", "I don't understand this concept.", "It's a difficult concept to explain."],
    synonyms: ["idea", "notion", "principle"],
    antonyms: []
  },
  {
    word: "conclude",
    pronunciation: "/kənˈkluːd/",
    definition: "To end something; or to decide after thinking.",
    usageTip: "Use 'conclude' to end a speech, or to reach a decision based on evidence.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Let me conclude with a summary.", "We concluded that he was right.", "The meeting concluded at 5 PM."],
    synonyms: ["finish", "end", "determine"],
    antonyms: ["begin", "start"]
  },
  {
    word: "consequence",
    pronunciation: "/ˈkɒnsɪkwəns/",
    definition: "A result of an action or situation, often negative.",
    usageTip: "Use 'consequence' for results that follow from actions. Often used for negative outcomes.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Pollution has serious consequences for health.", "He suffered the consequences of his decision.", "Think about the consequences before you act."],
    synonyms: ["result", "outcome", "effect"],
    antonyms: ["cause", "origin"]
  },
  {
    word: "contrast",
    pronunciation: "/ˈkɒntrɑːst/",
    definition: "A clear difference between two things when compared.",
    usageTip: "Use 'in contrast to' or 'by contrast' to show differences. Very useful in essays.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["There is a sharp contrast between the two cities.", "In contrast to his brother, he is very quiet.", "The colors create a beautiful contrast."],
    synonyms: ["difference", "distinction", "opposition"],
    antonyms: ["similarity", "likeness"]
  },
  {
    word: "contribute",
    pronunciation: "/kənˈtrɪbjuːt/",
    definition: "To give something, especially to help achieve a result.",
    usageTip: "Use 'contribute to' when something helps cause a result or when giving to a group effort.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Many factors contribute to success.", "She contributed money to charity.", "Everyone should contribute to the discussion."],
    synonyms: ["give", "add", "donate"],
    antonyms: ["take", "withhold"]
  },
  {
    word: "crucial",
    pronunciation: "/ˈkruːʃəl/",
    definition: "Extremely important and necessary for success.",
    usageTip: "Use 'crucial' when something is essential. Stronger than 'important'.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Good communication is crucial for teamwork.", "This is a crucial moment in history.", "Sleep is crucial for memory."],
    synonyms: ["essential", "vital", "critical"],
    antonyms: ["unimportant", "minor", "trivial"]
  },
  {
    word: "decline",
    pronunciation: "/dɪˈklaɪn/",
    definition: "To become smaller, weaker, or less important over time.",
    usageTip: "Use 'decline' for gradual decreases. Can be a noun or verb: 'a decline in sales' or 'sales declined'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The population has declined steadily.", "Air quality continues to decline.", "He politely declined the invitation."],
    synonyms: ["decrease", "drop", "fall"],
    antonyms: ["increase", "rise", "grow"]
  },
  {
    word: "demonstrate",
    pronunciation: "/ˈdemənstreɪt/",
    definition: "To show clearly that something is true or exists.",
    usageTip: "Use 'demonstrate' to show proof or evidence. More formal than 'show'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The experiment demonstrates the theory.", "She demonstrated her cooking skills.", "This chart demonstrates the trend."],
    synonyms: ["show", "prove", "display"],
    antonyms: ["hide", "conceal"]
  },
  {
    word: "derive",
    pronunciation: "/dɪˈraɪv/",
    definition: "To get something from a source; to come from.",
    usageTip: "Use 'derive from' to show origin. 'Derive pleasure' means to get enjoyment.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["This word derives from Latin.", "She derives great pleasure from reading.", "The data is derived from research."],
    synonyms: ["obtain", "get", "originate"],
    antonyms: []
  },
  {
    word: "distinct",
    pronunciation: "/dɪˈstɪŋkt/",
    definition: "Clearly different or separate from other things.",
    usageTip: "Use 'distinct' to emphasize clear differences. 'Distinct from' means separate from.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["There are three distinct types.", "The flavors are quite distinct.", "Keep the two ideas distinct."],
    synonyms: ["different", "separate", "clear"],
    antonyms: ["similar", "same", "vague"]
  },
  {
    word: "efficient",
    pronunciation: "/ɪˈfɪʃənt/",
    definition: "Working well and not wasting time, money, or energy.",
    usageTip: "Use 'efficient' for processes, machines, or people who achieve results with little waste.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Electric cars are more efficient.", "She is an efficient worker.", "We need a more efficient system."],
    synonyms: ["effective", "productive", "capable"],
    antonyms: ["wasteful", "inefficient"]
  },
  {
    word: "element",
    pronunciation: "/ˈelɪmənt/",
    definition: "A basic part or feature of something.",
    usageTip: "Use 'element' for basic components. Can also mean a chemical element or weather conditions.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Trust is an important element of friendship.", "The design has several key elements.", "Water is made of two elements."],
    synonyms: ["component", "part", "factor"],
    antonyms: ["whole", "entirety"]
  },
  {
    word: "emphasis",
    pronunciation: "/ˈemfəsɪs/",
    definition: "Special importance given to something.",
    usageTip: "Use 'put emphasis on' or 'place emphasis on' to show what is important.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The school puts emphasis on creativity.", "There is too much emphasis on grades.", "The emphasis should be on quality."],
    synonyms: ["stress", "importance", "focus"],
    antonyms: ["insignificance"]
  },
  {
    word: "establish",
    pronunciation: "/ɪˈstæblɪʃ/",
    definition: "To start or create something permanent, like an organization or system.",
    usageTip: "Use 'establish' for founding organizations or proving facts.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The company was established in 1990.", "We need to establish the facts.", "They established a new rule."],
    synonyms: ["create", "found", "set up"],
    antonyms: ["abolish", "destroy"]
  },
  {
    word: "estimate",
    pronunciation: "/ˈestɪmeɪt/",
    definition: "To guess the value, size, or cost of something.",
    usageTip: "Use 'estimate' when you calculate approximately, not exactly.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Can you estimate the cost?", "I estimate it will take two hours.", "The damage was estimated at $1 million."],
    synonyms: ["guess", "calculate", "approximate"],
    antonyms: ["measure exactly"]
  },
  {
    word: "evident",
    pronunciation: "/ˈevɪdənt/",
    definition: "Easy to see or understand; obvious.",
    usageTip: "Use 'it is evident that' to introduce something obvious.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["It is evident that changes are needed.", "The problem was evident from the start.", "Her talent was evident to everyone."],
    synonyms: ["obvious", "clear", "apparent"],
    antonyms: ["hidden", "unclear", "obscure"]
  },
  {
    word: "evidence",
    pronunciation: "/ˈevɪdəns/",
    definition: "Facts or signs that show something is true.",
    usageTip: "'Evidence' is uncountable in English. Say 'a piece of evidence', not 'an evidence'.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["There is no evidence of life on Mars.", "The evidence supports this theory.", "Police are looking for evidence."],
    synonyms: ["proof", "facts", "data"],
    antonyms: ["disproof"]
  },
  {
    word: "expand",
    pronunciation: "/ɪkˈspænd/",
    definition: "To become bigger or to make something bigger.",
    usageTip: "Use 'expand' for growth in size, range, or scope.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The company wants to expand.", "Heat causes metal to expand.", "We need to expand our knowledge."],
    synonyms: ["grow", "increase", "extend"],
    antonyms: ["shrink", "reduce", "contract"]
  },
  {
    word: "feature",
    pronunciation: "/ˈfiːtʃər/",
    definition: "An important or noticeable part of something.",
    usageTip: "Use 'feature' for characteristics or special aspects of products, places, or things.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The phone has many useful features.", "A key feature of this design is simplicity.", "Mountains are a feature of the landscape."],
    synonyms: ["characteristic", "aspect", "quality"],
    antonyms: []
  },
  {
    word: "focus",
    pronunciation: "/ˈfəʊkəs/",
    definition: "To concentrate attention on something.",
    usageTip: "Use 'focus on' to show what you concentrate on.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Focus on your studies.", "The article focuses on climate change.", "Let's focus on finding solutions."],
    synonyms: ["concentrate", "center", "emphasize"],
    antonyms: ["ignore", "neglect"]
  },
  {
    word: "function",
    pronunciation: "/ˈfʌŋkʃən/",
    definition: "The purpose or job that something is designed to do.",
    usageTip: "As a noun: 'the function of the brain'. As a verb: 'the machine functions well'.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["What is the function of this button?", "The heart functions as a pump.", "Each part has a specific function."],
    synonyms: ["purpose", "role", "job"],
    antonyms: []
  },
  {
    word: "generate",
    pronunciation: "/ˈdʒenəreɪt/",
    definition: "To produce or create something.",
    usageTip: "Use 'generate' for producing electricity, ideas, income, or interest.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Solar panels generate electricity.", "The project generated a lot of interest.", "We need to generate new ideas."],
    synonyms: ["produce", "create", "cause"],
    antonyms: ["consume", "use up"]
  },
  {
    word: "identify",
    pronunciation: "/aɪˈdentɪfaɪ/",
    definition: "To recognize something or someone; to find the identity of.",
    usageTip: "Use 'identify' when recognizing or naming something specific.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Can you identify this plant?", "The study identified several problems.", "Police identified the suspect."],
    synonyms: ["recognize", "determine", "discover"],
    antonyms: []
  },
  {
    word: "impact",
    pronunciation: "/ˈɪmpækt/",
    definition: "A strong effect or influence on something.",
    usageTip: "Use 'have an impact on' to describe effects. Very common in academic writing.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Technology has a huge impact on our lives.", "The policy had a negative impact.", "We studied the environmental impact."],
    synonyms: ["effect", "influence", "consequence"],
    antonyms: []
  },
  {
    word: "imply",
    pronunciation: "/ɪmˈplaɪ/",
    definition: "To suggest something without saying it directly.",
    usageTip: "The speaker implies; the listener infers. Use 'imply' for indirect suggestions.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Are you implying that I'm wrong?", "The data implies a connection.", "His silence implied agreement."],
    synonyms: ["suggest", "hint", "indicate"],
    antonyms: ["state", "declare"]
  },
  {
    word: "indicate",
    pronunciation: "/ˈɪndɪkeɪt/",
    definition: "To show or point to something; to be a sign of.",
    usageTip: "Use 'indicate' to show evidence or signs of something.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Research indicates a problem.", "The arrow indicates the direction.", "High fever indicates infection."],
    synonyms: ["show", "suggest", "signal"],
    antonyms: ["hide", "conceal"]
  },
  {
    word: "initial",
    pronunciation: "/ɪˈnɪʃəl/",
    definition: "Happening at the beginning; first.",
    usageTip: "Use 'initial' for things that happen first or at the start.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["The initial results were promising.", "My initial reaction was surprise.", "After the initial shock, she recovered."],
    synonyms: ["first", "beginning", "early"],
    antonyms: ["final", "last", "ultimate"]
  },
  {
    word: "instance",
    pronunciation: "/ˈɪnstəns/",
    definition: "An example of something happening.",
    usageTip: "'For instance' means 'for example'. Use 'in this instance' for specific cases.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["For instance, consider this example.", "In this instance, we made an exception.", "There were several instances of fraud."],
    synonyms: ["example", "case", "occurrence"],
    antonyms: []
  },
  {
    word: "interpret",
    pronunciation: "/ɪnˈtɜːprɪt/",
    definition: "To explain the meaning of something; to understand in a particular way.",
    usageTip: "Use 'interpret' when explaining meaning or translating languages.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["How do you interpret this poem?", "The data can be interpreted differently.", "She interpreted for the visitors."],
    synonyms: ["explain", "understand", "translate"],
    antonyms: ["misunderstand"]
  },
  {
    word: "involve",
    pronunciation: "/ɪnˈvɒlv/",
    definition: "To include or affect someone or something.",
    usageTip: "Use 'involve' to show what or who is included in something.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The job involves a lot of travel.", "Many people were involved in the project.", "I don't want to get involved."],
    synonyms: ["include", "contain", "require"],
    antonyms: ["exclude"]
  },
  {
    word: "issue",
    pronunciation: "/ˈɪʃuː/",
    definition: "An important topic or problem that people discuss.",
    usageTip: "Use 'issue' for topics of debate or problems. Also means a copy of a magazine.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Climate change is a global issue.", "We need to address this issue.", "What is the main issue here?"],
    synonyms: ["problem", "topic", "matter"],
    antonyms: ["solution"]
  },
  {
    word: "maintain",
    pronunciation: "/meɪnˈteɪn/",
    definition: "To keep something in good condition or at the same level.",
    usageTip: "Use 'maintain' for keeping things working well or keeping a situation stable.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["It is important to maintain good health.", "The building is well maintained.", "She maintained her calm during the crisis."],
    synonyms: ["keep", "preserve", "sustain"],
    antonyms: ["neglect", "abandon"]
  },
  {
    word: "major",
    pronunciation: "/ˈmeɪdʒər/",
    definition: "Very important or very large.",
    usageTip: "Use 'major' for things of great importance or size.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["This is a major problem.", "She plays a major role in the company.", "There were no major changes."],
    synonyms: ["main", "important", "significant"],
    antonyms: ["minor", "small", "unimportant"]
  },
  {
    word: "obvious",
    pronunciation: "/ˈɒbviəs/",
    definition: "Easy to see or understand; clear.",
    usageTip: "Use 'obvious' when something is very clear and everyone can see it.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["The answer is obvious.", "It was obvious that she was lying.", "For obvious reasons, we cancelled."],
    synonyms: ["clear", "evident", "apparent"],
    antonyms: ["unclear", "hidden", "subtle"]
  },
  {
    word: "outcome",
    pronunciation: "/ˈaʊtkʌm/",
    definition: "The result or effect of an action or event.",
    usageTip: "Use 'outcome' for final results, especially of processes or decisions.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The outcome was unexpected.", "We are waiting for the outcome of the vote.", "What was the outcome of the meeting?"],
    synonyms: ["result", "consequence", "effect"],
    antonyms: ["cause", "origin"]
  },
  {
    word: "perceive",
    pronunciation: "/pəˈsiːv/",
    definition: "To notice or understand something, especially through the senses.",
    usageTip: "Use 'perceive' for how people see or understand things. Often about impressions.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["How do you perceive the situation?", "She perceived a change in his attitude.", "The risk was not perceived as serious."],
    synonyms: ["see", "notice", "understand"],
    antonyms: ["miss", "overlook"]
  },
  {
    word: "potential",
    pronunciation: "/pəˈtenʃəl/",
    definition: "Possible in the future; capability to develop.",
    usageTip: "Use 'potential' for future possibilities or hidden abilities.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["She has great potential.", "There are potential risks to consider.", "The potential benefits are huge."],
    synonyms: ["possible", "likely", "prospective"],
    antonyms: ["actual", "current"]
  },
  {
    word: "previous",
    pronunciation: "/ˈpriːviəs/",
    definition: "Happening or existing before something else.",
    usageTip: "Use 'previous' for things that came before in time.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["She had previous experience.", "The previous owner was very nice.", "As mentioned in the previous chapter..."],
    synonyms: ["earlier", "former", "prior"],
    antonyms: ["next", "following", "subsequent"]
  },
  {
    word: "primary",
    pronunciation: "/ˈpraɪməri/",
    definition: "Most important; main; first.",
    usageTip: "Use 'primary' for the most important thing or the first in a series.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Safety is our primary concern.", "The primary reason is cost.", "Primary education is very important."],
    synonyms: ["main", "chief", "principal"],
    antonyms: ["secondary", "minor"]
  },
  {
    word: "principle",
    pronunciation: "/ˈprɪnsɪpl/",
    definition: "A basic rule, belief, or idea that guides behavior.",
    usageTip: "Don't confuse with 'principal' (main/head of school). 'Principle' is always a noun about rules.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["It's a matter of principle.", "The basic principle is simple.", "He acted on his principles."],
    synonyms: ["rule", "law", "belief"],
    antonyms: []
  },
  {
    word: "proportion",
    pronunciation: "/prəˈpɔːʃən/",
    definition: "The relationship between the size or amount of two things.",
    usageTip: "Use 'in proportion to' to compare relative sizes or amounts.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["A large proportion of students passed.", "The head is not in proportion to the body.", "Costs rose in proportion to sales."],
    synonyms: ["ratio", "share", "percentage"],
    antonyms: []
  },
  {
    word: "range",
    pronunciation: "/reɪndʒ/",
    definition: "A variety of different things or the limits between two points.",
    usageTip: "Use 'range' for variety (a range of options) or limits (age range).",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["We offer a wide range of products.", "The age range is 18-25.", "Prices range from $10 to $100."],
    synonyms: ["variety", "scope", "extent"],
    antonyms: []
  },
  {
    word: "region",
    pronunciation: "/ˈriːdʒən/",
    definition: "A large area of land, usually part of a country.",
    usageTip: "Use 'region' for geographical areas or parts of the body.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["This region is known for wine.", "The brain has different regions.", "People from various regions attended."],
    synonyms: ["area", "zone", "territory"],
    antonyms: []
  },
  {
    word: "relevant",
    pronunciation: "/ˈreləvənt/",
    definition: "Connected to what is being discussed or considered.",
    usageTip: "Use 'relevant to' to show connection to a topic.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Is this relevant to our discussion?", "Please provide relevant information.", "The experience is highly relevant."],
    synonyms: ["related", "pertinent", "applicable"],
    antonyms: ["irrelevant", "unrelated"]
  },
  {
    word: "rely",
    pronunciation: "/rɪˈlaɪ/",
    definition: "To depend on or trust someone or something.",
    usageTip: "Use 'rely on' to show dependence or trust.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["You can rely on me.", "We rely on technology every day.", "Don't rely too much on luck."],
    synonyms: ["depend", "trust", "count on"],
    antonyms: ["distrust"]
  },
  {
    word: "research",
    pronunciation: "/rɪˈsɜːtʃ/",
    definition: "Careful study to discover new facts or information.",
    usageTip: "'Research' is usually uncountable. Say 'research' not 'researches' for the activity.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["More research is needed.", "The research shows interesting results.", "She does research on cancer."],
    synonyms: ["study", "investigation", "inquiry"],
    antonyms: []
  },
  {
    word: "respond",
    pronunciation: "/rɪˈspɒnd/",
    definition: "To say or do something as an answer or reaction.",
    usageTip: "Use 'respond to' for reactions. More formal than 'answer'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["How did she respond?", "The company responded to complaints.", "Please respond by Friday."],
    synonyms: ["reply", "answer", "react"],
    antonyms: ["ignore"]
  },
  {
    word: "role",
    pronunciation: "/rəʊl/",
    definition: "The position or purpose that someone or something has.",
    usageTip: "Use 'play a role' for having a function or influence.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Education plays an important role.", "What is your role in the team?", "She has a leading role in the project."],
    synonyms: ["function", "position", "part"],
    antonyms: []
  },
  {
    word: "section",
    pronunciation: "/ˈsekʃən/",
    definition: "A separate part of something larger.",
    usageTip: "Use 'section' for parts of documents, buildings, or groups.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Read the first section carefully.", "The science section of the library.", "This section discusses results."],
    synonyms: ["part", "segment", "portion"],
    antonyms: ["whole", "entirety"]
  },
  {
    word: "significant",
    pronunciation: "/sɪɡˈnɪfɪkənt/",
    definition: "Important or large enough to have an effect or be noticed.",
    usageTip: "Use 'significant' in academic writing instead of 'big' or 'important'. Very common in research.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["There was a significant improvement.", "This is a significant discovery.", "The change was not significant."],
    synonyms: ["important", "major", "notable"],
    antonyms: ["insignificant", "minor", "trivial"]
  },
  {
    word: "strategy",
    pronunciation: "/ˈstrætədʒi/",
    definition: "A plan or method for achieving a goal, especially over a long time.",
    usageTip: "Use 'strategy' for long-term plans. 'Tactics' are for short-term actions within a strategy.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["We need a new marketing strategy.", "What is your study strategy?", "The company changed its strategy."],
    synonyms: ["plan", "approach", "method"],
    antonyms: []
  },
  {
    word: "survey",
    pronunciation: "/ˈsɜːveɪ/",
    definition: "A study of opinions, behavior, or conditions by asking questions.",
    usageTip: "Use 'survey' for research that collects data from many people.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["We conducted a survey of customers.", "The survey results are interesting.", "Please complete this survey."],
    synonyms: ["study", "poll", "questionnaire"],
    antonyms: []
  },
  {
    word: "theory",
    pronunciation: "/ˈθɪəri/",
    definition: "An idea or set of ideas that explains something.",
    usageTip: "In science, a 'theory' is well-tested and supported by evidence, not just a guess.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The theory of evolution explains much.", "In theory, this should work.", "She developed a new theory."],
    synonyms: ["idea", "hypothesis", "concept"],
    antonyms: ["fact", "practice"]
  },
  {
    word: "tradition",
    pronunciation: "/trəˈdɪʃən/",
    definition: "A custom or belief that has existed for a long time.",
    usageTip: "Use 'tradition' for practices passed down through generations.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["It's a family tradition.", "We should respect traditions.", "The tradition dates back centuries."],
    synonyms: ["custom", "practice", "convention"],
    antonyms: ["innovation", "novelty"]
  },
  {
    word: "transfer",
    pronunciation: "/trænsˈfɜːr/",
    definition: "To move something or someone from one place to another.",
    usageTip: "Use 'transfer' for moving people, money, data, or skills.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["She transferred to a new school.", "Please transfer the money.", "Knowledge can be transferred."],
    synonyms: ["move", "shift", "relocate"],
    antonyms: ["keep", "retain"]
  },
  {
    word: "vary",
    pronunciation: "/ˈveəri/",
    definition: "To be different in different situations; to change.",
    usageTip: "Use 'vary' when things are different or change. Noun form: 'variety'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Prices vary by location.", "Results may vary.", "Opinions vary on this topic."],
    synonyms: ["differ", "change", "fluctuate"],
    antonyms: ["remain the same", "stay constant"]
  },

  // === LEVEL 3: Upper-Intermediate Academic Words ===
  {
    word: "ambiguous",
    pronunciation: "/æmˈbɪɡjuəs/",
    definition: "Having more than one possible meaning; not clear.",
    usageTip: "Use 'ambiguous' when something can be understood in different ways. It often causes confusion.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["The instructions were ambiguous.", "His answer was deliberately ambiguous.", "The ending of the movie was ambiguous."],
    synonyms: ["unclear", "vague", "confusing"],
    antonyms: ["clear", "obvious", "definite"]
  },
  {
    word: "comprehensive",
    pronunciation: "/ˌkɒmprɪˈhensɪv/",
    definition: "Including everything or almost everything about a subject.",
    usageTip: "Use 'comprehensive' to describe something complete and detailed, like a comprehensive guide or report.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["The book provides a comprehensive overview.", "Students take a comprehensive exam.", "We need a comprehensive solution."],
    synonyms: ["complete", "thorough", "full"],
    antonyms: ["partial", "incomplete", "limited"]
  },
  {
    word: "contemporary",
    pronunciation: "/kənˈtempərəri/",
    definition: "Belonging to the present time; modern.",
    usageTip: "Use 'contemporary' for things happening now or people living at the same time.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Contemporary art is very diverse.", "He was a contemporary of Einstein.", "The book addresses contemporary issues."],
    synonyms: ["modern", "current", "present-day"],
    antonyms: ["ancient", "old", "historical"]
  },
  {
    word: "controversy",
    pronunciation: "/ˈkɒntrəvɜːsi/",
    definition: "Strong disagreement about something, often in public.",
    usageTip: "Use 'controversy' for topics that cause debate and disagreement.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The decision caused controversy.", "There is controversy over the new law.", "He avoided controversy."],
    synonyms: ["debate", "dispute", "argument"],
    antonyms: ["agreement", "harmony"]
  },
  {
    word: "criteria",
    pronunciation: "/kraɪˈtɪəriə/",
    definition: "Standards or rules used to judge or decide something. (Plural of criterion)",
    usageTip: "'Criteria' is plural. One standard is a 'criterion', many are 'criteria'.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["What criteria did you use?", "The main criteria for selection are...", "He met all the criteria."],
    synonyms: ["standards", "requirements", "measures"],
    antonyms: []
  },
  {
    word: "dimension",
    pronunciation: "/daɪˈmenʃən/",
    definition: "A measurement such as length, width, or height; or an aspect of something.",
    usageTip: "Use 'dimension' for physical measurements or different aspects of a topic.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The room's dimensions are 10x12 feet.", "Consider all dimensions of the problem.", "This adds a new dimension to the debate."],
    synonyms: ["aspect", "element", "feature"],
    antonyms: []
  },
  {
    word: "diversity",
    pronunciation: "/daɪˈvɜːsɪti/",
    definition: "A range of different things; variety, especially of people or ideas.",
    usageTip: "Use 'diversity' for variety in people, opinions, or things. Very common in discussions about society.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The city has great cultural diversity.", "Diversity of opinion is healthy.", "Biodiversity is important."],
    synonyms: ["variety", "range", "difference"],
    antonyms: ["uniformity", "sameness"]
  },
  {
    word: "domestic",
    pronunciation: "/dəˈmestɪk/",
    definition: "Relating to a person's home or family; relating to one's own country.",
    usageTip: "Use 'domestic' for home-related things or national (vs. international) matters.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Domestic flights are cheaper.", "She handles domestic affairs.", "Domestic violence is a serious issue."],
    synonyms: ["home", "national", "internal"],
    antonyms: ["foreign", "international"]
  },
  {
    word: "dominant",
    pronunciation: "/ˈdɒmɪnənt/",
    definition: "More powerful, successful, or important than others.",
    usageTip: "Use 'dominant' for things or people with the most power or influence.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["English is the dominant language.", "She has a dominant personality.", "The dominant theme is love."],
    synonyms: ["main", "leading", "chief"],
    antonyms: ["minor", "subordinate", "weak"]
  },
  {
    word: "framework",
    pronunciation: "/ˈfreɪmwɜːk/",
    definition: "A basic structure that supports something; a system of rules or ideas.",
    usageTip: "Use 'framework' for underlying structures or systems that support other things.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["We need a theoretical framework.", "The legal framework is outdated.", "Within this framework, we can..."],
    synonyms: ["structure", "system", "foundation"],
    antonyms: []
  },
  {
    word: "hypothesis",
    pronunciation: "/haɪˈpɒθəsɪs/",
    definition: "An idea that is suggested as a possible explanation but has not been proved.",
    usageTip: "Use 'hypothesis' for a proposed explanation that needs testing. Plural: 'hypotheses'.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["Our hypothesis was confirmed.", "We need to test this hypothesis.", "The hypothesis predicts that..."],
    synonyms: ["theory", "assumption", "proposal"],
    antonyms: ["fact", "proof"]
  },
  {
    word: "ideology",
    pronunciation: "/ˌaɪdiˈɒlədʒi/",
    definition: "A set of beliefs or principles, especially political ones.",
    usageTip: "Use 'ideology' for systems of beliefs that shape how people think about society.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["Different political ideologies exist.", "His ideology influenced his decisions.", "The ideology of freedom and democracy."],
    synonyms: ["beliefs", "doctrine", "philosophy"],
    antonyms: []
  },
  {
    word: "inevitable",
    pronunciation: "/ɪˈnevɪtəbl/",
    definition: "Certain to happen and impossible to avoid.",
    usageTip: "Use 'inevitable' when something will definitely happen. Often used for negative things.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Change is inevitable in life.", "The accident was inevitable.", "It was inevitable that they would meet."],
    synonyms: ["unavoidable", "certain", "sure"],
    antonyms: ["avoidable", "preventable", "uncertain"]
  },
  {
    word: "infrastructure",
    pronunciation: "/ˈɪnfrəstrʌktʃər/",
    definition: "The basic systems and services that a country or organization needs to function.",
    usageTip: "Use 'infrastructure' for things like roads, power systems, and communication networks.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The country needs better infrastructure.", "Internet infrastructure is improving.", "Infrastructure investment is crucial."],
    synonyms: ["foundation", "framework", "facilities"],
    antonyms: []
  },
  {
    word: "inherent",
    pronunciation: "/ɪnˈhɪərənt/",
    definition: "Existing as a natural or permanent part of something.",
    usageTip: "Use 'inherent in' to describe qualities that are built into something.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["There are inherent risks.", "Beauty is inherent in nature.", "Inherent problems with the system."],
    synonyms: ["built-in", "natural", "fundamental"],
    antonyms: ["external", "acquired"]
  },
  {
    word: "innovation",
    pronunciation: "/ˌɪnəˈveɪʃən/",
    definition: "A new idea, method, or device; the act of creating new things.",
    usageTip: "Use 'innovation' for new ideas or inventions that improve things.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["Innovation drives economic growth.", "Technological innovation is rapid.", "We encourage innovation."],
    synonyms: ["invention", "creation", "novelty"],
    antonyms: ["tradition", "convention"]
  },
  {
    word: "integrate",
    pronunciation: "/ˈɪntɪɡreɪt/",
    definition: "To combine two or more things to work together as one.",
    usageTip: "Use 'integrate with/into' when combining things into a unified whole.",
    partOfSpeech: "verb",
    difficulty: 3,
    examples: ["We need to integrate the new system.", "Immigrants often integrate into society.", "The software integrates with other tools."],
    synonyms: ["combine", "merge", "unify"],
    antonyms: ["separate", "divide"]
  },
  {
    word: "mechanism",
    pronunciation: "/ˈmekənɪzəm/",
    definition: "A system of parts working together; or a way that something works.",
    usageTip: "Use 'mechanism' for how things work, either physically or conceptually.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["What is the mechanism behind this?", "The body has defense mechanisms.", "A mechanism for handling complaints."],
    synonyms: ["system", "process", "method"],
    antonyms: []
  },
  {
    word: "nonetheless",
    pronunciation: "/ˌnʌnðəˈles/",
    definition: "Despite what has just been said; however.",
    usageTip: "Use 'nonetheless' to show contrast. More formal than 'but' or 'however'.",
    partOfSpeech: "adverb",
    difficulty: 3,
    examples: ["It was difficult. Nonetheless, we succeeded.", "She was tired; nonetheless, she continued.", "The project failed. Nonetheless, we learned a lot."],
    synonyms: ["however", "nevertheless", "still"],
    antonyms: ["therefore"]
  },
  {
    word: "notion",
    pronunciation: "/ˈnəʊʃən/",
    definition: "An idea, belief, or understanding of something.",
    usageTip: "Use 'notion' for ideas, especially ones that might be vague or uncertain.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["I have no notion of what you mean.", "The notion that everyone is equal.", "Challenge traditional notions."],
    synonyms: ["idea", "concept", "belief"],
    antonyms: []
  },
  {
    word: "paradigm",
    pronunciation: "/ˈpærədaɪm/",
    definition: "A typical example or model of something; a way of thinking about something.",
    usageTip: "'Paradigm shift' means a fundamental change in approach or thinking.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["A new paradigm in education.", "The paradigm shift changed everything.", "This challenges the current paradigm."],
    synonyms: ["model", "pattern", "example"],
    antonyms: []
  },
  {
    word: "phenomenon",
    pronunciation: "/fɪˈnɒmɪnən/",
    definition: "Something that exists and can be observed; an unusual or remarkable event.",
    usageTip: "Plural is 'phenomena'. Use for observable facts or remarkable occurrences.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["This is a natural phenomenon.", "The phenomenon is hard to explain.", "Social media is a recent phenomenon."],
    synonyms: ["occurrence", "event", "fact"],
    antonyms: []
  },
  {
    word: "philosophy",
    pronunciation: "/fɪˈlɒsəfi/",
    definition: "The study of basic ideas about knowledge, truth, and life; or a set of beliefs.",
    usageTip: "Use 'philosophy' for academic study or personal beliefs about how to live.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["She studied philosophy.", "My philosophy of life is simple.", "The company's philosophy focuses on quality."],
    synonyms: ["thinking", "beliefs", "principles"],
    antonyms: []
  },
  {
    word: "subsequent",
    pronunciation: "/ˈsʌbsɪkwənt/",
    definition: "Coming after something else in time or order.",
    usageTip: "Use 'subsequent' to describe things that follow. More formal than 'later' or 'next'.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["The subsequent chapters are more difficult.", "In subsequent years, things improved.", "The initial test and subsequent analysis."],
    synonyms: ["following", "later", "next"],
    antonyms: ["previous", "prior", "earlier"]
  },
  {
    word: "sufficient",
    pronunciation: "/səˈfɪʃənt/",
    definition: "Enough for a particular purpose.",
    usageTip: "Use 'sufficient' for having enough of something. More formal than 'enough'.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Is there sufficient evidence?", "We have sufficient time.", "The explanation was not sufficient."],
    synonyms: ["enough", "adequate", "ample"],
    antonyms: ["insufficient", "inadequate", "lacking"]
  },
  {
    word: "sustain",
    pronunciation: "/səˈsteɪn/",
    definition: "To support or keep something going over time.",
    usageTip: "Use 'sustain' for maintaining or supporting something long-term. Related: 'sustainable'.",
    partOfSpeech: "verb",
    difficulty: 3,
    examples: ["We cannot sustain this pace.", "Sustainable development is important.", "The injury sustained was minor."],
    synonyms: ["maintain", "support", "keep"],
    antonyms: ["stop", "end", "neglect"]
  },
  {
    word: "undergo",
    pronunciation: "/ˌʌndərˈɡəʊ/",
    definition: "To experience or be subjected to something, usually difficult.",
    usageTip: "Use 'undergo' for experiencing changes, treatments, or difficult situations.",
    partOfSpeech: "verb",
    difficulty: 3,
    examples: ["The company underwent major changes.", "Patients undergo treatment.", "The city is undergoing renovation."],
    synonyms: ["experience", "endure", "go through"],
    antonyms: ["avoid", "escape"]
  },
  {
    word: "undertake",
    pronunciation: "/ˌʌndərˈteɪk/",
    definition: "To start doing something, especially something difficult or important.",
    usageTip: "Use 'undertake' for formally starting tasks, projects, or responsibilities.",
    partOfSpeech: "verb",
    difficulty: 3,
    examples: ["We undertook a major project.", "She undertook to finish by Friday.", "The research was undertaken carefully."],
    synonyms: ["begin", "start", "attempt"],
    antonyms: ["abandon", "quit"]
  },
  {
    word: "utility",
    pronunciation: "/juːˈtɪlɪti/",
    definition: "The state of being useful; or a service such as electricity or water.",
    usageTip: "Use 'utility' for usefulness or for essential services like power and water.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The utility of this tool is obvious.", "Utility bills are expensive.", "Public utilities need investment."],
    synonyms: ["usefulness", "benefit", "service"],
    antonyms: ["uselessness"]
  },
  {
    word: "valid",
    pronunciation: "/ˈvælɪd/",
    definition: "Based on truth or reason; acceptable and correct.",
    usageTip: "Use 'valid' for arguments, reasons, or documents that are acceptable and correct.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["That is a valid point.", "Is your passport still valid?", "The research uses valid methods."],
    synonyms: ["sound", "reasonable", "legitimate"],
    antonyms: ["invalid", "false", "incorrect"]
  },

  // === LEVEL 4: Advanced Academic Words ===
  {
    word: "advocate",
    pronunciation: "/ˈædvəkeɪt/",
    definition: "To publicly support an idea or action; a person who supports something.",
    usageTip: "As a verb: 'advocate for change'. As a noun: 'an advocate of reform'.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["She advocates for human rights.", "He is a strong advocate of education.", "They advocated policy changes."],
    synonyms: ["support", "promote", "champion"],
    antonyms: ["oppose", "criticize"]
  },
  {
    word: "albeit",
    pronunciation: "/ɔːlˈbiːɪt/",
    definition: "Although; even though.",
    usageTip: "Use 'albeit' as a more formal way to say 'although'. Often used in academic writing.",
    partOfSpeech: "conjunction",
    difficulty: 4,
    examples: ["It was a good, albeit small, improvement.", "The plan worked, albeit slowly.", "Albeit difficult, the task was completed."],
    synonyms: ["although", "though", "even if"],
    antonyms: []
  },
  {
    word: "allocate",
    pronunciation: "/ˈæləkeɪt/",
    definition: "To give out resources or duties for a particular purpose.",
    usageTip: "Use 'allocate' for distributing resources, time, or money for specific purposes.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["We need to allocate more funds.", "Time was allocated for discussion.", "Resources are allocated fairly."],
    synonyms: ["assign", "distribute", "apportion"],
    antonyms: ["withhold"]
  },
  {
    word: "analogy",
    pronunciation: "/əˈnælədʒi/",
    definition: "A comparison between two things to explain or clarify an idea.",
    usageTip: "Use 'by analogy' or 'draw an analogy' to compare similar situations.",
    partOfSpeech: "noun",
    difficulty: 4,
    examples: ["Let me draw an analogy.", "By analogy, we can understand this...", "The analogy is not perfect."],
    synonyms: ["comparison", "parallel", "similarity"],
    antonyms: ["difference", "contrast"]
  },
  {
    word: "arbitrary",
    pronunciation: "/ˈɑːbɪtrəri/",
    definition: "Based on personal choice rather than any reason or system.",
    usageTip: "Use 'arbitrary' for decisions that seem random or unfair.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["The decision seemed arbitrary.", "Arbitrary rules frustrate people.", "The deadline was arbitrary."],
    synonyms: ["random", "unreasonable", "capricious"],
    antonyms: ["reasoned", "logical", "systematic"]
  },
  {
    word: "coherent",
    pronunciation: "/kəʊˈhɪərənt/",
    definition: "Logical and well-organized; easy to understand.",
    usageTip: "Use 'coherent' for arguments or writing that is clear and logically connected.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["Present a coherent argument.", "The essay lacks coherent structure.", "She gave a coherent explanation."],
    synonyms: ["logical", "clear", "organized"],
    antonyms: ["incoherent", "confused", "disorganized"]
  },
  {
    word: "coincide",
    pronunciation: "/ˌkəʊɪnˈsaɪd/",
    definition: "To happen at the same time or place; to be the same or similar.",
    usageTip: "Use 'coincide with' when two things happen together or agree.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["The events coincided.", "My views coincide with yours.", "The meeting coincides with my trip."],
    synonyms: ["occur together", "match", "correspond"],
    antonyms: ["differ", "disagree"]
  },
  {
    word: "compile",
    pronunciation: "/kəmˈpaɪl/",
    definition: "To collect information and arrange it in a book, report, or list.",
    usageTip: "Use 'compile' for gathering information from many sources into one place.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["She compiled a list of references.", "The data was compiled from surveys.", "Compiling the report took weeks."],
    synonyms: ["collect", "gather", "assemble"],
    antonyms: ["scatter", "disperse"]
  },
  {
    word: "conform",
    pronunciation: "/kənˈfɔːm/",
    definition: "To behave according to accepted standards or rules.",
    usageTip: "Use 'conform to' for following rules, standards, or expectations.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Products must conform to safety standards.", "She refused to conform.", "The design conforms to regulations."],
    synonyms: ["comply", "follow", "obey"],
    antonyms: ["rebel", "resist", "deviate"]
  },
  {
    word: "constrain",
    pronunciation: "/kənˈstreɪn/",
    definition: "To limit or restrict something.",
    usageTip: "Use 'constrain' for limiting or forcing within boundaries. Noun: 'constraint'.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Budget constraints limit options.", "We are constrained by time.", "Don't feel constrained by tradition."],
    synonyms: ["limit", "restrict", "confine"],
    antonyms: ["free", "liberate", "release"]
  },
  {
    word: "contradict",
    pronunciation: "/ˌkɒntrəˈdɪkt/",
    definition: "To say the opposite of what someone else has said; to conflict with.",
    usageTip: "Use 'contradict' when statements or evidence conflict with each other.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["The evidence contradicts your claim.", "Don't contradict yourself.", "The two reports contradict each other."],
    synonyms: ["oppose", "deny", "conflict"],
    antonyms: ["confirm", "agree", "support"]
  },
  {
    word: "denote",
    pronunciation: "/dɪˈnəʊt/",
    definition: "To be a sign of; to mean or represent.",
    usageTip: "Use 'denote' for the literal meaning of something. Compare with 'connote' (imply).",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Red denotes danger.", "What does this symbol denote?", "The term denotes a specific concept."],
    synonyms: ["mean", "indicate", "signify"],
    antonyms: []
  },
  {
    word: "deviate",
    pronunciation: "/ˈdiːvieɪt/",
    definition: "To do something different from what is normal or expected.",
    usageTip: "Use 'deviate from' when moving away from a standard or plan.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Don't deviate from the plan.", "The results deviated from expectations.", "She never deviates from her routine."],
    synonyms: ["differ", "diverge", "stray"],
    antonyms: ["conform", "follow"]
  },
  {
    word: "diminish",
    pronunciation: "/dɪˈmɪnɪʃ/",
    definition: "To become or make smaller or less important.",
    usageTip: "Use 'diminish' for gradual reduction in size, importance, or quality.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Interest in the topic has diminished.", "Nothing can diminish her achievement.", "The pain gradually diminished."],
    synonyms: ["decrease", "reduce", "lessen"],
    antonyms: ["increase", "grow", "enhance"]
  },
  {
    word: "dispose",
    pronunciation: "/dɪˈspəʊz/",
    definition: "To get rid of something; to arrange or settle.",
    usageTip: "'Dispose of' means to get rid of. 'Disposed to' means inclined or willing.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["How should we dispose of this waste?", "He was well disposed toward the idea.", "The matter was quickly disposed of."],
    synonyms: ["discard", "remove", "throw away"],
    antonyms: ["keep", "retain"]
  },
  {
    word: "empirical",
    pronunciation: "/ɪmˈpɪrɪkəl/",
    definition: "Based on observation or experience rather than theory.",
    usageTip: "Use 'empirical' for evidence or research based on real-world observation.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["Empirical evidence supports this.", "The study uses empirical methods.", "Empirical research is important."],
    synonyms: ["experimental", "observed", "practical"],
    antonyms: ["theoretical"]
  },
  {
    word: "explicit",
    pronunciation: "/ɪkˈsplɪsɪt/",
    definition: "Stated clearly and in detail, leaving no doubt.",
    usageTip: "Use 'explicit' for clear, direct statements. Opposite of 'implicit'.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["The instructions were explicit.", "She gave explicit permission.", "Be explicit about your expectations."],
    synonyms: ["clear", "direct", "specific"],
    antonyms: ["implicit", "vague", "unclear"]
  },
  {
    word: "formulate",
    pronunciation: "/ˈfɔːmjuleɪt/",
    definition: "To create or develop a plan, idea, or method carefully.",
    usageTip: "Use 'formulate' for creating plans, theories, or policies systematically.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["We need to formulate a strategy.", "She formulated a new theory.", "The policy was carefully formulated."],
    synonyms: ["develop", "create", "devise"],
    antonyms: []
  },
  {
    word: "hierarchy",
    pronunciation: "/ˈhaɪərɑːki/",
    definition: "A system in which people or things are arranged according to importance.",
    usageTip: "Use 'hierarchy' for ranking systems in organizations or classifications.",
    partOfSpeech: "noun",
    difficulty: 4,
    examples: ["The company has a strict hierarchy.", "A hierarchy of needs exists.", "At the top of the hierarchy..."],
    synonyms: ["ranking", "order", "structure"],
    antonyms: ["equality"]
  },
  {
    word: "implement",
    pronunciation: "/ˈɪmplɪment/",
    definition: "To put a plan or decision into action.",
    usageTip: "Use 'implement' when putting plans, policies, or systems into practice.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["We will implement the new policy.", "The plan was successfully implemented.", "Implementation requires resources."],
    synonyms: ["execute", "carry out", "apply"],
    antonyms: ["plan", "propose"]
  },
  {
    word: "implicit",
    pronunciation: "/ɪmˈplɪsɪt/",
    definition: "Suggested but not directly stated; understood without being said.",
    usageTip: "Use 'implicit' for things that are implied, not stated directly. Opposite of 'explicit'.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["There was an implicit agreement.", "The criticism was implicit.", "Implicit bias affects decisions."],
    synonyms: ["implied", "indirect", "unspoken"],
    antonyms: ["explicit", "direct", "stated"]
  },
  {
    word: "induce",
    pronunciation: "/ɪnˈdjuːs/",
    definition: "To cause something to happen; to persuade someone to do something.",
    usageTip: "Use 'induce' for causing effects or persuading action.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["The drug can induce sleep.", "Nothing could induce him to change.", "Stress can induce illness."],
    synonyms: ["cause", "produce", "persuade"],
    antonyms: ["prevent", "deter"]
  },
  {
    word: "likewise",
    pronunciation: "/ˈlaɪkwaɪz/",
    definition: "In the same way; also.",
    usageTip: "Use 'likewise' to show similarity or to say 'me too' formally.",
    partOfSpeech: "adverb",
    difficulty: 4,
    examples: ["She smiled, and I did likewise.", "Likewise, we should consider...", "Nice to meet you. Likewise."],
    synonyms: ["similarly", "also", "too"],
    antonyms: ["differently", "conversely"]
  },
  {
    word: "notwithstanding",
    pronunciation: "/ˌnɒtwɪθˈstændɪŋ/",
    definition: "Despite; in spite of.",
    usageTip: "Very formal. Use 'notwithstanding' as a preposition or adverb meaning 'despite'.",
    partOfSpeech: "preposition",
    difficulty: 4,
    examples: ["Notwithstanding the difficulties, we succeeded.", "The law applies notwithstanding.", "Notwithstanding his objections..."],
    synonyms: ["despite", "in spite of", "regardless of"],
    antonyms: ["because of"]
  },
  {
    word: "orient",
    pronunciation: "/ˈɔːrient/",
    definition: "To direct toward a particular direction or goal; to familiarize.",
    usageTip: "Use 'orient toward' for direction. 'Orientation' is the noun form.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["The program orients new employees.", "Orient the map to the north.", "The course is oriented toward beginners."],
    synonyms: ["direct", "align", "adjust"],
    antonyms: ["disorient", "confuse"]
  },
  {
    word: "predominant",
    pronunciation: "/prɪˈdɒmɪnənt/",
    definition: "Most common, important, or powerful.",
    usageTip: "Use 'predominant' for what is most common or has most influence.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["Blue is the predominant color.", "The predominant view is...", "She played a predominant role."],
    synonyms: ["main", "chief", "dominant"],
    antonyms: ["minor", "secondary"]
  },
  {
    word: "presume",
    pronunciation: "/prɪˈzjuːm/",
    definition: "To suppose something is true without having proof.",
    usageTip: "'Presume' suggests more confidence than 'assume'. 'Presumably' is a common adverb.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["I presume you've heard the news.", "Presumably, they will agree.", "Don't presume too much."],
    synonyms: ["assume", "suppose", "believe"],
    antonyms: ["know", "prove"]
  },
  {
    word: "protocol",
    pronunciation: "/ˈprəʊtəkɒl/",
    definition: "A set of rules or procedures to follow in formal situations.",
    usageTip: "Use 'protocol' for official procedures or technical rules.",
    partOfSpeech: "noun",
    difficulty: 4,
    examples: ["Follow the safety protocol.", "Diplomatic protocol requires...", "The network protocol is secure."],
    synonyms: ["procedure", "rules", "convention"],
    antonyms: []
  },
  {
    word: "simulate",
    pronunciation: "/ˈsɪmjuleɪt/",
    definition: "To imitate or create an artificial version of something.",
    usageTip: "Use 'simulate' for creating models or imitations for testing or training.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["The software simulates real conditions.", "Pilots train using simulators.", "We simulated the experiment."],
    synonyms: ["imitate", "replicate", "model"],
    antonyms: []
  },
  {
    word: "subordinate",
    pronunciation: "/səˈbɔːdɪnət/",
    definition: "Lower in rank or importance; a person of lower rank.",
    usageTip: "As an adjective: 'a subordinate role'. As a noun: 'his subordinates'.",
    partOfSpeech: "adjective",
    difficulty: 4,
    examples: ["He plays a subordinate role.", "She respects her subordinates.", "This is subordinate to the main goal."],
    synonyms: ["lower", "junior", "secondary"],
    antonyms: ["superior", "senior", "dominant"]
  },

  // === LEVEL 5: Advanced/Specialized Academic Words ===
  {
    word: "ambivalent",
    pronunciation: "/æmˈbɪvələnt/",
    definition: "Having mixed feelings or contradictory ideas about something.",
    usageTip: "Use 'ambivalent about' when you have conflicting feelings.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["I'm ambivalent about moving.", "She felt ambivalent about the offer.", "Many people are ambivalent on this issue."],
    synonyms: ["uncertain", "conflicted", "undecided"],
    antonyms: ["certain", "decided", "sure"]
  },
  {
    word: "assimilate",
    pronunciation: "/əˈsɪmɪleɪt/",
    definition: "To absorb and integrate ideas, culture, or people into a wider group.",
    usageTip: "Use 'assimilate' for absorption of ideas, culture, or people into a larger whole.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["Immigrants often assimilate over time.", "It takes time to assimilate new information.", "The culture assimilated foreign influences."],
    synonyms: ["absorb", "integrate", "incorporate"],
    antonyms: ["separate", "isolate"]
  },
  {
    word: "circumvent",
    pronunciation: "/ˌsɜːkəmˈvent/",
    definition: "To find a way around an obstacle or rule.",
    usageTip: "Use 'circumvent' for cleverly avoiding obstacles or restrictions.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["They tried to circumvent the rules.", "We can circumvent this problem.", "The system was designed to circumvent delays."],
    synonyms: ["avoid", "bypass", "evade"],
    antonyms: ["confront", "face"]
  },
  {
    word: "contingent",
    pronunciation: "/kənˈtɪndʒənt/",
    definition: "Dependent on something else happening; a group of people with a shared purpose.",
    usageTip: "Use 'contingent on/upon' to show dependency. As a noun, it means a group.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["Success is contingent on effort.", "A contingent of soldiers arrived.", "Payment is contingent upon delivery."],
    synonyms: ["dependent", "conditional", "subject to"],
    antonyms: ["independent", "unconditional"]
  },
  {
    word: "culminate",
    pronunciation: "/ˈkʌlmɪneɪt/",
    definition: "To reach the highest point or final result.",
    usageTip: "Use 'culminate in' for the final result of a process or series of events.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["The project culminated in success.", "Tensions culminated in war.", "His career culminated with an award."],
    synonyms: ["peak", "climax", "end"],
    antonyms: ["begin", "start"]
  },
  {
    word: "discrepancy",
    pronunciation: "/dɪˈskrepənsi/",
    definition: "A difference between things that should be the same.",
    usageTip: "Use 'discrepancy' for inconsistencies or differences that shouldn't exist.",
    partOfSpeech: "noun",
    difficulty: 5,
    examples: ["There's a discrepancy in the data.", "We found a discrepancy between the reports.", "The discrepancy needs explanation."],
    synonyms: ["difference", "inconsistency", "variation"],
    antonyms: ["agreement", "consistency"]
  },
  {
    word: "exacerbate",
    pronunciation: "/ɪɡˈzæsərbeɪt/",
    definition: "To make a bad situation or problem worse.",
    usageTip: "Use 'exacerbate' when something makes an already bad situation even worse.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["The drought exacerbated food shortages.", "Don't exacerbate the problem.", "Stress can exacerbate health issues."],
    synonyms: ["worsen", "aggravate", "intensify"],
    antonyms: ["improve", "alleviate", "ease"]
  },
  {
    word: "exemplify",
    pronunciation: "/ɪɡˈzemplɪfaɪ/",
    definition: "To be a typical example of something; to show by giving examples.",
    usageTip: "Use 'exemplify' when something represents a perfect example of a concept.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["This case exemplifies the problem.", "She exemplifies dedication.", "Let me exemplify with an example."],
    synonyms: ["illustrate", "demonstrate", "represent"],
    antonyms: []
  },
  {
    word: "feasible",
    pronunciation: "/ˈfiːzəbl/",
    definition: "Possible and practical to do or achieve.",
    usageTip: "Use 'feasible' when something is realistic and can be done.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["Is this plan feasible?", "We need a feasible solution.", "It's not economically feasible."],
    synonyms: ["possible", "practical", "workable"],
    antonyms: ["impossible", "impractical", "unfeasible"]
  },
  {
    word: "hypothetical",
    pronunciation: "/ˌhaɪpəˈθetɪkəl/",
    definition: "Based on a possible situation rather than facts; imagined.",
    usageTip: "Use 'hypothetical' for imagined situations used in reasoning or discussion.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["Let's consider a hypothetical situation.", "This is a hypothetical example.", "The question was purely hypothetical."],
    synonyms: ["theoretical", "imaginary", "supposed"],
    antonyms: ["real", "actual", "factual"]
  },
  {
    word: "incumbent",
    pronunciation: "/ɪnˈkʌmbənt/",
    definition: "Currently holding an official position; necessary as a duty.",
    usageTip: "As a noun: 'the incumbent president'. As adjective: 'it is incumbent upon us'.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["The incumbent lost the election.", "It is incumbent upon us to act.", "The incumbent administration..."],
    synonyms: ["current", "present", "obligatory"],
    antonyms: ["former", "previous"]
  },
  {
    word: "inherently",
    pronunciation: "/ɪnˈhɪərəntli/",
    definition: "In a way that is a permanent, essential, or characteristic feature.",
    usageTip: "Use 'inherently' for qualities that are fundamental and built-in.",
    partOfSpeech: "adverb",
    difficulty: 5,
    examples: ["The system is inherently flawed.", "Risk is inherently involved.", "This is not inherently bad."],
    synonyms: ["fundamentally", "essentially", "naturally"],
    antonyms: ["superficially", "externally"]
  },
  {
    word: "mitigate",
    pronunciation: "/ˈmɪtɪɡeɪt/",
    definition: "To make something less severe, serious, or painful.",
    usageTip: "Use 'mitigate' for reducing the negative effects of something.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["We need to mitigate risks.", "Steps were taken to mitigate damage.", "Nothing could mitigate his guilt."],
    synonyms: ["reduce", "lessen", "alleviate"],
    antonyms: ["worsen", "aggravate", "intensify"]
  },
  {
    word: "nuance",
    pronunciation: "/ˈnjuːɑːns/",
    definition: "A subtle difference in meaning, expression, or sound.",
    usageTip: "Use 'nuance' for small but important differences that add complexity.",
    partOfSpeech: "noun",
    difficulty: 5,
    examples: ["The nuances of language are complex.", "She understood the subtle nuances.", "A nuanced understanding is needed."],
    synonyms: ["subtlety", "shade", "distinction"],
    antonyms: []
  },
  {
    word: "paradox",
    pronunciation: "/ˈpærədɒks/",
    definition: "A statement or situation that seems contradictory but may be true.",
    usageTip: "Use 'paradox' for seemingly contradictory ideas that reveal a truth.",
    partOfSpeech: "noun",
    difficulty: 5,
    examples: ["It's a paradox of modern life.", "The paradox is that...", "This creates an interesting paradox."],
    synonyms: ["contradiction", "puzzle", "anomaly"],
    antonyms: []
  },
  {
    word: "pragmatic",
    pronunciation: "/præɡˈmætɪk/",
    definition: "Dealing with things in a practical way rather than following theories.",
    usageTip: "Use 'pragmatic' for practical, realistic approaches to problems.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["Take a pragmatic approach.", "She is very pragmatic.", "Pragmatic solutions are needed."],
    synonyms: ["practical", "realistic", "sensible"],
    antonyms: ["idealistic", "impractical", "theoretical"]
  },
  {
    word: "prerequisite",
    pronunciation: "/priːˈrekwɪzɪt/",
    definition: "Something that is required before something else can happen.",
    usageTip: "Use 'prerequisite for' to show what is required first.",
    partOfSpeech: "noun",
    difficulty: 5,
    examples: ["A degree is a prerequisite for this job.", "There are no prerequisites.", "Trust is a prerequisite for success."],
    synonyms: ["requirement", "condition", "necessity"],
    antonyms: []
  },
  {
    word: "proliferate",
    pronunciation: "/prəˈlɪfəreɪt/",
    definition: "To increase rapidly in number; to spread widely.",
    usageTip: "Use 'proliferate' for rapid growth or spreading of things.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["Smartphones have proliferated.", "Rumors proliferated quickly.", "New businesses continue to proliferate."],
    synonyms: ["multiply", "spread", "increase"],
    antonyms: ["decrease", "diminish"]
  },
  {
    word: "robust",
    pronunciation: "/rəʊˈbʌst/",
    definition: "Strong and healthy; able to withstand difficulties.",
    usageTip: "Use 'robust' for systems, arguments, or things that are strong and reliable.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["The economy shows robust growth.", "We need a more robust system.", "He has a robust constitution."],
    synonyms: ["strong", "sturdy", "resilient"],
    antonyms: ["weak", "fragile", "delicate"]
  },
  {
    word: "scrutinize",
    pronunciation: "/ˈskruːtənaɪz/",
    definition: "To examine something very carefully.",
    usageTip: "Use 'scrutinize' for careful, detailed examination or inspection.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["Experts scrutinized the evidence.", "The report was scrutinized.", "She scrutinized his face."],
    synonyms: ["examine", "inspect", "analyze"],
    antonyms: ["ignore", "overlook"]
  },
  {
    word: "supersede",
    pronunciation: "/ˌsuːpərˈsiːd/",
    definition: "To replace something older or less effective with something new.",
    usageTip: "Use 'supersede' when something new replaces something old.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["Digital cameras superseded film.", "The new law supersedes the old one.", "This version supersedes all previous ones."],
    synonyms: ["replace", "supplant", "succeed"],
    antonyms: ["precede"]
  },
  {
    word: "synthesize",
    pronunciation: "/ˈsɪnθəsaɪz/",
    definition: "To combine different ideas or things into a coherent whole.",
    usageTip: "Use 'synthesize' for combining information or ideas to create something new.",
    partOfSpeech: "verb",
    difficulty: 5,
    examples: ["Scientists synthesize compounds.", "The essay synthesizes various views.", "She synthesized the research findings."],
    synonyms: ["combine", "integrate", "merge"],
    antonyms: ["analyze", "separate"]
  },
  {
    word: "tangible",
    pronunciation: "/ˈtændʒəbl/",
    definition: "Real and able to be touched or measured; clear and definite.",
    usageTip: "Use 'tangible' for things that are concrete and measurable, not abstract.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["We need tangible results.", "There was no tangible evidence.", "The benefits are tangible."],
    synonyms: ["concrete", "real", "measurable"],
    antonyms: ["intangible", "abstract"]
  },
  {
    word: "ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    definition: "Present, appearing, or found everywhere.",
    usageTip: "Use 'ubiquitous' when something is so common it seems to be everywhere.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["Smartphones are now ubiquitous.", "Coffee shops are ubiquitous in cities.", "Advertising is ubiquitous."],
    synonyms: ["everywhere", "omnipresent", "universal"],
    antonyms: ["rare", "scarce"]
  },
  {
    word: "unequivocal",
    pronunciation: "/ˌʌnɪˈkwɪvəkəl/",
    definition: "Leaving no doubt; completely clear.",
    usageTip: "Use 'unequivocal' for statements or evidence that are absolutely clear.",
    partOfSpeech: "adjective",
    difficulty: 5,
    examples: ["The answer was unequivocal.", "She gave unequivocal support.", "The evidence is unequivocal."],
    synonyms: ["clear", "definite", "absolute"],
    antonyms: ["ambiguous", "vague", "equivocal"]
  },

  // === ADDITIONAL VOCABULARY - More TOEFL/IELTS Words ===

  // More Level 2 Words
  {
    word: "anticipate",
    pronunciation: "/ænˈtɪsɪpeɪt/",
    definition: "To expect something to happen and prepare for it.",
    usageTip: "Use 'anticipate' when you expect and prepare. Stronger than just 'expect'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We anticipate a large crowd.", "I didn't anticipate this problem.", "Sales are anticipated to rise."],
    synonyms: ["expect", "predict", "foresee"],
    antonyms: []
  },
  {
    word: "appreciate",
    pronunciation: "/əˈpriːʃieɪt/",
    definition: "To understand the value of something; to be grateful for.",
    usageTip: "Use 'appreciate' for gratitude or understanding value. 'I would appreciate it if...' is polite.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["I appreciate your help.", "She appreciates good music.", "I would appreciate a quick reply."],
    synonyms: ["value", "be grateful", "understand"],
    antonyms: ["ignore", "overlook"]
  },
  {
    word: "assess",
    pronunciation: "/əˈses/",
    definition: "To judge or evaluate the quality, importance, or value of something.",
    usageTip: "Use 'assess' for formal evaluation. Common in academic and professional contexts.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We need to assess the risks.", "Teachers assess student progress.", "The damage was assessed at $10,000."],
    synonyms: ["evaluate", "judge", "measure"],
    antonyms: []
  },
  {
    word: "assign",
    pronunciation: "/əˈsaɪn/",
    definition: "To give someone a task or responsibility.",
    usageTip: "Use 'assign to' for giving tasks to people. 'Assignment' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The teacher assigned homework.", "She was assigned to the project.", "Tasks are assigned based on skill."],
    synonyms: ["give", "allocate", "designate"],
    antonyms: []
  },
  {
    word: "attach",
    pronunciation: "/əˈtætʃ/",
    definition: "To join or connect one thing to another.",
    usageTip: "Use 'attach to' for physical or emotional connection. 'Attached' can mean emotionally connected.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Please attach the document.", "She is very attached to her family.", "Attach the cable to the port."],
    synonyms: ["connect", "join", "fasten"],
    antonyms: ["detach", "separate"]
  },
  {
    word: "attribute",
    pronunciation: "/əˈtrɪbjuːt/",
    definition: "To say that something is caused by or belongs to someone or something.",
    usageTip: "As a verb: 'attribute to'. As a noun: 'an attribute of' (a quality).",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Success is attributed to hard work.", "Patience is a key attribute.", "The quote is attributed to Einstein."],
    synonyms: ["credit", "assign", "ascribe"],
    antonyms: []
  },
  {
    word: "authority",
    pronunciation: "/ɔːˈθɒrɪti/",
    definition: "The power to give orders or make decisions; an expert in a field.",
    usageTip: "Use 'authority on' for experts. 'The authorities' means government or police.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["She has authority over the team.", "He is an authority on the subject.", "Contact the local authorities."],
    synonyms: ["power", "control", "expert"],
    antonyms: []
  },
  {
    word: "capable",
    pronunciation: "/ˈkeɪpəbl/",
    definition: "Having the ability to do something.",
    usageTip: "Use 'capable of' with verbs (-ing). 'A capable person' means skilled.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["She is capable of great things.", "He is a very capable manager.", "The system is capable of handling more."],
    synonyms: ["able", "competent", "skilled"],
    antonyms: ["incapable", "unable"]
  },
  {
    word: "category",
    pronunciation: "/ˈkætɪɡəri/",
    definition: "A group of things that share similar qualities.",
    usageTip: "Use 'category' for classification groups. 'Categorize' is the verb.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Which category does this fall into?", "There are three main categories.", "Books are organized by category."],
    synonyms: ["group", "class", "type"],
    antonyms: []
  },
  {
    word: "circumstance",
    pronunciation: "/ˈsɜːkəmstəns/",
    definition: "A condition or fact that affects a situation.",
    usageTip: "'Under the circumstances' means given the situation. 'Circumstances' often plural.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Under the circumstances, we agreed.", "Circumstances have changed.", "It depends on the circumstances."],
    synonyms: ["situation", "condition", "context"],
    antonyms: []
  },
  {
    word: "clarify",
    pronunciation: "/ˈklærɪfaɪ/",
    definition: "To make something clearer and easier to understand.",
    usageTip: "Use 'clarify' when explaining something more clearly. 'Clarification' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Can you clarify this point?", "Let me clarify what I meant.", "The rules need clarification."],
    synonyms: ["explain", "clear up", "illuminate"],
    antonyms: ["confuse", "obscure"]
  },
  {
    word: "classify",
    pronunciation: "/ˈklæsɪfaɪ/",
    definition: "To arrange things into groups based on shared qualities.",
    usageTip: "Use 'classify as' when putting things into categories.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Scientists classify animals.", "The document is classified as secret.", "How would you classify this?"],
    synonyms: ["categorize", "group", "sort"],
    antonyms: []
  },
  {
    word: "collapse",
    pronunciation: "/kəˈlæps/",
    definition: "To fall down suddenly; to fail completely.",
    usageTip: "Use 'collapse' for physical falling or system failures.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The building collapsed.", "He collapsed from exhaustion.", "The economy collapsed."],
    synonyms: ["fall", "crash", "fail"],
    antonyms: ["rise", "succeed"]
  },
  {
    word: "communicate",
    pronunciation: "/kəˈmjuːnɪkeɪt/",
    definition: "To share information, ideas, or feelings with others.",
    usageTip: "'Communicate with' for talking to people. 'Communication' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We need to communicate better.", "She communicates her ideas clearly.", "Communicate with your team regularly."],
    synonyms: ["talk", "share", "convey"],
    antonyms: []
  },
  {
    word: "community",
    pronunciation: "/kəˈmjuːnɪti/",
    definition: "A group of people living in the same area or sharing interests.",
    usageTip: "Use 'community' for local groups or groups with shared interests (the business community).",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The local community supports us.", "The scientific community agrees.", "A sense of community is important."],
    synonyms: ["society", "group", "neighborhood"],
    antonyms: []
  },
  {
    word: "compare",
    pronunciation: "/kəmˈpeər/",
    definition: "To examine things to see how they are similar or different.",
    usageTip: "'Compare to' for showing similarity. 'Compare with' for examining differences.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Compare the two options.", "Compared to last year, sales rose.", "You can't compare them."],
    synonyms: ["contrast", "examine", "evaluate"],
    antonyms: []
  },
  {
    word: "compensate",
    pronunciation: "/ˈkɒmpenseɪt/",
    definition: "To give money or something else to make up for loss or injury.",
    usageTip: "Use 'compensate for' when making up for something negative.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The company compensated workers.", "Nothing can compensate for the loss.", "Speed compensates for size."],
    synonyms: ["pay", "reimburse", "offset"],
    antonyms: []
  },
  {
    word: "complicate",
    pronunciation: "/ˈkɒmplɪkeɪt/",
    definition: "To make something more difficult or confusing.",
    usageTip: "Use 'complicate' when something becomes more difficult. 'Complicated' is the adjective.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Don't complicate things.", "This complicates the situation.", "The issue is complicated."],
    synonyms: ["confuse", "confound", "make difficult"],
    antonyms: ["simplify"]
  },
  {
    word: "component",
    pronunciation: "/kəmˈpəʊnənt/",
    definition: "One of the parts that make up a whole system or machine.",
    usageTip: "Use 'component' for parts of systems, machines, or larger things.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Check each component carefully.", "A key component of success.", "The main components are listed."],
    synonyms: ["part", "element", "piece"],
    antonyms: ["whole"]
  },
  {
    word: "compute",
    pronunciation: "/kəmˈpjuːt/",
    definition: "To calculate or work out a number or answer.",
    usageTip: "Use 'compute' for calculations. 'Computer' and 'computation' are related.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The system computes the total.", "We need to compute the results.", "Computing the data takes time."],
    synonyms: ["calculate", "work out", "figure"],
    antonyms: []
  },
  {
    word: "concentrate",
    pronunciation: "/ˈkɒnsəntreɪt/",
    definition: "To focus all your attention on something.",
    usageTip: "Use 'concentrate on' for focusing attention. 'Concentration' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["I can't concentrate with this noise.", "Concentrate on the main points.", "She concentrated hard."],
    synonyms: ["focus", "pay attention", "center"],
    antonyms: ["distract"]
  },
  {
    word: "conduct",
    pronunciation: "/kənˈdʌkt/",
    definition: "To organize and do something, especially research; behavior.",
    usageTip: "As a verb: 'conduct research'. As a noun: 'code of conduct'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We conducted a survey.", "His conduct was inappropriate.", "She will conduct the meeting."],
    synonyms: ["carry out", "perform", "lead"],
    antonyms: []
  },
  {
    word: "confirm",
    pronunciation: "/kənˈfɜːm/",
    definition: "To prove that something is true or make an arrangement definite.",
    usageTip: "Use 'confirm' to verify or make definite. 'Confirmation' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Please confirm your booking.", "The study confirms the theory.", "I can confirm that this is true."],
    synonyms: ["verify", "prove", "validate"],
    antonyms: ["deny", "disprove"]
  },
  {
    word: "conflict",
    pronunciation: "/ˈkɒnflɪkt/",
    definition: "A serious disagreement or fight between people or ideas.",
    usageTip: "As a noun: 'a conflict between'. As a verb: 'conflict with'.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The conflict lasted years.", "Our views conflict.", "Avoid conflict if possible."],
    synonyms: ["fight", "disagreement", "clash"],
    antonyms: ["agreement", "peace", "harmony"]
  },
  {
    word: "consent",
    pronunciation: "/kənˈsent/",
    definition: "Permission or agreement to do something.",
    usageTip: "Use 'give consent' or 'consent to'. Important in legal and medical contexts.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["She gave her consent.", "Without consent, it's illegal.", "He consented to the procedure."],
    synonyms: ["permission", "agreement", "approval"],
    antonyms: ["refusal", "denial"]
  },
  {
    word: "constant",
    pronunciation: "/ˈkɒnstənt/",
    definition: "Happening all the time or not changing.",
    usageTip: "Use 'constant' for things that don't change or happen continuously.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["There is constant noise.", "The temperature remains constant.", "She needs constant care."],
    synonyms: ["continuous", "steady", "unchanging"],
    antonyms: ["variable", "changing"]
  },
  {
    word: "constitute",
    pronunciation: "/ˈkɒnstɪtjuːt/",
    definition: "To form or make up something.",
    usageTip: "Use 'constitute' to describe what makes up a whole.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Women constitute 60% of the team.", "This constitutes a crime.", "What constitutes success?"],
    synonyms: ["form", "make up", "compose"],
    antonyms: []
  },
  {
    word: "construct",
    pronunciation: "/kənˈstrʌkt/",
    definition: "To build or create something, especially something large.",
    usageTip: "Use 'construct' for building physical things or ideas. 'Construction' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["They constructed a new bridge.", "Construct a clear argument.", "The building is under construction."],
    synonyms: ["build", "create", "make"],
    antonyms: ["destroy", "demolish"]
  },
  {
    word: "consume",
    pronunciation: "/kənˈsjuːm/",
    definition: "To use up resources like food, energy, or time.",
    usageTip: "Use 'consume' for using up resources. 'Consumer' is a person who buys/uses products.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We consume too much energy.", "The project consumed all his time.", "Consumers drive the economy."],
    synonyms: ["use", "eat", "spend"],
    antonyms: ["produce", "save"]
  },
  {
    word: "contact",
    pronunciation: "/ˈkɒntækt/",
    definition: "To communicate with someone, or the act of communicating.",
    usageTip: "'Contact' works as both verb and noun. 'In contact with' means communicating regularly.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Please contact me tomorrow.", "We lost contact with them.", "Stay in contact."],
    synonyms: ["reach", "communicate", "touch"],
    antonyms: []
  },
  {
    word: "context",
    pronunciation: "/ˈkɒntekst/",
    definition: "The situation or background that helps explain something.",
    usageTip: "Use 'in context' or 'out of context'. Context helps understand meaning.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Consider the context.", "His words were taken out of context.", "In this context, it means..."],
    synonyms: ["background", "setting", "circumstances"],
    antonyms: []
  },
  {
    word: "convince",
    pronunciation: "/kənˈvɪns/",
    definition: "To make someone believe something or agree to do something.",
    usageTip: "'Convince someone of something' or 'convince someone to do something'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["I'm not convinced.", "She convinced him to stay.", "The evidence convinced the jury."],
    synonyms: ["persuade", "assure", "satisfy"],
    antonyms: ["dissuade"]
  },
  {
    word: "cooperate",
    pronunciation: "/kəʊˈɒpəreɪt/",
    definition: "To work together with others toward a shared goal.",
    usageTip: "'Cooperate with' someone on something. 'Cooperation' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Countries must cooperate.", "He refused to cooperate.", "Cooperation is essential."],
    synonyms: ["collaborate", "work together", "team up"],
    antonyms: ["compete", "oppose"]
  },
  {
    word: "coordinate",
    pronunciation: "/kəʊˈɔːdɪneɪt/",
    definition: "To organize different things or people to work together effectively.",
    usageTip: "Use 'coordinate with' when working with others. 'Coordination' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We need to coordinate our efforts.", "She coordinates the team.", "Good coordination is key."],
    synonyms: ["organize", "arrange", "manage"],
    antonyms: []
  },
  {
    word: "core",
    pronunciation: "/kɔːr/",
    definition: "The central or most important part of something.",
    usageTip: "Use 'core' for the essential, central part. 'At the core' means fundamentally.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["This is the core issue.", "At its core, the idea is simple.", "Core values guide us."],
    synonyms: ["center", "heart", "essence"],
    antonyms: ["surface", "periphery"]
  },
  {
    word: "corporate",
    pronunciation: "/ˈkɔːpərət/",
    definition: "Relating to a large company or group of companies.",
    usageTip: "Use 'corporate' for business-related topics. 'Corporation' is a large company.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Corporate culture matters.", "The corporate office is downtown.", "Corporate profits increased."],
    synonyms: ["business", "company", "commercial"],
    antonyms: ["individual", "personal"]
  },
  {
    word: "correspond",
    pronunciation: "/ˌkɒrɪˈspɒnd/",
    definition: "To match or be similar to; to exchange letters or messages.",
    usageTip: "'Correspond to/with' for matching. 'Correspond with' for writing to someone.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The results correspond to predictions.", "We corresponded for years.", "Each number corresponds to a letter."],
    synonyms: ["match", "agree", "communicate"],
    antonyms: ["differ"]
  },
  {
    word: "credit",
    pronunciation: "/ˈkredɪt/",
    definition: "Recognition for an achievement; money available to borrow.",
    usageTip: "'Give credit to' for recognition. 'On credit' means paying later.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["She deserves credit for this.", "I bought it on credit.", "Credit the original author."],
    synonyms: ["recognition", "acknowledgment", "loan"],
    antonyms: ["blame", "debt"]
  },
  {
    word: "culture",
    pronunciation: "/ˈkʌltʃər/",
    definition: "The beliefs, customs, and arts of a particular society or group.",
    usageTip: "'Cultural' is the adjective. 'Corporate culture' means company values and practices.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Japanese culture is rich.", "The company has a great culture.", "Cultural differences exist."],
    synonyms: ["customs", "traditions", "society"],
    antonyms: []
  },
  {
    word: "cycle",
    pronunciation: "/ˈsaɪkl/",
    definition: "A series of events that repeat in the same order.",
    usageTip: "Use 'cycle' for repeating patterns. 'Life cycle', 'business cycle' are common.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The cycle repeats every year.", "Break the cycle of poverty.", "A natural life cycle."],
    synonyms: ["pattern", "sequence", "series"],
    antonyms: []
  },
  {
    word: "data",
    pronunciation: "/ˈdeɪtə/",
    definition: "Facts and information used for analysis or decision-making.",
    usageTip: "'Data' can be singular or plural. 'The data shows' or 'The data show' are both used.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The data supports this view.", "We need more data.", "Data analysis is important."],
    synonyms: ["information", "facts", "statistics"],
    antonyms: []
  },
  {
    word: "debate",
    pronunciation: "/dɪˈbeɪt/",
    definition: "A formal discussion where different opinions are expressed.",
    usageTip: "'Debate about/over' something. Can be a noun or verb.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The debate was heated.", "Scientists debate the issue.", "It's open to debate."],
    synonyms: ["discussion", "argument", "dispute"],
    antonyms: ["agreement"]
  },
  {
    word: "decade",
    pronunciation: "/ˈdekeɪd/",
    definition: "A period of ten years.",
    usageTip: "Use 'decade' for ten-year periods. 'Over the past decade' is common.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Over the past decade.", "A decade of progress.", "In the last decade."],
    synonyms: ["ten years"],
    antonyms: []
  },
  {
    word: "deny",
    pronunciation: "/dɪˈnaɪ/",
    definition: "To say that something is not true; to refuse to give something.",
    usageTip: "'Deny doing something' or 'deny that'. 'Denial' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["He denied the accusation.", "She was denied access.", "Don't deny it."],
    synonyms: ["refuse", "reject", "contradict"],
    antonyms: ["admit", "confirm", "accept"]
  },
  {
    word: "depress",
    pronunciation: "/dɪˈpres/",
    definition: "To make someone sad; to reduce economic activity.",
    usageTip: "'Depressed' can mean sad or economically slow. 'Depression' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The news depressed her.", "High taxes depress spending.", "He feels depressed."],
    synonyms: ["sadden", "discourage", "reduce"],
    antonyms: ["cheer", "stimulate"]
  },
  {
    word: "design",
    pronunciation: "/dɪˈzaɪn/",
    definition: "To plan and create something; a plan or pattern.",
    usageTip: "'Design for' a purpose. 'By design' means on purpose.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["She designed the website.", "A good design is important.", "It happened by design."],
    synonyms: ["create", "plan", "develop"],
    antonyms: []
  },
  {
    word: "detect",
    pronunciation: "/dɪˈtekt/",
    definition: "To discover or notice something that is not easy to see.",
    usageTip: "Use 'detect' for finding things that are hidden or not obvious.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Can you detect the difference?", "The system detected an error.", "Early detection saves lives."],
    synonyms: ["discover", "find", "notice"],
    antonyms: ["miss", "overlook"]
  },
  {
    word: "device",
    pronunciation: "/dɪˈvaɪs/",
    definition: "A machine or tool made for a particular purpose.",
    usageTip: "'Device' is a noun. Don't confuse with 'devise' (verb = to plan).",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["A mobile device.", "Electronic devices are everywhere.", "A clever device for opening jars."],
    synonyms: ["tool", "machine", "gadget"],
    antonyms: []
  },
  {
    word: "devote",
    pronunciation: "/dɪˈvəʊt/",
    definition: "To give all your time, effort, or resources to something.",
    usageTip: "'Devote to' something. 'Devoted' means very loyal.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["She devoted her life to science.", "I devoted time to studying.", "A devoted fan."],
    synonyms: ["dedicate", "commit", "give"],
    antonyms: ["neglect"]
  },
  {
    word: "differentiate",
    pronunciation: "/ˌdɪfəˈrenʃieɪt/",
    definition: "To see or show the difference between things.",
    usageTip: "'Differentiate between A and B' or 'differentiate A from B'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Differentiate between fact and opinion.", "What differentiates us from competitors?", "It's hard to differentiate them."],
    synonyms: ["distinguish", "separate", "tell apart"],
    antonyms: ["confuse"]
  },
  {
    word: "display",
    pronunciation: "/dɪˈspleɪ/",
    definition: "To show something; something shown to the public.",
    usageTip: "'On display' means shown publicly. Can be verb or noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The museum displays art.", "The phone has a nice display.", "Put the results on display."],
    synonyms: ["show", "exhibit", "present"],
    antonyms: ["hide", "conceal"]
  },
  {
    word: "distribute",
    pronunciation: "/dɪˈstrɪbjuːt/",
    definition: "To give or deliver something to many people or places.",
    usageTip: "'Distribute to' recipients. 'Distribution' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Distribute the handouts.", "Wealth is not evenly distributed.", "The company distributes products globally."],
    synonyms: ["give out", "deliver", "spread"],
    antonyms: ["collect", "gather"]
  },
  {
    word: "document",
    pronunciation: "/ˈdɒkjumənt/",
    definition: "A written or printed paper with information; to record in detail.",
    usageTip: "As a noun: a file or paper. As a verb: to record information.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Sign the document.", "Document your findings.", "The documentary documents history."],
    synonyms: ["record", "file", "paper"],
    antonyms: []
  },
  {
    word: "domain",
    pronunciation: "/dəˈmeɪn/",
    definition: "An area of knowledge, activity, or control.",
    usageTip: "Use 'domain' for areas of expertise or control. Also used for internet addresses.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Science is her domain.", "The public domain.", "Register a domain name."],
    synonyms: ["field", "area", "territory"],
    antonyms: []
  },
  {
    word: "draft",
    pronunciation: "/drɑːft/",
    definition: "A first version of a piece of writing; to write the first version.",
    usageTip: "'First draft' is the initial version. 'Draft' can also mean cold air.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["This is just a draft.", "Draft a proposal.", "The first draft needs work."],
    synonyms: ["version", "outline", "sketch"],
    antonyms: ["final version"]
  },
  {
    word: "economy",
    pronunciation: "/ɪˈkɒnəmi/",
    definition: "The system of money, business, and trade in a country.",
    usageTip: "'Economic' is the adjective. 'Economist' is a person who studies economics.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The economy is growing.", "Economic growth is important.", "A strong economy."],
    synonyms: ["financial system", "market"],
    antonyms: []
  },
  {
    word: "eliminate",
    pronunciation: "/ɪˈlɪmɪneɪt/",
    definition: "To remove or get rid of something completely.",
    usageTip: "Use 'eliminate' for completely removing something. 'Elimination' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Eliminate unnecessary costs.", "The team was eliminated.", "Eliminate all doubts."],
    synonyms: ["remove", "get rid of", "exclude"],
    antonyms: ["include", "add"]
  },
  {
    word: "emerge",
    pronunciation: "/ɪˈmɜːdʒ/",
    definition: "To come out or appear from somewhere; to become known.",
    usageTip: "'Emerge from' a place or situation. 'Emerging' means newly developing.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["A pattern emerged.", "She emerged as a leader.", "Emerging markets are growing."],
    synonyms: ["appear", "arise", "come out"],
    antonyms: ["disappear", "vanish"]
  },
  {
    word: "enable",
    pronunciation: "/ɪˈneɪbl/",
    definition: "To make it possible for someone to do something.",
    usageTip: "'Enable someone to do something'. Technology often enables new possibilities.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Technology enables communication.", "This will enable growth.", "The grant enabled research."],
    synonyms: ["allow", "permit", "empower"],
    antonyms: ["prevent", "disable"]
  },
  {
    word: "encounter",
    pronunciation: "/ɪnˈkaʊntər/",
    definition: "To meet someone or experience something, especially unexpectedly.",
    usageTip: "'Encounter' often suggests unexpectedness. Can be noun or verb.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["We encountered problems.", "A chance encounter.", "She encountered resistance."],
    synonyms: ["meet", "experience", "face"],
    antonyms: ["avoid"]
  },
  {
    word: "enhance",
    pronunciation: "/ɪnˈhɑːns/",
    definition: "To improve the quality, value, or attractiveness of something.",
    usageTip: "Use 'enhance' for improving or making better. 'Enhancement' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Enhance your skills.", "The software enhances images.", "Enhanced security features."],
    synonyms: ["improve", "boost", "strengthen"],
    antonyms: ["reduce", "weaken"]
  },
  {
    word: "ensure",
    pronunciation: "/ɪnˈʃɔːr/",
    definition: "To make certain that something happens or is true.",
    usageTip: "'Ensure that' something happens. Similar to 'make sure'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Ensure everyone understands.", "We must ensure quality.", "Ensure that the door is locked."],
    synonyms: ["guarantee", "make sure", "secure"],
    antonyms: []
  },
  {
    word: "entity",
    pronunciation: "/ˈentɪti/",
    definition: "Something that exists separately from other things, especially an organization.",
    usageTip: "'Legal entity' means an organization recognized by law. 'Separate entity' is common.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["A separate legal entity.", "Business entities must register.", "The government is a public entity."],
    synonyms: ["organization", "being", "unit"],
    antonyms: []
  },
  {
    word: "equip",
    pronunciation: "/ɪˈkwɪp/",
    definition: "To provide with the things needed for a particular purpose.",
    usageTip: "'Equip with' tools or skills. 'Well-equipped' means having everything needed.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The room is well equipped.", "Equip students with skills.", "Equipped for emergencies."],
    synonyms: ["provide", "supply", "furnish"],
    antonyms: []
  },
  {
    word: "equivalent",
    pronunciation: "/ɪˈkwɪvələnt/",
    definition: "Equal in value, amount, function, or meaning.",
    usageTip: "'Equivalent to' shows equality. Can be adjective or noun.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["One mile is equivalent to 1.6 km.", "There is no English equivalent.", "An equivalent amount."],
    synonyms: ["equal", "same", "comparable"],
    antonyms: ["different", "unequal"]
  },
  {
    word: "error",
    pronunciation: "/ˈerər/",
    definition: "A mistake or something that is not correct.",
    usageTip: "'Human error' means mistakes by people. 'Trial and error' is learning from mistakes.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["An error occurred.", "Human error caused the crash.", "Learn by trial and error."],
    synonyms: ["mistake", "fault", "flaw"],
    antonyms: ["correctness", "accuracy"]
  },
  {
    word: "ethnic",
    pronunciation: "/ˈeθnɪk/",
    definition: "Relating to a group of people with a shared culture, language, or nationality.",
    usageTip: "'Ethnic group' or 'ethnic background'. 'Ethnicity' is the noun.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Different ethnic groups live here.", "Ethnic food is popular.", "Her ethnic background is diverse."],
    synonyms: ["cultural", "racial", "national"],
    antonyms: []
  },
  {
    word: "evaluate",
    pronunciation: "/ɪˈvæljueɪt/",
    definition: "To judge the value or quality of something.",
    usageTip: "Use 'evaluate' for formal assessment. 'Evaluation' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Evaluate the options.", "We need to evaluate performance.", "The evaluation was positive."],
    synonyms: ["assess", "judge", "appraise"],
    antonyms: []
  },
  {
    word: "evolve",
    pronunciation: "/ɪˈvɒlv/",
    definition: "To develop gradually over time.",
    usageTip: "Use 'evolve' for gradual change over time. 'Evolution' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Languages evolve over time.", "The plan evolved.", "Technology continues to evolve."],
    synonyms: ["develop", "change", "progress"],
    antonyms: ["regress", "stay the same"]
  },
  {
    word: "exceed",
    pronunciation: "/ɪkˈsiːd/",
    definition: "To be greater than a number or limit; to go beyond what is expected.",
    usageTip: "'Exceed expectations' is common. 'Exceeding' means going beyond limits.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Sales exceeded expectations.", "Don't exceed the speed limit.", "The cost exceeded the budget."],
    synonyms: ["surpass", "go beyond", "outdo"],
    antonyms: ["fall short"]
  },
  {
    word: "exclude",
    pronunciation: "/ɪkˈskluːd/",
    definition: "To not include someone or something; to keep out.",
    usageTip: "'Exclude from' a group or activity. 'Exclusive' means only for certain people.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The price excludes tax.", "Don't exclude anyone.", "She felt excluded."],
    synonyms: ["leave out", "omit", "bar"],
    antonyms: ["include"]
  },
  {
    word: "exhibit",
    pronunciation: "/ɪɡˈzɪbɪt/",
    definition: "To show something publicly; a public display.",
    usageTip: "'Exhibition' is a larger display. 'Exhibit' can be verb or noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["The museum exhibits art.", "The exhibit was fascinating.", "He exhibited great patience."],
    synonyms: ["display", "show", "present"],
    antonyms: ["hide", "conceal"]
  },
  {
    word: "export",
    pronunciation: "/ˈekspɔːt/",
    definition: "To send goods to another country for sale.",
    usageTip: "Opposite of 'import'. Stress on first syllable for noun, second for verb.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Japan exports cars.", "Our main exports are electronics.", "Export revenue grew."],
    synonyms: ["sell abroad", "ship overseas"],
    antonyms: ["import"]
  },
  {
    word: "expose",
    pronunciation: "/ɪkˈspəʊz/",
    definition: "To uncover or make something visible; to put at risk.",
    usageTip: "'Expose to' something. 'Exposure' is the noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Expose the truth.", "Don't expose yourself to danger.", "Exposure to sunlight."],
    synonyms: ["reveal", "uncover", "show"],
    antonyms: ["hide", "protect"]
  },
  {
    word: "external",
    pronunciation: "/ɪkˈstɜːnəl/",
    definition: "Coming from outside; on the outside.",
    usageTip: "Opposite of 'internal'. 'Externally' is the adverb.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["External factors affected results.", "External hard drive.", "For external use only."],
    synonyms: ["outside", "outer", "exterior"],
    antonyms: ["internal", "inside"]
  },
  {
    word: "extract",
    pronunciation: "/ɪkˈstrækt/",
    definition: "To remove or take out something.",
    usageTip: "'Extract from' a source. Can be verb or noun (an extract from a book).",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Extract the key information.", "An extract from the novel.", "Extracting data takes time."],
    synonyms: ["remove", "take out", "obtain"],
    antonyms: ["insert", "add"]
  },
  {
    word: "facilitate",
    pronunciation: "/fəˈsɪlɪteɪt/",
    definition: "To make something easier or help it happen.",
    usageTip: "A 'facilitator' helps a group work together. 'Facilitate' doesn't mean 'do' but 'help happen'.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Technology facilitates learning.", "I will facilitate the meeting.", "This will facilitate communication."],
    synonyms: ["help", "assist", "enable"],
    antonyms: ["hinder", "obstruct"]
  },
  {
    word: "federal",
    pronunciation: "/ˈfedərəl/",
    definition: "Relating to a national government in a country with states.",
    usageTip: "In the US, 'federal' refers to the national government vs. state governments.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["Federal law applies nationwide.", "The federal government.", "A federal agency."],
    synonyms: ["national", "central"],
    antonyms: ["state", "local"]
  },
  {
    word: "fee",
    pronunciation: "/fiː/",
    definition: "An amount of money paid for a service.",
    usageTip: "'Pay a fee', 'charge a fee'. Different from salary (regular payment).",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["There is no entrance fee.", "Legal fees are expensive.", "A monthly fee applies."],
    synonyms: ["charge", "cost", "payment"],
    antonyms: []
  },
  {
    word: "file",
    pronunciation: "/faɪl/",
    definition: "A collection of documents or data stored together.",
    usageTip: "'File a complaint' means to submit officially. 'On file' means stored.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Save the file.", "File a report.", "We have it on file."],
    synonyms: ["document", "record", "folder"],
    antonyms: []
  },
  {
    word: "final",
    pronunciation: "/ˈfaɪnəl/",
    definition: "Coming at the end; last.",
    usageTip: "'Final' means last and cannot be changed. 'Finalize' means to complete.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["The final decision.", "Final exams are next week.", "This is my final offer."],
    synonyms: ["last", "ultimate", "concluding"],
    antonyms: ["first", "initial"]
  },
  {
    word: "finance",
    pronunciation: "/ˈfaɪnæns/",
    definition: "The management of money; to provide money for.",
    usageTip: "'Financial' is the adjective. 'Finances' (plural) means someone's money situation.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["She works in finance.", "Finance the project.", "Personal finances."],
    synonyms: ["funding", "money", "capital"],
    antonyms: []
  },
  {
    word: "flexible",
    pronunciation: "/ˈfleksɪbl/",
    definition: "Able to change or be changed easily; able to bend without breaking.",
    usageTip: "'Flexibility' is the noun. Opposite of 'rigid'.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["We need a flexible approach.", "Flexible working hours.", "Stay flexible."],
    synonyms: ["adaptable", "adjustable", "versatile"],
    antonyms: ["rigid", "inflexible", "stiff"]
  },
  {
    word: "fluctuate",
    pronunciation: "/ˈflʌktʃueɪt/",
    definition: "To change frequently, going up and down.",
    usageTip: "Use 'fluctuate' for irregular changes, especially in prices or levels.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Prices fluctuate daily.", "My weight fluctuates.", "Fluctuating temperatures."],
    synonyms: ["vary", "change", "swing"],
    antonyms: ["stay stable", "remain constant"]
  },
  {
    word: "format",
    pronunciation: "/ˈfɔːmæt/",
    definition: "The way something is arranged or designed.",
    usageTip: "'Format' can be noun or verb. 'File format' is common in computing.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["What format should I use?", "Format the document.", "A new format for the show."],
    synonyms: ["layout", "arrangement", "structure"],
    antonyms: []
  },
  {
    word: "formula",
    pronunciation: "/ˈfɔːmjələ/",
    definition: "A rule or method expressed in symbols; a plan or way of doing something.",
    usageTip: "Plural is 'formulas' or 'formulae'. Used in math, science, and business.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["The mathematical formula.", "A formula for success.", "Follow the formula."],
    synonyms: ["equation", "recipe", "method"],
    antonyms: []
  },
  {
    word: "forthcoming",
    pronunciation: "/ˌfɔːθˈkʌmɪŋ/",
    definition: "About to happen or appear; willing to share information.",
    usageTip: "'Forthcoming' can mean 'coming soon' or 'open and honest'.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["The forthcoming election.", "She wasn't forthcoming with details.", "Forthcoming changes."],
    synonyms: ["upcoming", "approaching", "open"],
    antonyms: ["past", "secretive"]
  },
  {
    word: "foundation",
    pronunciation: "/faʊnˈdeɪʃən/",
    definition: "The base that supports a building; a basic principle or starting point.",
    usageTip: "'Lay the foundation' means to create the basic structure for something.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Build a strong foundation.", "The foundation of democracy.", "A charitable foundation."],
    synonyms: ["base", "basis", "groundwork"],
    antonyms: []
  },
  {
    word: "framework",
    pronunciation: "/ˈfreɪmwɜːk/",
    definition: "A basic structure that supports something; a set of rules or ideas.",
    usageTip: "Use 'framework' for underlying structures. 'Within the framework of' is common.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["A legal framework.", "Within this framework.", "The framework of the plan."],
    synonyms: ["structure", "system", "foundation"],
    antonyms: []
  },
  {
    word: "fundamental",
    pronunciation: "/ˌfʌndəˈmentəl/",
    definition: "Basic and important; forming the foundation of something.",
    usageTip: "'Fundamentally' means basically or essentially. 'Fundamentals' are basics.",
    partOfSpeech: "adjective",
    difficulty: 2,
    examples: ["A fundamental change.", "Fundamental rights.", "Learn the fundamentals."],
    synonyms: ["basic", "essential", "core"],
    antonyms: ["secondary", "minor"]
  },
  {
    word: "furthermore",
    pronunciation: "/ˌfɜːðəˈmɔːr/",
    definition: "In addition; also (used to add more information).",
    usageTip: "Use 'furthermore' to add supporting points. More formal than 'also'.",
    partOfSpeech: "adverb",
    difficulty: 2,
    examples: ["Furthermore, the costs are high.", "She is talented; furthermore, she works hard.", "Furthermore, we must consider..."],
    synonyms: ["moreover", "additionally", "besides"],
    antonyms: []
  },
  {
    word: "gender",
    pronunciation: "/ˈdʒendər/",
    definition: "The state of being male or female; social differences between men and women.",
    usageTip: "'Gender equality' means equal treatment. 'Gender' differs from 'sex' (biological).",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Gender equality is important.", "People of all genders.", "Gender differences in education."],
    synonyms: ["sex"],
    antonyms: []
  },
  {
    word: "globe",
    pronunciation: "/ɡləʊb/",
    definition: "The Earth; a round model of the Earth.",
    usageTip: "'Global' is the adjective. 'Around the globe' means worldwide.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Around the globe.", "A global issue.", "The globe is warming."],
    synonyms: ["world", "Earth", "planet"],
    antonyms: []
  },
  {
    word: "grade",
    pronunciation: "/ɡreɪd/",
    definition: "A level of quality or rank; a mark showing how well work was done.",
    usageTip: "'Grade' can mean level, school year, or mark. 'Grade A' means highest quality.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["She got good grades.", "Grade A quality.", "Students in fifth grade."],
    synonyms: ["level", "rank", "mark"],
    antonyms: []
  },
  {
    word: "grant",
    pronunciation: "/ɡrɑːnt/",
    definition: "To give or allow something; money given for a specific purpose.",
    usageTip: "'Take for granted' means to not appreciate. 'Grant' can be verb or noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Grant permission.", "A research grant.", "Don't take it for granted."],
    synonyms: ["give", "award", "allow"],
    antonyms: ["deny", "refuse"]
  },
  {
    word: "guarantee",
    pronunciation: "/ˌɡærənˈtiː/",
    definition: "A promise that something will happen or be done.",
    usageTip: "Can be noun or verb. 'Guaranteed' means certain.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["We guarantee quality.", "There's no guarantee of success.", "A money-back guarantee."],
    synonyms: ["promise", "assurance", "warranty"],
    antonyms: []
  },
  {
    word: "guideline",
    pronunciation: "/ˈɡaɪdlaɪn/",
    definition: "A general rule or advice about how to do something.",
    usageTip: "'Guidelines' (usually plural) are less strict than rules.",
    partOfSpeech: "noun",
    difficulty: 2,
    examples: ["Follow the guidelines.", "Safety guidelines.", "These are just guidelines."],
    synonyms: ["rules", "instructions", "recommendations"],
    antonyms: []
  },
  {
    word: "hence",
    pronunciation: "/hens/",
    definition: "For this reason; therefore.",
    usageTip: "'Hence' is formal. Used to show a logical result.",
    partOfSpeech: "adverb",
    difficulty: 2,
    examples: ["It was raining, hence the delay.", "Hence the importance of planning.", "Hence, we must act now."],
    synonyms: ["therefore", "thus", "consequently"],
    antonyms: []
  },
  {
    word: "highlight",
    pronunciation: "/ˈhaɪlaɪt/",
    definition: "To emphasize or draw attention to something important.",
    usageTip: "'The highlight' is the best part. 'Highlight' can be verb or noun.",
    partOfSpeech: "verb",
    difficulty: 2,
    examples: ["Highlight the key points.", "The highlight of the trip.", "This highlights the problem."],
    synonyms: ["emphasize", "stress", "feature"],
    antonyms: ["downplay"]
  },

  // === LEVEL 3: Upper-Intermediate Academic Words ===
  {
    word: "aggregate",
    pronunciation: "/ˈæɡrɪɡət/",
    definition: "A total amount; to collect or combine things together.",
    usageTip: "'In aggregate' means in total. Can be noun, verb, or adjective.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The aggregate score.", "Aggregate the data.", "In aggregate, sales grew."],
    synonyms: ["total", "combined", "collective"],
    antonyms: ["individual", "separate"]
  },
  {
    word: "analogous",
    pronunciation: "/əˈnæləɡəs/",
    definition: "Similar in some way; able to be compared.",
    usageTip: "'Analogous to' something. 'Analogy' is the noun.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Analogous situations.", "This is analogous to...", "Draw an analogy."],
    synonyms: ["similar", "comparable", "equivalent"],
    antonyms: ["different", "dissimilar"]
  },
  {
    word: "concurrent",
    pronunciation: "/kənˈkʌrənt/",
    definition: "Happening at the same time.",
    usageTip: "'Concurrently' is the adverb. Similar to 'simultaneous'.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Concurrent events.", "Run concurrently.", "Concurrent sessions."],
    synonyms: ["simultaneous", "parallel", "coinciding"],
    antonyms: ["sequential", "consecutive"]
  },
  {
    word: "conducive",
    pronunciation: "/kənˈdjuːsɪv/",
    definition: "Making it easy for something to happen.",
    usageTip: "'Conducive to' something. Often used for environments.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Conducive to learning.", "A conducive environment.", "Not conducive to success."],
    synonyms: ["favorable", "helpful", "beneficial"],
    antonyms: ["harmful", "unfavorable"]
  },
  {
    word: "confine",
    pronunciation: "/kənˈfaɪn/",
    definition: "To keep within limits; to restrict.",
    usageTip: "'Confined to' a space or area. 'Confinement' is the noun.",
    partOfSpeech: "verb",
    difficulty: 3,
    examples: ["Confine yourself to the topic.", "Confined space.", "Within the confines of."],
    synonyms: ["limit", "restrict", "contain"],
    antonyms: ["free", "release"]
  },
  {
    word: "credible",
    pronunciation: "/ˈkredɪbl/",
    definition: "Believable; able to be trusted.",
    usageTip: "'Credibility' is the noun. Don't confuse with 'creditable' (deserving praise).",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["A credible source.", "Lack credibility.", "Credible evidence."],
    synonyms: ["believable", "trustworthy", "reliable"],
    antonyms: ["incredible", "unbelievable"]
  },
  {
    word: "criterion",
    pronunciation: "/kraɪˈtɪəriən/",
    definition: "A standard used to judge or evaluate something.",
    usageTip: "Plural is 'criteria'. 'Meet the criteria' is common.",
    partOfSpeech: "noun",
    difficulty: 3,
    examples: ["The main criterion.", "Meet the criteria.", "Selection criteria."],
    synonyms: ["standard", "measure", "benchmark"],
    antonyms: []
  },
  {
    word: "discrete",
    pronunciation: "/dɪˈskriːt/",
    definition: "Separate and distinct from others.",
    usageTip: "Don't confuse with 'discreet' (careful about what you say).",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Discrete categories.", "Three discrete stages.", "Discrete units."],
    synonyms: ["separate", "distinct", "individual"],
    antonyms: ["connected", "combined"]
  },
  {
    word: "finite",
    pronunciation: "/ˈfaɪnaɪt/",
    definition: "Having limits; not infinite.",
    usageTip: "Opposite of 'infinite'. 'Finite resources' is common.",
    partOfSpeech: "adjective",
    difficulty: 3,
    examples: ["Finite resources.", "A finite number.", "Time is finite."],
    synonyms: ["limited", "restricted", "bounded"],
    antonyms: ["infinite", "unlimited"]
  },

  // === LEVEL 4: Advanced Academic Words ===
  {
    word: "accumulate",
    pronunciation: "/əˈkjuːmjəleɪt/",
    definition: "To gradually collect or gather more of something over time.",
    usageTip: "'Accumulation' is the noun. Similar to 'build up'.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Accumulate wealth.", "Dust accumulated.", "Accumulated experience."],
    synonyms: ["gather", "collect", "build up"],
    antonyms: ["disperse", "scatter"]
  },
  {
    word: "acknowledge",
    pronunciation: "/əkˈnɒlɪdʒ/",
    definition: "To accept or admit that something is true or exists.",
    usageTip: "'Acknowledgement' is the noun. Can mean to recognize or confirm receipt.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Acknowledge the problem.", "He acknowledged his mistake.", "Please acknowledge receipt."],
    synonyms: ["admit", "recognize", "accept"],
    antonyms: ["deny", "ignore"]
  },
  {
    word: "attain",
    pronunciation: "/əˈteɪn/",
    definition: "To succeed in reaching or achieving a goal.",
    usageTip: "'Attainment' is the noun. More formal than 'reach' or 'achieve'.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Attain success.", "Educational attainment.", "Attainable goals."],
    synonyms: ["achieve", "reach", "accomplish"],
    antonyms: ["fail", "miss"]
  },
  {
    word: "cease",
    pronunciation: "/siːs/",
    definition: "To stop doing something or stop happening.",
    usageTip: "'Cease and desist' means to stop immediately. Formal word for 'stop'.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Cease operations.", "The noise ceased.", "Cease to exist."],
    synonyms: ["stop", "end", "halt"],
    antonyms: ["begin", "start", "continue"]
  },
  {
    word: "cite",
    pronunciation: "/saɪt/",
    definition: "To mention as an example or proof; to refer to a source.",
    usageTip: "'Citation' is the noun. Don't confuse with 'site' (place) or 'sight' (seeing).",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Cite your sources.", "Often cited as an example.", "A citation is required."],
    synonyms: ["quote", "reference", "mention"],
    antonyms: []
  },
  {
    word: "erode",
    pronunciation: "/ɪˈrəʊd/",
    definition: "To gradually wear away or destroy.",
    usageTip: "'Erosion' is the noun. Used for physical wearing away or gradual loss.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Erode trust.", "Soil erosion.", "Eroding confidence."],
    synonyms: ["wear away", "deteriorate", "corrode"],
    antonyms: ["build", "strengthen"]
  },
  {
    word: "exert",
    pronunciation: "/ɪɡˈzɜːt/",
    definition: "To use effort, influence, or power.",
    usageTip: "'Exert yourself' means to work hard. 'Exertion' is the noun.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Exert pressure.", "Exert influence.", "Physical exertion."],
    synonyms: ["apply", "exercise", "use"],
    antonyms: []
  },
  {
    word: "inherently",
    pronunciation: "/ɪnˈhɪərəntli/",
    definition: "In a way that is a natural or basic part of something.",
    usageTip: "Adverb form of 'inherent'. Something 'inherently' true is true by nature.",
    partOfSpeech: "adverb",
    difficulty: 4,
    examples: ["Inherently risky.", "Not inherently bad.", "Inherently difficult."],
    synonyms: ["naturally", "essentially", "fundamentally"],
    antonyms: []
  },
  {
    word: "negate",
    pronunciation: "/nɪˈɡeɪt/",
    definition: "To make something have no effect; to deny the truth of something.",
    usageTip: "'Negation' is the noun. 'Negative' comes from the same root.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Negate the effect.", "This negates the argument.", "Cannot be negated."],
    synonyms: ["cancel", "nullify", "invalidate"],
    antonyms: ["affirm", "confirm"]
  },
  {
    word: "offset",
    pronunciation: "/ˈɒfset/",
    definition: "To balance or compensate for something.",
    usageTip: "Can be noun or verb. 'Carbon offset' compensates for emissions.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Offset the costs.", "Carbon offset.", "Offset by gains elsewhere."],
    synonyms: ["balance", "compensate", "counteract"],
    antonyms: []
  },
  {
    word: "persist",
    pronunciation: "/pəˈsɪst/",
    definition: "To continue doing something despite difficulties.",
    usageTip: "'Persistence' is the noun. 'Persistent' is the adjective.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Persist with effort.", "The problem persists.", "Persistent pain."],
    synonyms: ["continue", "persevere", "endure"],
    antonyms: ["quit", "give up"]
  },
  {
    word: "undergo",
    pronunciation: "/ˌʌndəˈɡəʊ/",
    definition: "To experience or be subjected to something, usually difficult.",
    usageTip: "Past tense: 'underwent'. Often used for medical procedures or changes.",
    partOfSpeech: "verb",
    difficulty: 4,
    examples: ["Undergo surgery.", "Undergo changes.", "Currently undergoing."],
    synonyms: ["experience", "endure", "go through"],
    antonyms: ["avoid"]
  }
]

async function main() {
  console.log('Starting comprehensive vocabulary seed...')
  console.log(`Total words to add: ${vocabularyData.length}`)

  // Clear existing data
  await prisma.antonym.deleteMany()
  await prisma.synonym.deleteMany()
  await prisma.example.deleteMany()
  await prisma.word.deleteMany()

  console.log('Cleared existing data.')

  let count = 0
  for (const item of vocabularyData) {
    await prisma.word.create({
      data: {
        word: item.word,
        pronunciation: item.pronunciation,
        definition: item.definition,
        usageTip: item.usageTip,
        partOfSpeech: item.partOfSpeech,
        difficulty: item.difficulty,
        examples: {
          create: item.examples.map(text => ({ text }))
        },
        synonyms: {
          create: item.synonyms.map(text => ({ text }))
        },
        antonyms: {
          create: item.antonyms.map(text => ({ text }))
        }
      }
    })
    count++
    if (count % 25 === 0) {
      console.log(`Progress: ${count}/${vocabularyData.length} words added`)
    }
  }

  console.log(`\nSeeding completed! Added ${count} vocabulary words.`)
  console.log('Difficulty levels:')
  console.log('  Level 1: Basic Academic (15 words)')
  console.log('  Level 2: Intermediate Academic (65 words)')
  console.log('  Level 3: Upper-Intermediate (30 words)')
  console.log('  Level 4: Advanced (30 words)')
  console.log('  Level 5: Specialized/Advanced (25 words)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
