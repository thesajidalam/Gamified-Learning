// ============================================
// QUESTLEARN - GAMIFIED LEARNING PLATFORM
// Complete JavaScript Implementation
// ============================================

// DOM Elements
const DOM = {
    // User Stats
    userLevelDisplay: document.getElementById('user-level-display'),
    usernameDisplay: document.getElementById('username-display'),
    xpProgressBar: document.getElementById('xp-progress-bar'),
    currentXp: document.getElementById('current-xp'),
    maxXp: document.getElementById('max-xp'),
    totalPoints: document.getElementById('total-points'),
    rankDisplay: document.getElementById('rank-display'),
    streakDisplay: document.getElementById('streak-display'),
    learningTime: document.getElementById('learning-time'),
    
    // Progress Bars
    csProgress: document.getElementById('cs-progress'),
    mathProgress: document.getElementById('math-progress'),
    gkProgress: document.getElementById('gk-progress'),
    scienceProgress: document.getElementById('science-progress'),
    
    // Activity List
    activityList: document.getElementById('activity-list'),
    
    // Level Progress
    currentLevel: document.getElementById('current-level'),
    nextLevel: document.getElementById('next-level'),
    levelProgressFill: document.getElementById('level-progress-fill'),
    currentLevelXp: document.getElementById('current-level-xp'),
    nextLevelXp: document.getElementById('next-level-xp'),
    
    // Subject Buttons
    subjectStartBtns: document.querySelectorAll('.subject-start-btn'),
    
    // Quiz Modal
    quizModal: document.getElementById('quiz-modal'),
    quizSubjectTitle: document.getElementById('quiz-subject-title'),
    quizLevel: document.getElementById('quiz-level'),
    currentQuestion: document.getElementById('current-question'),
    totalQuestions: document.getElementById('total-questions'),
    quizScore: document.getElementById('quiz-score'),
    quizTimer: document.getElementById('quiz-timer'),
    questionText: document.getElementById('question-text'),
    questionType: document.getElementById('question-type'),
    quizOptions: document.getElementById('quiz-options'),
    quizFeedback: document.getElementById('quiz-feedback'),
    feedbackContent: document.getElementById('feedback-content'),
    nextQuestionBtn: document.getElementById('next-question-btn'),
    closeQuizBtn: document.getElementById('close-quiz-btn'),
    xpEarned: document.getElementById('xp-earned'),
    quizProgressFill: document.getElementById('quiz-progress-fill'),
    
    // Leaderboard
    leaderboardRows: document.getElementById('leaderboard-rows'),
    userRank: document.getElementById('user-rank'),
    userPositionName: document.getElementById('user-position-name'),
    userPositionXp: document.getElementById('user-position-xp'),
    leaderboardTabs: document.querySelectorAll('.leaderboard-tab'),
    leaderboardSearch: document.getElementById('leaderboard-search'),
    
    // Achievements
    totalBadges: document.getElementById('total-badges'),
    totalAchievements: document.getElementById('total-achievements'),
    completionRate: document.getElementById('completion-rate'),
    achievementsGrid: document.getElementById('achievements-grid'),
    
    // Notifications
    xpNotification: document.getElementById('xp-notification'),
    levelUpModal: document.getElementById('level-up-modal'),
    newLevel: document.getElementById('new-level'),
    levelUpCloseBtn: document.getElementById('level-up-close-btn'),
    toastContainer: document.getElementById('toast-container'),
    
    // Buttons
    startLearningBtn: document.getElementById('start-learning-btn'),
    exploreSubjectsBtn: document.getElementById('explore-subjects-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    
    // Stats
    totalLearners: document.getElementById('total-learners'),
    totalQuestionsStat: document.getElementById('total-questions'),
    totalXpEarned: document.getElementById('total-xp-earned')
};

// App State
const AppState = {
    // User Data
    user: {
        id: 1,
        name: "Learner",
        level: 1,
        xp: 0,
        totalXp: 0,
        points: 0,
        rank: "Beginner",
        streak: 0,
        learningTime: 0,
        lastLogin: null,
        achievements: []
    },
    
    // Subjects Data
    subjects: {
        cs: {
            name: "Computer Science",
            progress: 65,
            levels: 15,
            currentLevel: 5,
            questionsAnswered: 85,
            totalQuestions: 320
        },
        math: {
            name: "Mathematics",
            progress: 40,
            levels: 12,
            currentLevel: 3,
            questionsAnswered: 72,
            totalQuestions: 280
        },
        gk: {
            name: "General Knowledge",
            progress: 80,
            levels: 10,
            currentLevel: 8,
            questionsAnswered: 120,
            totalQuestions: 250
        },
        science: {
            name: "Science",
            progress: 25,
            levels: 8,
            currentLevel: 2,
            questionsAnswered: 30,
            totalQuestions: 200
        }
    },
    
    // Quiz State
    quiz: {
        active: false,
        subject: null,
        level: 1,
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        timer: 60,
        timerInterval: null,
        xpEarned: 0,
        correctStreak: 0
    },
    
    // Leaderboard Data
    leaderboard: {
        period: "weekly",
        data: []
    },
    
    // Achievements Data
    achievements: []
};

// XP Requirements per Level
const XP_REQUIREMENTS = [
    0, 100, 250, 500, 850, 1300, 1850, 2500, 3250, 4100,
    5050, 6100, 7250, 8500, 9850, 11300, 12850, 14500, 16250, 18100,
    20050, 22100, 24250, 26500, 28850, 31300, 33850, 36500, 39250, 42100,
    45050, 48100, 51250, 54500, 57850, 61300, 64850, 68500, 72250, 76100,
    80050, 84100, 88250, 92500, 96850, 101300, 105850, 110500, 115250, 120100
];

// Rank Thresholds
const RANK_THRESHOLDS = [
    { xp: 0, rank: "Beginner" },
    { xp: 1000, rank: "Explorer" },
    { xp: 3000, rank: "Scholar" },
    { xp: 7000, rank: "Pro" },
    { xp: 15000, rank: "Expert" },
    { xp: 30000, rank: "Master" },
    { xp: 60000, rank: "Grandmaster" },
    { xp: 100000, rank: "Legend" }
];

// Question Database
const QUESTION_DATABASE = {
    cs: [
        {
            id: 1,
            type: "mcq",
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            correctAnswer: 0,
            explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 2,
            type: "mcq",
            question: "Which programming language is known as the 'language of the web'?",
            options: [
                "Python",
                "JavaScript",
                "Java",
                "C++"
            ],
            correctAnswer: 1,
            explanation: "JavaScript is known as the 'language of the web' because it's the primary language for front-end web development.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 3,
            type: "truefalse",
            question: "CSS is used to style web pages.",
            correctAnswer: true,
            explanation: "CSS (Cascading Style Sheets) is used to control the presentation, formatting, and layout of web pages.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 4,
            type: "mcq",
            question: "What is the time complexity of binary search?",
            options: [
                "O(n)",
                "O(n log n)",
                "O(log n)",
                "O(1)"
            ],
            correctAnswer: 2,
            explanation: "Binary search has a time complexity of O(log n) because it divides the search space in half with each iteration.",
            difficulty: 2,
            xp: 15
        },
        {
            id: 5,
            type: "mcq",
            question: "Which data structure uses LIFO (Last In, First Out) principle?",
            options: [
                "Queue",
                "Stack",
                "Array",
                "Linked List"
            ],
            correctAnswer: 1,
            explanation: "Stack uses the LIFO principle, where the last element added is the first one to be removed.",
            difficulty: 2,
            xp: 15
        }
    ],
    math: [
        {
            id: 1,
            type: "mcq",
            question: "What is the value of π (pi) rounded to two decimal places?",
            options: [
                "3.14",
                "3.16",
                "3.12",
                "3.18"
            ],
            correctAnswer: 0,
            explanation: "The value of π is approximately 3.14159, which rounds to 3.14 when rounded to two decimal places.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 2,
            type: "truefalse",
            question: "The sum of angles in a triangle is 180 degrees.",
            correctAnswer: true,
            explanation: "In Euclidean geometry, the sum of the interior angles of a triangle always equals 180 degrees.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 3,
            type: "mcq",
            question: "What is the derivative of x²?",
            options: [
                "x",
                "2x",
                "2",
                "x³/3"
            ],
            correctAnswer: 1,
            explanation: "Using the power rule, the derivative of x² is 2x.",
            difficulty: 2,
            xp: 15
        },
        {
            id: 4,
            type: "mcq",
            question: "Solve for x: 2x + 5 = 15",
            options: [
                "5",
                "10",
                "7.5",
                "2.5"
            ],
            correctAnswer: 0,
            explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
            difficulty: 1,
            xp: 10
        },
        {
            id: 5,
            type: "mcq",
            question: "What is the area of a circle with radius 5?",
            options: [
                "25π",
                "10π",
                "50π",
                "5π"
            ],
            correctAnswer: 0,
            explanation: "Area of a circle = πr² = π(5)² = 25π",
            difficulty: 2,
            xp: 15
        }
    ],
    gk: [
        {
            id: 1,
            type: "mcq",
            question: "Which planet is known as the Red Planet?",
            options: [
                "Venus",
                "Mars",
                "Jupiter",
                "Saturn"
            ],
            correctAnswer: 1,
            explanation: "Mars is known as the Red Planet due to its reddish appearance caused by iron oxide (rust) on its surface.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 2,
            type: "truefalse",
            question: "The Great Wall of China is visible from space with the naked eye.",
            correctAnswer: false,
            explanation: "This is a common myth. The Great Wall of China is not visible from space with the naked eye.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 3,
            type: "mcq",
            question: "Who painted the Mona Lisa?",
            options: [
                "Vincent van Gogh",
                "Leonardo da Vinci",
                "Pablo Picasso",
                "Michelangelo"
            ],
            correctAnswer: 1,
            explanation: "The Mona Lisa was painted by Leonardo da Vinci during the Renaissance period.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 4,
            type: "mcq",
            question: "What is the capital of Australia?",
            options: [
                "Sydney",
                "Melbourne",
                "Canberra",
                "Perth"
            ],
            correctAnswer: 2,
            explanation: "Canberra is the capital city of Australia, while Sydney and Melbourne are larger cities.",
            difficulty: 1,
            xp: 10
        },
        {
            id: 5,
            type: "mcq",
            question: "Which element has the chemical symbol 'Au'?",
            options: [
                "Silver",
                "Gold",
                "Argon",
                "Aluminum"
            ],
            correctAnswer: 1,
            explanation: "Au is the chemical symbol for Gold, from the Latin word 'aurum'.",
            difficulty: 2,
            xp: 15
        }
    ]
};

// Achievements Database
const ACHIEVEMENTS_DATABASE = [
    {
        id: 1,
        title: "First Steps",
        description: "Complete your first quiz",
        xp: 100,
        icon: "fas fa-baby",
        unlocked: true
    },
    {
        id: 2,
        title: "Quick Learner",
        description: "Answer 10 questions correctly",
        xp: 250,
        icon: "fas fa-bolt",
        unlocked: true
    },
    {
        id: 3,
        title: "Subject Master",
        description: "Complete 100% of any subject",
        xp: 500,
        icon: "fas fa-crown",
        unlocked: false
    },
    {
        id: 4,
        title: "Streak Keeper",
        description: "Maintain a 7-day learning streak",
        xp: 300,
        icon: "fas fa-fire",
        unlocked: true
    },
    {
        id: 5,
        title: "Quiz Champion",
        description: "Score 100% on any quiz",
        xp: 400,
        icon: "fas fa-trophy",
        unlocked: false
    },
    {
        id: 6,
        title: "Early Bird",
        description: "Complete a quiz before 8 AM",
        xp: 150,
        icon: "fas fa-sun",
        unlocked: false
    },
    {
        id: 7,
        title: "Night Owl",
        description: "Complete a quiz after 10 PM",
        xp: 150,
        icon: "fas fa-moon",
        unlocked: false
    },
    {
        id: 8,
        title: "XP Collector",
        description: "Earn 5000 total XP",
        xp: 1000,
        icon: "fas fa-star",
        unlocked: false
    }
];

// Leaderboard Data
const LEADERBOARD_DATA = {
    weekly: [
        { id: 1, name: "Alex Johnson", level: 42, xp: 12500, streak: 14, badges: 28, avatar: "fas fa-user-astronaut" },
        { id: 2, name: "Sam Rivera", level: 38, xp: 11200, streak: 21, badges: 25, avatar: "fas fa-user-ninja" },
        { id: 3, name: "Taylor Swift", level: 35, xp: 9800, streak: 7, badges: 22, avatar: "fas fa-user-graduate" },
        { id: 4, name: "Jordan Lee", level: 31, xp: 8500, streak: 30, badges: 20, avatar: "fas fa-user-secret" },
        { id: 5, name: "Casey Kim", level: 28, xp: 7200, streak: 5, badges: 18, avatar: "fas fa-user-tie" },
        { id: 6, name: "Morgan Patel", level: 25, xp: 6100, streak: 12, badges: 16, avatar: "fas fa-user-md" },
        { id: 7, name: "Riley Chen", level: 22, xp: 5300, streak: 9, badges: 14, avatar: "fas fa-user-injured" },
        { id: 8, name: "Drew Wilson", level: 19, xp: 4200, streak: 3, badges: 12, avatar: "fas fa-user-edit" },
        { id: 9, name: "Skyler Brown", level: 15, xp: 3100, streak: 18, badges: 10, avatar: "fas fa-user-friends" },
        { id: 10, name: "Quinn Davis", level: 12, xp: 2200, streak: 6, badges: 8, avatar: "fas fa-user-check" }
    ],
    monthly: [
        { id: 1, name: "Sam Rivera", level: 38, xp: 11200, streak: 21, badges: 25, avatar: "fas fa-user-ninja" },
        { id: 2, name: "Alex Johnson", level: 42, xp: 12500, streak: 14, badges: 28, avatar: "fas fa-user-astronaut" },
        { id: 3, name: "Jordan Lee", level: 31, xp: 8500, streak: 30, badges: 20, avatar: "fas fa-user-secret" },
        { id: 4, name: "Taylor Swift", level: 35, xp: 9800, streak: 7, badges: 22, avatar: "fas fa-user-graduate" },
        { id: 5, name: "Casey Kim", level: 28, xp: 7200, streak: 5, badges: 18, avatar: "fas fa-user-tie" },
        { id: 6, name: "Morgan Patel", level: 25, xp: 6100, streak: 12, badges: 16, avatar: "fas fa-user-md" },
        { id: 7, name: "Riley Chen", level: 22, xp: 5300, streak: 9, badges: 14, avatar: "fas fa-user-injured" },
        { id: 8, name: "Drew Wilson", level: 19, xp: 4200, streak: 3, badges: 12, avatar: "fas fa-user-edit" },
        { id: 9, name: "Skyler Brown", level: 15, xp: 3100, streak: 18, badges: 10, avatar: "fas fa-user-friends" },
        { id: 10, name: "Quinn Davis", level: 12, xp: 2200, streak: 6, badges: 8, avatar: "fas fa-user-check" }
    ],
    alltime: [
        { id: 1, name: "Alex Johnson", level: 42, xp: 12500, streak: 14, badges: 28, avatar: "fas fa-user-astronaut" },
        { id: 2, name: "Sam Rivera", level: 38, xp: 11200, streak: 21, badges: 25, avatar: "fas fa-user-ninja" },
        { id: 3, name: "Taylor Swift", level: 35, xp: 9800, streak: 7, badges: 22, avatar: "fas fa-user-graduate" },
        { id: 4, name: "Jordan Lee", level: 31, xp: 8500, streak: 30, badges: 20, avatar: "fas fa-user-secret" },
        { id: 5, name: "Casey Kim", level: 28, xp: 7200, streak: 5, badges: 18, avatar: "fas fa-user-tie" },
        { id: 6, name: "Morgan Patel", level: 25, xp: 6100, streak: 12, badges: 16, avatar: "fas fa-user-md" },
        { id: 7, name: "Riley Chen", level: 22, xp: 5300, streak: 9, badges: 14, avatar: "fas fa-user-injured" },
        { id: 8, name: "Drew Wilson", level: 19, xp: 4200, streak: 3, badges: 12, avatar: "fas fa-user-edit" },
        { id: 9, name: "Skyler Brown", level: 15, xp: 3100, streak: 18, badges: 10, avatar: "fas fa-user-friends" },
        { id: 10, name: "Quinn Davis", level: 12, xp: 2200, streak: 6, badges: 8, avatar: "fas fa-user-check" }
    ]
};

// Initialize the application
function initApp() {
    // Load saved state from localStorage
    loadState();
    
    // Initialize UI
    updateUserStats();
    updateProgressBars();
    updateActivityLog();
    updateLevelProgress();
    updateLeaderboard();
    updateAchievements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set initial values for stats
    updateStats();
    
    // Check for streak update
    checkStreakUpdate();
    
    // Start animation for progress bars
    animateProgressBars();
    
    console.log("QuestLearn initialized successfully!");
}

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('questlearn_state');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        // Merge saved state with default state
        AppState.user = { ...AppState.user, ...parsedState.user };
        AppState.subjects = { ...AppState.subjects, ...parsedState.subjects };
        AppState.achievements = parsedState.achievements || ACHIEVEMENTS_DATABASE;
        
        // Update last login date for streak calculation
        if (!AppState.user.lastLogin) {
            AppState.user.lastLogin = new Date().toISOString().split('T')[0];
        }
    } else {
        // First time user
        AppState.achievements = ACHIEVEMENTS_DATABASE;
        AppState.user.lastLogin = new Date().toISOString().split('T')[0];
        saveState();
    }
}

// Save state to localStorage
function saveState() {
    const stateToSave = {
        user: AppState.user,
        subjects: AppState.subjects,
        achievements: AppState.achievements
    };
    
    localStorage.setItem('questlearn_state', JSON.stringify(stateToSave));
}

// Update user stats in the UI
function updateUserStats() {
    DOM.userLevelDisplay.textContent = AppState.user.level;
    DOM.usernameDisplay.textContent = AppState.user.name;
    
    // Calculate XP progress
    const currentLevelXp = XP_REQUIREMENTS[AppState.user.level - 1] || 0;
    const nextLevelXp = XP_REQUIREMENTS[AppState.user.level] || 100;
    const xpInCurrentLevel = AppState.user.xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
    const xpPercentage = (xpInCurrentLevel / xpNeededForNextLevel) * 100;
    
    DOM.xpProgressBar.style.width = `${xpPercentage}%`;
    DOM.currentXp.textContent = xpInCurrentLevel;
    DOM.maxXp.textContent = xpNeededForNextLevel;
    
    // Update other stats
    DOM.totalPoints.textContent = AppState.user.points.toLocaleString();
    DOM.rankDisplay.textContent = AppState.user.rank;
    DOM.streakDisplay.textContent = AppState.user.streak;
    DOM.learningTime.textContent = AppState.user.learningTime;
    
    // Update level progress
    DOM.currentLevel.textContent = AppState.user.level;
    DOM.nextLevel.textContent = AppState.user.level + 1;
    DOM.currentLevelXp.textContent = xpInCurrentLevel;
    DOM.nextLevelXp.textContent = xpNeededForNextLevel;
    DOM.levelProgressFill.style.width = `${xpPercentage}%`;
}

// Update progress bars with animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .subject-progress-fill');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

// Update progress bars based on subject data
function updateProgressBars() {
    DOM.csProgress.style.width = `${AppState.subjects.cs.progress}%`;
    DOM.csProgress.setAttribute('data-progress', AppState.subjects.cs.progress);
    DOM.csProgress.parentElement.nextElementSibling.textContent = `${AppState.subjects.cs.progress}%`;
    
    DOM.mathProgress.style.width = `${AppState.subjects.math.progress}%`;
    DOM.mathProgress.setAttribute('data-progress', AppState.subjects.math.progress);
    DOM.mathProgress.parentElement.nextElementSibling.textContent = `${AppState.subjects.math.progress}%`;
    
    DOM.gkProgress.style.width = `${AppState.subjects.gk.progress}%`;
    DOM.gkProgress.setAttribute('data-progress', AppState.subjects.gk.progress);
    DOM.gkProgress.parentElement.nextElementSibling.textContent = `${AppState.subjects.gk.progress}%`;
    
    DOM.scienceProgress.style.width = `${AppState.subjects.science.progress}%`;
    DOM.scienceProgress.setAttribute('data-progress', AppState.subjects.science.progress);
    DOM.scienceProgress.parentElement.nextElementSibling.textContent = `${AppState.subjects.science.progress}%`;
    
    // Also update subject card progress bars
    document.querySelectorAll('.subject-progress-fill').forEach(bar => {
        const subject = bar.closest('.subject-card').getAttribute('data-subject');
        if (subject && AppState.subjects[subject]) {
            bar.style.width = `${AppState.subjects[subject].progress}%`;
            bar.setAttribute('data-progress', AppState.subjects[subject].progress);
            bar.closest('.subject-progress').querySelector('.progress-percentage').textContent = `${AppState.subjects[subject].progress}%`;
        }
    });
}

// Update activity log
function updateActivityLog() {
    const activities = [
        { 
            icon: "fas fa-laptop-code", 
            title: "Completed Computer Science Quiz", 
            time: "10 minutes ago", 
            xp: "+150 XP" 
        },
        { 
            icon: "fas fa-trophy", 
            title: "Reached Level 5", 
            time: "1 hour ago", 
            xp: "+200 XP" 
        },
        { 
            icon: "fas fa-fire", 
            title: "7-Day Streak Achieved", 
            time: "Yesterday", 
            xp: "+100 XP" 
        },
        { 
            icon: "fas fa-star", 
            title: "Earned 'Quick Learner' Badge", 
            time: "2 days ago", 
            xp: "+250 XP" 
        },
        { 
            icon: "fas fa-calculator", 
            title: "Completed Mathematics Challenge", 
            time: "3 days ago", 
            xp: "+120 XP" 
        }
    ];
    
    DOM.activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
            <div class="activity-xp">${activity.xp}</div>
        `;
        
        DOM.activityList.appendChild(activityItem);
    });
}

// Update level progress
function updateLevelProgress() {
    const currentLevel = AppState.user.level;
    const nextLevel = currentLevel + 1;
    
    const currentLevelXp = XP_REQUIREMENTS[currentLevel - 1] || 0;
    const nextLevelXp = XP_REQUIREMENTS[currentLevel] || 100;
    const xpInCurrentLevel = AppState.user.xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
    const xpPercentage = (xpInCurrentLevel / xpNeededForNextLevel) * 100;
    
    DOM.levelProgressFill.style.width = `${xpPercentage}%`;
    DOM.currentLevelXp.textContent = xpInCurrentLevel;
    DOM.nextLevelXp.textContent = xpNeededForNextLevel;
}

// Update leaderboard
function updateLeaderboard() {
    const period = AppState.leaderboard.period;
    const data = LEADERBOARD_DATA[period];
    
    DOM.leaderboardRows.innerHTML = '';
    
    data.forEach((user, index) => {
        const rank = index + 1;
        const row = document.createElement('div');
        row.className = `leaderboard-row ${user.id === AppState.user.id ? 'user-row' : ''}`;
        row.innerHTML = `
            <div class="rank-col ${rank <= 3 ? `top-${rank}` : ''}">#${rank}</div>
            <div class="user-col">
                <div class="user-avatar-small">
                    <i class="${user.avatar}"></i>
                </div>
                <div class="user-info-small">
                    <div class="user-name-small">${user.name}</div>
                    <div class="user-rank-small">${getRankFromXp(user.xp)}</div>
                </div>
            </div>
            <div class="level-col">${user.level}</div>
            <div class="xp-col">${user.xp.toLocaleString()}</div>
            <div class="streak-col">
                <i class="fas fa-fire"></i> ${user.streak}
            </div>
            <div class="badges-col">
                <i class="fas fa-medal"></i> ${user.badges}
            </div>
        `;
        
        DOM.leaderboardRows.appendChild(row);
    });
    
    // Update user position
    const userPosition = data.findIndex(user => user.id === AppState.user.id) + 1 || data.length + 1;
    DOM.userRank.textContent = userPosition;
    DOM.userPositionName.textContent = AppState.user.name;
    DOM.userPositionXp.textContent = AppState.user.totalXp.toLocaleString();
}

// Get rank from XP
function getRankFromXp(xp) {
    for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= RANK_THRESHOLDS[i].xp) {
            return RANK_THRESHOLDS[i].rank;
        }
    }
    return "Beginner";
}

// Update achievements
function updateAchievements() {
    // Calculate unlocked achievements
    const unlockedCount = AppState.achievements.filter(ach => ach.unlocked).length;
    const totalCount = AppState.achievements.length;
    const completionRate = Math.round((unlockedCount / totalCount) * 100);
    
    DOM.totalBadges.textContent = unlockedCount;
    DOM.totalAchievements.textContent = unlockedCount;
    DOM.completionRate.textContent = `${completionRate}%`;
    
    // Render achievements grid
    DOM.achievementsGrid.innerHTML = '';
    
    AppState.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${achievement.unlocked ? '' : 'locked'}`;
        achievementCard.innerHTML = `
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-status ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <i class="fas fa-${achievement.unlocked ? 'check' : 'lock'}"></i>
            </div>
            <h4 class="achievement-title">${achievement.title}</h4>
            <p class="achievement-description">${achievement.description}</p>
            <div class="achievement-xp">+${achievement.xp} XP</div>
        `;
        
        DOM.achievementsGrid.appendChild(achievementCard);
    });
}

// Update global stats
function updateStats() {
    // These would normally come from a backend
    DOM.totalLearners.textContent = "12,847";
    DOM.totalQuestionsStat.textContent = "58,632";
    DOM.totalXpEarned.textContent = "2.1M";
}

// Check and update streak
function checkStreakUpdate() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (AppState.user.lastLogin === yesterdayStr) {
        // User logged in yesterday, increment streak
        AppState.user.streak++;
        DOM.streakDisplay.textContent = AppState.user.streak;
        showToast("Streak Updated", `You're on a ${AppState.user.streak}-day streak!`, "success");
    } else if (AppState.user.lastLogin !== today) {
        // User missed a day, reset streak
        AppState.user.streak = 1;
        DOM.streakDisplay.textContent = AppState.user.streak;
        showToast("New Streak Started", "Start a new learning streak today!", "info");
    }
    
    // Update last login date
    AppState.user.lastLogin = today;
    saveState();
}

// Setup event listeners
function setupEventListeners() {
    // Subject start buttons
    DOM.subjectStartBtns.forEach(button => {
        button.addEventListener('click', () => {
            const subject = button.getAttribute('data-subject');
            startQuiz(subject);
        });
    });
    
    // Start learning button
    DOM.startLearningBtn.addEventListener('click', () => {
        // Start with Computer Science by default
        startQuiz('cs');
    });
    
    // Explore subjects button
    DOM.exploreSubjectsBtn.addEventListener('click', () => {
        document.getElementById('subjects').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close quiz button
    DOM.closeQuizBtn.addEventListener('click', closeQuiz);
    
    // Next question button
    DOM.nextQuestionBtn.addEventListener('click', nextQuestion);
    
    // Level up modal close button
    DOM.levelUpCloseBtn.addEventListener('click', () => {
        DOM.levelUpModal.classList.remove('active');
    });
    
    // Leaderboard tabs
    DOM.leaderboardTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            DOM.leaderboardTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update leaderboard period
            AppState.leaderboard.period = tab.getAttribute('data-period');
            updateLeaderboard();
        });
    });
    
    // Leaderboard search
    DOM.leaderboardSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = DOM.leaderboardRows.querySelectorAll('.leaderboard-row:not(.header-row)');
        
        rows.forEach(row => {
            const userName = row.querySelector('.user-name-small').textContent.toLowerCase();
            if (userName.includes(searchTerm)) {
                row.style.display = 'grid';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Mobile menu button
    DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Scroll to target
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Smooth scroll for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    
    if (navMenu.style.display === 'flex') {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = 'var(--bg-darker)';
        navMenu.style.padding = 'var(--spacing-md)';
        navMenu.style.borderTop = '1px solid var(--border-color)';
        navMenu.style.zIndex = '1000';
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = 'none';
}

// Start a quiz for a subject
function startQuiz(subject) {
    if (AppState.quiz.active) return;
    
    AppState.quiz.active = true;
    AppState.quiz.subject = subject;
    AppState.quiz.level = AppState.subjects[subject].currentLevel;
    AppState.quiz.questions = getQuestionsForSubject(subject, AppState.quiz.level);
    AppState.quiz.currentQuestionIndex = 0;
    AppState.quiz.score = 0;
    AppState.quiz.xpEarned = 0;
    AppState.quiz.correctStreak = 0;
    
    // Update quiz modal UI
    DOM.quizSubjectTitle.textContent = AppState.subjects[subject].name;
    DOM.quizLevel.textContent = AppState.quiz.level;
    DOM.totalQuestions.textContent = AppState.quiz.questions.length;
    
    // Show quiz modal
    DOM.quizModal.classList.add('active');
    
    // Start timer
    startQuizTimer();
    
    // Load first question
    loadQuestion();
}

// Get questions for a subject and level
function getQuestionsForSubject(subject, level) {
    const allQuestions = QUESTION_DATABASE[subject] || [];
    const difficulty = Math.min(Math.ceil(level / 3), 3);
    
    // Filter questions by difficulty and shuffle
    const filteredQuestions = allQuestions.filter(q => q.difficulty <= difficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    
    // Return 5 questions
    return shuffled.slice(0, 5);
}

// Start quiz timer
function startQuizTimer() {
    AppState.quiz.timer = 60;
    DOM.quizTimer.textContent = AppState.quiz.timer;
    
    AppState.quiz.timerInterval = setInterval(() => {
        AppState.quiz.timer--;
        DOM.quizTimer.textContent = AppState.quiz.timer;
        
        if (AppState.quiz.timer <= 0) {
            clearInterval(AppState.quiz.timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

// Handle time up
function handleTimeUp() {
    showFeedback("Time's up! The correct answer was selected for you.", false);
    markCorrectAnswer();
    disableOptions();
    DOM.nextQuestionBtn.style.display = 'block';
}

// Load current question
function loadQuestion() {
    if (AppState.quiz.currentQuestionIndex >= AppState.quiz.questions.length) {
        finishQuiz();
        return;
    }
    
    const question = AppState.quiz.questions[AppState.quiz.currentQuestionIndex];
    
    // Update UI
    DOM.currentQuestion.textContent = AppState.quiz.currentQuestionIndex + 1;
    DOM.questionText.textContent = question.question;
    DOM.questionType.textContent = question.type === 'mcq' ? 'Multiple Choice' : 'True/False';
    
    // Update progress bar
    const progress = ((AppState.quiz.currentQuestionIndex) / AppState.quiz.questions.length) * 100;
    DOM.quizProgressFill.style.width = `${progress}%`;
    
    // Clear previous options
    DOM.quizOptions.innerHTML = '';
    DOM.quizFeedback.classList.remove('active');
    
    // Load options based on question type
    if (question.type === 'mcq') {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.setAttribute('data-index', index);
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            DOM.quizOptions.appendChild(optionElement);
        });
    } else {
        // True/False question
        const trueOption = document.createElement('button');
        trueOption.className = 'quiz-option';
        trueOption.textContent = 'True';
        trueOption.setAttribute('data-index', 'true');
        trueOption.addEventListener('click', () => selectOption(trueOption, true));
        
        const falseOption = document.createElement('button');
        falseOption.className = 'quiz-option';
        falseOption.textContent = 'False';
        falseOption.setAttribute('data-index', 'false');
        falseOption.addEventListener('click', () => selectOption(falseOption, false));
        
        DOM.quizOptions.appendChild(trueOption);
        DOM.quizOptions.appendChild(falseOption);
    }
}

// Select an option
function selectOption(optionElement, selectedIndex) {
    if (DOM.quizFeedback.classList.contains('active')) return;
    
    const question = AppState.quiz.questions[AppState.quiz.currentQuestionIndex];
    const isCorrect = question.type === 'mcq' 
        ? selectedIndex === question.correctAnswer
        : selectedIndex === question.correctAnswer;
    
    // Mark selected option
    optionElement.classList.add('selected');
    
    // Show feedback
    if (isCorrect) {
        AppState.quiz.score++;
        AppState.quiz.correctStreak++;
        DOM.quizScore.textContent = AppState.quiz.score;
        
        // Calculate XP earned
        const baseXp = question.xp;
        const streakBonus = Math.min(AppState.quiz.correctStreak - 1, 5) * 5;
        const timeBonus = Math.max(Math.floor(AppState.quiz.timer / 10), 0) * 5;
        const xpEarned = baseXp + streakBonus + timeBonus;
        
        AppState.quiz.xpEarned += xpEarned;
        DOM.xpEarned.textContent = AppState.quiz.xpEarned;
        
        showFeedback(`${question.explanation}<br><br>+${xpEarned} XP (${baseXp} base + ${streakBonus} streak + ${timeBonus} time)`, true);
        
        // Show XP notification
        showXpNotification(xpEarned);
    } else {
        AppState.quiz.correctStreak = 0;
        showFeedback(`${question.explanation}<br><br>Correct answer: ${question.type === 'mcq' ? question.options[question.correctAnswer] : question.correctAnswer}`, false);
        markCorrectAnswer();
    }
    
    // Disable all options
    disableOptions();
    
    // Show next question button
    DOM.nextQuestionBtn.style.display = 'block';
}

// Mark the correct answer
function markCorrectAnswer() {
    const question = AppState.quiz.questions[AppState.quiz.currentQuestionIndex];
    
    if (question.type === 'mcq') {
        const correctOption = DOM.quizOptions.querySelector(`[data-index="${question.correctAnswer}"]`);
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        
        // Mark incorrect if selected
        const selectedOption = DOM.quizOptions.querySelector('.selected');
        if (selectedOption && selectedOption.getAttribute('data-index') != question.correctAnswer) {
            selectedOption.classList.add('incorrect');
        }
    } else {
        // True/False question
        const correctOption = DOM.quizOptions.querySelector(`[data-index="${question.correctAnswer}"]`);
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        
        // Mark incorrect if selected
        const selectedOption = DOM.quizOptions.querySelector('.selected');
        if (selectedOption && selectedOption.getAttribute('data-index') != question.correctAnswer) {
            selectedOption.classList.add('incorrect');
        }
    }
}

// Disable all options
function disableOptions() {
    const options = DOM.quizOptions.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

// Show feedback
function showFeedback(message, isCorrect) {
    DOM.feedbackContent.innerHTML = isCorrect 
        ? `<i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 10px;"></i> ${message}`
        : `<i class="fas fa-times-circle" style="color: var(--danger-color); margin-right: 10px;"></i> ${message}`;
    
    DOM.quizFeedback.classList.add('active');
    DOM.nextQuestionBtn.style.display = 'block';
}

// Move to next question
function nextQuestion() {
    AppState.quiz.currentQuestionIndex++;
    DOM.nextQuestionBtn.style.display = 'none';
    loadQuestion();
}

// Finish quiz
function finishQuiz() {
    clearInterval(AppState.quiz.timerInterval);
    
    // Calculate final XP
    const perfectBonus = AppState.quiz.score === AppState.quiz.questions.length ? 100 : 0;
    const finalXp = AppState.quiz.xpEarned + perfectBonus;
    
    // Update user stats
    const oldLevel = AppState.user.level;
    const oldRank = AppState.user.rank;
    
    AppState.user.xp += finalXp;
    AppState.user.totalXp += finalXp;
    AppState.user.points += AppState.quiz.score * 10;
    AppState.user.learningTime += 0.5; // Add 30 minutes of learning time
    
    // Check for level up
    checkLevelUp(oldLevel);
    
    // Check for rank up
    checkRankUp(oldRank);
    
    // Update subject progress
    const subject = AppState.quiz.subject;
    const questionsAnswered = AppState.quiz.questions.length;
    const correctAnswers = AppState.quiz.score;
    
    AppState.subjects[subject].questionsAnswered += questionsAnswered;
    AppState.subjects[subject].progress = Math.min(
        Math.round((AppState.subjects[subject].questionsAnswered / AppState.subjects[subject].totalQuestions) * 100),
        100
    );
    
    // Update current level for the subject if they did well
    if (correctAnswers >= questionsAnswered * 0.8) {
        AppState.subjects[subject].currentLevel = Math.min(
            AppState.subjects[subject].currentLevel + 1,
            AppState.subjects[subject].levels
        );
    }
    
    // Check for achievements
    checkAchievements();
    
    // Save state
    saveState();
    
    // Update UI
    updateUserStats();
    updateProgressBars();
    updateLevelProgress();
    
    // Show completion message
    DOM.feedbackContent.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>You scored <strong>${AppState.quiz.score}/${AppState.quiz.questions.length}</strong> correct answers.</p>
        <p>You earned <strong>${finalXp} XP</strong>${perfectBonus > 0 ? ` (including ${perfectBonus} perfect bonus!)` : ''}.</p>
        <p>Your current streak: <strong>${AppState.quiz.correctStreak}</strong> correct answers in a row.</p>
    `;
    
    DOM.quizFeedback.classList.add('active');
    DOM.nextQuestionBtn.textContent = 'Finish Quiz';
    DOM.nextQuestionBtn.removeEventListener('click', nextQuestion);
    DOM.nextQuestionBtn.addEventListener('click', closeQuiz, { once: true });
    
    // Update progress bar to 100%
    DOM.quizProgressFill.style.width = '100%';
}

// Check for level up
function checkLevelUp(oldLevel) {
    const newLevel = calculateLevelFromXp(AppState.user.xp);
    
    if (newLevel > oldLevel) {
        AppState.user.level = newLevel;
        showLevelUpModal(newLevel);
    }
}

// Calculate level from XP
function calculateLevelFromXp(xp) {
    for (let i = XP_REQUIREMENTS.length - 1; i >= 0; i--) {
        if (xp >= XP_REQUIREMENTS[i]) {
            return i + 1;
        }
    }
    return 1;
}

// Check for rank up
function checkRankUp(oldRank) {
    const newRank = getRankFromXp(AppState.user.totalXp);
    
    if (newRank !== oldRank) {
        AppState.user.rank = newRank;
        showToast("Rank Up!", `You've been promoted to ${newRank}!`, "success");
    }
}

// Check for achievements
function checkAchievements() {
    let newAchievements = [];
    
    // Check for "First Steps" achievement
    if (!AppState.achievements[0].unlocked) {
        AppState.achievements[0].unlocked = true;
        newAchievements.push(AppState.achievements[0]);
    }
    
    // Check for "Quick Learner" achievement (10 correct answers total)
    const totalCorrectAnswers = Object.values(AppState.subjects).reduce(
        (sum, subject) => sum + Math.floor(subject.questionsAnswered * (subject.progress / 100)), 
        0
    );
    
    if (totalCorrectAnswers >= 10 && !AppState.achievements[1].unlocked) {
        AppState.achievements[1].unlocked = true;
        newAchievements.push(AppState.achievements[1]);
    }
    
    // Check for "Streak Keeper" achievement
    if (AppState.user.streak >= 7 && !AppState.achievements[3].unlocked) {
        AppState.achievements[3].unlocked = true;
        newAchievements.push(AppState.achievements[3]);
    }
    
    // Show notifications for new achievements
    newAchievements.forEach(achievement => {
        showToast("Achievement Unlocked!", `${achievement.title} - ${achievement.description}`, "success");
    });
    
    // Update achievements UI if any were unlocked
    if (newAchievements.length > 0) {
        updateAchievements();
    }
}

// Close quiz
function closeQuiz() {
    DOM.quizModal.classList.remove('active');
    AppState.quiz.active = false;
    
    // Reset next question button
    DOM.nextQuestionBtn.textContent = 'Next Question';
    DOM.nextQuestionBtn.removeEventListener('click', closeQuiz);
    DOM.nextQuestionBtn.addEventListener('click', nextQuestion);
}

// Show XP notification
function showXpNotification(xp) {
    DOM.xpNotification.querySelector('.xp-notification-title').textContent = `+${xp} XP Earned!`;
    DOM.xpNotification.querySelector('.xp-notification-subtitle').textContent = 
        AppState.quiz.correctStreak > 1 ? `${AppState.quiz.correctStreak} correct answers in a row!` : 'Correct answer!';
    
    DOM.xpNotification.classList.add('show');
    
    setTimeout(() => {
        DOM.xpNotification.classList.remove('show');
    }, 3000);
}

// Show level up modal
function showLevelUpModal(newLevel) {
    DOM.newLevel.textContent = newLevel;
    DOM.levelUpModal.classList.add('active');
}

// Show toast notification
function showToast(title, message, type = "info") {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, 5000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);