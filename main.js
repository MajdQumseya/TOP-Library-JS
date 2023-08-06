let myLibrary = [];

const defaultData = [{ title: 'hello world', author: 'Majd Qumseya', pages: 180, status: 'Read' }]

const library = document.querySelector('#library');
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector('#pages');
const statusInput = document.querySelector("#status");
const bookForm = document.querySelector('#bookForm');
// const toggleReadBtn = document.querySelector('#toggleRead');

library.addEventListener('click', (e) => {
    
    if (e.target.innerText === 'Toggle Read') {
        findBookIndex(bookTitle);
        let bookTitle = e.target.parentElement.children[0].innerText
    }
})

// const addBookToLibraryButton = document.querySelector("#addBookButton");

// addBookToLibraryButton.addEventListener("click", (e) => {
//   addBookToLibrary();
//   clearForm();
// });

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    buildBookView()
})



function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.status = status;
}

function addBookToLibrary() {
    if (titleInput.value.length === 0 || authorInput.value.length === 0) {
        alert('Please enter a value for book title and book author');
        return;
    }

    let newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        statusInput.value
    )


    myLibrary.push(newBook);
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    console.log(localStorage.getItem("myLibrary"));
}

function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = 0;
}

function render() {
    if (myLibrary.length === 0) {
        myLibrary = defaultData;
    }

    buildBookView()
}

function buildBookView() {
    library.innerHTML = "";
    myLibrary.forEach((book) => {
        const htmlBook = `
        <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title text-center">${book.title}</h5>
          <hr>
          <div class="card-text">
            <p class="author">Author: ${book.author} </p>
            <p class="pages">Pages: ${book.pages} </p>
             <p class="status">Status: ${book.status} </p>
          </div>
          <br>
          <btn id="toggleRead" class="btn btn-primary">Toggle Read</btn>
          <btn id="delete" class="btn btn-danger">Delete</btn>
        </div>
      </div>
        `

        library.insertAdjacentHTML('afterbegin', htmlBook)



    })

}

function findBookIndex(title) {
    if (myLibrary.length === 0 || myLibrary === null) {
        return;
    }
    for (book of myLibrary)
        if (book.title === title) {
            return myLibrary.indexOf(book);
        }
}

render();