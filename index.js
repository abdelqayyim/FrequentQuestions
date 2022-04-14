let body = document.querySelector("body");
let languagePicked; //this is a global variable that keeps track of the language the user is working on
// ----------------------------------- PART 1 -----------------------------
let menu = document.querySelector(".languages");
let webSiteTitle = document.querySelector(".title");
let options = document.querySelector(".options");
let languages = document.querySelectorAll(".lang"); //the languages buttons
let dropArrow = document.querySelector(".btn-dropdown"); //the options button (add and delete language)
let dropDown = document.querySelector(".dropInfo"); //the two options (add and delete)
let addLanguageOption = document.querySelector(".add-languageOption");
let deleteLanguageOption = document.querySelector(".delete-languagegOption");
let arrowDown = document.querySelector("i");
let addNoteButton = document.querySelector(".addNoteBtn"); //this is the button that allows the use to add a note
let newNoteBtn = document.querySelector(".createNoteBtn");
let newNoteTitle = document.querySelector(".titleInput");
let newNoteDescription = document.querySelector(".descriptionInput");

//           ---------- FUNCTION CALLS -----------------------
addLanguageOption.addEventListener("click", showAddLanguage);
deleteLanguageOption.addEventListener("click", showDeleteLanguage);
languages.forEach((lang) => { lang.addEventListener("click", (e) => { showNotes(e, lang) }) });
dropArrow.addEventListener("click", dropOptions);
addNoteButton.addEventListener("click", openNotePopUp);
newNoteBtn.addEventListener("click", (e) => { createNewNote(e, languagePicked) });
webSiteTitle.addEventListener("click", ()=>{location.reload()})
// ----------------------------------- PART 2 -----------------------------
let notesSection = document.querySelector(".notes-section"); //this is the section where the notes are
let notes = document.querySelectorAll(".note"); //the notes in the note section

//           ---------- FUNCTION CALLS -----------------------
notes.forEach((note) => note.addEventListener("click", function (e) { showNoteDetail(e, languagePicked, note.classList[1]) }));
// ----------------------------------- PART 3 -----------------------------
let noteDetail = document.querySelector(".note-detail"); //this is the pop up after you press on a note
let noteTitle = document.querySelector(".note-title");
let addNoteBtn = document.querySelector(".addNote");
let addCodeBtn = document.querySelector(".addCode");
let postBtn = document.querySelector(".save");
let closeBtn = document.querySelector(".close-btn");
let currentTitle = document.querySelector(".popUp-title");
let deleteButton = document.querySelector(".delete-btn");

//           ---------- FUNCTION CALLS -----------------------
addNoteBtn.addEventListener("click", addNote);
addCodeBtn.addEventListener("click", function (e) { addCode(e, languagePicked)});
closeBtn.addEventListener("click", closeBtnFunction);
deleteButton.addEventListener("click", (e) => { deleteNote(e, languagePicked, currentTitle.innerText) });

// ----------------------------------- PART 4 -----------------------------
let addLanguagePopUp = document.querySelector(".add-language"); //this is the div
let addLanguageInput = document.querySelector(".add-languageInput"); //the input
let addLanguageBtn = document.querySelector(".add-languageBtn"); //the button

let deleteLanguagePopUp = document.querySelector(".delete-language"); //this is the div
let deleteLanguageInput = document.querySelector(".delete-languageInput"); //the input
let deleteLanguageBtn = document.querySelector(".delete-languageBtn"); //the button

let createNotePop = document.querySelector(".create-note");
let createNoteBtn = document.querySelector(".createNoteBtn");//TASK: create the note when the button is clicked, check that title is not empty

//           ---------- FUNCTION CALLS -----------------------
addLanguageBtn.addEventListener("click", (e) => { addLanguageFunction(e) });
deleteLanguageBtn.addEventListener("click", (e) => { deleteLanguageFunction(e) });
// ----------------------------------- PART 5 -----------------------------
let overlay = document.querySelector(".overlay");
let lightOverlay = document.querySelector(".light-overlay");

//           ---------- FUNCTION CALLS -----------------------
lightOverlay.addEventListener("click", lightOverlayFunction);
// -------------------------------------------------------------------------------------------------------



function closePopUps(e) {
    if (e.target == overlay) {
        overlay.classList.remove("active");
        addLanguagePopUp.classList.add("hidden");
        deleteLanguagePopUp.classList.add("hidden");
        document.removeEventListener("click", closePopUps);
    }
}

function closeBtnFunction() {
    noteDetail.classList.remove("active");
    overlay.classList.remove("active");
}
function dropOptions() {
    dropDown.classList.add("drop");
    
    if (arrowDown.classList[1] === "fa-angle-down") {
        arrowDown.classList.remove("fa-angle-down");
        arrowDown.classList.add("fa-angle-up");
        lightOverlay.classList.add("active");
    }
    else {
        arrowDown.classList.add("fa-angle-down");
        arrowDown.classList.remove("fa-angle-up");
        dropDown.classList.remove("drop");
    }
}
function addNote(){
    let noteSection = document.querySelector(".note-ul");
    let note = document.createElement("li");
    note.classList.add("bulletPoint-list");
    note.innerHTML = `<p class="bullet-point"<span role="textbox" contenteditable> Add Note</span></p>`;
    noteSection.appendChild(note);
    editNoteBtn = document.querySelectorAll(".fa-edit");
    editNoteBtn.forEach((btn) => btn.addEventListener("click", editNote));
}
function addCode(event, language){
    let noteSection = document.querySelector(".note-ul");
    console.log(languagePicked);
    let newNote = noteSection.childNodes[1];
    let newD = document.createElement("div");
    newD.innerHTML = `<pre class="line-numbers">
    <code class="language-${language}" contenteditable>Add ${language} code here</code>
</pre>`;
    noteSection.appendChild(newD);
    Prism.highlightAll();
}
function showNotes(event, language) {
    languagePicked = language.classList[2].toLowerCase();
    body.style.justifyContent = "start";
    addNoteButton.classList.remove("hidden");
    notesSection.classList.remove("hidden");
    menu.classList.add("clicked");
    noteTitle.innerText = `The Language is ${languagePicked}`;
    console.log(languagePicked);
    //TODO: Do not forget to change the content when the language is picked
}
function openNotePopUp() {
    createNotePop.classList.remove("hidden");
    dropArrow.style.zIndex = 0;
    lightOverlay.classList.add("active");
    lightOverlay.style.backgroundColor = "grey";
    lightOverlay.style.opacity = 0.8;
}
function showAddLanguage() {
    overlay.classList.add("active");
    lightOverlay.classList.remove("active");
    addLanguagePopUp.classList.remove("hidden");
    setTimeout(() => {document.addEventListener("click",closePopUps)},500)
}
function showDeleteLanguage() {
    overlay.classList.add("active");
    lightOverlay.classList.remove("active");
    deleteLanguagePopUp.classList.remove("hidden");
    setTimeout(() => {document.addEventListener("click",closePopUps)},500)
}
function showNoteDetail(event, language, title) { //This is the note detail pop up, to edit
    currentTitle.innerText = title;
    console.log(title);
    noteDetail.classList.add("active");
    overlay.classList.add("active");
}
function addLanguageFunction(event) {
    event.preventDefault();
    if (addLanguageInput.value.trim().length !== 0) {
        let languageName = addLanguageInput.value.trim();
        let newLanguage = document.createElement("button");
        newLanguage.classList.add("btn");
        newLanguage.classList.add("lang");
        newLanguage.classList.add(`${languageName.toLowerCase()}`);
        newLanguage.innerText = languageName;
        options.insertAdjacentElement("afterbegin", newLanguage);

        //TASK: make input null and close the popUp
        addLanguageInput.value = "";
        overlay.classList.remove("active");
        addLanguagePopUp.classList.add("hidden");
    }
    else { //if it is empty ***no words in the input field***
        
    }
}
function deleteLanguageFunction(event){
    event.preventDefault();
    if (deleteLanguageInput.value.trim().length !== 0) {
        let languageToDelete = deleteLanguageInput.value.trim().toLowerCase();
        options.removeChild(document.querySelector(`.${languageToDelete}`));
        //TASK: remove the language button from page and database
        // let languageName = addLanguageInput.value.trim();
        // let newLanguage = document.createElement("button");
        // newLanguage.classList.add("btn");
        // newLanguage.classList.add(`${languageName.toLowerCase()}`);
        // newLanguage.innerText = languageName;
        // options.insertAdjacentElement("afterbegin", newLanguage);

        //TASK: make input null and close the popUp
        addLanguageInput.value = "";
        overlay.classList.remove("active");
        deleteLanguagePopUp.classList.add("hidden");
    }
    else { //if it is empty ***no words in the input field***
        
    }
}
function lightOverlayFunction() {
    dropDown.classList.remove("drop");
    arrowDown.classList.add("fa-angle-down");
    arrowDown.classList.remove("fa-angle-up");
    lightOverlay.classList.remove("active");
    createNotePop.classList.add("hidden");
    dropArrow.style.zIndex = 10;
    lightOverlay.style.backgroundColor = "white";
    lightOverlay.style.opacity = 0;
}
let okay = {}
function createNewNote(event, language) {
    console.log(language);
    if (newNoteTitle.value.trim() != "") {//if the title is  not empty
        let div = document.createElement("div");
        div.classList.add("note");
        div.classList.add(`note-${notesSection.childNodes.length}`);//make sure each title is unique
        div.innerHTML = `<div class="note-title">
        ${newNoteTitle.value.trim()}
    </div>
    <div class="note-description">
        ${newNoteDescription.value.trim()}
    </div>`;
        notesSection.insertAdjacentElement("beforeend", div);
        lightOverlayFunction();//close the popUp
        okay[language] = {};
        okay[language]["Title"] = newNoteTitle.value;
        okay[language]["Description"] = newNoteDescription.value;
        notes = document.querySelectorAll(".note");
        notes.forEach((note) => note.addEventListener("click", function (e) { showNoteDetail(e, languagePicked, note.classList[1]); }));

        //TASK: send post request to server as well
    }
}
function deleteNote(event, language, number) {
    let noteToDelete = document.querySelector(`.${number}`);
    notesSection.removeChild(noteToDelete);
    closeBtnFunction();
    //TASK: send delete request to server as well
}