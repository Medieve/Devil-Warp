var isCard = new Boolean(false);
var _card = new Object();
var choicePits = [];

setup.card_setup = function() {
  setup.log("Loading cards");
  // Get the element by id
  const cards = document.querySelectorAll(".card");
  // Add the ondragstart event listener
  cards.forEach(card => {
    card.addEventListener("dragstart", dragstart_handler);
    card.addEventListener('dragend', dragEnd);
  })
  // Add listeners to drop_pit
  var collectPits = document.querySelectorAll("[data-type='card']");
  console.log(collectPits);
  collectPits.forEach( box => {
      box.addEventListener('dragenter', dragEnter)
      box.addEventListener('dragover', dragOver);
      box.addEventListener('dragleave', dragLeave);
      box.addEventListener('drop', drop);
      box.classList.add('initial');
  });
};

// Collect all drop_pit elements
function collectDropPits() {
  var dropPits = document.querySelectorAll(".drop_pit");
  var dropPitData = [];
  var dataAttribute = {};

  dropPits.forEach(function(dropPit) {
    dataAttribute.score = dropPit.dataset["score"];
    dropPitData.push(dropPit.className + " " + dataAttribute.score);
  });

  return dropPitData;
}

// dragstart event handler
function dragstart_handler(ev) {
  setup.log("dragStart");
  // Find choices and disable pointer events
  var choices = document.querySelectorAll("#menu_choices div[id^='choice'] > *:not(.card)");
  choices.forEach( choice => {
    choice.style.pointerEvents = "none";
    console.log(choice);
  });
  // Highlight the macro-drop
  var dropPits = document.querySelectorAll(".macro-drop");
  dropPits.forEach( dropPit => {
    dropPit.classList.add('dragHighlight');

  });
}

function dragEnter(ev) {
  ev.preventDefault();
  setup.log("dragOver");
  if (ev.target ===ev.currentTarget) {
    ev.target.classList.add('drag_over');
  }
}

function dragOver(ev) {
  ev.preventDefault();
  if (ev.target ===ev.currentTarget) {
    ev.target.classList.add('drag_over');
  }
}

function dragLeave(ev) {
  ev.target.classList.remove('drag_over');
}

function drop(ev) {
  ev.preventDefault();
  ev.target.classList.remove('drag_over');
  setup.log("Dropped");
  var choices = document.querySelectorAll("#menu_choices div[id^='choice'] > *:not(.card)");
  choices.forEach( choice => {
    choice.style.pointerEvents = "all";
  });
}

function dragEnd(ev) {
  ev.preventDefault();
  setup.log("dragEnd");
  var choices = document.querySelectorAll("#menu_choices div[id^='choice'] > *:not(.card), #card_hand");
  choices.forEach( choice => {
    choice.style.pointerEvents = "all";
  });
  // remove highlight from macro-drop
  var dropPits = document.querySelectorAll(".macro-drop");
  dropPits.forEach( dropPit => {
    dropPit.classList.remove('dragHighlight');
  });
}

function shuntCard (card) {
  let container = card.parentNode.querySelector(".requirement");
  container.appendChild(card);
}