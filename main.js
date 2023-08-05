let myLibrary = [];

const defaultData = [{ title: 'hello world', author: 'Majd Qumseya', pages: 180, status: 'Read' }]

const library = document.querySelector('#library');
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector('#pages');
const statusInput = document.querySelector("#status");
const bookForm = document.querySelector('#bookForm');
// const addBookToLibraryButton = document.querySelector("#addBookButton");

// addBookToLibraryButton.addEventListener("click", (e) => {
//   addBookToLibrary();
//   clearForm();
// });

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    render()
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
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">
            Author: ${book.author} <br> Pages: ${book.pages} <br> Status: ${book.status}
          </p>
          <br>
          <btn id="toggleRead" class="btn btn-primary">Toggle Read</btn>
          <btn id="delete" class="btn btn-danger">Delete</btn>
        </div>
      </div>
        `

        library.insertAdjacentHTML('afterbegin',htmlBook)
    })

}

render();