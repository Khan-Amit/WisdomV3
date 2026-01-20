// Wisdom Cards Database - Updated for WisdomV3
const wisdomCards = [
    {
        id: 1,
        quote: "Debugging is like being the detective in a crime movie where you are also the murderer.",
        author: "F. J. Bergmann",
        explanation: "The problem is usually in our own code. Repository name changes can break GitHub Pages links.",
        category: "Debugging",
        color: "#2ecc71"
    },
    {
        id: 2,
        quote: "It works on my machine!",
        author: "Every Developer Ever",
        explanation: "GitHub Pages deployment issues are common. Check Settings → Pages after renaming repositories.",
        category: "Deployment",
        color: "#3498db"
    },
    {
        id: 3,
        quote: "First, make it work. Then make it beautiful. Then make it fast.",
        author: "Kent Beck",
        explanation: "You've made it work. Now deploying it beautifully on GitHub Pages!",
        category: "Development",
        color: "#e74c3c"
    },
    {
        id: 4,
        quote: "The best error message is the one that never shows up.",
        author: "Thomas Fuchs",
        explanation: "Debugging complete. Files updated for WisdomV3. Ready for deployment.",
        category: "Success",
        color: "#f39c12"
    }
];

// DOM Elements
const currentQuote = document.getElementById('current-quote');
const currentAuthor = document.getElementById('current-author');
const currentExplanation = document.getElementById('current-explanation');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const randomBtn = document.getElementById('random-btn');
const miniCardsContainer = document.querySelector('.mini-cards');
const cardCategory = document.querySelector('.card-category');
const cardNumber = document.querySelector('.card-number');

// State
let currentCardIndex = 0;
const totalCards = wisdomCards.length;

// Initialize with debug info
function init() {
    console.log("🌐 WisdomV3 App Initialized");
    console.log("✅ Repository: WisdomV3");
    console.log("🌍 GitHub Pages URL: https://khan-amit.github.io/WisdomV3/");
    
    totalCardsSpan.textContent = totalCards;
    updateCard();
    createMiniCards();
    updateProgress();
}

// Create mini cards
function createMiniCards() {
    miniCardsContainer.innerHTML = '';
    
    wisdomCards.forEach((card, index) => {
        const miniCard = document.createElement('div');
        miniCard.className = `mini-card ${index === currentCardIndex ? 'active' : ''}`;
        miniCard.dataset.index = index;
        
        const miniQuote = document.createElement('div');
        miniQuote.className = 'mini-quote';
        miniQuote.textContent = card.quote.substring(0, 20) + '...';
        
        miniCard.appendChild(miniQuote);
        miniCard.addEventListener('click', () => {
            currentCardIndex = index;
            updateCard();
            updateMiniCards();
            updateProgress();
        });
        
        miniCardsContainer.appendChild(miniCard);
    });
}

// Update main card
function updateCard() {
    const card = wisdomCards[currentCardIndex];
    
    currentQuote.textContent = `"${card.quote}"`;
    currentAuthor.textContent = `— ${card.author}`;
    currentExplanation.textContent = card.explanation;
    cardCategory.textContent = card.category;
    cardNumber.textContent = `#${String(card.id).padStart(3, '0')}`;
    currentCardSpan.textContent = currentCardIndex + 1;
    
    // Update progress bar
    progressFill.style.background = card.color;
}

// Update progress
function updateProgress() {
    const percentage = ((currentCardIndex + 1) / totalCards) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    currentCardIndex = currentCardIndex > 0 ? currentCardIndex - 1 : totalCards - 1;
    updateCard();
    updateMiniCards();
    updateProgress();
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = currentCardIndex < totalCards - 1 ? currentCardIndex + 1 : 0;
    updateCard();
    updateMiniCards();
    updateProgress();
});

randomBtn.addEventListener('click', () => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * totalCards);
    } while (newIndex === currentCardIndex && totalCards > 1);
    
    currentCardIndex = newIndex;
    updateCard();
    updateMiniCards();
    updateProgress();
});

// Real GitHub button (opens in new tab - no alert needed)
document.getElementById('real-github-btn').addEventListener('click', (e) => {
    console.log("Opening WisdomV3 repository...");
    // Link opens in new tab via HTML target="_blank"
});

// Console debug info
console.log("========================================");
console.log("WISDOMV3 DEBUG INFORMATION");
console.log("========================================");
console.log("Repository Name: WisdomV3");
console.log("GitHub Pages URL: https://khan-amit.github.io/WisdomV3/");
console.log("Files Loaded: index.html, style.css, script.js");
console.log("Total Wisdom Cards: " + totalCards);
console.log("========================================");

// Initialize on load
window.addEventListener('DOMContentLoaded', init);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === ' ') {
        randomBtn.click();
        e.preventDefault();
    }
});
