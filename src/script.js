// Get the theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');

// Function to toggle between dark and light themes
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
};

// Add event listener to the theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);
