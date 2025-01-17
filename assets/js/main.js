const toggle = document.getElementById('modeToggle');

toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

const blinkingText = document.getElementById('belonJadi');
    
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    
        setInterval(() => {
            blinkingText.style.color = getRandomColor();
            document.body.style.backgroundColor = getRandomColor();
        }, 100);