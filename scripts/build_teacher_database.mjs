import fs from "node:fs/promises";
import path from "node:path";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const teachers = [
  {
    teacherId: "gaurav-sen",
    teacherName: "Gaurav Sen",
    channel: "The Engineering Glossary",
    domain: "Core technical concepts for builders",
    summary: "Explains LLM mechanics in engineering terms so developers can reason about tokens, vectors, attention, and context systems.",
    teachingStyle: "Builder-first, terminology heavy, practical systems thinking",
    signatureTopics: "LLMs, tokenization, vectors, attention, context engineering, RAG, vector databases",
    teacherVoice: "If you are building applications, learn the language of AI so deeper subjects become easier to understand.",
    realWorldImpact: "Great for developers who need to talk clearly about model internals and context pipelines.",
    transcriptFile: "Gaurav Sen transcript.txt"
  },
  {
    teacherId: "edureka-expert",
    teacherName: "Edureka Expert",
    channel: "Edureka",
    domain: "AI and ML fundamentals",
    summary: "Builds the hierarchy from AI to ML to deep learning, then connects classic paradigms to neural sequence models.",
    teachingStyle: "Structured, beginner-friendly, concept ladder from basics to advanced",
    signatureTopics: "AI vs ML, supervised learning, unsupervised learning, reinforcement learning, NLP preprocessing, LSTMs",
    teacherVoice: "AI is about making computers smarter and more helpful in everyday life.",
    realWorldImpact: "Useful for learners who need the bigger picture before diving into GenAI tools.",
    transcriptFile: "Edureka Expert transcript.txt"
  },
  {
    teacherId: "andrew-brown",
    teacherName: "Andrew Brown",
    channel: "ExamPro / Andrew Brown",
    domain: "GenAI development roadmap",
    summary: "Frames GenAI as a maturity journey from assistants to local models, with strong emphasis on deployment choices and evaluation.",
    teachingStyle: "Roadmap-driven, implementation focused, cloud-aware and pragmatic",
    signatureTopics: "GenAI maturity model, tools, modalities, transformers, encoders vs decoders, evaluation benchmarks",
    teacherVoice: "Broad and practical GenAI knowledge gives you the flexibility to move in any technical direction.",
    realWorldImpact: "Helps learners connect concepts to deployment decisions, stacks, and project readiness.",
    transcriptFile: "Andrew Browntranscript.txt"
  },
  {
    teacherId: "simplilearn-specialist",
    teacherName: "Simplilearn Specialist",
    channel: "Simplilearn",
    domain: "Prompting, tools, business use, and agents",
    summary: "Makes GenAI approachable for modern teams by tying prompts, tools, multimodal systems, and productivity together.",
    teachingStyle: "Product-minded, workforce-oriented, use-case heavy",
    signatureTopics: "Prompt anatomy, AI agents, LangChain, LangGraph, multimodal AI, project ideas, productivity",
    teacherVoice: "Generative AI is no longer optional; it is becoming a must-know capability of the modern workforce.",
    realWorldImpact: "Strong fit for professionals who want to move from tool usage to workflows and business outcomes.",
    transcriptFile: "simplilearntranscript.txt"
  },
  {
    teacherId: "stanford-cs229",
    teacherName: "Stanford CS229",
    channel: "Stanford CS229",
    domain: "Training science and alignment",
    summary: "Brings the research lens: pretraining pipelines, scaling laws, alignment, systems, and why data quality matters as much as architecture.",
    teachingStyle: "Rigorous, research-oriented, systems-and-training depth",
    signatureTopics: "Pretraining data pipelines, scaling laws, SFT, RLHF, DPO, systems optimization, quantization",
    teacherVoice: "Most people talk about architecture, but in practice data, evaluation, and systems matter just as much.",
    realWorldImpact: "Best for learners who want to understand why modern models behave the way they do under the hood.",
    transcriptFile: "standfordgenaitranscript.txt"
  }
];

const modules = [
  {
    moduleId: "M01",
    sequence: 1,
    teacherId: "edureka-expert",
    teacherName: "Edureka Expert",
    moduleTitle: "AI, ML, and GenAI hierarchy",
    difficulty: "Beginner",
    xp: 90,
    summary: "Separate AI, ML, deep learning, and GenAI so the learner stops mixing the terms.",
    concept: "Generative AI sits inside the larger AI and ML landscape. It creates new content, while many classic AI systems classify, predict, or optimize.",
    why: "Beginners often use AI, ML, deep learning, and LLM as if they mean the same thing. They do not.",
    pattern: "Before building, identify whether the task is prediction, classification, retrieval, or generation.",
    scenario: "A teammate says every chatbot feature is machine learning, but you need to explain where GenAI specifically fits.",
    goal: "Write a prompt that asks the model to explain AI, ML, deep learning, and GenAI for a non-technical teammate using a comparison table.",
    starterPrompt: "Explain AI and machine learning.",
    scaffold: "Act as a patient technical trainer. Explain AI, machine learning, deep learning, and generative AI to a beginner. Use a simple comparison table and one real-world example for each.",
    criteria: "Ask for a table|Define each term separately|Use beginner language|Include real-world examples",
    takeaway: "When you can place GenAI in the larger AI stack, product and engineering conversations become much clearer.",
    outcomes: "Differentiate AI vs ML vs GenAI|Explain the stack to beginners",
    sourceTag: "Collaboration brief + Edureka transcript"
  },
  {
    moduleId: "M02",
    sequence: 2,
    teacherId: "edureka-expert",
    teacherName: "Edureka Expert",
    moduleTitle: "Learning paradigms in one map",
    difficulty: "Beginner",
    xp: 100,
    summary: "Use supervised, unsupervised, and reinforcement learning as the first mental map for modern AI.",
    concept: "Supervised learning learns from labels, unsupervised learning finds hidden structure, and reinforcement learning improves through rewards.",
    why: "Many GenAI workflows still depend on classic ML patterns around data labeling, clustering, and reward shaping.",
    pattern: "Ask the AI to compare paradigms with one example, one benefit, and one limitation each.",
    scenario: "You are preparing study notes and need a compact explanation of the three learning paradigms plus where GenAI touches them.",
    goal: "Write a prompt that requests a practical comparison with simple examples and a concluding note on where LLM alignment fits.",
    starterPrompt: "What are supervised and unsupervised learning?",
    scaffold: "Compare supervised, unsupervised, and reinforcement learning in beginner-friendly language. Use one everyday example, one business example, and mention how reinforcement ideas appear in model alignment.",
    criteria: "Cover all three paradigms|Use examples|Mention reward-based learning|Ask for practical framing",
    takeaway: "GenAI did not replace classic ML; it built on top of it.",
    outcomes: "Recognize the three learning paradigms|Connect GenAI to earlier ML concepts",
    sourceTag: "Collaboration brief + Edureka transcript"
  },
  {
    moduleId: "M03",
    sequence: 3,
    teacherId: "gaurav-sen",
    teacherName: "Gaurav Sen",
    moduleTitle: "Tokenization and next-token prediction",
    difficulty: "Beginner",
    xp: 120,
    summary: "Understand how text becomes tokens and why LLMs predict one token at a time.",
    concept: "An LLM is trained to predict the next token of a sequence, not to 'know' answers in a human way.",
    why: "This changes how you prompt. The model responds to patterns and context, not direct understanding.",
    pattern: "Ask the AI to explain a concept by walking through the token-level flow from text to prediction.",
    scenario: "You are trying to understand why prompt wording changes outputs so much.",
    goal: "Write a prompt that asks for a plain-English explanation of tokenization and next-token prediction with a simple example.",
    starterPrompt: "What is tokenization?",
    scaffold: "Explain tokenization and next-token prediction for a beginner developer. Use the example 'all that glitters' and show how the model predicts the next token step by step.",
    criteria: "Mention tokens|Explain prediction sequence|Use a concrete phrase example|Keep it beginner friendly",
    takeaway: "Prompting gets easier once you stop imagining the model as a search engine and start seeing it as a sequence predictor.",
    outcomes: "Explain tokenization clearly|Understand why wording shifts outputs",
    sourceTag: "Collaboration brief + Gaurav Sen transcript"
  },
  {
    moduleId: "M04",
    sequence: 4,
    teacherId: "gaurav-sen",
    teacherName: "Gaurav Sen",
    moduleTitle: "Vectors and attention",
    difficulty: "Beginner",
    xp: 130,
    summary: "See how meaning is represented and how nearby words change the interpretation of a term.",
    concept: "Words are represented as vectors, and attention uses nearby context to disambiguate meaning.",
    why: "Without context, the model cannot reliably tell whether Apple means a fruit, a company, or a metaphor.",
    pattern: "Prompt for ambiguous examples and ask the model to separate meaning by context.",
    scenario: "A learner is confused about why the same word behaves differently in different prompts.",
    goal: "Write a prompt that asks the AI to explain vectors and attention using the word Apple in multiple contexts.",
    starterPrompt: "Explain attention in AI.",
    scaffold: "Act as an engineering mentor. Explain vectors and attention using the word 'Apple' in three contexts: fruit, company, and metaphor. Show how nearby words change meaning.",
    criteria: "Use an ambiguous word example|Explain context|Mention vectors|Connect attention to interpretation",
    takeaway: "Attention is the bridge between raw tokens and contextual meaning.",
    outcomes: "Understand attention at a high level|Explain ambiguity through context",
    sourceTag: "Collaboration brief + Gaurav Sen transcript"
  },
  {
    moduleId: "M05",
    sequence: 5,
    teacherId: "simplilearn-specialist",
    teacherName: "Simplilearn Specialist",
    moduleTitle: "Anatomy of a good prompt",
    difficulty: "Beginner",
    xp: 140,
    summary: "Use instruction, context, input data, and output format as the base recipe for strong prompts.",
    concept: "A strong prompt usually contains a clear instruction, enough context, the right input, and an output format.",
    why: "This is the fastest way for beginners to move from vague prompts to reliable outputs.",
    pattern: "Role + task + audience + constraints + format.",
    scenario: "You need a prompt that turns a rough meeting transcript into a clean action summary for your manager.",
    goal: "Write a prompt that asks the model to summarize a meeting using bullet points, owners, deadlines, and open risks.",
    starterPrompt: "Summarize this meeting.",
    scaffold: "Act as an executive assistant. Summarize the following meeting notes. Include decisions, action items with owners, deadlines, and unresolved risks. Use bullet points and a final one-line summary.",
    criteria: "Give a role|Specify output format|Ask for actions and owners|Set a useful structure",
    takeaway: "Good prompting is less about fancy tricks and more about complete instructions.",
    outcomes: "Build reliable prompts|Design business-ready output formats",
    sourceTag: "Collaboration brief + Simplilearn transcript"
  },
  {
    moduleId: "M06",
    sequence: 6,
    teacherId: "simplilearn-specialist",
    teacherName: "Simplilearn Specialist",
    moduleTitle: "AI agents and tool use",
    difficulty: "Intermediate",
    xp: 170,
    summary: "Move from one-shot prompting to systems that reason, call tools, and keep working memory.",
    concept: "An AI agent perceives input, decides with an LLM, takes action with tools, and stores useful memory.",
    why: "Modern GenAI products are increasingly about workflows, not just text generation.",
    pattern: "Tell the model when to use tools, what output to return, and what to store or ask before acting.",
    scenario: "You are designing a support assistant that should search a policy file, draft an answer, and escalate when confidence is low.",
    goal: "Write a prompt or workflow instruction for an agent that uses tools responsibly and avoids guessing.",
    starterPrompt: "Answer support questions with AI.",
    scaffold: "Design an AI support agent. It should search the policy knowledge base first, answer only from verified context, ask clarifying questions when needed, and escalate when confidence is low. Return response plus action taken.",
    criteria: "Mention tools or search|Include fallback or escalation|Define a response format|Avoid guessing",
    takeaway: "Agents matter because they turn model intelligence into repeatable work.",
    outcomes: "Understand AI agents|Design simple tool-using workflows",
    sourceTag: "Collaboration brief + Simplilearn transcript"
  },
  {
    moduleId: "M07",
    sequence: 7,
    teacherId: "andrew-brown",
    teacherName: "Andrew Brown",
    moduleTitle: "Generative AI maturity model",
    difficulty: "Intermediate",
    xp: 180,
    summary: "See the path from chat assistants to code copilots to model-as-a-service and local deployment.",
    concept: "Teams usually move through GenAI phases rather than jumping straight into custom model hosting.",
    why: "This helps learners make practical stack decisions instead of chasing every new tool.",
    pattern: "Compare tools by maturity, cost, control, and complexity.",
    scenario: "Your team wants to adopt GenAI but does not know whether to start with ChatGPT, copilots, cloud models, or local models.",
    goal: "Write a prompt that asks for a roadmap comparing GenAI adoption stages and the right use case for each.",
    starterPrompt: "What is a GenAI roadmap?",
    scaffold: "Explain a practical GenAI maturity model for a small product team. Compare AI assistants, code copilots, model-as-a-service, and local hosting by cost, control, security, and technical effort.",
    criteria: "Compare stages|Use practical factors|Mention security and cost|Aim at a real team decision",
    takeaway: "You do not need the most advanced stack first; you need the right next stage.",
    outcomes: "Evaluate GenAI adoption stages|Choose tools by maturity and constraints",
    sourceTag: "Collaboration brief + Andrew Brown transcript"
  },
  {
    moduleId: "M08",
    sequence: 8,
    teacherId: "andrew-brown",
    teacherName: "Andrew Brown",
    moduleTitle: "Encoders, decoders, and multimodal choices",
    difficulty: "Intermediate",
    xp: 190,
    summary: "Distinguish understanding models from generation models and connect them to modern modalities.",
    concept: "Encoder models are strong at understanding and classification; decoder models are strong at sequence generation.",
    why: "Choosing the right model family matters for tasks like search, classification, chat, and multimodal generation.",
    pattern: "Ask the AI to compare model types by job, strengths, and example products.",
    scenario: "You need to explain to a product manager why one model is better for classification while another is better for chat generation.",
    goal: "Write a prompt that requests a comparison of encoders and decoders plus where text, image, audio, and video generation fit.",
    starterPrompt: "What is the difference between BERT and GPT?",
    scaffold: "Compare encoder-only and decoder-only transformer models for a product audience. Explain where BERT-like models and GPT-like models shine, then connect that to text, image, audio, and video generation.",
    criteria: "Compare encoder vs decoder|Mention use cases|Include modalities|Make it product friendly",
    takeaway: "Not every GenAI problem is a chatbot problem.",
    outcomes: "Pick model types by task|Understand modality choices better",
    sourceTag: "Collaboration brief + Andrew Brown transcript"
  },
  {
    moduleId: "M09",
    sequence: 9,
    teacherId: "gaurav-sen",
    teacherName: "Gaurav Sen",
    moduleTitle: "Context engineering and RAG",
    difficulty: "Intermediate",
    xp: 210,
    summary: "Upgrade from generic prompts to grounded systems that retrieve relevant material at runtime.",
    concept: "Context engineering covers few-shot prompting, retrieval, and the design of what information the model sees before it answers.",
    why: "Production assistants need the right context more than they need bigger prompts.",
    pattern: "Fetch relevant source material, then ask the model to answer only from that context.",
    scenario: "You are building an HR or policy assistant that should answer from internal documents instead of making things up.",
    goal: "Write a prompt that uses retrieval context and clearly says what to do when information is missing.",
    starterPrompt: "Answer HR questions.",
    scaffold: "You are an HR assistant. Use only the retrieved policy excerpts to answer the question. Cite the section used. If the answer is not present in the context, say so and request more information instead of guessing.",
    criteria: "Use retrieved context|Limit the answer to source material|Ask for citation or section|Add a fallback rule",
    takeaway: "RAG is really about better context, not magical accuracy on its own.",
    outcomes: "Explain RAG clearly|Design grounded prompts for internal knowledge",
    sourceTag: "Collaboration brief + Gaurav Sen transcript"
  },
  {
    moduleId: "M10",
    sequence: 10,
    teacherId: "andrew-brown",
    teacherName: "Andrew Brown",
    moduleTitle: "Benchmarks and model cards",
    difficulty: "Intermediate",
    xp: 180,
    summary: "Judge models with the right metrics instead of marketing claims.",
    concept: "Model cards explain what a model is, while benchmarks like MMLU, GSM8K, and HumanEval test different capabilities.",
    why: "Teams often compare models without understanding what the scores actually measure.",
    pattern: "Ask the model to explain benchmark relevance for a specific use case.",
    scenario: "Your team is choosing a model for coding help and math support and keeps mixing up unrelated benchmark scores.",
    goal: "Write a prompt that asks the AI to compare three benchmarks and explain which one matters for coding, reasoning, or broad knowledge.",
    starterPrompt: "What is MMLU?",
    scaffold: "Explain MMLU, HumanEval, and GSM8K for an engineering team. For each benchmark, describe what it measures, when it matters, and one misuse of that score in product decisions.",
    criteria: "Cover benchmark purpose|Map to real use cases|Mention misuse or limitation|Keep it decision-focused",
    takeaway: "A benchmark only matters if it matches the job you want the model to do.",
    outcomes: "Interpret model benchmarks responsibly|Use model cards and metrics better",
    sourceTag: "Collaboration brief + Andrew Brown transcript"
  },
  {
    moduleId: "M11",
    sequence: 11,
    teacherId: "stanford-cs229",
    teacherName: "Stanford CS229",
    moduleTitle: "Pretraining data pipelines",
    difficulty: "Intermediate",
    xp: 220,
    summary: "Understand why HTML extraction, deduplication, and filtering matter before training even begins.",
    concept: "Model quality depends heavily on the quality and processing of the text pipeline that feeds pretraining.",
    why: "Bigger models are not enough if the data is noisy, duplicated, or low quality.",
    pattern: "Ask the AI to explain a pipeline in stages: collect, clean, deduplicate, filter, train.",
    scenario: "A learner wants to understand why data engineering matters for LLMs more than they first assumed.",
    goal: "Write a prompt that asks for a plain-English walkthrough of the LLM pretraining pipeline and its quality controls.",
    starterPrompt: "How are LLMs trained?",
    scaffold: "Explain the pretraining data pipeline for LLMs in plain English. Cover data collection, HTML extraction, deduplication, quality filtering, and why each stage affects the final model.",
    criteria: "Break pipeline into steps|Mention deduplication|Mention filtering|Connect pipeline quality to model quality",
    takeaway: "Training starts long before the optimizer touches model weights.",
    outcomes: "Explain pretraining pipelines|See data quality as a first-class ML concern",
    sourceTag: "Collaboration brief + Stanford transcript"
  },
  {
    moduleId: "M12",
    sequence: 12,
    teacherId: "stanford-cs229",
    teacherName: "Stanford CS229",
    moduleTitle: "Scaling laws and compute trade-offs",
    difficulty: "Intermediate",
    xp: 230,
    summary: "Learn why parameter count alone is a weak story without training tokens and compute balance.",
    concept: "Scaling laws describe how performance changes as model size, data, and compute increase together.",
    why: "This is the antidote to simplistic bigger-is-better thinking around LLMs.",
    pattern: "Prompt for a trade-off explanation, not only a definition.",
    scenario: "Someone on your team says the best model is always the one with the biggest parameter count.",
    goal: "Write a prompt that asks the AI to explain scaling laws and the Chinchilla-style trade-off between parameters and data.",
    starterPrompt: "What are scaling laws?",
    scaffold: "Explain scaling laws for LLMs to a software engineer. Include why more parameters alone are not enough, how data volume matters, and why compute-optimal trade-offs changed model design thinking.",
    criteria: "Mention parameters and data|Explain trade-off|Use plain English|Challenge bigger-is-better thinking",
    takeaway: "Performance comes from balance, not just size.",
    outcomes: "Understand scaling trade-offs|Explain Chinchilla-style thinking simply",
    sourceTag: "Collaboration brief + Stanford transcript"
  },
  {
    moduleId: "M13",
    sequence: 13,
    teacherId: "stanford-cs229",
    teacherName: "Stanford CS229",
    moduleTitle: "SFT, RLHF, and DPO",
    difficulty: "Advanced",
    xp: 250,
    summary: "See how raw predictors become assistants through post-training alignment.",
    concept: "Supervised fine-tuning teaches response style, RLHF teaches preference alignment, and DPO simplifies preference learning.",
    why: "This explains why an assistant-like model behaves differently from a raw next-token predictor.",
    pattern: "Ask for a compare-and-contrast explanation with one use case for each alignment stage.",
    scenario: "You are explaining to a teammate why post-training matters after pretraining already finished.",
    goal: "Write a prompt that compares SFT, RLHF, and DPO and explains what each stage changes in practice.",
    starterPrompt: "What is RLHF?",
    scaffold: "Compare supervised fine-tuning, RLHF, and DPO for a product engineer. Explain what problem each solves, what data it needs, and how it changes model behavior after pretraining.",
    criteria: "Compare all three stages|Mention data and objective|Explain behavior changes|Keep it practical",
    takeaway: "Alignment is what turns a language model into a product assistant.",
    outcomes: "Explain alignment stages clearly|Connect post-training to user-facing behavior",
    sourceTag: "Collaboration brief + Stanford transcript"
  },
  {
    moduleId: "M14",
    sequence: 14,
    teacherId: "simplilearn-specialist",
    teacherName: "Simplilearn Specialist",
    moduleTitle: "Multimodal systems and productivity",
    difficulty: "Intermediate",
    xp: 200,
    summary: "Connect text, image, voice, and automation to practical business workflows.",
    concept: "Modern GenAI products increasingly combine multiple modalities and workflow steps instead of relying on text alone.",
    why: "The best use cases often blend generation, analysis, and automation.",
    pattern: "Ask for a multimodal workflow with clear stages, tools, inputs, and outputs.",
    scenario: "You want to design a workflow that summarizes a meeting, extracts action items, and creates a slide or email update.",
    goal: "Write a prompt that asks for a multimodal workflow combining transcript analysis, text generation, and output packaging.",
    starterPrompt: "Use AI to help with meetings.",
    scaffold: "Design a multimodal AI workflow for meeting productivity. Start with transcript input, extract decisions and action items, create a summary email, and propose a slide outline for stakeholders.",
    criteria: "Use multiple modalities or steps|Define outputs|Mention workflow stages|Aim at business productivity",
    takeaway: "The value of GenAI often appears when content generation becomes part of a broader workflow.",
    outcomes: "Design multimodal workflows|Connect GenAI to business productivity",
    sourceTag: "Simplilearn transcript"
  },
  {
    moduleId: "M15",
    sequence: 15,
    teacherId: "gaurav-sen",
    teacherName: "Gaurav Sen",
    moduleTitle: "Context engineering, MCP, and long-term memory",
    difficulty: "Advanced",
    xp: 240,
    summary: "See how context engineering evolves into connected tool systems, MCP, and agent memory patterns.",
    concept: "Prompts are no longer enough on their own; production systems manage examples, retrieved documents, external tools, and remembered state.",
    why: "This is where real GenAI engineering starts to look like system design.",
    pattern: "Tell the model what it may retrieve, which tools it can call, and how to summarize memory safely.",
    scenario: "You are planning an assistant that should use internal docs, external tools, and previous conversation state responsibly.",
    goal: "Write a prompt or system instruction that defines context sources, tool limits, memory behavior, and fallback rules.",
    starterPrompt: "Build an AI assistant.",
    scaffold: "Design a context-aware AI assistant. It may use examples, retrieved documents, and approved external tools. Define how it should summarize older context, when it should call tools, and how it should respond when information is missing.",
    criteria: "Mention examples or few-shot context|Use retrieved or external context|Define memory or summarization behavior|Include fallback or refusal rules",
    takeaway: "Advanced prompting becomes context engineering once the model sits inside a larger system.",
    outcomes: "Understand context engineering better|Design safer system prompts with tools and memory",
    sourceTag: "Gaurav Sen transcript"
  }
];

function formatSheet(range, { fill = "lt2", headerFill = "accent1" } = {}) {
  range.format = {
    fill,
    font: { name: "Aptos", size: 11, color: "tx1" },
    verticalAlignment: "center",
    wrapText: true
  };

  const header = range.getRow(0);
  header.format = {
    fill: headerFill,
    font: { name: "Aptos", size: 11, bold: true, color: "lt1" },
    verticalAlignment: "center",
    wrapText: true
  };
}

async function buildWorkbook() {
  const workbook = Workbook.create();

  const dashboard = workbook.worksheets.add("Dashboard");
  const teacherSheet = workbook.worksheets.add("Teachers");
  const moduleSheet = workbook.worksheets.add("Modules");

  dashboard.getRange("A1:B8").values = [
    ["PromptCraft Academy", "Teacher Database"],
    ["Teachers", teachers.length],
    ["Modules", modules.length],
    ["Beginner modules", modules.filter((item) => item.difficulty === "Beginner").length],
    ["Intermediate modules", modules.filter((item) => item.difficulty === "Intermediate").length],
    ["Advanced modules", modules.filter((item) => item.difficulty === "Advanced").length],
    ["Built for", "Dynamic curriculum loading from GitHub-hosted workbook"],
    ["Source", "Collaboration brief + five transcript summaries"]
  ];
  dashboard.getRange("A1:B8").format = {
    fill: "lt2",
    font: { name: "Aptos", size: 11, color: "tx1" },
    wrapText: true
  };
  dashboard.getRange("A1:B1").format = {
    fill: "accent1",
    font: { name: "Aptos", size: 13, bold: true, color: "lt1" }
  };
  dashboard.getRange("A2:A8").format = {
    fill: "accent6",
    font: { name: "Aptos", size: 11, bold: true, color: "tx1" }
  };
  dashboard.getRange("A10:B15").values = [
    ["Teacher", "Module Count"],
    ...teachers.map((teacher) => [
      teacher.teacherName,
      modules.filter((item) => item.teacherId === teacher.teacherId).length
    ])
  ];
  dashboard.getRange("A10:B15").format = {
    fill: "lt2",
    font: { name: "Aptos", size: 11, color: "tx1" },
    wrapText: true
  };
  dashboard.getRange("A10:B10").format = {
    fill: "accent2",
    font: { name: "Aptos", size: 11, bold: true, color: "lt1" }
  };
  dashboard.charts.add("bar", {
    title: "Modules per Teacher",
    titleTextStyle: { fontSize: 16, bold: true },
    categories: teachers.map((teacher) => teacher.teacherName),
    series: [
      {
        name: "Modules",
        values: teachers.map((teacher) => modules.filter((item) => item.teacherId === teacher.teacherId).length)
      }
    ],
    hasLegend: false,
    dataLabels: { showValue: true, position: "outEnd" },
    barOptions: { direction: "bar", grouping: "clustered", gapWidth: 90 },
    from: { row: 1, col: 3 },
    extent: { widthPx: 640, heightPx: 320 }
  });
  dashboard.freezePanes.freezeRows(1);
  dashboard.getRange("A:K").format.autofitColumns();

  const teacherHeaders = Object.keys(teachers[0]);
  teacherSheet.getRange(`A1:J${teachers.length + 1}`).values = [
    teacherHeaders,
    ...teachers.map((teacher) => teacherHeaders.map((key) => teacher[key]))
  ];
  formatSheet(teacherSheet.getRange(`A1:J${teachers.length + 1}`), { headerFill: "accent1" });
  teacherSheet.freezePanes.freezeRows(1);
  teacherSheet.getRange("A:J").format.autofitColumns();

  const moduleHeaders = Object.keys(modules[0]);
  moduleSheet.getRange(`A1:S${modules.length + 1}`).values = [
    moduleHeaders,
    ...modules.map((module) => moduleHeaders.map((key) => module[key]))
  ];
  formatSheet(moduleSheet.getRange(`A1:S${modules.length + 1}`), { headerFill: "accent3" });
  moduleSheet.freezePanes.freezeRows(1);
  moduleSheet.freezePanes.freezeColumns(2);
  moduleSheet.getRange("A:S").format.autofitColumns();

  const inspectSummary = await workbook.inspect({
    kind: "table",
    range: "Teachers!A1:J6",
    include: "values",
    tableMaxRows: 8,
    tableMaxCols: 10
  });
  console.log(inspectSummary.ndjson);

  await fs.mkdir(path.resolve("data"), { recursive: true });
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(path.resolve("data", "promptcraft-academy-database.xlsx"));
}

await buildWorkbook();
