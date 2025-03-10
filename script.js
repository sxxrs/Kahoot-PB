
document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeSelect = document.getElementById('theme-select');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
    if (themeSelect) themeSelect.value = 'dark';
  }
  
  // Toggle dark mode
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      if (themeSelect) themeSelect.value = 'dark';
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (themeSelect) themeSelect.value = 'light';
    }
  });
  
  // Theme options in settings
  const themeOptions = document.querySelectorAll('.theme-option');
  
  if (themeOptions.length > 0) {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Activate the saved theme option
    themeOptions.forEach(option => {
      const themeType = option.getAttribute('data-theme');
      
      if (savedTheme === themeType) {
        option.classList.add('active');
        applyTheme(themeType);
      }
      
      option.addEventListener('click', function() {
        // Remove active class from all options
        themeOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Get and apply the theme
        const selectedTheme = this.getAttribute('data-theme');
        applyTheme(selectedTheme);
        
        // Save theme preference
        localStorage.setItem('theme', selectedTheme);
      });
    });
    
    // If no theme is active, activate the first one (light)
    if (!document.querySelector('.theme-option.active')) {
      themeOptions[0].classList.add('active');
    }
  }
  
  function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('dark-mode', 'kahoot-theme', 'hack-theme');
    
    // Apply the selected theme
    switch(theme) {
      case 'dark':
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
        break;
      case 'kahoot':
        document.body.classList.add('kahoot-theme');
        themeToggle.checked = false;
        break;
      case 'hack':
        document.body.classList.add('hack-theme');
        themeToggle.checked = true;
        break;
      default: // light theme
        themeToggle.checked = false;
    }
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show');
    });
  }
  
  // Panel switching
  const menuItems = document.querySelectorAll('.menu-item');
  const panels = document.querySelectorAll('.panel');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const panelId = this.getAttribute('data-panel');
      
      // Remove active class from all menu items and panels
      menuItems.forEach(item => item.classList.remove('active'));
      panels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked menu item and corresponding panel
      this.classList.add('active');
      document.getElementById(panelId).classList.add('active');
      
      // Hide sidebar on mobile after selection
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('show');
      }
    });
  });
  
  // Connect button functionality
  const connectBtn = document.getElementById('connect-btn');
  const quizCode = document.getElementById('quiz-code');
  
  if (connectBtn && quizCode) {
    connectBtn.addEventListener('click', function() {
      if (quizCode.value.trim() === '') {
        alert('Please enter a valid game PIN');
        return;
      }
      
      // Simulate connecting to a quiz
      const loadingText = document.createElement('span');
      loadingText.classList.add('loading-text');
      loadingText.textContent = 'Connecting...';
      
      this.disabled = true;
      this.textContent = '';
      this.appendChild(loadingText);
      
      setTimeout(() => {
        // Switch to game session panel
        menuItems.forEach(item => item.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        
        document.querySelector('[data-panel="study-session"]').classList.add('active');
        document.getElementById('study-session').classList.add('active');
        
        // Reset button
        this.textContent = 'Connect';
        this.disabled = false;
        
        // If on mobile, hide sidebar
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('show');
        }
      }, 2000);
    });
  }
  
  // Font size controls
  const decreaseFont = document.getElementById('decrease-font');
  const increaseFont = document.getElementById('increase-font');
  const fontSizeDisplay = document.getElementById('font-size');
  
  if (decreaseFont && increaseFont) {
    const fontSizes = ['Small', 'Medium', 'Large', 'X-Large'];
    let currentFontIndex = 1; // Start with Medium
    
    // Apply saved font size if exists
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      currentFontIndex = parseInt(savedFontSize);
      updateFontSize();
    }
    
    decreaseFont.addEventListener('click', function() {
      if (currentFontIndex > 0) {
        currentFontIndex--;
        updateFontSize();
      }
    });
    
    increaseFont.addEventListener('click', function() {
      if (currentFontIndex < fontSizes.length - 1) {
        currentFontIndex++;
        updateFontSize();
      }
    });
    
    function updateFontSize() {
      fontSizeDisplay.textContent = fontSizes[currentFontIndex];
      
      // Apply font size to root element
      const rootElement = document.documentElement;
      switch(currentFontIndex) {
        case 0: // Small
          rootElement.style.fontSize = '14px';
          break;
        case 1: // Medium
          rootElement.style.fontSize = '16px';
          break;
        case 2: // Large
          rootElement.style.fontSize = '18px';
          break;
        case 3: // X-Large
          rootElement.style.fontSize = '20px';
          break;
      }
      
      localStorage.setItem('fontSize', currentFontIndex.toString());
    }
  }
});
