const toggle = document.getElementById('modeToggle');

// Load saved mode
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

// Load content from posting file only on home/main page
const currentPath = window.location.pathname;
const isHomePage = currentPath === '/' || currentPath === '/index.html';

if (isHomePage) {
    fetch('pages/listblog/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
        });
}

