const toggle = document.getElementById('modeToggle');

// Dark-mode button
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'true') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// content homepage
const currentPath = window.location.pathname;
const isHomePage = currentPath === '/' || currentPath === '/index.html';

let mdTexts = []; // Store full texts

function extractTitleAndSummary(text) {
    const lines = text.split('\n');
    let title = 'Untitled';
    let summary = '';
    let inSummary = false;
    for (let line of lines) {
        if (line.startsWith('# ')) {
            title = line.substring(2).trim();
            inSummary = true;
        } else if (inSummary && line.trim()) {
            summary += line + ' ';
            if (summary.length > 200) break;
        } else if (inSummary && !line.trim()) {
            break; // End of first paragraph
        }
    }
    if (!summary) summary = text.substring(0, 200) + '...';
    return { title, summary: summary.trim() + '...' };
}

function showFull(index) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<button onclick="showList()">Back</button>' + marked.parse(mdTexts[index]);
}

function showList(page = 0) {
    const contentDiv = document.getElementById('content');
    const perPage = 5;
    const totalPages = Math.ceil(mdTexts.length / perPage);
    const start = page * perPage;
    const end = start + perPage;
    const posts = mdTexts.slice(start, end);
    
    let html = '';
    posts.forEach((text, i) => {
        const realIndex = start + i;
        const { title, summary } = extractTitleAndSummary(text);
        html += `<div class="post-summary"><h2><a href="#" onclick="showFull(${realIndex})">${title}</a></h2><p>${summary}</p></div>`;
    });
    
    if (totalPages > 1) {
        html += '<div class="pagination">';
        if (page > 0) html += `<button onclick="showList(${page - 1})">Previous</button>`;
        html += ` Page ${page + 1} of ${totalPages} `;
        if (page < totalPages - 1) html += `<button onclick="showList(${page + 1})">Next</button>`;
        html += '</div>';
    }
    
    contentDiv.innerHTML = html;
}

if (isHomePage) {
    fetch('posting/files.json')
        .then(response => response.json())
        .then(files => {
            const promises = files.map(file => fetch('posting/' + file).then(response => response.text()));
            return Promise.all(promises);
        })
        .then(texts => {
            mdTexts = texts; // Store texts
            showList(); // Display summaries
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
        });
}else {
    
}

