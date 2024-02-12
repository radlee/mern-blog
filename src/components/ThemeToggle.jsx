import React from 'react';

const ThemeToggle = () => {
    
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
    };

    return (
        <button id="theme-toggle" onClick={toggleTheme}>
            Toggle Theme
        </button>
    );
};

export default ThemeToggle;
