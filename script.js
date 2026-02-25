// ============================================
// INSTAGRAM API INTEGRATION - WORKING SOLUTION
// ============================================

// Using Instagram Graph API with proper authentication
// You need to set up an Instagram Business Account and get credentials

const INSTAGRAM_CONFIG = {
    businessAccountId: 'YOUR_BUSINESS_ACCOUNT_ID',  // Replace with your Business Account ID
    accessToken: 'YOUR_ACCESS_TOKEN',                 // Replace with your Access Token
    username: 'gabryelsallehount'
};

let allPosts = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Fetch Instagram data
    await fetchInstagramPosts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize gallery
    updateGallery();
    
    // Initialize countdown timer
    updateCountdown();
}

// ============================================
// INSTAGRAM DATA INTEGRATION - MULTIPLE OPTIONS
// ============================================

async function fetchInstagramPosts() {
    try {
        console.log('Attempting to fetch Instagram posts from @' + INSTAGRAM_CONFIG.username);
        
        // TRY METHOD 1: Instagram Graph API (Best - Official)
        const graphAPISuccess = await tryInstagramGraphAPI();
        if (graphAPISuccess) {
            console.log('✓ Successfully loaded posts from Instagram Graph API');
            return;
        }
        
        // TRY METHOD 2: Snapwidget API (Easy alternative)
        const snapwidgetSuccess = await trySnapwidgetAPI();
        if (snapwidgetSuccess) {
            console.log('✓ Successfully loaded posts from Snapwidget');
            return;
        }
        
        // TRY METHOD 3: Instagram Basic Display API (Free alternative)
        const basicDisplaySuccess = await tryInstagramBasicDisplay();
        if (basicDisplaySuccess) {
            console.log('✓ Successfully loaded posts from Instagram Basic Display');
            return;
        }
        
        // FALLBACK: Use placeholder data if all APIs fail
        console.warn('⚠ Unable to fetch from Instagram APIs, using placeholder data');
        allPosts = generatePlaceholderPosts();
        
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        allPosts = generatePlaceholderPosts();
    }
}

// ============================================
// METHOD 1: Instagram Graph API (Official - Recommended)
// ============================================

async function tryInstagramGraphAPI() {
    try {
        // Documentation: https://developers.facebook.com/docs/instagram-graph-api
        // You need: Business Account ID, Access Token
        
        if (!INSTAGRAM_CONFIG.businessAccountId || !INSTAGRAM_CONFIG.accessToken) {
            console.log('Instagram Graph API credentials not set. Skipping...');
            return false;
        }
        
        const endpoint = `https://graph.instagram.com/v18.0/${INSTAGRAM_CONFIG.businessAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${INSTAGRAM_CONFIG.accessToken}`;
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            allPosts = data.data.map((post, index) => ({
                id: post.id,
                type: post.media_type === 'VIDEO' ? 'video' : 'image',
                src: post.media_url,
                caption: post.caption || '',
                tags: extractHashtags(post.caption || ''),
                date: new Date(post.timestamp),
                url: post.permalink
            }));
            return true;
        }
        return false;
        
    } catch (error) {
        console.log('Instagram Graph API error:', error.message);
        return false;
    }
}

// ============================================
// METHOD 2: Snapwidget API (Easy Alternative)
// ============================================

async function trySnapwidgetAPI() {
    try {
        // Snapwidget is easier but less control
        // You can set up a free account at snapwidget.com
        // They provide an easy embed code
        
        // For direct API access, use this endpoint:
        const endpoint = `https://snapwidget.com/api/instagram/${INSTAGRAM_CONFIG.username}`;
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Snapwidget API failed');
        
        const data = await response.json();
        
        if (data.posts && data.posts.length > 0) {
            allPosts = data.posts.map(post => ({
                id: post.id,
                type: post.type === 'video' ? 'video' : 'image',
                src: post.image_url || post.src,
                caption: post.caption || post.text || '',
                tags: extractHashtags(post.caption || post.text || ''),
                date: new Date(post.timestamp || post.date),
                url: post.link || post.instagram_url
            }));
            return true;
        }
        return false;
        
    } catch (error) {
        console.log('Snapwidget API error:', error.message);
        return false;
    }
}

// ============================================
// METHOD 3: Instagram Basic Display API
// ============================================

async function tryInstagramBasicDisplay() {
    try {
        // Documentation: https://developers.facebook.com/docs/instagram-basic-display
        // Similar to Graph API but for basic display
        
        if (!INSTAGRAM_CONFIG.businessAccountId || !INSTAGRAM_CONFIG.accessToken) {
            console.log('Instagram Basic Display credentials not set. Skipping...');
            return false;
        }
        
        const endpoint = `https://graph.instagram.com/v18.0/${INSTAGRAM_CONFIG.businessAccountId}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${INSTAGRAM_CONFIG.accessToken}`;
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Basic Display API failed');
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            allPosts = data.data.map(post => ({
                id: post.id,
                type: post.media_type === 'VIDEO' ? 'video' : 'image',
                src: post.media_url,
                caption: post.caption || '',
                tags: extractHashtags(post.caption || ''),
                date: new Date(post.timestamp)
            }));
            return true;
        }
        return false;
        
    } catch (error) {
        console.log('Instagram Basic Display error:', error.message);
        return false;
    }
}

// ============================================
// UTILITY FUNCTION: Extract Hashtags
// ============================================

function extractHashtags(text) {
    const hashtagRegex = /#[\w]+/g;
    const matches = text.match(hashtagRegex) || [];
    return matches;
}

function generatePlaceholderPosts() {
    // Placeholder posts - shown when Instagram connection fails
    return [
        {
            id: 1,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=600&fit=crop',
            caption: 'Chasing light and capturing moments of pure authenticity',
            tags: ['#photography', '#portrait', '#lighting'],
            date: new Date('2024-01-15')
        },
        {
            id: 2,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop',
            caption: 'A study in contrasts and complementary colors',
            tags: ['#editorial', '#fashion', '#photography'],
            date: new Date('2024-01-10')
        },
        {
            id: 3,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=600&fit=crop',
            caption: 'Exploring geometry and form in minimalist compositions',
            tags: ['#minimalist', '#abstract', '#creative'],
            date: new Date('2024-01-05')
        },
        {
            id: 4,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=600&fit=crop',
            caption: 'Capturing raw emotion and authentic moments',
            tags: ['#documentary', '#real', '#authentic'],
            date: new Date('2023-12-28')
        },
        {
            id: 5,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1549887534-f3df24220afa?w=500&h=600&fit=crop',
            caption: 'Golden hour magic in its finest form',
            tags: ['#outdoor', '#portrait', '#goldenhour'],
            date: new Date('2023-12-20')
        },
        {
            id: 6,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=600&fit=crop',
            caption: 'Where vision meets reality, one frame at a time',
            tags: ['#cinematography', '#video', '#creative'],
            date: new Date('2023-12-15')
        }
    ];
}

// ============================================
// RANDOMIZE VIEW FUNCTIONALITY
// ============================================

function setupEventListeners() {
    const randomizeBtn = document.getElementById('randomizeBtn');
    const dateFilter = document.getElementById('dateFilter');
    const typeFilter = document.getElementById('typeFilter');
    const questionnaireForm = document.getElementById('questionnaireForm');

    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', randomizeMediaDisplay);
    }

    if (dateFilter) {
        dateFilter.addEventListener('change', updateGallery);
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', updateGallery);
    }

    if (questionnaireForm) {
        questionnaireForm.addEventListener('submit', handleFormSubmit);
    }
}

function randomizeMediaDisplay() {
    const mediaDisplay = document.getElementById('mediaDisplay');
    const shuffledPosts = shuffleArray([...allPosts]);
    
    mediaDisplay.innerHTML = '';
    const placeholderGrid = document.createElement('div');
    placeholderGrid.className = 'placeholder-grid';
    
    // Show random selection of posts
    shuffledPosts.slice(0, 3).forEach((post, index) => {
        const item = createMediaItem(post);
        item.style.animationDelay = (index * 0.1) + 's';
        placeholderGrid.appendChild(item);
    });
    
    mediaDisplay.appendChild(placeholderGrid);
}

function createMediaItem(post) {
    const item = document.createElement('div');
    item.className = 'placeholder-item';
    
    let mediaContent = `<img src="${post.src}" alt="Portfolio image">`;
    if (post.type === 'video') {
        mediaContent = `<div class="video-placeholder">${mediaContent}<span class="video-badge">VIDEO</span></div>`;
    }
    
    const tagsHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    item.innerHTML = `
        ${mediaContent}
        <p class="image-caption">${post.caption}</p>
        <div class="image-tags">${tagsHTML}</div>
    `;
    
    return item;
}

// ============================================
// GALLERY FILTERING
// ============================================

function updateGallery() {
    const dateFilter = document.getElementById('dateFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const galleryGrid = document.getElementById('galleryGrid');
    
    let filteredPosts = [...allPosts];
    
    // Filter by type
    if (typeFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.type === typeFilter);
    }
    
    // Sort by date
    if (dateFilter === 'newest') {
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateFilter === 'oldest') {
        filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    // Render gallery
    galleryGrid.innerHTML = '';
    filteredPosts.forEach((post, index) => {
        const item = createGalleryItem(post);
        item.style.animationDelay = (index * 0.05) + 's';
        galleryGrid.appendChild(item);
    });
}

function createGalleryItem(post) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    let mediaContent = `<img src="${post.src}" alt="Gallery image">`;
    if (post.type === 'video') {
        mediaContent = `<div class="video-placeholder">${mediaContent}<span class="video-badge">VIDEO</span></div>`;
    }
    
    const tagsHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    item.innerHTML = `
        ${mediaContent}
        <p class="image-caption">${post.caption}</p>
        <div class="image-tags">${tagsHTML}</div>
    `;
    
    return item;
}

// ============================================
// COUNTDOWN TIMER - LIVE UPDATE
// ============================================

function updateCountdown() {
    const targetDate = new Date('2025-12-31').getTime();
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;
    
    function tick() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            const countdownText = countdownElement.querySelector('.countdown-text');
            if (countdownText) {
                countdownText.innerHTML = `The moment has arrived! <span class="mystery-name">MILEY CYRUS SHOOT</span>`;
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const countdownText = countdownElement.querySelector('.countdown-text');
        if (countdownText) {
            countdownText.innerHTML = `${days} days ${hours}h ${minutes}m ${seconds}s waiting to shoot <span class="mystery-name">MILEY CYRUS</span>`;
        }
    }
    
    tick(); // Initial call
    setInterval(tick, 1000); // Update every second
}
updateCountdown();

// ============================================
// FORM HANDLING
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Questionnaire submitted:', data);
    
    // Show success message
    alert('Thank you for your submission! I\'ll be in touch soon.');
    
    // Reset form
    e.target.reset();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Emergency contact toggle (optional - can be enhanced)
const emergencyBtn = document.getElementById('emergencyBtn');
if (emergencyBtn) {
    emergencyBtn.addEventListener('click', function() {
        const emergencyContact = document.getElementById('emergencyContact');
        if (emergencyContact) {
            emergencyContact.style.display = 
                emergencyContact.style.display === 'none' ? 'block' : 'none';
        }
    });
}
