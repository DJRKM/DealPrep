import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { personName, companyName, meetingGoal, country } = await req.json();

    if (!personName || !companyName) {
      return NextResponse.json(
        { error: "Person name and company name are required." },
        { status: 400 }
      );
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY || "";
    const firecrawlKey = process.env.FIRECRAWL_API_KEY || "";

    // 1. Fast Firecrawl Search for Company Deals & Press Releases (5s timeout max)
    let scrapedContext = "";
    if (firecrawlKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const searchRes = await fetch("https://api.firecrawl.dev/v1/search", {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${firecrawlKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `${companyName} latest news M&A partnerships deals quarterly press release 2025 2026`,
            limit: 4,
          }),
        });

        clearTimeout(timeoutId);

        if (searchRes.ok) {
          const searchData = await searchRes.json();
          const items = searchData.data || [];
          scrapedContext = items
            .map((item: { title?: string; description?: string; url?: string }) => 
              `[Source: ${item.title || "News"}] (${item.url || ""})\n${item.description || ""}`
            )
            .join("\n\n");
        }
      } catch (err) {
        console.warn("Firecrawl fast search note:", err);
      }
    }

    // 2. OpenRouter Multi-Model Synthesis
    const systemPrompt = `You are DealPrep / DossierAI, an elite executive intelligence advisor and cross-border diplomatic protocol expert.
You prepare executives, founders, and sales leaders for high-stakes B2B meetings.
Analyze the provided meeting parameters and return a strictly valid JSON object. Do not include markdown formatting or backticks around the JSON.`;

    const userPrompt = `Generate a high-stakes executive meeting briefing dossier for:
- Executive Name: ${personName}
- Target Company: ${companyName}
- Meeting Goal / Agenda: ${meetingGoal || "Strategic partnership and executive introduction"}
- Primary Cultural / Geographic Context: ${country || "International / Japan / Singapore / Germany"}

${scrapedContext ? `Here is real-time scraped company intelligence to ground your analysis:\n${scrapedContext}\n` : ""}

Return a strictly valid JSON object with the following exact structure:
{
  "executive": {
    "name": "${personName}",
    "company": "${companyName}",
    "title": "Estimated or verified executive title",
    "summary": "2-3 sentence power bio highlighting their background, recent career evolution, and strategic reputation.",
    "personalityArchetype": "e.g. Data-Driven Consensus Builder, Direct Tech Visionary, Pragmatic Operational Leader",
    "readingTime": "3 min briefing"
  },
  "dealRadar": [
    {
      "title": "Specific recent strategic move, investment, or deal",
      "dateOrContext": "e.g. Recent Announcement",
      "impact": "Concrete business or market impact",
      "relevanceToMeeting": "How to pivot this deal naturally to support your meeting agenda: '${meetingGoal}'"
    },
    {
      "title": "Second strategic initiative or cloud/AI transformation move",
      "dateOrContext": "Recent",
      "impact": "Market positioning",
      "relevanceToMeeting": "Why this creates urgency for the meeting goal"
    },
    {
      "title": "Third recent company development or regulatory shift",
      "dateOrContext": "Recent",
      "impact": "Operational priority",
      "relevanceToMeeting": "Strategic discussion anchor"
    }
  ],
  "talkingPoints": [
    {
      "topic": "Strategic Icebreaker",
      "opener": "Verbatim, conversational, high-status opening phrase to start the call with immediate credibility.",
      "strategicObjective": "The psychological or business objective of this opening"
    },
    {
      "topic": "Pain Point & Value Alignment",
      "opener": "Verbatim question or statement bridging their recent challenges with your solution.",
      "strategicObjective": "Uncover buying criteria without sounding transactional"
    },
    {
      "topic": "Closing / Next Steps Anchor",
      "opener": "Verbatim consultative proposal for closing the meeting.",
      "strategicObjective": "Secure high-conviction agreement on next steps"
    }
  ],
  "culturalProtocol": {
    "country": "${country || "Target Region"}",
    "executiveGreeting": "Exact cultural greeting ritual (e.g. Meishi business card etiquette, bowing depth, honorific address like Sato-san or Herr Dr. Klein)",
    "meetingDynamic": "Psychological communication cadence (e.g. Nemawashi informal consensus before formal yes, directness tolerance, silence interpretation)",
    "dos": [
      "Key cultural do #1",
      "Key cultural do #2",
      "Key cultural do #3"
    ],
    "donts": [
      "Crucial taboo/don't #1 to avoid loss of face or friction",
      "Crucial taboo/don't #2",
      "Crucial taboo/don't #3"
    ],
    "proTip": "One nuanced, insider cultural secret that will make the executive feel deeply respected."
  },
  "executiveCheatSheet": {
    "theOneLinerValueProp": "A single razor-sharp sentence framing the solution directly for this executive.",
    "dangerZoneToAvoid": "The single most common mistake people make when pitching this type of executive or company."
  }
}`;

    let dossierData = null;

    if (openRouterKey) {
      try {
        const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://antigravity.google.com",
            "X-Title": "DealPrep DossierAI",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat", // Fast, ultra-cheap, highly accurate
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (aiRes.ok) {
          const aiJson = await aiRes.json();
          const rawContent = aiJson.choices?.[0]?.message?.content || "";
          const cleanedContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
          dossierData = JSON.parse(cleanedContent);
        } else {
          console.warn("OpenRouter returned non-200:", await aiRes.text());
        }
      } catch (err) {
        console.error("OpenRouter API error:", err);
      }
    }

    if (!dossierData) {
      dossierData = generateFallbackDossier(personName, companyName, meetingGoal, country);
    }

    // 3. Persist in Supabase DB
    try {
      await supabase.from("dossiers").insert({
        person_name: personName,
        company_name: companyName,
        meeting_goal: meetingGoal || "Strategic Executive Meeting",
        country: country || "International",
        executive_summary: dossierData.executive?.summary || "",
        deal_radar: dossierData.dealRadar || [],
        talking_points: dossierData.talkingPoints || [],
        cultural_protocol: dossierData.culturalProtocol || {},
        full_dossier: dossierData,
      });
    } catch (dbErr) {
      console.warn("Supabase record insert note (non-fatal):", dbErr);
    }

    return NextResponse.json({ success: true, dossier: dossierData });
  } catch (error) {
    console.error("DealPrep API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate meeting dossier. Please try again." },
      { status: 500 }
    );
  }
}

function generateFallbackDossier(personName: string, companyName: string, meetingGoal: string, country: string) {
  const isJapan = (country || "").toLowerCase().includes("japan") || (companyName || "").toLowerCase().includes("sony") || (companyName || "").toLowerCase().includes("toyota");
  const isGermany = (country || "").toLowerCase().includes("germany") || (companyName || "").toLowerCase().includes("sap") || (companyName || "").toLowerCase().includes("siemens");
  const isSingapore = (country || "").toLowerCase().includes("singapore") || (companyName || "").toLowerCase().includes("dbs") || (companyName || "").toLowerCase().includes("grab");

  return {
    executive: {
      name: personName,
      company: companyName,
      title: "Senior Executive / Decision Maker",
      summary: `${personName} is a pivotal operational leader at ${companyName}, recognized for steering enterprise modernization and cross-functional alignment. Known for favoring evidence-backed proposals that demonstrate clear ROI and seamless system integration.`,
      personalityArchetype: isJapan ? "Consensus-Oriented Strategic Architect" : isGermany ? "Methodical & Direct Enterprise Operator" : "High-Velocity Pragmatic Scaler",
      readingTime: "3 min briefing"
    },
    dealRadar: [
      {
        title: `${companyName} Global Digital Transformation & Cloud Acceleration`,
        dateOrContext: "Q3/Q4 Strategic Priority",
        impact: "Expands operational efficiency and secures core architectural pipelines across international units.",
        relevanceToMeeting: `Aligns directly with your agenda: "${meetingGoal}". Positions your initiative as an accelerator to their existing modernization roadmap.`
      },
      {
        title: "Cross-Border Regulatory & Enterprise Governance Compliance",
        dateOrContext: "Ongoing Initiative",
        impact: "Navigating evolving data governance frameworks (EU AI Act, APPI, and regional standards).",
        relevanceToMeeting: "Provides immediate common ground to discuss automated risk reduction and governance reliability."
      },
      {
        title: "Ecosystem Partnerships & Platform Modernization",
        dateOrContext: "Recent Announcement",
        impact: "Strengthens partner integration and developer tooling efficiency.",
        relevanceToMeeting: "Demonstrates that your proposal integrates cleanly without requiring complete architectural overhaul."
      }
    ],
    talkingPoints: [
      {
        topic: "Strategic Context Icebreaker",
        opener: `"${personName}, congratulations on ${companyName}'s recent momentum in expanding modern infrastructure. I was reviewing your recent milestones and was particularly impressed by how your team navigated cross-functional scaling."`,
        strategicObjective: "Establish peer-level executive credibility within the first 45 seconds."
      },
      {
        topic: "Bridging the Core Agenda",
        opener: `"In preparing for our discussion on ${meetingGoal || "our partnership"}, our primary objective was ensuring zero friction with ${companyName}'s established roadmap. Where does this currently rank among your Q3 priorities?"`,
        strategicObjective: "Uncover internal urgency and qualification without sounding like an aggressive pitch."
      },
      {
        topic: "Consultative Next Steps Anchor",
        opener: `"Given your focus on measurable milestones, how would you feel about our technical teams doing a lightweight 2-week feasibility audit before we discuss formal scope?"`,
        strategicObjective: "Lower barrier to commitment and secure a structured pilot."
      }
    ],
    culturalProtocol: {
      country: isJapan ? "Japan (Tokyo)" : isSingapore ? "Singapore" : isGermany ? "Germany" : "Global Enterprise",
      executiveGreeting: isJapan
        ? "Present your business card (Meishi) with both hands, text facing the recipient, accompanied by a polite bow (approx. 15-30 degrees). Address as '" + personName.split(" ").slice(-1)[0] + "-san'. Never slide cards across the table or write notes on their card in their presence."
        : isGermany
        ? "Firm, confident handshake with steady eye contact. Use formal address (Herr / Frau + Last Name or academic title like 'Herr Dr.') until explicitly invited to use first names. Punctuality is non-negotiable—arrive 5 minutes early."
        : isSingapore
        ? "Professional, warm greeting. Often combines Western handshake with subtle head nod. Singapore executives value efficient, multi-cultural consensus building; show respect for regional hierarchy."
        : "Professional, confident greeting. High respect for executive time and direct, evidence-backed communication.",
      meetingDynamic: isJapan
        ? "Nemawashi (Root-Binding) Dynamic: Japanese corporate decisions are forged through background consensus before formal meetings. The first meeting is almost exclusively about trust, credibility, and mutual compatibility—never push for an immediate closing contract on Call #1."
        : isGermany
        ? "Sachlichkeit & Directness: German executives appreciate structured agendas, clear technical validation, and unambiguous timelines. Fluff and hyperbolic marketing language reduce credibility."
        : isSingapore
        ? "Strategic Pragmatism: Singapore's tech and finance leaders blend Western speed with Asian relational respect. Emphasize compliance, regional scalability, and regulatory certainty."
        : "Pragmatic, structured dialogue with clear time boundaries and measurable value articulation.",
      dos: isJapan
        ? [
            "Listen attentively during periods of silence (silence denotes deep contemplation and respect, not disinterest).",
            "Keep your physical notebook/iPad on the table showing prepared research notes.",
            "Compliment the legacy and long-term durability of the company."
          ]
        : isGermany
        ? [
            "Stick strictly to the agreed agenda and respect scheduled end time.",
            "Provide quantitative data and concrete security/compliance documentation.",
            "Be transparent about current limitations and how your team mitigates them."
          ]
        : [
            "Lead with concrete enterprise value and cross-border scalability.",
            "Acknowledge the executive's time constraint early in the conversation.",
            "Send a crisp executive summary follow-up within 4 hours of the call."
          ],
      donts: isJapan
        ? [
            "NEVER put someone on the spot to make a unilateral decision in front of peers (avoids loss of face).",
            "Do not rush silence or speak over pauses in Japanese translation/cadence.",
            "Do not put a business card directly into your back pocket."
          ]
        : isGermany
        ? [
            "Avoid aggressive 'hard-sell' tactics or artificial urgency ('Offer expires Friday').",
            "Do not be late even by 2 minutes.",
            "Do not make promises your engineering team cannot guarantee."
          ]
        : [
            "Avoid vague buzzwords without engineering or operational substance.",
            "Do not dominate the dialogue—aim for a 60/40 listening-to-speaking ratio.",
            "Do not skip executive follow-up protocol."
          ],
      proTip: isJapan
        ? "In Japanese meetings, the senior-most executive often speaks the least and observes the most. Direct your respectful attention to the senior leader, while delivering technical specifics to the operational champions."
        : isGermany
        ? "Prepare a 1-page technical architecture or compliance overview sheet (Handout). German decision-makers respect candidates who have their documentation thoroughly audited in advance."
        : "Reference how your solution complies with regional data governance and cross-border regulatory standards—it immediately sets you apart from competitors."
    },
    executiveCheatSheet: {
      theOneLinerValueProp: `An enterprise-grade operational accelerator designed to de-risk and expedite ${companyName}'s current strategic priorities without disrupting existing infrastructure.`,
      dangerZoneToAvoid: isJapan
        ? "Pushing for an aggressive sign-off on the first call, which instantly violates consensus protocol."
        : "Vague, unproven marketing claims without technical or architectural substance."
    }
  };
}
