/**
 * UKM IT TECHNOVERSE - JAVASCRIPT UTAMA
 * Menangani interaktivitas:
 * 1. Dark/Light Mode Theme Toggle & LocalStorage
 * 2. Mobile Responsive Hamburger Menu
 * 3. Filter Kategori Informasi Kegiatan
 * 4. Tab Interaktif Jadwal Belajar Mingguan
 * 5. Modal Popup Pendaftaran & Validasi Formulir
 * 6. Toast Notification Interaktif
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initActivityFilter();
    initScheduleFilter();
    initModal();
    initForms();
    initScrollSpy();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Ambil preferensi tema dari localStorage atau gunakan 'light' sebagai default
    const savedTheme = localStorage.getItem('techClub_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeIcon, savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('techClub_theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(iconElement, theme) {
    if (!iconElement) return;
    if (theme === 'dark') {
        iconElement.className = 'fa-solid fa-sun';
        iconElement.title = 'Ubah ke Mode Terang';
    } else {
        iconElement.className = 'fa-solid fa-moon';
        iconElement.title = 'Ubah ke Mode Gelap';
    }
}

/* ==========================================================================
   2. MOBILE NAVIGATION HAMBURGER MENU
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ==========================================================================
   3. FILTER INFORMASI KEGIATAN
   ========================================================================== */
function initActivityFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');

    if (!filterButtons.length || !activityCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            activityCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   4. FILTER JADWAL BELAJAR MINGGUAN
   ========================================================================== */
function initScheduleFilter() {
    const scheduleButtons = document.querySelectorAll('.schedule-tab-btn');
    const scheduleItems = document.querySelectorAll('.schedule-item');

    if (!scheduleButtons.length || !scheduleItems.length) return;

    scheduleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scheduleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetDivisi = btn.getAttribute('data-divisi');

            scheduleItems.forEach(item => {
                const itemDivisi = item.getAttribute('data-divisi');
                if (targetDivisi === 'all' || itemDivisi === targetDivisi) {
                    item.style.display = 'grid';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   5. MODAL POPUP PENDAFTARAN
   ========================================================================== */
function initModal() {
    const modalOverlay = document.getElementById('registration-modal');
    const openBtns = document.querySelectorAll('.btn-open-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modalOverlay) return;

    const openModal = () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // cegah scroll layar belakang
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Klik di area backdrop untuk menutup
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Tutup saat menekan tombol Escape keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   6. VALIDASI & SUBMIT FORMULIR PENDAFTARAN
   ========================================================================== */
function initForms() {
    const forms = document.querySelectorAll('.registration-form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const namaInput = form.querySelector('[name="nama"]');
            const nimInput = form.querySelector('[name="nim"]');
            const emailInput = form.querySelector('[name="email"]');
            const waInput = form.querySelector('[name="whatsapp"]');
            const divisiInput = form.querySelector('[name="divisi"]');

            const nama = namaInput ? namaInput.value.trim() : 'Mahasiswa';
            const nim = nimInput ? nimInput.value.trim() : '-';
            const email = emailInput ? emailInput.value.trim() : '-';
            const wa = waInput ? waInput.value.trim() : '-';
            const divisi = divisiInput ? divisiInput.options[divisiInput.selectedIndex].text : 'Umum';

            // Simpan pendaftar ke local storage sebagai demonstrasi
            const registeredUsers = JSON.parse(localStorage.getItem('techClub_registered') || '[]');
            registeredUsers.push({
                nama,
                nim,
                email,
                wa,
                divisi,
                tanggal: new Date().toLocaleDateString('id-ID')
            });
            localStorage.setItem('techClub_registered', JSON.stringify(registeredUsers));

            // Tampilkan Toast Notifikasi
            showToast(`Selamat ${nama}! Formulir pendaftaran divisi ${divisi} berhasil dikirim.`);

            // Reset form
            form.reset();

            // Tutup modal jika form berada di dalam modal
            const modalOverlay = document.getElementById('registration-modal');
            if (modalOverlay && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
    let toast = document.getElementById('toast-msg');
    
    // Jika elemen toast belum ada, buat baru
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check toast-icon"></i>
            <div>
                <strong style="display:block; font-size: 0.95rem;">Berhasil!</strong>
                <span id="toast-text" style="font-size: 0.85rem; color: var(--text-muted);"></span>
            </div>
        `;
        document.body.appendChild(toast);
    }

    const toastText = document.getElementById('toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');

    // Sembunyikan otomatis setelah 4.5 detik
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

/* ==========================================================================
   7. NAVBAR ACTIVE LINK SCROLL SPY
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
