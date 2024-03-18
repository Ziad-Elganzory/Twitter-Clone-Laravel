document.addEventListener('DOMContentLoaded', function() {
  var navItems = document.querySelectorAll('.home-bot .nav-item');

  // Add 'active' class to the first navigation item
  navItems[0].classList.add('active');

  // Event listener for navigation items
  navItems.forEach(function(navItem) {
    navItem.addEventListener('click', function() {
      // Remove 'active' class from previously active item
      var previouslyActive = document.querySelector('.home-bot .nav-item.active');
      previouslyActive.classList.remove('active');
      
      // Add 'active' class to the clicked item
      this.classList.add('active');
    });
  });
});
