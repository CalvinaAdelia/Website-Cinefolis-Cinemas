const movies = [
    {
        id: 1,
        title: "Lilo & Stitch",
        poster: "assets/movie-posters/lilo-stitch.png",
        hasDetailPage: true,
        genre: "Adventure",
        duration: "108 Minutes",
        description: "Seorang gadis cilik di Hawaii yang kesepian berteman dengan alien yang sedang melarikan diri, yang kemudian membantu merekatkan kembali keluarganya yang terpecah."
    },
    {
        id: 2,
        title: "Jumbo",
        poster: "assets/jumbo.png",
        hasDetailPage: true,
        genre: "Animation",
        duration: "102 Minutes",
        description: "Don, anak gemuk yang sering diolok-olok 'Jumbo' ingin membalas perbuatan anak yang suka merundungnya, tapi sesosok arwah bernama Meri meminta pertolongan Don untuk disatukan kembali dengan makam keluarganya yang dirusak."
    },
    {
        id: 3,
        title: "Tak Ingin Usai di Sini",
        poster: "assets/movie-posters/tak-ingin-usai.png",
        hasDetailPage: true,
        genre: "Romance",
        duration: "108 Minutes",
        description: "K adalah seorang produser radio yang bertemu dengan Cream ketika SMA dan semenjak itu selalu tinggal bersama. Mereka selalu hidup dengan memiliki satu sama lain, tapi tidak ada hubungan yang jelas di antara mereka. Suatu hari, K mendapatkan vonis bahwa nyawanya akan segera berakhir karena penyakit leukemia yang dideritanya. K yang diam-diam mencintai Cream pun mengetahui bahwa Cream sangat takut terhadap kesendirian, sehingga dia tidak ingin Cream hidup tersiksa karena sendiri ketika K nanti sudah pergi. K pun mencoba berbagai cara, salah satunya dengan mendorong Cream untuk berkenalan dengan pria lain yang lebih baik dan sehat. Selama usahanya mendorong Cream, dia juga harus bertarung dengan leukemianya yang semakin lama semakin akut. K berhasil, Cream pada akhirnya menikah dengan orang lain. Tanpa diketahui K, Cream ternyata telah mengetahui penyakit K selama ini dan menikah hanya untuk membuat K tenang sebelum saat terakhirnya. Akhirnya, Cream pun berpisah dengan suami yang baru dinikahinya dan menemani K di masa-masa akhir hidupnya."
    },
    {
        id: 4,
        title: "Ballerina",
        poster: "assets/movie-posters/ballerina.png",
        hasDetailPage: true,
        genre: "Action",
        duration: "124 Minutes",
        description: "Eve (Ana de Armas) seorang pembunuh yang terlatih dalam tradisi organisasi Ruska Roma berangkat untuk membalas dendam setelah kematian ayahnya."
    },
    {
        id: 5,
        title: "Final Destination: Bloodlines",
        poster: "assets/movie-posters/final-destination.png",
        hasDetailPage: true,
        genre: "Horror, Thriller, Supernatural",
        duration: "110 Minutes",
        description: "Dihantui oleh mimpi buruk berulang yang mengerikan, Stefanie pulang ke rumah untuk mencari orang yang mungkin bisa memutus siklus tersebut dan menyelamatkan keluarganya dari kematian mengerikan yang menanti mereka semua."
    },
    {
        id: 6,
        title: "Gowok",
        poster: "assets/movie-posters/gowok.png",
        hasDetailPage: true,
        genre: "Drama",
        duration: "132 Minutes",
        description: "Ratri merupakan anak dari seorang pelacur, tanpa mengetahui siapa ayahnya. Sejak bayi, ia diasuh oleh Nyai Santi, seorang gowok yang bijaksana dan disegani. Ratri tumbuh menjadi gadis cantik dan berbakat, dididik untuk meneruskan ilmu gowokan Nyai Santi. Sebelum waktunya, Ratri jatuh cinta pada Kamanjaya, seorang remaja dari keluarga terpandang. Mereka bercinta dan Kamanjaya berjanji akan menikahi Ratri, namun ia mengingkari janjinya. Dua puluh tahun kemudian, Ratri bertemu kembali dengan Kamanjaya yang kini membawa putranya, Bagas, untuk belajar di bawah asuhan Nyai Santi. Bagas jatuh cinta pada Ratri, tanpa tahu hubungan masa lalu orang tua mereka. Ratri pun menggunakan pesonanya untuk membalas dendam."
    }
];

document.querySelector('.menu-icon').addEventListener('click', function () {
    document.querySelector('.nav-menu').classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    highlightCurrentNav(currentPage);
    
    if (currentPage === 'now-showing.html') {
        initializeNowShowing();
    } else if (currentPage === 'feedback.html') {
        initializeFeedback();
    } else if (currentPage === 'film-detail.html') {
        initializeFilmDetail();
    } else if (currentPage === 'cinemas.html') {
        initializeCinemaPage();
    }
});

function highlightCurrentNav(currentPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.style.color = '#ff4444';
        }
    });
}

function initializeNowShowing() {
    const moviesGrid = document.querySelector('.movies-grid');
    if (moviesGrid) {
        moviesGrid.innerHTML = ''; 
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            `;
            
            movieCard.addEventListener('click', () => {
                handleMovieClick(movie);
            });
            
            movieCard.setAttribute('tabindex', '0');
            movieCard.setAttribute('role', 'button');
            movieCard.setAttribute('aria-label', `View details for ${movie.title}`);
            
            movieCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMovieClick(movie);
                }
            });
            
            moviesGrid.appendChild(movieCard);
        });
    }
}

function handleMovieClick(movie) {
    if (movie.hasDetailPage) {
        window.location.href = `film-detail.html?id=${movie.id}`;
    } else {
        showComingSoonModal(movie.title);
    }
}

function showComingSoonModal(movieTitle) {
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: #222;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 1rem;
        border: 2px solid #ff4444;
        animation: slideIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: #ff4444; margin-bottom: 1rem;">${movieTitle}</h2>
        <p style="color: #fff; margin-bottom: 1.5rem;">
            Detail halaman untuk film ini belum tersedia. 
            <br>Silakan kembali lagi nanti!
        </p>
        <button id="close-modal" style="
            background: #ff4444;
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s ease;
        ">Tutup</button>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    const closeBtn = modalContent.querySelector('#close-modal');
    const closeModal = () => {
        document.body.removeChild(modalOverlay);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function initializeFilmDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    
    const movie = movies.find(m => m.id === movieId);
    
    if (movie && movie.hasDetailPage) {
        updateFilmDetailPage(movie);
    } else {
        window.location.href = 'now-showing.html';
    }
    
    initializeFilmDetailFilters();
    initializeBookingControls();
}

function updateFilmDetailPage(movie) {
    const moviePoster = document.getElementById('movie-poster');
    if (moviePoster) {
        moviePoster.src = movie.poster;
        moviePoster.alt = movie.title;
    }
    
    const movieTitle = document.getElementById('movie-title');
    if (movieTitle) {
        movieTitle.textContent = movie.title;
    }
    
    const movieGenre = document.getElementById('movie-genre');
    if (movieGenre && movie.genre) {
        movieGenre.textContent = movie.genre;
    }
    
    const movieDuration = document.getElementById('movie-duration');
    if (movieDuration && movie.duration) {
        movieDuration.textContent = movie.duration;
    }
    
    const movieDescription = document.getElementById('movie-description');
    if (movieDescription && movie.description) {
        movieDescription.textContent = movie.description;
    }
    
    document.title = `${movie.title} - Cinepolis Cinemas`;
}

function initializeFilmDetailFilters() {
    const cinemaSelect = document.getElementById('cinema-select');
    const screenSelect = document.getElementById('screen-select');
    const datePicker = document.getElementById('date-picker');
    
    if (cinemaSelect) {
        cinemaSelect.addEventListener('change', filterCinemas);
    }
    
    if (screenSelect) {
        screenSelect.addEventListener('change', filterCinemas);
    }
    
    if (datePicker) {
        datePicker.addEventListener('change', function() {
            console.log('Date changed to:', this.value);
        });
    }
    
    const showtimes = document.querySelectorAll('.showtime');
    showtimes.forEach(showtime => {
        showtime.addEventListener('click', function() {
            const cinemaName = this.closest('.cinema-item').querySelector('.cinema-name').textContent;
            const time = this.textContent;
            alert(`Booking for ${cinemaName} at ${time}`);
        });
    });
}

function filterCinemas() {
    const selectedCinema = document.getElementById('cinema-select').value;
    const selectedScreen = document.getElementById('screen-select').value;
    const cinemaItems = document.querySelectorAll('.cinema-item');
    
    cinemaItems.forEach(item => {
        const cinemaLocation = item.getAttribute('data-location');
        const screenType = item.getAttribute('data-screen');
        
        let showItem = true;
        
        if (selectedCinema !== 'all' && selectedCinema !== cinemaLocation) {
            showItem = false;
        }
        
        if (selectedScreen !== 'all' && selectedScreen !== screenType) {
            showItem = false;
        }
        
        item.style.display = showItem ? 'block' : 'none';
    });
    
    const visibleCinemas = document.querySelectorAll('.cinema-item[style="display: block"], .cinema-item:not([style*="display: none"])');
    
    if (visibleCinemas.length === 0) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

function showNoResultsMessage() {
    hideNoResultsMessage();
    
    const cinemasList = document.querySelector('.cinemas-list');
    if (cinemasList) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results-message';
        noResultsDiv.innerHTML = `
            <p style="text-align: center; color: #ccc; padding: 2rem;">
                No cinemas found for the selected filters. Please try different options.
            </p>
        `;
        cinemasList.appendChild(noResultsDiv);
    }
}

function hideNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function initializeBookingControls() {
    const datePicker = document.getElementById('date-picker');
    if (datePicker) {
        const today = new Date().toISOString().split('T')[0];
        datePicker.value = today;
    }
    
    const showtimes = document.querySelectorAll('.showtime');
    showtimes.forEach(showtime => {
        showtime.addEventListener('click', function() {
            showtimes.forEach(st => st.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initializeFeedback() {
    const feedbackForm = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const categorySelect = document.getElementById('category');
    const messageInput = document.getElementById('message');
    
    if (feedbackForm) {
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                validateNameRealTime(this);
            });
            nameInput.addEventListener('blur', function() {
                validateNameRealTime(this);
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                validateEmailRealTime(this);
            });
            emailInput.addEventListener('blur', function() {
                validateEmailRealTime(this);
            });
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', function() {
                validateCategoryRealTime(this);
            });
            categorySelect.addEventListener('blur', function() {
                validateCategoryRealTime(this);
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                validateMessageRealTime(this);
            });
            messageInput.addEventListener('blur', function() {
                validateMessageRealTime(this);
            });
        }
        
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                category: document.getElementById('category').value,
                message: document.getElementById('message').value
            };
            
            if (validateFeedbackForm(formData)) {
                showSuccessMessage();
                feedbackForm.reset();
                clearValidationMessages();
            }
        });
    }
}

function validateNameRealTime(nameInput) {
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('name-error') || createErrorElement('name-error');
    nameInput.classList.remove('error');
    nameError.style.display = 'none';
    
    if (nameValue.length > 0 && nameValue.length < 3) {
        nameInput.classList.add('error');
        nameError.textContent = 'Nama harus memiliki minimal 3 huruf';
        nameError.style.display = 'block';
        
        if (!nameInput.parentNode.querySelector('#name-error')) {
            nameInput.parentNode.appendChild(nameError);
        }
    } else if (nameValue.length >= 3 && !isValidName(nameValue)) {
        nameInput.classList.add('error');
        nameError.textContent = 'Nama hanya boleh mengandung huruf dan spasi';
        nameError.style.display = 'block';
        
        if (!nameInput.parentNode.querySelector('#name-error')) {
            nameInput.parentNode.appendChild(nameError);
        }
    }
}

function validateEmailRealTime(emailInput) {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('email-error') || createErrorElement('email-error');
    
    emailInput.classList.remove('error');
    emailError.style.display = 'none';
    
    if (emailValue.length > 0 && !isValidEmailSimple(emailValue)) {
        emailInput.classList.add('error');
        emailError.textContent = 'Format email tidak valid';
        emailError.style.display = 'block';
        
        if (!emailInput.parentNode.querySelector('#email-error')) {
            emailInput.parentNode.appendChild(emailError);
        }
    }
}

function validateCategoryRealTime(categorySelect) {
    const categoryValue = categorySelect.value;
    const categoryError = document.getElementById('category-error') || createErrorElement('category-error');
    
    categorySelect.classList.remove('error');
    categoryError.style.display = 'none';
    
    if (!categoryValue || categoryValue === '') {
        categorySelect.classList.add('error');
        categoryError.textContent = 'Kategori harus dipilih';
        categoryError.style.display = 'block';
        
        if (!categorySelect.parentNode.querySelector('#category-error')) {
            categorySelect.parentNode.appendChild(categoryError);
        }
    }
}

function validateMessageRealTime(messageInput) {
    const messageValue = messageInput.value.trim();
    const messageError = document.getElementById('message-error') || createErrorElement('message-error');
    
    messageInput.classList.remove('error');
    messageError.style.display = 'none';
    
    if (messageValue.length > 0 && messageValue.length < 10) {
        messageInput.classList.add('error');
        messageError.textContent = 'Pesan harus memiliki minimal 10 karakter';
        messageError.style.display = 'block';
        
        if (!messageInput.parentNode.querySelector('#message-error')) {
            messageInput.parentNode.appendChild(messageError);
        }
    }
}

function createErrorElement(id) {
    const errorElement = document.createElement('div');
    errorElement.id = id;
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        background-color: rgba(0, 0, 0, 0.9);
        color: #ff4444;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        margin-top: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ff4444;
        display: none;
        animation: slideIn 0.3s ease;
    `;
    return errorElement;
}

function clearValidationMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
        msg.style.display = 'none';
    });
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

function showSuccessMessage() {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease;
        border: 1px solid #1e7e34;
    `;
    successDiv.textContent = 'Terima kasih atas feedback Anda! Pesan telah berhasil dikirim.';
    
    const form = document.getElementById('feedback-form');
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

function validateFeedbackForm(data) {
    let isValid = true;
    
    clearValidationMessages();
    
    if (!data.name.trim()) {
        showFieldError('name', 'Nama harus diisi');
        isValid = false;
    } else if (data.name.trim().length < 3) {
        showFieldError('name', 'Nama harus memiliki minimal 3 huruf');
        isValid = false;
    } else if (!isValidName(data.name.trim())) {
        showFieldError('name', 'Nama hanya boleh mengandung huruf dan spasi');
        isValid = false;
    }
    
    if (!data.email.trim()) {
        showFieldError('email', 'Email harus diisi');
        isValid = false;
    } else if (!isValidEmailSimple(data.email)) {
        showFieldError('email', 'Format email tidak valid');
        isValid = false;
    }
    
    if (!data.category || data.category === '') {
        showFieldError('category', 'Kategori harus dipilih');
        isValid = false;
    }
    
    if (!data.message.trim()) {
        showFieldError('message', 'Pesan harus diisi');
        isValid = false;
    } else if (data.message.trim().length < 10) {
        showFieldError('message', 'Pesan harus memiliki minimal 10 karakter');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        
        let errorElement = document.getElementById(`${fieldId}-error`);
        if (!errorElement) {
            errorElement = createErrorElement(`${fieldId}-error`);
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function isValidName(name) {
    const namePattern = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    return namePattern.test(name);
}

function isValidEmailSimple(email) {
    const atIndex = email.indexOf('@');
    const lastDotIndex = email.lastIndexOf('.');
    
    if (atIndex < 1) return false;
    if (lastDotIndex < atIndex + 2) return false;
    if (lastDotIndex === email.length - 1) return false;
    if (email.includes(' ')) return false;
    if (email.includes('..')) return false;
    if (email.includes('@.') || email.includes('.@')) return false;
    
    return true;
}

function initializeCinemaPage() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const selectedCity = this.textContent;
            filterCinemasByCity(selectedCity);
        });
    });
    
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterCinemasBySearch(searchTerm);
            
            if (searchTerm) {
                filterButtons.forEach(btn => btn.classList.remove('active'));
            }
        });
    }
    
    const locationButtons = document.querySelectorAll('.btn-location');
    const scheduleButtons = document.querySelectorAll('.btn-schedule');
    
    locationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cinemaName = this.closest('.cinema-item').querySelector('h3').textContent;
            alert(`Membuka lokasi untuk ${cinemaName}`);
        });
    });
    
    scheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cinemaName = this.closest('.cinema-item').querySelector('h3').textContent;
            alert(`Membuka jadwal untuk ${cinemaName}`);
            window.location.href = 'now-showing.html';
        });
    });
}

function filterCinemasByCity(city) {
    const cinemaItems = document.querySelectorAll('.cinema-item');
    
    cinemaItems.forEach(item => {
        item.style.display = 'flex';
    });
    
    const activeButton = document.querySelector('.filter-btn.active');
    if (!activeButton) {
        return;
    }
    
    cinemaItems.forEach(item => {
        const cinemaName = item.querySelector('h3').textContent;
        const cinemaAddress = item.querySelector('.cinema-address').textContent;
        
        let shouldShow = false;
        
        if (city === 'Jakarta' && (cinemaName.includes('Kasablanka') || cinemaAddress.includes('Jakarta'))) {
            shouldShow = true;
        } else if (city === 'Surabaya' && (cinemaName.includes('Tunjungan') || cinemaAddress.includes('Surabaya'))) {
            shouldShow = true;
        } else if (city === 'Bandung' && (cinemaName.includes('Paris') || cinemaAddress.includes('Bandung'))) {
            shouldShow = true;
        } else if (city === 'Semarang' && (cinemaName.includes('DP Mall') || cinemaAddress.includes('Semarang'))) {
            shouldShow = true;
        }
        
        item.style.display = shouldShow ? 'flex' : 'none';
    });
}

function filterCinemasBySearch(searchTerm) {
    const cinemaItems = document.querySelectorAll('.cinema-item');
    cinemaItems.forEach(item => {
        const cinemaName = item.querySelector('h3').textContent.toLowerCase();
        const cinemaAddress = item.querySelector('.cinema-address').textContent.toLowerCase();
        
        if (cinemaName.includes(searchTerm) || cinemaAddress.includes(searchTerm) || searchTerm === '') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    /* REMOVED: All play button related styles */
    
    /* Form validation styles with consistent error message design */
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff4444;
        box-shadow: 0 0 5px rgba(255, 68, 68, 0.3);
    }
    
    .error-message {
        background-color: rgba(0, 0, 0, 0.9);
        color: #ff4444;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        margin-top: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ff4444;
        display: none;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    }
    
    .success-message {
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease;
        border: 1px solid #1e7e34;
        font-weight: 500;
    }
    
    /* Ensure error messages are visible and properly styled */
    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }
    
    .form-group .error-message {
        width: 100%;
        box-sizing: border-box;
    }
    
    /* Clean movie card hover effects without play button */
    .movie-card {
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        border-radius: 15px;
        overflow: hidden;
        position: relative;
    }
    
    .movie-card:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(255, 68, 68, 0.3);
    }
    
    .movie-card img {
        width: 100%;
        height: auto;
        min-height: 400px;
        max-height: 500px;
        object-fit: contain;
        object-position: center;
        border-radius: 15px;
        transition: filter 0.3s;
        background-color: #111;
    }
    
    .movie-card:hover img {
        filter: brightness(1.1);
    }
`;
document.head.appendChild(style);