/**
 * AI Career Advisor & Recommendation Service
 * Configurable external AI provider (Gemini / OpenAI compatible)
 * with reliable deterministic rule-based fallback when no API key is configured.
 */

const getAIConfig = () => {
  const provider = (process.env.AI_PROVIDER || '').toLowerCase();
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    return {
      provider: 'gemini',
      apiKey: geminiKey,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash'
    };
  }

  if (openaiKey && openaiKey !== 'your_openai_api_key_here') {
    return {
      provider: 'openai',
      apiKey: openaiKey,
      baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
    };
  }

  return {
    provider: 'none',
    apiKey: null
  };
};

/**
 * Generate AI career advice using configured external LLM or deterministic fallback.
 */
const generateCareerAdvice = async ({
  targetRole,
  currentSkills = [],
  missingSkills = [],
  improvementSkills = [],
  experienceLevel = 'Student/Fresher',
  learningPreferences = [],
  weeklyStudyHours = 10
}) => {
  const config = getAIConfig();

  // If no external AI key is available, generate deterministic rule-based advice
  if (config.provider === 'none' || !config.apiKey) {
    return generateRuleBasedAdvice({
      targetRole,
      currentSkills,
      missingSkills,
      improvementSkills,
      experienceLevel,
      learningPreferences,
      weeklyStudyHours
    });
  }

  try {
    if (config.provider === 'gemini') {
      return await callGeminiAPI(config, {
        targetRole,
        currentSkills,
        missingSkills,
        improvementSkills,
        experienceLevel,
        learningPreferences,
        weeklyStudyHours
      });
    } else if (config.provider === 'openai') {
      return await callOpenAIAPI(config, {
        targetRole,
        currentSkills,
        missingSkills,
        improvementSkills,
        experienceLevel,
        learningPreferences,
        weeklyStudyHours
      });
    }
  } catch (apiError) {
    console.warn(`[AI Service] External ${config.provider} call failed (${apiError.message}). Falling back to rule-based engine.`);
    const fallbackAdvice = generateRuleBasedAdvice({
      targetRole,
      currentSkills,
      missingSkills,
      improvementSkills,
      experienceLevel,
      learningPreferences,
      weeklyStudyHours
    });
    fallbackAdvice.fallbackNotice = `External AI provider temporarily unavailable (${apiError.message}). Using deterministic career intelligence engine.`;
    return fallbackAdvice;
  }
};

/**
 * Call Google Gemini REST API
 */
const callGeminiAPI = async (config, input) => {
  const prompt = `You are an expert tech career coach and software engineering lead at Skillora AI.
Analyze this user's profile and provide strategic career intelligence.

Target Role: ${input.targetRole}
Experience Level: ${input.experienceLevel}
Available Study Time: ${input.weeklyStudyHours} hours/week
Learning Preferences: ${input.learningPreferences.join(', ') || 'Hands-on practice'}
Current Skills: ${input.currentSkills.map(s => `${s.name} (${s.proficiency})`).join(', ') || 'None listed'}
Missing Required Skills: ${input.missingSkills.map(s => `${s.name} [Priority: ${s.priority}]`).join(', ') || 'None'}
Skills Needing Improvement: ${input.improvementSkills.map(s => `${s.name} (Current: ${s.userProficiency} -> Needed: ${s.requiredProficiency})`).join(', ') || 'None'}

Respond ONLY with a valid JSON object matching this exact schema:
{
  "summary": "2-3 sentence strategic executive assessment",
  "prioritySequence": [
    {
      "skill": "skill name",
      "whyItMatters": "Clear technical and career reason why this skill must come first",
      "relationshipToRole": "How it specifically functions in a ${input.targetRole} workflow",
      "recommendedWeeks": 2
    }
  ],
  "portfolioStrategy": {
    "recommendedProject": "Specific modern project title",
    "description": "Comprehensive feature description demonstrating core competency",
    "keyTechnologies": ["tech1", "tech2", "tech3"],
    "howToPresentToRecruiters": "Concrete portfolio and GitHub README advice"
  },
  "interviewPreparationTip": "Specific practical advice for technical interviews for ${input.targetRole}",
  "weeklyRoutinePlan": "Structured allocation for ${input.weeklyStudyHours} weekly hours"
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response from Gemini API');

  const parsed = JSON.parse(rawText);
  return {
    ...parsed,
    analysisType: 'ai',
    providerName: `Google Gemini (${config.model})`,
    generatedAt: new Date()
  };
};

/**
 * Call OpenAI REST API
 */
const callOpenAIAPI = async (config, input) => {
  const prompt = `You are a senior tech lead at Skillora AI. Respond in JSON.
User target: ${input.targetRole}, Current skills: ${JSON.stringify(input.currentSkills)}, Missing: ${JSON.stringify(input.missingSkills)}, Hours/week: ${input.weeklyStudyHours}.
Provide JSON with keys: summary, prioritySequence (array of { skill, whyItMatters, relationshipToRole, recommendedWeeks }), portfolioStrategy ({ recommendedProject, description, keyTechnologies, howToPresentToRecruiters }), interviewPreparationTip, weeklyRoutinePlan.`;

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content);
  return {
    ...parsed,
    analysisType: 'ai',
    providerName: `OpenAI (${config.model})`,
    generatedAt: new Date()
  };
};

/**
 * Deterministic Rule-Based Career Intelligence Engine.
 * Transparently labeled as rule-based analysis.
 */
const generateRuleBasedAdvice = ({
  targetRole,
  currentSkills = [],
  missingSkills = [],
  improvementSkills = [],
  experienceLevel = 'Student/Fresher',
  learningPreferences = [],
  weeklyStudyHours = 10
}) => {
  const criticalMissing = missingSkills.filter(s => s.priority === 'Critical');
  const highMissing = missingSkills.filter(s => s.priority === 'High');
  const otherMissing = missingSkills.filter(s => s.priority !== 'Critical' && s.priority !== 'High');

  // Sequence: Critical Missing -> Improvement Needed -> High Missing -> Other
  const sequenceItems = [];

  criticalMissing.forEach(s => {
    sequenceItems.push({
      skill: s.name,
      whyItMatters: `${s.name} is classified as a foundational core competency for ${targetRole}. Lacking it creates an immediate barrier during technical screening.`,
      relationshipToRole: `In production ${targetRole} environments, ${s.name} is utilized daily for primary deliverables, architecture, and team workflows.`,
      recommendedWeeks: Math.max(2, Math.round(25 / (weeklyStudyHours || 10)))
    });
  });

  improvementSkills.forEach(s => {
    sequenceItems.push({
      skill: s.name,
      whyItMatters: `You already have foundational familiarity with ${s.name}, making it a high-ROI area to upgrade from ${s.userProficiency} to ${s.requiredProficiency}.`,
      relationshipToRole: `Senior teams look for depth over shallow breadth. Advancing your ${s.name} capability demonstrates problem-solving beyond beginner tutorials.`,
      recommendedWeeks: Math.max(1, Math.round(15 / (weeklyStudyHours || 10)))
    });
  });

  highMissing.forEach(s => {
    sequenceItems.push({
      skill: s.name,
      whyItMatters: `Modern job postings for ${targetRole} heavily emphasize ${s.name} as a modern standard rather than an optional add-on.`,
      relationshipToRole: `Enables professional collaboration, performance optimization, and industry-standard deployment practices.`,
      recommendedWeeks: Math.max(1, Math.round(15 / (weeklyStudyHours || 10)))
    });
  });

  const prioritySequence = sequenceItems.slice(0, 5);

  const keyTech = sequenceItems.slice(0, 3).map(i => i.skill);
  if (keyTech.length === 0) keyTech.push('TypeScript', 'React', 'Node.js');

  return {
    analysisType: 'rule-based',
    providerName: 'Skillora Rule-Based Intelligence Engine',
    summary: `Structured baseline career roadmap for aspiring ${targetRole} (${experienceLevel}). Based on our deterministic requirement matrix and your allocation of ${weeklyStudyHours} hours/week, focusing sequentially on ${prioritySequence.length} key competencies will yield the highest interview readiness.`,
    prioritySequence,
    portfolioStrategy: {
      recommendedProject: `Full-Cycle ${targetRole} Production Showcase`,
      description: `Build an end-to-end web application that bridges client UX, resilient API logic, database transactions, and automated deployment. Include realistic sample datasets, responsive design, and comprehensive test coverage.`,
      keyTechnologies: keyTech,
      howToPresentToRecruiters: `Document your architectural trade-offs in a detailed GitHub README. Include an interactive live demo link, architecture diagram, and a 90-second video walkthrough showing edge-case handling.`
    },
    interviewPreparationTip: `Focus on explaining 'why' rather than just 'how'. In interviews for ${targetRole}, candidates who articulate why they selected a particular library or data structure stand out significantly.`,
    weeklyRoutinePlan: `Divide your ${weeklyStudyHours} weekly hours: 25% reading architecture & documentation, 50% building hands-on project features, and 25% solving targeted domain exercises & code refactoring.`,
    generatedAt: new Date()
  };
};

module.exports = {
  generateCareerAdvice,
  generateRuleBasedAdvice,
  getAIConfig
};
