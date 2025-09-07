document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validasi login
        if (username === 'vieqirara' && (password === 'akusayangvieqi' || password === 'akusayangrara')) {
            // Simpan status login di localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            // Redirect ke halaman dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Tampilkan pesan error
            errorMessage.style.display = 'block';
            
            // Sembunyikan pesan error setelah 3 detik
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
});
