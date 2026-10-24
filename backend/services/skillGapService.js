/**
 * Skill Gap Analysis Baseline Engine
 * Deterministic, transparent, and reproducible scoring algorithm.
 */

const PROFICIENCY_LEVELS = {
  'beginner': 1,
  'intermediate': 2,
  'advanced': 3,
  'expert': 4
};

const IMPORTANCE_WEIGHTS = {
  'core': 1.2,
  'recommended': 0.8,
  'optional': 0.5
};

const normalizeName = (name) => {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
};

/**
 * Perform deterministic skill gap calculation between user's current skills and career role requirements.
 * 
 * @param {Array} userSkills - Array of { name, proficiency, category }
 * @param {Object} role - CareerRole document
 * @returns {Object} Deterministic analysis results with detailed breakdown
 */
const calculateSkillGap = (userSkills = [], role) => {
  if (!role || !role.requiredSkills) {
    throw new Error('Valid career role definition with required skills is required');
  }

  // Create a map of normalized user skills for efficient lookup
  const userSkillMap = new Map();
  userSkills.forEach(skill => {
    const key = normalizeName(skill.name);
    if (key) {
      userSkillMap.set(key, {
        name: skill.name,
        category: skill.category || 'Technical',
        proficiency: (skill.proficiency || 'Beginner').toLowerCase()
      });
    }
  });

  const matchedSkills = [];
  const missingSkills = [];
  const improvementSkills = [];

  let totalPossibleWeight = 0;
  let earnedWeight = 0;
  let corePossibleWeight = 0;
  let coreEarnedWeight = 0;
  let recPossibleWeight = 0;
  let recEarnedWeight = 0;

  role.requiredSkills.forEach(req => {
    const importanceKey = (req.importance || 'Core').toLowerCase();
    const weight = IMPORTANCE_WEIGHTS[importanceKey] || 1.0;
    totalPossibleWeight += weight;

    if (importanceKey === 'core') {
      corePossibleWeight += weight;
    } else if (importanceKey === 'recommended') {
      recPossibleWeight += weight;
    }

    const reqKey = normalizeName(req.name);
    // Also check for partial or synonym match
    let userMatch = userSkillMap.get(reqKey);
    if (!userMatch) {
      for (const [uKey, uVal] of userSkillMap.entries()) {
        if (uKey.includes(reqKey) || reqKey.includes(uKey)) {
          userMatch = uVal;
          break;
        }
      }
    }

    const reqProfVal = PROFICIENCY_LEVELS[(req.minProficiency || 'Intermediate').toLowerCase()] || 2;

    if (userMatch) {
      const userProfVal = PROFICIENCY_LEVELS[userMatch.proficiency] || 1;
      const capitalizedUserProf = userMatch.proficiency.charAt(0).toUpperCase() + userMatch.proficiency.slice(1);

      if (userProfVal >= reqProfVal) {
        // Full match
        earnedWeight += weight;
        if (importanceKey === 'core') coreEarnedWeight += weight;
        if (importanceKey === 'recommended') recEarnedWeight += weight;

        matchedSkills.push({
          name: req.name,
          category: req.category,
          userProficiency: capitalizedUserProf,
          requiredProficiency: req.minProficiency,
          importance: req.importance,
          status: 'Matched',
          scoreContribution: weight
        });
      } else {
        // Needs improvement (has skill but below required proficiency)
        const ratio = Math.max(0.4, userProfVal / reqProfVal);
        const partialWeight = weight * ratio;
        earnedWeight += partialWeight;
        if (importanceKey === 'core') coreEarnedWeight += partialWeight;
        if (importanceKey === 'recommended') recEarnedWeight += partialWeight;

        matchedSkills.push({
          name: req.name,
          category: req.category,
          userProficiency: capitalizedUserProf,
          requiredProficiency: req.minProficiency,
          importance: req.importance,
          status: 'Improvement Needed',
          scoreContribution: parseFloat(partialWeight.toFixed(2))
        });

        improvementSkills.push({
          name: req.name,
          category: req.category,
          userProficiency: capitalizedUserProf,
          requiredProficiency: req.minProficiency,
          gapSummary: `Current proficiency (${capitalizedUserProf}) is below role benchmark (${req.minProficiency}). Practical projects and advanced topics recommended.`
        });
      }
    } else {
      // Missing skill
      let priority = 'Medium';
      if (importanceKey === 'core') priority = 'Critical';
      else if (importanceKey === 'recommended') priority = 'High';
      else priority = 'Nice to have';

      missingSkills.push({
        name: req.name,
        category: req.category,
        importance: req.importance,
        priority,
        description: req.description || `Key competency required for ${role.title}`
      });
    }
  });

  const matchPercentage = totalPossibleWeight > 0 
    ? Math.min(100, Math.max(0, Math.round((earnedWeight / totalPossibleWeight) * 100))) 
    : 0;

  const coreSkillsMatchRate = corePossibleWeight > 0
    ? Math.round((coreEarnedWeight / corePossibleWeight) * 100)
    : 0;

  const recommendedSkillsMatchRate = recPossibleWeight > 0
    ? Math.round((recEarnedWeight / recPossibleWeight) * 100)
    : 0;

  // Generate actionable recommendations based on gap analysis
  const recommendations = [];
  if (missingSkills.some(s => s.priority === 'Critical')) {
    const criticalNames = missingSkills.filter(s => s.priority === 'Critical').slice(0, 3).map(s => s.name).join(', ');
    recommendations.push(`Priority 1: Master critical core skills (${criticalNames}) required for foundational competence in ${role.title}.`);
  }
  if (improvementSkills.length > 0) {
    const improveNames = improvementSkills.slice(0, 2).map(s => s.name).join(' & ');
    recommendations.push(`Priority 2: Deepen existing proficiency in ${improveNames} to reach intermediate/advanced production level.`);
  }
  if (role.projectSuggestions && role.projectSuggestions.length > 0) {
    recommendations.push(`Portfolio Action: Build "${role.projectSuggestions[0].title}" to tangibly demonstrate end-to-end practical capability.`);
  }
  recommendations.push(`Routine: Dedicate consistent weekly blocks to hands-on exercises rather than passive video consumption.`);

  const scoringExplanation = `Match score is deterministically calculated using weighted criteria: Core requirements carry 1.2x weight, Recommended carry 0.8x, and Optional carry 0.5x. Skills meeting minimum proficiency earn 100% weight, while partially proficient skills earn proportional partial credit. Score is purely an educational benchmark and does not guarantee employment.`;

  const executiveSummary = `You currently match ${matchPercentage}% of the benchmark requirements for ${role.title}. You possess ${matchedSkills.filter(s => s.status === 'Matched').length} fully aligned skills, have ${improvementSkills.length} skills with room for deeper mastery, and have ${missingSkills.length} skills to acquire.`;

  return {
    targetRole: role.title,
    targetRoleSlug: role.slug,
    matchPercentage,
    scoringMethod: 'Deterministic weighted baseline matching',
    scoringExplanation,
    executiveSummary,
    scoreBreakdown: {
      coreSkillsMatchRate,
      recommendedSkillsMatchRate,
      proficiencyScore: Math.round(earnedWeight * 10) / 10,
      matchedCount: matchedSkills.filter(s => s.status === 'Matched').length,
      improveCount: improvementSkills.length,
      missingCount: missingSkills.length,
      totalRequiredCount: role.requiredSkills.length
    },
    matchedSkills,
    missingSkills,
    improvementSkills,
    recommendations
  };
};

module.exports = {
  calculateSkillGap,
  PROFICIENCY_LEVELS,
  IMPORTANCE_WEIGHTS
};
