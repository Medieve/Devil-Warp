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
  })
  // Add listeners to drop_pit
  var collectPits = document.querySelectorAll("[id^='choice']");
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
  });
}

function dragEnter(ev) {
  ev.preventDefault();
  ev.target.classList.add('drag_over');
}

function dragOver(ev) {
  ev.preventDefault();
  ev.target.classList.add('drag_over');
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

function shuntCard (card) {
  let container = card.parentNode.querySelector(".requirement");
  container.appendChild(card);
}