const rolesData = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Web Development',
    icon: 'Layout',
    shortDescription: 'Build intuitive, responsive, and high-performance client-side web applications.',
    description: 'A Frontend Developer specializes in creating engaging, accessible, and high-performance user interfaces for modern web applications using modern JavaScript frameworks, CSS architectures, and browser APIs.',
    marketDemand: 'Very High',
    avgSalary: '$75,000 - $125,000',
    requiredSkills: [
      { name: 'HTML5 & Semantic Markup', category: 'Frontend', importance: 'Core', minProficiency: 'Advanced', weight: 1.0, description: 'Accessible markup, SEO fundamentals, and DOM structure.' },
      { name: 'CSS3 & Modern Layouts', category: 'Frontend', importance: 'Core', minProficiency: 'Advanced', weight: 1.0, description: 'Flexbox, CSS Grid, media queries, CSS variables, animations.' },
      { name: 'JavaScript (ES6+)', category: 'Frontend', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Async/await, Promises, closures, modules, event loop, DOM manipulation.' },
      { name: 'React.js', category: 'Frontend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.2, description: 'Hooks, component lifecycle, state management, memoization.' },
      { name: 'Tailwind CSS', category: 'Frontend', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Utility-first styling, responsive design tokens, component styling.' },
      { name: 'TypeScript', category: 'Frontend', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'Static typing, interfaces, generics, type guards in frontend apps.' },
      { name: 'Git & GitHub', category: 'Tools & Version Control', importance: 'Core', minProficiency: 'Intermediate', weight: 0.8, description: 'Branching, PRs, merge conflicts, code collaboration.' },
      { name: 'REST API Integration', category: 'Frontend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Axios/Fetch, handling loading/error states, auth headers, token refresh.' },
      { name: 'Web Performance & Accessibility (a11y)', category: 'Frontend', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.7, description: 'Lighthouse audits, ARIA attributes, Core Web Vitals.' },
      { name: 'Testing (Jest / Vitest)', category: 'Tools & Version Control', importance: 'Optional', minProficiency: 'Beginner', weight: 0.5, description: 'Unit testing components and user interaction testing.' }
    ],
    projectSuggestions: [
      {
        title: 'Collaborative Kanban Board & Task Manager',
        difficulty: 'Intermediate',
        description: 'Drag-and-drop workflow dashboard featuring optimistic UI updates, local storage sync, and custom filtering.',
        technologies: ['React', 'Tailwind CSS', 'dnd-kit', 'TypeScript'],
        portfolioImpact: 'High'
      },
      {
        title: 'SaaS Analytics Dashboard with Live Widgets',
        difficulty: 'Intermediate',
        description: 'Responsive financial/product telemetry interface with Recharts, dark mode toggle, and multi-tenant UI mockups.',
        technologies: ['React', 'Recharts', 'Tailwind CSS', 'Axios'],
        portfolioImpact: 'Very High'
      },
      {
        title: 'Headless E-Commerce Storefront',
        difficulty: 'Advanced',
        description: 'Instant search, shopping cart state management, checkout simulation, and responsive mobile-first catalog.',
        technologies: ['React', 'TypeScript', 'Context API / Zustand', 'Tailwind'],
        portfolioImpact: 'Extremely High'
      }
    ],
    learningTopics: [
      { topic: 'JavaScript Engine & Asynchronous Execution', priority: 'High', resources: ['MDN Web Docs: Event Loop', 'JavaScript.info: Promises & Async'] },
      { topic: 'Component Design Patterns & State Architecture', priority: 'High', resources: ['React Official Docs: Thinking in React', 'Patterns.dev: React Design Patterns'] },
      { topic: 'CSS Grid & Modern Fluid Typography', priority: 'Medium', resources: ['CSS Tricks Grid Guide', 'web.dev Responsive Design'] }
    ],
    interviewPrepFocus: ['Virtual DOM reconciliation', 'Closures & Scope', 'CSS Box Model & Specificity', 'Debounce & Throttle Implementations']
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    category: 'Backend & Cloud',
    icon: 'Server',
    shortDescription: 'Engineer resilient APIs, microservices, databases, and secure server architectures.',
    description: 'A Backend Developer designs and implements robust server-side logic, secure RESTful and GraphQL APIs, high-throughput database interactions, caching strategies, and authentication systems.',
    marketDemand: 'Very High',
    avgSalary: '$85,000 - $135,000',
    requiredSkills: [
      { name: 'Node.js & Express.js', category: 'Backend', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Event loop, middleware pipeline, streams, asynchronous routing.' },
      { name: 'RESTful API Design', category: 'Backend', importance: 'Core', minProficiency: 'Advanced', weight: 1.1, description: 'Status codes, URI conventions, payload validation, pagination.' },
      { name: 'MongoDB & Mongoose', category: 'Database', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Schema modeling, indexing, aggregation pipelines, validation.' },
      { name: 'SQL & Relational Databases (PostgreSQL)', category: 'Database', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'Joins, foreign keys, normalization, ACID transactions.' },
      { name: 'Authentication & Security (JWT, bcrypt)', category: 'Backend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Token validation, password hashing, CORS, rate limiting, helmet.' },
      { name: 'Git & GitHub', category: 'Tools & Version Control', importance: 'Core', minProficiency: 'Intermediate', weight: 0.8, description: 'Version control, feature branches, semantic releases.' },
      { name: 'Caching & Redis', category: 'Backend', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.7, description: 'In-memory key-value caching, session stores, TTL strategies.' },
      { name: 'Docker & Containerization', category: 'DevOps & Cloud', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.8, description: 'Dockerfiles, containerized microservices, multi-stage builds.' },
      { name: 'Automated Testing (Supertest / Jest)', category: 'Tools & Version Control', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.7, description: 'Integration tests for endpoints and unit tests for services.' }
    ],
    projectSuggestions: [
      {
        title: 'Multi-Tenant RBAC Authentication & API Gateway',
        difficulty: 'Intermediate',
        description: 'Scalable auth microservice with JWT token rotation, role-based access control, and rate-limiting middleware.',
        technologies: ['Node.js', 'Express', 'JWT', 'bcrypt', 'Redis'],
        portfolioImpact: 'High'
      },
      {
        title: 'E-Commerce Order Processing & Inventory Engine',
        difficulty: 'Advanced',
        description: 'Backend handling concurrent transactions, inventory locks, webhook event emitters, and payment mocks.',
        technologies: ['Node.js', 'PostgreSQL / MongoDB', 'Docker', 'Express'],
        portfolioImpact: 'Very High'
      }
    ],
    learningTopics: [
      { topic: 'Database Indexing & Query Optimization', priority: 'High', resources: ['Use The Index, Luke!', 'MongoDB University: Performance'] },
      { topic: 'Microservices & Distributed Systems Basics', priority: 'Medium', resources: ['Designing Data-Intensive Applications summary'] }
    ],
    interviewPrepFocus: ['Concurrency & Event Loop in Node.js', 'SQL vs NoSQL trade-offs', 'Authentication flows (JWT vs Session)', 'Idempotency in APIs']
  },
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Full Stack',
    icon: 'Layers',
    shortDescription: 'Master the end-to-end spectrum from fluid UI experiences to scalable server-side systems.',
    description: 'A Full Stack Developer bridges client and server domains, creating complete digital products from UI/UX interfaces to scalable APIs, databases, authentication, and deployment pipelines.',
    marketDemand: 'Exponential',
    avgSalary: '$90,000 - $145,000',
    requiredSkills: [
      { name: 'JavaScript & Modern ES6+', category: 'Fundamental', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Universal JavaScript proficiency across both client and server.' },
      { name: 'React.js', category: 'Frontend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Component architecture, state, hooks, routing.' },
      { name: 'Node.js & Express.js', category: 'Backend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'REST APIs, middleware, controllers, business logic.' },
      { name: 'MongoDB / SQL Databases', category: 'Database', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Data modeling, CRUD operations, relationships, queries.' },
      { name: 'Tailwind CSS', category: 'Frontend', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Rapid, responsive, accessible UI component engineering.' },
      { name: 'Authentication (JWT & OAuth)', category: 'Backend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Secure user onboarding, sessions, protected routes.' },
      { name: 'Git & GitHub Collaboration', category: 'Tools & Version Control', importance: 'Core', minProficiency: 'Intermediate', weight: 0.8, description: 'Version control workflow, PR reviews, CI/CD basics.' },
      { name: 'TypeScript', category: 'Fundamental', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.8, description: 'Type-safe contracts across frontend and backend codebases.' },
      { name: 'Cloud Deployment & DevOps (Vercel/Render)', category: 'DevOps & Cloud', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.7, description: 'Environment variables, domain setup, production builds.' }
    ],
    projectSuggestions: [
      {
        title: 'Skillora AI - Career Intelligence Platform',
        difficulty: 'Advanced',
        description: 'End-to-end career platform featuring resume parsing, skill matching algorithms, roadmap trackers, and automated reports.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Recharts'],
        portfolioImpact: 'Extremely High'
      },
      {
        title: 'Full-Stack Project Management SaaS with Real-time Updates',
        difficulty: 'Advanced',
        description: 'Team workspaces, task boards, automated notifications, activity feeds, and metric dashboards.',
        technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Tailwind'],
        portfolioImpact: 'Very High'
      }
    ],
    learningTopics: [
      { topic: 'End-to-End System Architecture', priority: 'High', resources: ['Full Stack Open (University of Helsinki)', 'System Design Primer'] },
      { topic: 'Web Security (OWASP Top 10)', priority: 'High', resources: ['OWASP Cheat Sheet Series'] }
    ],
    interviewPrepFocus: ['Data flow from client to DB and back', 'State management strategies', 'CORS & Cookie vs Bearer token security', 'Database normalization vs denormalization']
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & Product',
    icon: 'Figma',
    shortDescription: 'Craft intuitive human-centered product designs, design systems, and user journeys.',
    description: 'A UI/UX Designer combines user research, wireframing, high-fidelity interactive prototyping, design systems, and usability testing to solve user problems and create delightful software experiences.',
    marketDemand: 'High',
    avgSalary: '$70,000 - $115,000',
    requiredSkills: [
      { name: 'Figma & Component Systems', category: 'Design', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Auto-layout, responsive variants, design tokens, interactive prototypes.' },
      { name: 'User Research & Persona Mapping', category: 'Design', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'User interviews, journey mapping, empathy maps, usability tests.' },
      { name: 'Wireframing & Information Architecture', category: 'Design', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Low to mid-fidelity wireframes, site hierarchy, task flows.' },
      { name: 'Typography & Color Theory', category: 'Design', importance: 'Core', minProficiency: 'Advanced', weight: 1.0, description: 'Visual hierarchy, accessible contrast ratios (WCAG AA/AAA), font pairings.' },
      { name: 'Responsive Design & Design Systems', category: 'Design', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Scalable design tokens, breakpoint grids, multi-platform consistency.' },
      { name: 'HTML & CSS Fundamentals', category: 'Frontend', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.7, description: 'Understanding developer constraints, flexbox, grid, and CSS capabilities.' },
      { name: 'Micro-interactions & Prototyping', category: 'Design', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Smart animate, transitions, motion curves, feedback states.' }
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Fintech Dashboard Design System',
        difficulty: 'Intermediate',
        description: 'Comprehensive Figma design library with 60+ components, dark/light modes, WCAG AA compliance audit, and responsive mobile mockups.',
        technologies: ['Figma', 'FigJam', 'Tokens Studio', 'Zeroheight'],
        portfolioImpact: 'High'
      },
      {
        title: 'Healthcare Patient Portal & Telehealth Mobile App',
        difficulty: 'Advanced',
        description: 'Complete UX case study with qualitative user interviews, user journey maps, usability testing results, and interactive prototype.',
        technologies: ['Figma', 'Miro', 'Maze Usability Testing'],
        portfolioImpact: 'Extremely High'
      }
    ],
    learningTopics: [
      { topic: 'Atomic Design Methodology & Tokenization', priority: 'High', resources: ['Brad Frost: Atomic Design', 'Google Material Design Guidelines'] },
      { topic: 'WCAG Accessibility Standards', priority: 'High', resources: ['W3C Web Accessibility Guidelines'] }
    ],
    interviewPrepFocus: ['Explaining design decisions with user data', 'Design critique methodology', 'Handoff to developers', 'Trade-offs between aesthetic and usability']
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    icon: 'BarChart3',
    shortDescription: 'Transform raw enterprise data into strategic insights, KPIs, and interactive dashboards.',
    description: 'A Data Analyst extracts, cleans, models, and visualizes complex datasets to reveal patterns, track key metrics, evaluate business hypotheses, and drive data-informed decision-making.',
    marketDemand: 'Very High',
    avgSalary: '$70,000 - $115,000',
    requiredSkills: [
      { name: 'SQL (Advanced Queries & Joins)', category: 'Database', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Window functions, CTEs, subqueries, group by, joins, query optimization.' },
      { name: 'Python for Data Analysis (Pandas & NumPy)', category: 'AI & Data', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Data wrangling, cleaning missing values, aggregations, vectorization.' },
      { name: 'Data Visualization (PowerBI / Tableau / Seaborn)', category: 'AI & Data', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Building intuitive dashboards, KPI trackers, visual storytelling.' },
      { name: 'Excel & Advanced Spreadsheet Modeling', category: 'Tools & Version Control', importance: 'Core', minProficiency: 'Advanced', weight: 0.9, description: 'Pivot tables, VLOOKUP/XLOOKUP, index-match, power query, macros.' },
      { name: 'Statistical Analysis & Hypothesis Testing', category: 'AI & Data', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'A/B testing, standard deviation, p-values, distributions, correlation.' },
      { name: 'Data Cleaning & ETL Pipelines', category: 'AI & Data', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Handling outliers, categorical encoding, date parsing, pipeline scripts.' }
    ],
    projectSuggestions: [
      {
        title: 'Customer Churn Analysis & Retention Strategy',
        difficulty: 'Intermediate',
        description: 'Comprehensive exploratory data analysis uncovering churn drivers with correlation matrices and an interactive PowerBI executive summary.',
        technologies: ['Python', 'Pandas', 'Seaborn', 'PowerBI', 'SQL'],
        portfolioImpact: 'High'
      },
      {
        title: 'E-Commerce Sales Performance & Cohort Analysis',
        difficulty: 'Advanced',
        description: 'Deep-dive cohort retention model using complex SQL queries and Python visualizations to track customer lifetime value (LTV).',
        technologies: ['PostgreSQL', 'Python', 'Jupyter', 'Tableau'],
        portfolioImpact: 'Very High'
      }
    ],
    learningTopics: [
      { topic: 'SQL Window Functions & Analytical Partitioning', priority: 'High', resources: ['Mode Analytics SQL Tutorial', 'LeetCode Database Practice'] },
      { topic: 'Statistical Experimentation & A/B Testing', priority: 'High', resources: ['Kaggle Learn: Data Visualization & Intro to Stats'] }
    ],
    interviewPrepFocus: ['Window functions (ROW_NUMBER, RANK, LEAD, LAG)', 'Interpreting statistical significance', 'Handling dirty and missing data', 'Dashboard design for C-suite']
  },
  {
    slug: 'python-developer',
    title: 'Python Developer',
    category: 'Software Engineering',
    icon: 'Terminal',
    shortDescription: 'Build scalable automated tools, robust backend APIs, and data processing workflows in Python.',
    description: 'A Python Developer writes modular, readable, and highly maintainable Python software for server-side APIs, task automation, web scraping, data pipelines, and distributed applications.',
    marketDemand: 'Very High',
    avgSalary: '$80,000 - $130,000',
    requiredSkills: [
      { name: 'Python Core & OOP (3.10+)', category: 'Fundamental', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Generators, decorators, list comprehensions, classes, dunder methods, type hinting.' },
      { name: 'FastAPI / Flask / Django', category: 'Backend', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'REST APIs, Pydantic schemas, dependency injection, ORMs (SQLAlchemy).' },
      { name: 'SQL & Database ORMs', category: 'Database', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'SQLAlchemy, Alembic migrations, PostgreSQL, relational modeling.' },
      { name: 'Asynchronous Programming (asyncio)', category: 'Backend', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'Async tasks, coroutines, concurrent requests, event loops in Python.' },
      { name: 'Web Scraping & Automation (BeautifulSoup / Playwright)', category: 'Tools & Version Control', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Parsing dynamic DOMs, automated headless browser workflows.' },
      { name: 'Docker & Virtual Environments (Poetry / venv)', category: 'DevOps & Cloud', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Dependency locking, multi-stage Docker builds, environment isolation.' },
      { name: 'Testing with PyTest', category: 'Tools & Version Control', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.7, description: 'Fixtures, mocking, parameterized tests, test coverage metrics.' }
    ],
    projectSuggestions: [
      {
        title: 'Asynchronous Job Board Scraper & API Hub',
        difficulty: 'Intermediate',
        description: 'Scrapes live tech job listings concurrently using Playwright/asyncio, deduplicates in PostgreSQL, and serves via FastAPI with Swagger docs.',
        technologies: ['Python', 'FastAPI', 'Playwright', 'PostgreSQL', 'Docker'],
        portfolioImpact: 'High'
      },
      {
        title: 'Automated Document Intelligence & PDF Summarizer CLI/API',
        difficulty: 'Advanced',
        description: 'CLI tool and REST API that parses multi-page PDFs, extracts tabular data, and generates structured JSON reports.',
        technologies: ['Python', 'FastAPI', 'PyPDF', 'Click', 'PyTest'],
        portfolioImpact: 'Very High'
      }
    ],
    learningTopics: [
      { topic: 'Python Memory Management & Metaprogramming', priority: 'Medium', resources: ['Fluent Python by Luciano Ramalho'] },
      { topic: 'High-Performance Asynchronous APIs with FastAPI', priority: 'High', resources: ['FastAPI Official Documentation'] }
    ],
    interviewPrepFocus: ['Python GIL (Global Interpreter Lock)', 'Decorators and Generators implementation', 'Mutable vs Immutable defaults', 'Memory management & Garbage Collection']
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    icon: 'Cpu',
    shortDescription: 'Design, fine-tune, and deploy intelligent machine learning systems and LLM applications.',
    description: 'An AI/ML Engineer operationalizes predictive models and generative AI systems, orchestrating training pipelines, vector databases, LLM agents, and high-performance inference endpoints.',
    marketDemand: 'Exponential',
    avgSalary: '$100,000 - $165,000',
    requiredSkills: [
      { name: 'Python & Scientific Stack (NumPy, SciPy, Pandas)', category: 'AI & Data', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Vector math, matrix transformations, feature preprocessing.' },
      { name: 'Machine Learning Fundamentals (Scikit-Learn)', category: 'AI & Data', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Supervised/unsupervised algorithms, evaluation metrics (ROC-AUC, F1, RMSE).' },
      { name: 'Deep Learning (PyTorch / TensorFlow)', category: 'AI & Data', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Neural network architectures, backpropagation, optimizers, transfer learning.' },
      { name: 'LLMs, Prompt Engineering & RAG Systems', category: 'AI & Data', importance: 'Core', minProficiency: 'Intermediate', weight: 1.2, description: 'Retrieval Augmented Generation, vector embeddings, chunking strategies.' },
      { name: 'Vector Databases (Pinecone / Chroma / FAISS)', category: 'Database', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'Cosine similarity search, indexing high-dimensional embeddings.' },
      { name: 'Model Deployment & Serving (FastAPI / Triton / ONNX)', category: 'Backend', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'Low-latency inference APIs, model quantization, containerization.' },
      { name: 'Git & MLOps Basics', category: 'DevOps & Cloud', importance: 'Recommended', minProficiency: 'Beginner', weight: 0.7, description: 'Model versioning (DVC/MLflow), reproducibility, monitoring drift.' }
    ],
    projectSuggestions: [
      {
        title: 'Context-Aware Enterprise RAG Documentation Assistant',
        difficulty: 'Advanced',
        description: 'End-to-end question-answering assistant embedding technical documentation with ChromaDB and hybrid semantic search.',
        technologies: ['Python', 'LangChain / LlamaIndex', 'ChromaDB', 'FastAPI', 'OpenAI/Gemini'],
        portfolioImpact: 'Extremely High'
      },
      {
        title: 'Customer Sentiment & Intent Classification Pipeline',
        difficulty: 'Intermediate',
        description: 'Fine-tuned transformer model (DistilBERT) for multi-class classification deployed as a Dockerized inference microservice.',
        technologies: ['PyTorch', 'Hugging Face Transformers', 'FastAPI', 'Docker'],
        portfolioImpact: 'Very High'
      }
    ],
    learningTopics: [
      { topic: 'Transformer Architecture & Self-Attention Mechanisms', priority: 'High', resources: ['The Illustrated Transformer (Jay Alammar)', 'DeepLearning.AI: GenAI Specialization'] },
      { topic: 'Retrieval Augmented Generation (RAG) Architecture', priority: 'High', resources: ['Pinecone Learning Center: Vector Search'] }
    ],
    interviewPrepFocus: ['Bias-Variance trade-off and regularization', 'Transformer self-attention calculation', 'Mitigating LLM hallucination in production', 'Quantization (int8, 4-bit) & inference latency']
  },
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security & Infrastructure',
    icon: 'ShieldCheck',
    shortDescription: 'Protect critical infrastructure, monitor threat telemetry, and remediate vulnerabilities.',
    description: 'A Cybersecurity Analyst guards networks, cloud workloads, and applications against malicious attacks, conducting vulnerability assessments, security audits, incident response, and compliance monitoring.',
    marketDemand: 'Very High',
    avgSalary: '$80,000 - $130,000',
    requiredSkills: [
      { name: 'Networking Fundamentals (TCP/IP, DNS, OSI Model)', category: 'Fundamental', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'Subnetting, packet routing, TLS/SSL handshakes, common network ports.' },
      { name: 'Security Information & Event Management (SIEM)', category: 'Cybersecurity', importance: 'Core', minProficiency: 'Intermediate', weight: 1.1, description: 'Log analysis, alert triage, query generation in Splunk / ELK / Wazuh.' },
      { name: 'Vulnerability Scanning & Assessment (Nessus / Nmap)', category: 'Cybersecurity', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'Port scanning, service discovery, CVE identification, CVSS scoring.' },
      { name: 'Web Application Security (OWASP Top 10)', category: 'Cybersecurity', importance: 'Core', minProficiency: 'Advanced', weight: 1.2, description: 'SQLi, XSS, CSRF, SSRF, broken access control, security headers.' },
      { name: 'Linux System Administration & Shell Scripting', category: 'Tools & Version Control', importance: 'Core', minProficiency: 'Intermediate', weight: 1.0, description: 'File permissions, iptables/ufw, grep/awk/sed, Bash automation.' },
      { name: 'Incident Response & Threat Hunting Basics', category: 'Cybersecurity', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.9, description: 'Triage methodology, memory analysis basics, forensic timelines.' },
      { name: 'Identity & Access Management (IAM / MFA / OAuth)', category: 'Cybersecurity', importance: 'Recommended', minProficiency: 'Intermediate', weight: 0.8, description: 'Principle of least privilege, zero trust architecture, token validation.' }
    ],
    projectSuggestions: [
      {
        title: 'SOC Home Lab & Automated Threat Detection Pipeline',
        difficulty: 'Intermediate',
        description: 'Simulated enterprise network using virtual machines, forwarding security telemetry to Wazuh/ELK with automated alert rules.',
        technologies: ['Wazuh / Splunk', 'Linux', 'Snort IDS', 'Bash Scripting'],
        portfolioImpact: 'High'
      },
      {
        title: 'Comprehensive Web Application Penetration Test Report',
        difficulty: 'Advanced',
        description: 'Vulnerability assessment of an intentionally vulnerable app (OWASP Juice Shop), detailing exploitation steps and remediation patches.',
        technologies: ['Burp Suite', 'Nmap', 'OWASP ZAP', 'CVSS Calculator'],
        portfolioImpact: 'Extremely High'
      }
    ],
    learningTopics: [
      { topic: 'OWASP Top 10 Deep Dive & Remediation', priority: 'High', resources: ['PortSwigger Web Security Academy'] },
      { topic: 'Network Defense & Packet Analysis', priority: 'High', resources: ['Wireshark Documentation & OverTheWire Bandit'] }
    ],
    interviewPrepFocus: ['Detailed breakdown of a 3-way TCP handshake', 'OWASP Top 10 vulnerabilities & code remedies', 'Incident response steps (NIST SP 800-61)', 'Difference between symmetric and asymmetric encryption']
  }
];

module.exports = rolesData;
