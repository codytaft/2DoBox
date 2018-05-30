var title = $('#title-input').val();
var body = $('#body-input').val();
var numCards = 0;
var qualityVariable = "swill";
$('#title-input').on('keyup', disableSaveButton);
$('#body-input').on('keyup', disableSaveButton);
$('.save-btn').on('click', createNewCard);
// $(".upvote").on('click', increaseQuality);
// $(".downvote").on('click', decreaseQuality);
$(document).ready( getLocalStorage )


function getLocalStorage(){
    console.log(Object.keys(localStorage))
    var storedObjects = Object.keys(localStorage)
    storedObjects.forEach(function (cardId, index) {
    var retrieveObjects = localStorage.getItem(cardId) 
    var parsedObjects = JSON.parse(retrieveObjects) 
        console.log(parsedObjects.title)
    $('.bottom-box').prepend(newCardTemplate('id', parsedObjects.title, parsedObjects.body, parsedObjects.quality));
    })
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
    // retrieveCard();
    $('form')[0].reset();
    disableSaveButton();
};

function newCardTemplate(id , title , body , quality) {
    var template = `<div id="${id}" class="card-container"><h2 class="title-of-card"> 
                    ${title}</h2>
                    <button class="delete-button"></button>
                    <p class="body-of-card">${body}</p>
                    <button class="upvote"></button>
                    <button class="downvote"></button>
                    <p class="quality">quality: <span class="qualityVariable">${quality}</span></p>
                    <hr>
                    </div>`;
    return template
};

function cardObject(title, body, quality) {
   return {
      title: title,
      body: body,
      quality: quality
    };
 }


// need to select something to iterate across
// $(this).each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     console.log(cardData);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

function localStoreCard(id, title, body, quality) {
    var cardString = JSON.stringify(cardObject(title, body, quality));
    localStorage.setItem(id, cardString);
    // console.log(cardString)
}

// function retrieveCard() {
//     var cardString = JSON.stringify(cardObject());
//     var retrieveObject = localStorage.getItem('card' + numCards)
//     var parsedObject = JSON.parse(retrieveObject);
//     console.log(parsedObject);

// }

//Separate into two function. Addin de

// function increaseQuality()
//   var currentQuality = $(event.target).siblings('p.quality').children().text();


$(".bottom-box").on('click', function(event){
    var currentQuality = $(event.target).siblings('p.quality').children().text();
    console.log(currentQuality)
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    console.log(cardHTML[0].id)
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});

