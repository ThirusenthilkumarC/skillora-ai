/**
 * Structured Learning Roadmap Generation Service
 * Synthesizes skill gaps, priorities, and weekly hours into a practical 8-week actionable plan.
 */

const generateRoadmap = ({
  targetRole,
  missingSkills = [],
  improvementSkills = [],
  weeklyStudyHours = 10,
  analysisType = 'rule-based'
}) => {
  const weeks = 8;
  const hoursPerWeek = Math.max(5, Math.min(40, weeklyStudyHours || 10));

  // Collect prioritized learning items
  const learningFocusList = [];

  // 1. Critical Missing Skills
  missingSkills
    .filter(s => s.priority === 'Critical')
    .forEach(s => learningFocusList.push({ skill: s.name, type: 'Critical Missing', category: s.category }));

  // 2. Improvement Needed
  improvementSkills
    .forEach(s => learningFocusList.push({ skill: s.name, type: 'Deepen Mastery', category: s.category }));

  // 3. Other Missing Skills
  missingSkills
    .filter(s => s.priority !== 'Critical')
    .forEach(s => learningFocusList.push({ skill: s.name, type: 'Recommended Skill', category: s.category }));

  // Fallback if user already has almost everything
  if (learningFocusList.length === 0) {
    learningFocusList.push(
      { skill: 'Production System Architecture', type: 'Advanced Specialization', category: 'Backend' },
      { skill: 'High Performance & Testing', type: 'Advanced Specialization', category: 'Tools' },
      { skill: 'Cloud & Automated CI/CD', type: 'Advanced Specialization', category: 'DevOps' }
    );
  }

  const weeklyGoals = [];

  for (let w = 1; w <= weeks; w++) {
    const focusIndex = (w - 1) % learningFocusList.length;
    const currentFocus = learningFocusList[focusIndex];
    const skillName = currentFocus.skill;

    let weekTitle = '';
    let weekFocus = '';
    let miniProjectTitle = '';
    let miniProjectDesc = '';
    let miniDeliverable = '';

    if (w <= 2) {
      weekTitle = `Phase 1: ${skillName} Core Fundamentals`;
      weekFocus = `Build foundational understanding, syntax, core concepts, and key principles for ${skillName}.`;
      miniProjectTitle = `${skillName} Sandbox Prototype`;
      miniProjectDesc = `Construct a minimal isolated application testing core syntax, input handling, and output validations.`;
      miniDeliverable = `GitHub repository with clean code, README documentation, and passing basic tests.`;
    } else if (w <= 4) {
      weekTitle = `Phase 2: ${skillName} Architecture & Patterns`;
      weekFocus = `Implement design patterns, error handling, state management, and real-world workflows.`;
      miniProjectTitle = `${skillName} Service Integration`;
      miniProjectDesc = `Build a functional feature integrating asynchronous operations, data validation, and modular components.`;
      miniDeliverable = `Working interactive feature with structured error boundaries and unit tests.`;
    } else if (w <= 6) {
      weekTitle = `Phase 3: Real-World Engineering & Integration`;
      weekFocus = `Connect multiple skills together into an end-to-end production flow with security and performance considerations.`;
      miniProjectTitle = `End-to-End ${targetRole} Feature Module`;
      miniProjectDesc = `Create a full vertical slice connecting frontend user interactions to backend persistence and API contracts.`;
      miniDeliverable = `Deployed live demo with documented API specifications and responsive design.`;
    } else {
      weekTitle = `Phase 4: Capstone Portfolio & Interview Readiness`;
      weekFocus = `Refine edge cases, write comprehensive documentation, optimize performance metrics, and rehearse technical interview questions.`;
      miniProjectTitle = `Production Showcase Capstone`;
      miniProjectDesc = `Polish an enterprise-grade showcase project demonstrating mastery of ${targetRole} core competencies.`;
      miniDeliverable = `Production deployment link (e.g. Vercel/Render) and recorded 2-minute architectural walkthrough video.`;
    }

    const taskHours = Math.round(hoursPerWeek / 3);

    const tasks = [
      {
        id: `w${w}-t1`,
        title: `Deep-Dive Documentation & Concept Review: ${skillName}`,
        description: `Read official documentation and architectural guides on ${skillName}. Understand design trade-offs and best practices.`,
        skillCategory: currentFocus.category || 'Fundamental',
        estimatedHours: taskHours,
        completed: false,
        resourceSuggestion: `Official ${skillName} Documentation and MDN Web Docs`
      },
      {
        id: `w${w}-t2`,
        title: `Hands-on Exercises & Problem Solving with ${skillName}`,
        description: `Write code from scratch implementing 3 practical patterns without relying on copy-paste code.`,
        skillCategory: currentFocus.category || 'Implementation',
        estimatedHours: taskHours,
        completed: false,
        resourceSuggestion: `Interactive coding challenges and open-source GitHub examples`
      },
      {
        id: `w${w}-t3`,
        title: `Mini-Project Implementation: ${miniProjectTitle}`,
        description: `Complete the weekly mini-project deliverable: ${miniDeliverable}. Review code against clean coding guidelines.`,
        skillCategory: 'Project & Portfolio',
        estimatedHours: hoursPerWeek - (taskHours * 2),
        completed: false,
        resourceSuggestion: `Project starter template and Git version control`
      }
    ];

    weeklyGoals.push({
      weekNumber: w,
      title: weekTitle,
      focus: weekFocus,
      targetSkill: skillName,
      tasks,
      miniProject: {
        title: miniProjectTitle,
        description: miniProjectDesc,
        deliverable: miniDeliverable,
        completed: false
      }
    });
  }

  const milestones = [
    {
      id: 'm1',
      title: 'Foundation Established',
      description: 'Mastery of primary missing core competencies verified through isolated prototypes.',
      targetWeek: 2,
      completed: false
    },
    {
      id: 'm2',
      title: 'Architectural Proficiency',
      description: 'Successful integration of data models, state handling, and resilient API communication.',
      targetWeek: 4,
      completed: false
    },
    {
      id: 'm3',
      title: 'Full-System Capability',
      description: 'End-to-end full vertical feature tested, styled, and operating under edge conditions.',
      targetWeek: 6,
      completed: false
    },
    {
      id: 'm4',
      title: 'Portfolio & Interview Ready',
      description: 'Polished capstone project deployed online with clear architectural documentation and interview narratives.',
      targetWeek: 8,
      completed: false
    }
  ];

  const totalTasks = weeklyGoals.reduce((sum, g) => sum + g.tasks.length, 0);

  return {
    targetRole,
    totalWeeks: weeks,
    estimatedWeeklyHours: hoursPerWeek,
    completionStatus: {
      completedTasks: 0,
      totalTasks,
      percentage: 0
    },
    milestones,
    weeklyGoals,
    generationType: analysisType
  };
};

module.exports = {
  generateRoadmap
};
