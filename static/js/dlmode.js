document.addEventListener('DOMContentLoaded', () => {
    const dlModeBtn = document.getElementById('dl-mode');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        dlModeBtn.textContent = '☀️'; 
    } else {
        dlModeBtn.textContent = '🌙'; 
    }
    dlModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            dlModeBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            dlModeBtn.textContent = '🌙';
        }
    });
});