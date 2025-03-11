const sidebar = document.querySelector('.side-bar');
const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
        sidebar.classList.toggle('visible');
    } else {
        sidebar.classList.toggle('collapsed');
    }
});
