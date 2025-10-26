console.log('This is ES6 version of Project 2 - Completed');

/**
 * Class to represent a Book
 */
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

/**
 * Class to handle the Display and UI logic
 */
class Display {
    // No constructor needed for this simple display class

    /**
     * Adds a book to the table and saves it to local storage.
     * @param {Book} book 
     */
    add(book) {
        console.log("Adding book to UI and Storage...");
        
        // 1. Add to UI
        const tableBody = document.getElementById('tableBody');
        const uiString = `<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`;
        tableBody.innerHTML += uiString;

        // 2. Save to localStorage
        this.saveBookToStorage(book);
    }

    /**
     * Clears the book form input fields.
     */
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    /**
     * Validates if the book name and author fields are not empty.
     * @param {Book} book 
     * @returns {boolean} true if valid, false otherwise.
     */
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Displays an alert message to the user.
     * @param {string} type 'success' or 'error'
     */
    show(type) {
        let message = document.getElementById('message');
        let alertMessage = '';
        let alertClass = '';

        if (type === 'success') {
            alertClass = 'alert-success';
            alertMessage = '<strong>Success:</strong> Your book has been successfully added to the library.';
        } else if (type === 'error') {
            alertClass = 'alert-danger';
            alertMessage = '<strong>Error:</strong> Sorry, you cannot add this book. Name or Author must be at least 2 characters.';
        }

        message.innerHTML = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                                ${alertMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;

        // Auto-hide the message after 3 seconds
        setTimeout(() => {
            message.innerHTML = '';
        }, 3000);
    }
    
    /**
     * Fetches books from localStorage
     * @returns {Array<Book>} 
     */
    getBooksFromStorage() {
        let books = localStorage.getItem('books');
        return books ? JSON.parse(books) : [];
    }
    
    /**
     * Saves a new book to localStorage
     * @param {Book} book 
     */
    saveBookToStorage(book) {
        let books = this.getBooksFromStorage();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    /**
     * Displays all books from localStorage on page load.
     */
    displayAll() {
        const books = this.getBooksFromStorage();
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Clear existing entries

        books.forEach(book => {
            const uiString = `<tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>`;
            tableBody.innerHTML += uiString;
        });
    }
}


// --- Main Execution Logic ---

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    console.log('You have submitted library form');
    
    // Get form values
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    
    // Determine the selected book type
    let type;
    let typeRadios = document.querySelectorAll('input[name="type"]:checked');
    if (typeRadios.length > 0) {
        type = typeRadios[0].value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success');
    } else {
        display.show('error');
    }
}

// Display books from localStorage on page load
window.onload = function() {
    let display = new Display();
    display.displayAll();
}