const container = document.querySelector('.notes-container');

const addBtn = document.getElementById('add');

// load saved notes from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => {
        addNote(note);
    })
}

addBtn.addEventListener('click', () => {

        addNote();


});

// create note
function addNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="tool-btns">
        <button class="save" id="save"><i class="fa-solid fa-floppy-disk"></i></button>
        <button class="edit" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="close" id="close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="main ${text ? '' : 'hidden' }"></div>
        <textarea class="textarea ${text ? 'hidden' : ''}"></textarea>
    `;

    container.appendChild(note);

    // select items
    const saveBtn = note.querySelector('.save');
    const textArea = note.querySelector('.textarea');
    const main = note.querySelector('.main');

    // text property is used to saved notes on local storage
    textArea.value = text;

    main.innerHTML = marked(text);

    // targets value of the text area. used for the marked
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS();
    })

    saveBtn.addEventListener('click', () => {
        main.classList.remove('hidden');
        textArea.classList.toggle('hidden');

        updateLS();
    });

    const editBtn = note.querySelector('.edit');

    editBtn.addEventListener('click', () => {
        main.classList.add('hidden');
        textArea.classList.toggle('hidden');

        updateLS();
    });

    const closeBtn = note.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        note.remove();

        updateLS();
    })
}

// update local storage
function updateLS() {
    const notesEl = document.querySelectorAll('.textarea');
    const notes = [];

    notesEl.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}




