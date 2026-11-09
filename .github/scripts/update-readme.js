const fs = require('fs');
const path = require('path');

const USERNAME = 'Sadeep78';
const README_PATH = path.join(__dirname, '../../README.md');

// Fallback descriptions for known projects where GitHub repo description is empty
const KNOWN_DESCRIPTIONS = {
  'peregrine-geo': 'Enterprise-grade Android mock-location client, kinematic simulation engine & cloud fleet console.',
  'learn-arduino-pro': 'Interactive physical computing & Arduino learning web platform with 3D digital twins & AVR emulation.',
  'vulnpulse': 'Automated vulnerability assessment & security audit utility for scanning dependencies in real time.',
  'avenza-clothing-website': 'Modern responsive e-commerce web application for fashion and apparel shopping.',
  'portfolio': 'Personal portfolio website showcasing software engineering projects, system architecture, and skills.',
  'OneManArmy.exe': 'CodeFuse 3.0 hackathon solo run submission for high-speed algorithmic prototyping.'
};

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
  console.log(`Fetching latest GitHub metadata for ${USERNAME}...`);
  const headers = await getHeaders();

  // 1. Fetch user profile data
  let publicRepos = 17;
  try {
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
    if (userRes.ok) {
      const userData = await userRes.json();
      publicRepos = userData.public_repos || publicRepos;
      console.log(`Found ${publicRepos} public repositories.`);
    }
  } catch (err) {
    console.warn('Could not fetch user profile:', err.message);
  }

  // 2. Fetch repos
  const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=30`, { headers });
  if (!reposRes.ok) {
    console.error(`Failed to fetch repos: ${reposRes.status} ${reposRes.statusText}`);
    return;
  }
  const repos = await reposRes.json();

  if (!Array.isArray(repos)) {
    console.error('Invalid response format:', repos);
    return;
  }

  // Exclude profile README repo and forks
  const activeRepos = repos
    .filter(r => !r.fork && r.name.toLowerCase() !== USERNAME.toLowerCase())
    .slice(0, 6);

  console.log(`Selected ${activeRepos.length} latest active repositories.`);

  // 3. Build Markdown Table
  let recentReposMd = '\n<table>\n';
  for (let i = 0; i < activeRepos.length; i += 2) {
    recentReposMd += '  <tr>\n';
    for (let j = 0; j < 2; j++) {
      const repo = activeRepos[i + j];
      if (repo) {
        const name = escapeHtml(repo.name);
        let rawDesc = repo.description || KNOWN_DESCRIPTIONS[repo.name] || 'Modern software solution & open-source engineering project.';
        const desc = escapeHtml(rawDesc.length > 120 ? rawDesc.slice(0, 117) + '...' : rawDesc);
        
        const langBadge = repo.language 
          ? `<img src="https://img.shields.io/badge/-${encodeURIComponent(repo.language)}-38BDF8?style=flat-square&logoColor=white" alt="${repo.language}" />`
          : '';
        const starsBadge = `<img src="https://img.shields.io/github/stars/${USERNAME}/${repo.name}?style=flat-square&color=e3b341" alt="Stars" />`;
        const updatedDate = new Date(repo.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        recentReposMd += `    <td width="50%" valign="top">\n`;
        recentReposMd += `      <h4>📌 <a href="${repo.html_url}">${name}</a></h4>\n`;
        recentReposMd += `      <p>${desc}</p>\n`;
        recentReposMd += `      <p>\n`;
        if (langBadge) {
          recentReposMd += `        ${langBadge}\n`;
        }
        recentReposMd += `        ${starsBadge}\n`;
        recentReposMd += `      </p>\n`;
        recentReposMd += `      <small><i>Last active: ${updatedDate}</i></small>\n`;
        recentReposMd += `    </td>\n`;
      } else {
        recentReposMd += `    <td width="50%" valign="top"></td>\n`;
      }
    }
    recentReposMd += '  </tr>\n';
  }
  recentReposMd += '</table>\n';

  // 4. Update README.md
  if (!fs.existsSync(README_PATH)) {
    console.error(`README not found at: ${README_PATH}`);
    return;
  }

  let readme = fs.readFileSync(README_PATH, 'utf8');

  // Update repository count badge
  readme = readme.replace(/badge\/Repositories-\d+-blue/g, `badge/Repositories-${publicRepos}-blue`);

  // Update Recent Repos section
  const startTag = '<!-- RECENT_REPOS:START -->';
  const endTag = '<!-- RECENT_REPOS:END -->';
  const startIndex = readme.indexOf(startTag);
  const endIndex = readme.indexOf(endTag);

  if (startIndex !== -1 && endIndex !== -1) {
    readme = readme.slice(0, startIndex + startTag.length) + recentReposMd + readme.slice(endIndex);
    fs.writeFileSync(README_PATH, readme, 'utf8');
    console.log('Successfully updated README.md with recent repositories!');
  } else {
    console.warn(`Markers ${startTag} and ${endTag} not found in README.md.`);
  }
}

run().catch(err => {
  console.error('Fatal error during execution:', err);
  process.exit(1);
});
