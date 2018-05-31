$('#title-input').on('keyup', disableSaveButton);
$('#body-input').on('keyup', disableSaveButton);
$('.save-btn').on('click', createNewCard);
$('.bottom-box').on('click', 'article .upvote', increaseQuality);
$('.bottom-box').on('click', 'article .downvote', decreaseQuality);
$('.bottom-box').on('click', 'article .delete-button', deleteButton);
$('.bottom-box').on('focusout', 'article, h2 .title-of-card', saveEditedContentTitle);
$('.bottom-box').on('focusout', 'article, p .body-of-card', saveEditedContentBody);

$(document).ready(prependLocalStorage());

function prependLocalStorage(){
  var storedObjects = Object.keys(localStorage);
  storedObjects.forEach(function (cardId) {
  var retrieveObjects = localStorage.getItem(cardId);
  var parsedObjects = JSON.parse(retrieveObjects);
  $('.bottom-box').prepend(newCardTemplate(parsedObjects.id, parsedObjects.title, parsedObjects.body, parsedObjects.quality));
  })
};

function setCardToStorage(id, card) {
  var newCardJSON = JSON.stringify(card);
  localStorage.setItem(id, newCardJSON);
};

function getCardFromStorage(id) {
  var retrieveObjects = localStorage.getItem(id);
  var parsedObjects = JSON.parse(retrieveObjects);
  return parsedObjects
};

function increaseQuality(event) {
  var closestId = $(event.target).closest('article').attr('data-id');
  var retrievedCard = getCardFromStorage(closestId);
  if (retrievedCard.quality === "swill") {
    retrievedCard.quality = "plausible";
  } else if (retrievedCard.quality === "plausible" || "genius") {
    retrievedCard.quality = "genius";
} setCardToStorage(closestId, retrievedCard);
  emptyCardsOnPage();
  prependLocalStorage();
};

function decreaseQuality(event) {
  var cardId = $(event.target).closest('article').attr('data-id');
  var retrievedCard = getCardFromStorage(cardId);
  if (retrievedCard.quality === "genius") {
    retrievedCard.quality = "plausible";
  } else if (retrievedCard.quality === "plausible" || "swill") {
    retrievedCard.quality = "swill";
  } setCardToStorage(cardId, retrievedCard);
    emptyCardsOnPage();
    prependLocalStorage();
};

function emptyCardsOnPage() {
  $('.bottom-box').empty();
};

function deleteButton() {
  var cardId = $(event.target).closest('article').attr('data-id');
  var retrievedCard = getCardFromStorage(cardId);
  var cardHTML = $(event.target).closest('.card-container').remove();
  localStorage.removeItem(cardId);
};


function saveEditedContentBody() {
  var editedBody = $(this).children('.body-of-card').text();
  var cardId = $(event.target).closest('article').attr('data-id');
  var retrievedCard = getCardFromStorage(cardId);
  retrievedCard.body = editedBody;
  $(this).keypress(function(event) {
  if (event.which === 13) {
      event.preventDefault();
  }
})
  setCardToStorage(cardId, retrievedCard);
};

function saveEditedContentTitle() {
  var editedTitle = $(this).children('.title-of-card').text();
  var cardId = $(event.target).closest('article').attr('data-id');
  var retrievedCard = getCardFromStorage(cardId);
  retrievedCard.title = editedTitle;
  $(this).keypress(function(event) {
  if (event.which === 13) {
      event.preventDefault();
  }
})
  setCardToStorage(cardId, retrievedCard);
}

function disableSaveButton() {
    var title = $('#title-input').val();
    var body = $('#body-input').val();
    var saveButton = $('.save-btn');
    if (title === "" || body === "") {
        saveButton.prop('disabled', true)
    } else {
        saveButton.prop('disabled', false)
  } 
}

function createNewCard(event) {
    event.preventDefault();
    var title = $('#title-input').val();
    var body = $('#body-input').val();
    var quality = 'swill';
    var id = 'card'+Date.now()
    var cardDisplay = $('.bottom-box');
    cardDisplay.prepend(newCardTemplate(id, title, body, quality)); 
    localStoreCard(id, title, body, quality);
    $('form')[0].reset();
    disableSaveButton();
};

function newCardTemplate(id , title , body , quality) {
    var template = `<article data-id="${id}" class="card-container">
                    <h2 class="title-of-card" contentEditable="true">${title}</h2>
                    <button class="delete-button"></button>
                    <p class="body-of-card" contentEditable="true">${body}</p>
                    <button class="upvote"></button>
                    <button class="downvote"></button>
                    <p class="quality">quality: <span class="qualityVariable">${quality}</span></p>
                    <hr>
                    </article>`;
    return template
};

function localStoreCard(id, title, body, quality) {
    var cardString = JSON.stringify(cardObject(id, title, body, quality));
    localStorage.setItem(id, cardString);
}

function cardObject(id, title, body, quality) {
   return {
      id: id,
      title: title,
      body: body,
      quality: quality,
    };
 }

