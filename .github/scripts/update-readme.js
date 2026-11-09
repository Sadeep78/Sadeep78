const fs = require('fs');
const path = require('path');

const USERNAME = 'Sadeep78';
const README_PATH = path.join(__dirname, '../../README.md');

// Known badges for detected programming languages
const LANGUAGE_BADGES = {
  'Java': '<img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java" />',
  'Python': '<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />',
  'Kotlin': '<img src="https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white" alt="Kotlin" />',
  'TypeScript': '<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />',
  'JavaScript': '<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />',
  'C++': '<img src="https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white" alt="C++" />',
  'SQL': '<img src="https://img.shields.io/badge/SQL-025E8C?style=flat-square&logo=database&logoColor=white" alt="SQL" />',
  'HTML': '<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />',
  'CSS': '<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />',
  'Go': '<img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go" />',
  'Rust': '<img src="https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white" alt="Rust" />',
  'C#': '<img src="https://img.shields.io/badge/C%23-239120?style=flat-square&logo=c-sharp&logoColor=white" alt="C#" />',
  'Swift': '<img src="https://img.shields.io/badge/Swift-FA7343?style=flat-square&logo=swift&logoColor=white" alt="Swift" />',
  'Dart': '<img src="https://img.shields.io/badge/Dart-0175C2?style=flat-square&logo=dart&logoColor=white" alt="Dart" />',
  'PHP': '<img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP" />'
};

// Rich curated metadata for flagship projects
const PROJECT_METADATA = {
  'pdpa-audit-mcp': {
    title: '🛡️ PDPA Audit MCP Server',
    desc: "Open-source compliance & technical hygiene audit toolkit aligned with Sri Lanka's Personal Data Protection Act (PDPA No. 9 of 2022). Exposes 9 specialized MCP tools with 240+ passing tests.",
    badges: [
      '<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />',
      '<img src="https://img.shields.io/badge/FastMCP-8A2BE2?style=flat-square&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Compliance-00C853?style=flat-square" />'
    ]
  },
  'peregrine-geo': {
    title: '🦅 Peregrine Geo',
    desc: 'Enterprise-grade Android mock-location client, kinematic simulation engine & cloud fleet management console built with clean MVI architecture, API 29+ compatibility, and security hardening.',
    badges: [
      '<img src="https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Kinematics-00B0FF?style=flat-square" />'
    ]
  },
  'learn-arduino-pro': {
    title: '⚡ Learn Arduino Pro',
    desc: 'Interactive physical computing & Arduino learning web platform featuring real-time electronic circuit simulation, 3D digital twins, and cycle-accurate AVR emulation.',
    badges: [
      '<img src="https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB" />',
      '<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js&logoColor=white" />',
      '<img src="https://img.shields.io/badge/AVR_Simulation-00979D?style=flat-square&logo=arduino&logoColor=white" />'
    ]
  },
  'foodsense': {
    title: '🥗 FoodSense',
    desc: 'AI-powered demand forecasting and perishable food waste analytics SaaS dashboard engineered for restaurants, commercial kitchens, and supermarket chains in Sri Lanka.',
    badges: [
      '<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />',
      '<img src="https://img.shields.io/badge/AI_Analytics-FF6F00?style=flat-square" />'
    ]
  },
  'SerendibSuite': {
    title: '📸 SerendibSuite',
    desc: 'AI-assisted workflow platform tailored for solo and small-team event photographers in Sri Lanka, combining automated booking management with intelligent photo curation.',
    badges: [
      '<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />',
      '<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Workflow_Automation-7B2CBF?style=flat-square" />'
    ]
  },
  'travel-website': {
    title: '🌍 Travel Partner Platform',
    desc: 'Full-stack travel management web application featuring interactive destination discovery, tour booking, user authentication, and an administrative control center.',
    badges: [
      '<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" />',
      '<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" />',
      '<img src="https://img.shields.io/badge/REST_API-025E8C?style=flat-square" />'
    ]
  },
  'bakery-dashboard': {
    title: '🎂 Bakery & Cake Booking System',
    desc: 'Enterprise bakery ordering platform engineered with clean OOP principles, dynamic cake customizer, real-time inventory management, and role-based access control.',
    badges: [
      '<img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" />',
      '<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" />',
      '<img src="https://img.shields.io/badge/OOP-00599C?style=flat-square" />'
    ]
  },
  'vulnpulse': {
    title: '🛡️ VulnPulse',
    desc: 'Vulnerability assessment and automated security audit utility built to scan and track software dependencies and vulnerabilities with real-time insight.',
    badges: [
      '<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />',
      '<img src="https://img.shields.io/badge/Security-E53935?style=flat-square" />',
      '<img src="https://img.shields.io/badge/Automation-43A047?style=flat-square" />'
    ]
  },
  'OneManArmy.exe': {
    title: '⚡ OneManArmy.exe',
    desc: 'Rapidly engineered hackathon solo project for CodeFuse 3.0 — high-velocity prototyping, end-to-end execution, and algorithmic problem solving under pressure.',
    badges: [
      '<img src="https://img.shields.io/badge/CodeFuse_3.0-00E5FF?style=flat-square" />',
      '<img src="https://img.shields.io/badge/Rapid_Prototyping-FF9800?style=flat-square" />',
      '<img src="https://img.shields.io/badge/Solo_Build-9C27B0?style=flat-square" />'
    ]
  }
};

const DEFAULT_FEATURED_ORDER = [
  'pdpa-audit-mcp',
  'peregrine-geo',
  'learn-arduino-pro',
  'foodsense',
  'SerendibSuite',
  'travel-website',
  'bakery-dashboard',
  'vulnpulse',
  'OneManArmy.exe'
];

async function getHeaders() {
  const headers = {
    'User-Agent': 'GitHub-Profile-Auto-Updater',
    'Accept': 'application/vnd.github.v3+json'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function run() {
  console.log(`Starting automated sync for profile ${USERNAME}...`);
  const headers = await getHeaders();

  // 1. Fetch user data (public_repos count)
  let publicRepos = 17;
  try {
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
    if (userRes.ok) {
      const userData = await userRes.json();
      publicRepos = userData.public_repos || publicRepos;
    }
  } catch (err) {
    console.warn('Could not fetch user profile:', err.message);
  }

  // 2. Fetch all public repos
  const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, { headers });
  if (!reposRes.ok) {
    console.error(`Failed to fetch repos: ${reposRes.status} ${reposRes.statusText}`);
    return;
  }
  const repos = await reposRes.json();

  if (!Array.isArray(repos)) {
    console.error('Invalid response format:', repos);
    return;
  }

  // Filter out forks and profile repository
  const validRepos = repos.filter(r => !r.fork && r.name.toLowerCase() !== USERNAME.toLowerCase());

  // 3. Auto-detect all programming languages used across repos
  const detectedLanguages = new Set(['Java', 'Python', 'Kotlin', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'HTML', 'CSS']);
  validRepos.forEach(r => {
    if (r.language) {
      detectedLanguages.add(r.language);
    }
  });

  const languageBadgesHtml = Array.from(detectedLanguages)
    .map(lang => LANGUAGE_BADGES[lang] || `<img src="https://img.shields.io/badge/-${encodeURIComponent(lang)}-38BDF8?style=flat-square&logoColor=white" alt="${lang}" />`)
    .join(' ');

  // 4. Select Featured Projects
  // A repo is featured if:
  // - It has topic 'featured' (dynamic tag on GitHub), OR
  // - It is in DEFAULT_FEATURED_ORDER
  const featuredReposMap = new Map();

  // First check repos with 'featured' topic
  validRepos.forEach(r => {
    if (Array.isArray(r.topics) && r.topics.includes('featured')) {
      featuredReposMap.set(r.name, r);
    }
  });

  // Then add remaining from default featured list
  DEFAULT_FEATURED_ORDER.forEach(name => {
    if (!featuredReposMap.has(name)) {
      const match = validRepos.find(r => r.name.toLowerCase() === name.toLowerCase());
      if (match) {
        featuredReposMap.set(match.name, match);
      }
    }
  });

  const featuredList = Array.from(featuredReposMap.values()).slice(0, 10);

  // Build Featured Projects Table
  let featuredHtml = '\n<table>\n';
  for (let i = 0; i < featuredList.length; i += 2) {
    featuredHtml += '  <tr>\n';
    for (let j = 0; j < 2; j++) {
      const repo = featuredList[i + j];
      if (repo) {
        const meta = PROJECT_METADATA[repo.name] || {};
        const title = meta.title || `⚡ ${repo.name}`;
        const rawDesc = meta.desc || repo.description || 'Engineering solution & open-source project by Sadeep78.';
        const desc = escapeHtml(rawDesc);
        
        let badgesHtml = '';
        if (meta.badges && meta.badges.length > 0) {
          badgesHtml = meta.badges.join('\n        ');
        } else {
          const lang = repo.language 
            ? `<img src="https://img.shields.io/badge/${encodeURIComponent(repo.language)}-3178C6?style=flat-square&logoColor=white" />`
            : '';
          const star = `<img src="https://img.shields.io/github/stars/${USERNAME}/${repo.name}?style=flat-square&color=e3b341" alt="Stars" />`;
          badgesHtml = `${lang}\n        ${star}`;
        }

        featuredHtml += `    <td width="50%" valign="top">\n`;
        featuredHtml += `      <h3><a href="${repo.html_url}">${title}</a></h3>\n`;
        featuredHtml += `      <p>${desc}</p>\n`;
        featuredHtml += `      <p>\n        ${badgesHtml}\n      </p>\n`;
        featuredHtml += `      <p><a href="${repo.html_url}"><b>View Repository ↗</b></a></p>\n`;
        featuredHtml += `    </td>\n`;
      } else {
        featuredHtml += `    <td width="50%" valign="top"></td>\n`;
      }
    }
    featuredHtml += '  </tr>\n';
  }
  featuredHtml += '</table>\n';

  // 5. Select 6 Latest Active Repositories
  const sortedByPush = [...validRepos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  const recentList = sortedByPush.slice(0, 6);

  let recentHtml = '\n<table>\n';
  for (let i = 0; i < recentList.length; i += 2) {
    recentHtml += '  <tr>\n';
    for (let j = 0; j < 2; j++) {
      const repo = recentList[i + j];
      if (repo) {
        const name = escapeHtml(repo.name);
        const meta = PROJECT_METADATA[repo.name] || {};
        let rawDesc = meta.desc || repo.description || 'Modern software solution & open-source engineering project.';
        const desc = escapeHtml(rawDesc.length > 120 ? rawDesc.slice(0, 117) + '...' : rawDesc);
        
        const langBadge = repo.language 
          ? `<img src="https://img.shields.io/badge/-${encodeURIComponent(repo.language)}-38BDF8?style=flat-square&logoColor=white" alt="${repo.language}" />`
          : '';
        const starsBadge = `<img src="https://img.shields.io/github/stars/${USERNAME}/${repo.name}?style=flat-square&color=e3b341" alt="Stars" />`;
        const updatedDate = new Date(repo.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        recentHtml += `    <td width="50%" valign="top">\n`;
        recentHtml += `      <h4>📌 <a href="${repo.html_url}">${name}</a></h4>\n`;
        recentHtml += `      <p>${desc}</p>\n`;
        recentHtml += `      <p>\n`;
        if (langBadge) {
          recentHtml += `        ${langBadge}\n`;
        }
        recentHtml += `        ${starsBadge}\n`;
        recentHtml += `      </p>\n`;
        recentHtml += `      <small><i>Last active: ${updatedDate}</i></small>\n`;
        recentHtml += `    </td>\n`;
      } else {
        recentHtml += `    <td width="50%" valign="top"></td>\n`;
      }
    }
    recentHtml += '  </tr>\n';
  }
  recentHtml += '</table>\n';

  // 6. Update README.md
  if (!fs.existsSync(README_PATH)) {
    console.error(`README not found at: ${README_PATH}`);
    return;
  }

  let readme = fs.readFileSync(README_PATH, 'utf8');

  // A. Update Public Repos Count Badge
  readme = readme.replace(/badge\/Repositories-\d+-blue/g, `badge/Repositories-${publicRepos}-blue`);

  // B. Update Dynamic Languages Row
  const langStart = '<!-- DYNAMIC_LANGUAGES:START -->';
  const langEnd = '<!-- DYNAMIC_LANGUAGES:END -->';
  const langIdxStart = readme.indexOf(langStart);
  const langIdxEnd = readme.indexOf(langEnd);
  if (langIdxStart !== -1 && langIdxEnd !== -1) {
    readme = readme.slice(0, langIdxStart + langStart.length) + ' ' + languageBadgesHtml + ' ' + readme.slice(langIdxEnd);
  }

  // C. Update Featured Projects Section
  const featStart = '<!-- FEATURED_PROJECTS:START -->';
  const featEnd = '<!-- FEATURED_PROJECTS:END -->';
  const featIdxStart = readme.indexOf(featStart);
  const featIdxEnd = readme.indexOf(featEnd);
  if (featIdxStart !== -1 && featIdxEnd !== -1) {
    readme = readme.slice(0, featIdxStart + featStart.length) + featuredHtml + readme.slice(featIdxEnd);
  }

  // D. Update Recent Repos Section
  const recStart = '<!-- RECENT_REPOS:START -->';
  const recEnd = '<!-- RECENT_REPOS:END -->';
  const recIdxStart = readme.indexOf(recStart);
  const recIdxEnd = readme.indexOf(recEnd);
  if (recIdxStart !== -1 && recIdxEnd !== -1) {
    readme = readme.slice(0, recIdxStart + recStart.length) + recentHtml + readme.slice(recIdxEnd);
  }

  fs.writeFileSync(README_PATH, readme, 'utf8');
  console.log('Automated Profile sync completed successfully!');
}

run().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
