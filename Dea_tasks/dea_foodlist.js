

// using DOM manipulation
const bookmarkBtn = document.getElementById('bookmarkBtn');
const bookmarkIcon = document.getElementById('bookmarkIcon');

// Track bookmark state
let isBookmarked = false;


bookmarkBtn.addEventListener('click', function() {
    isBookmarked = !isBookmarked;
    
    // using boolean to switch pucture
    if (isBookmarked) {
        bookmarkIcon.src = '../images/Bookmark fill.svg';
    } else {
        bookmarkIcon.src = '../images/Bookmark.png';
    }
});

// applying variable
const heartButtons = document.querySelectorAll('.heartbtn');

// use DOM manipulation
heartButtons.forEach(button => {
    const heartIcon = button.querySelector('img');
    let isFavorited = false;
    
    // usingmanipulation to witch image
    button.addEventListener('click', function() {
        isFavorited = !isFavorited;
        
        // use condition to change image
        if (isFavorited) {
            heartIcon.src = '../images/tabler_heart.svg';
        } else {
            heartIcon.src = '../images/Heart.png';
        }
    });
});

