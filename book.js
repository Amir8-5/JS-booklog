//Book class
class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class

class UI {
    static displayBks() {
        const books = Store.getBooks();
        books.forEach(book => UI.addBkToList(book));
    }

    static addBkToList(book) {
        const bkList = document.getElementById('bk-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class = "delete">X</a></td>
        `;

        bkList.appendChild(row);
    }

    static deleteBk (targetEl) {
        if (targetEl.classList.contains('delete')) {


            targetEl.parentElement.parentElement.remove();
        }
    }


    static clearFields() {
        document.getElementById('bk-title').value = '';
        document.getElementById('bk-author').value = '';
        document.getElementById('bk-isbn').value = '';
    }
}


//Store class 

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach( (book, index)=> {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event : display books
document.addEventListener('DOMContentLoaded', UI.displayBks);

//Event : add books
document.getElementById('bk-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //put values in variables
    const title = document.getElementById('bk-title').value;
    const author = document.getElementById('bk-author').value;
    const isbn = document.getElementById('bk-isbn').value;


    //validate 
    if (title === '' || author === '' || isbn === '') {
        alert('Please fill all fields');
    } else {
        //create book object
        const book = new Book(title, author, isbn);
    
        //add book to list
        UI.addBkToList(book);

        //Add book to store
        Store.addBook(book);
    
        //clear text flieds 
        UI.clearFields();
    }
});

//Event : remove a book
document.getElementById('bk-list').addEventListener('click', (e) => {
    UI.deleteBk(e.target);

     //remove from local storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})