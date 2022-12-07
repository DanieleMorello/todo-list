/* -------------------
OPERAZIONI PRELIMINARI
--------------------*/

// Prepariamo una chiave per lo storage
const STORAGE_KEY = '__todo-list__';

// Raccogliamo tutti gli elementi di interesse dalla pagina HTML
const totalSlot = document.querySelector('.total-slot');
const tasksListElement = document.querySelector('.tasks-list');

const form = document.querySelector('#task-form');
const taskField = document.querySelector('#task-field');
const timeField = document.querySelector('#time-field');

// Prepariamo la lista 
let tasks = [];


// ! Controllo subito se c'erano elementi salvati nello storage
const prevList = localStorage.getItem(STORAGE_KEY);

// Se ne trovi....
if (prevList) {
  // 1. Utilizziamo la lista precedente al posto di quella vuota
  tasks = JSON.parse(prevList);

  // 2. Ricalcolare il totale
  calculateTotal();

  // 3. Rirenderizzare la lista
  renderList();

}

/* -----------------------
EVENTI DINAMICI
----------------------- */
// Intercettiamo l'invio del form
form.addEventListener('submit', function (event) {
  // 1. blocchiamo il ricaricamento della pagina (perchè vogliamo gestirlo con JS)
  event.preventDefault();

  // 2. Raccogliere i dati dai campi
  const task = taskField.value.trim();
  const time = timeField.value.trim();

  // 3. Aggiungere un task alla lista
  addTask(task, time);

  // 4. Ripuliamo il form
  form.reset();

  // 5. Riportiamo il focus (il cursore) sul primo campo
  taskField.focus();
});



/* ------------------
FUNZIONI
------------------*/

// Funzione per aggiungere un task alla lista
function addTask(task, time) {
  // 1. Creiamo un nuovo oggetto che rappresenta il task
  const newTask = {
    task,
    time
  };

  // 2. Aggiungiamo l'oggetto alla lista
  tasks.push(newTask);
  console.log(tasks);

  // ! Aggiornare il localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  // 3. Calcoliamo il totale
  calculateTotal();

  // 4. Renderizziamo (mostriamo su schermo) la lista dei regali
  renderList()
}


// Funzione per calcolare il totale
function calculateTotal() {
  // 1. Mi preparo a calcolare
  let total = tasks.length;

  

  // 2. Per ogni task...
  // for (let i = 0; i < tasks.length; i++) {
    // 3. Aggiungiamo il prezzo al totale
  //   total += tasks.length;
  // }


  // 4. Stampiamo in pagina il totale
  totalSlot.innerText = total;
  if(tasks.length == 0) {
    totalSlot.innerText = "Nessuno";
  }
}

// Funzione per renderizzare la lista dei task
function renderList() {
  // 1. Svuotiamo la lista precedente (non aggiornata)
  tasksListElement.innerHTML = '';

  // 2. Per tutti i task...
  for (let i = 0; i < tasks.length; i++) {
    // 3. creo il codice per un singolo elemento della lista
    const taskElement = createListElement(i);

    // 4. Lo aggancio alla lista nella pagina
    tasksListElement.innerHTML += taskElement;
  }

  // 5. Rendo cliccabili i bottoni
  setDeleteButtons();
}

// Funzione per creare un elemento della lista
function createListElement(i) {
  // Recuperiamo il task
  const task = tasks[i];

  // Restituisce il codice HTML di un task nella lista
  return `
  <li class="task">
    <div class="task-info">
      <h3>${task.task}</h3>
      <p>${task.time}</p>
    </div>
    <div class="div-button">
    <button class="task-button" data-index="${i}">❌</button>
    </div>
  </li>
  `;
}


// Funzione per attivare i bottoni di cancellazione
function setDeleteButtons() {
  // 1. Recuperare tutti i bottoni dei regali
  const deleteButtons = document.querySelectorAll('.task-button');

  // 2. Per ognuno dei bottoni....
  for (let i = 0; i < deleteButtons.length; i++) {
    // 3. REcuperiamo (per comodità) il singolo bottone ad ogni giro
    const button = deleteButtons[i];

    // 4. Aggiungo l'event listener
    button.addEventListener('click', function () {
      // 5. Individuo l'index corrispondente
      const index = button.dataset.index;

      // 6. Rimuovo dalla lista il task corrispondente
      removeTask(index);
    });
  }
}


// Funzione per rimuovere un task dalla lista
function removeTask(index) {
  // 1. Rimuovo il task dalla lista
  tasks.splice(index, 1);
  console.log(tasks);

  // ! Aggiornare il localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  // 2. Ricalcoliamo il totale
  calculateTotal();

  // 3. Rirenderizzare la lista
  renderList();
}