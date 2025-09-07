document.addEventListener('DOMContentLoaded', function() {
    // Cek status login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Tampilkan username
    const username = localStorage.getItem('username');
    document.getElementById('welcome-user').textContent = `Halo, ${username}!`;
    
    // Load saved memories
    loadMemories();
    
    // Load saved message
    loadSavedMessage();
    
    // Load uploaded photo
    loadUploadedPhoto();
    
    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
    
    // Spotify player functionality
    document.getElementById('load-spotify').addEventListener('click', function() {
        const spotifyLink = document.getElementById('spotify-link').value;
        let spotifyEmbedUrl = '';
        
        // Convert regular Spotify link to embed link
        if (spotifyLink.includes('spotify.com/track/')) {
            const trackId = spotifyLink.split('spotify.com/track/')[1].split('?')[0];
            spotifyEmbedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
        } else if (spotifyLink.includes('spotify.com/playlist/')) {
            const playlistId = spotifyLink.split('spotify.com/playlist/')[1].split('?')[0];
            spotifyEmbedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
        } else if (spotifyLink.includes('spotify.com/album/')) {
            const albumId = spotifyLink.split('spotify.com/album/')[1].split('?')[0];
            spotifyEmbedUrl = `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`;
        } else {
            showNotification('Link Spotify tidak valid!', 'error');
            return;
        }
        
        document.getElementById('spotify-iframe').src = spotifyEmbedUrl;
        showNotification('Player Spotify berhasil dimuat!');
    });
    
    // Save message functionality
    document.getElementById('save-message').addEventListener('click', function() {
        const message = document.getElementById('message').value;
        
        if (!message.trim()) {
            showNotification('Pesan tidak boleh kosong!', 'error');
            return;
        }
        
        localStorage.setItem('savedMessage', message);
        document.getElementById('saved-message').textContent = message;
        document.getElementById('saved-message').style.display = 'block';
        
        showNotification('Pesan berhasil disimpan!');
    });
    
    // Photo upload functionality
    document.getElementById('upload-photo').addEventListener('click', function() {
        const fileInput = document.getElementById('photo-upload');
        
        if (!fileInput.files || !fileInput.files[0]) {
            showNotification('Pilih foto terlebih dahulu!', 'error');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Photo">`;
            
            // Save photo to localStorage
            localStorage.setItem('uploadedPhoto', e.target.result);
            
            showNotification('Foto berhasil diupload!');
        };
        
        reader.readAsDataURL(file);
    });
    
    // Save memory functionality
    document.getElementById('save-memory').addEventListener('click', function() {
        const year = document.getElementById('memory-year').value;
        const memoryText = document.getElementById('memory-text').value;
        
        if (!memoryText.trim()) {
            showNotification('Kenangan tidak boleh kosong!', 'error');
            return;
        }
        
        // Get existing memories or create empty array
        let memories = JSON.parse(localStorage.getItem('memories')) || [];
        
        // Add new memory
        memories.push({
            year: year,
            text: memoryText,
            date: new Date().toLocaleDateString('id-ID')
        });
        
        // Save to localStorage
        localStorage.setItem('memories', JSON.stringify(memories));
        
        // Clear form
        document.getElementById('memory-text').value = '';
        
        // Reload memories display
        loadMemories();
        
        showNotification('Kenangan berhasil disimpan!');
    });
}

// Load saved message
function loadSavedMessage() {
    const savedMessage = localStorage.getItem('savedMessage');
    
    if (savedMessage) {
        document.getElementById('message').value = savedMessage;
        document.getElementById('saved-message').textContent = savedMessage;
        document.getElementById('saved-message').style.display = 'block';
    }
}

// Load uploaded photo
function loadUploadedPhoto() {
    const uploadedPhoto = localStorage.getItem('uploadedPhoto');
    
    if (uploadedPhoto) {
        const photoPreview = document.getElementById('photo-preview');
        photoPreview.innerHTML = `<img src="${uploadedPhoto}" alt="Uploaded Photo">`;
    }
}

// Load memories
function loadMemories() {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    const container = document.getElementById('memories-container');
    
    // Clear container
    container.innerHTML = '';
    
    if (memories.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--brown);">Belum ada kenangan yang disimpan.</p>';
        return;
    }
    
    // Sort memories by year (newest first)
    memories.sort((a, b) => b.year - a.year);
    
    // Display memories
    memories.forEach(memory => {
        const memoryElement = document.createElement('div');
        memoryElement.className = 'memory-item';
        memoryElement.innerHTML = `
            <div class="memory-header">
                <span class="memory-year">${memory.year}</span>
                <span class="memory-date">${memory.date}</span>
            </div>
            <div class="memory-content">${memory.text}</div>
        `;
        
        container.appendChild(memoryElement);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    notification.textContent = message;
    notification.style.backgroundColor = type === 'error' ? '#FFCDD2' : 'var(--pastel-yellow)';
    notification.style.color = type === 'error' ? '#D32F2F' : 'var(--brown)';
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
                                                             }
