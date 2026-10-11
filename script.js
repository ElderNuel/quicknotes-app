const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all-btn");

let notes = [];

const savedNotes = localStorage.getItem("quicknotes_data");
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}

function saveNotes() {
  localStorage.setItem("quicknotes_data", JSON.stringify(notes));
}

function updateCountMessage() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  notesList.innerHTML = "";
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  const filteredNotes = notes.filter(note => 
    note.text.trim().toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    const li = document.createElement("li");
    li.textContent = "No notes match your search.";
    notesList.appendChild(li);
  } else {
    filteredNotes.forEach(note => {
      const li = document.createElement("li");
      li.classList.add("note-card", `category-${note.category}`);
      
      const headerDiv = document.createElement("div");
      headerDiv.classList.add("note-header");

      const categorySpan = document.createElement("span");
      categorySpan.classList.add("category-label");
      categorySpan.textContent = note.category.toUpperCase();

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => deleteNote(note.id));

      headerDiv.appendChild(categorySpan);
      headerDiv.appendChild(delBtn);

      const textPara = document.createElement("p");
      textPara.textContent = note.text;
      textPara.style.margin = "0";

      const dateSpan = document.createElement("span");
      dateSpan.classList.add("note-meta");
      dateSpan.textContent = note.createdAt;

      li.appendChild(headerDiv);
      li.appendChild(textPara);
      li.appendChild(dateSpan);

      notesList.appendChild(li);
    });
  }

  updateCountMessage();
}

function addNote(text, category) {
  const cleanedText = text.trim();
  
  if (cleanedText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  
  if (cleanedText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }
  
  errorMessage.textContent = "";
  
  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category,
    createdAt: new Date().toLocaleString()
  };
  
  notes.push(newNote);
  saveNotes();
  render();
  input.value = "";
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNote(input.value, categorySelect.value);
});

searchInput.addEventListener("input", render);

clearAllBtn.addEventListener("click", () => {
  if (notes.length > 0) {
    if (confirm("Delete all notes?")) {
      notes = [];
      saveNotes();
      render();
    }
  }
});

render();