var title = $('#title-input').val();
var body = $('#body-input').val();
var numCards = 0;
var qualityVariable = "swill";
$('#title-input').on('keyup', disableSaveButton);
$('#body-input').on('keyup', disableSaveButton);
// $('.save-btn').on('click', createNewCard);
$('.save-btn').on('click', displayCard);
// $(".upvote").on('click', increaseQuality);
// $(".downvote").on('click', decreaseQuality);


function disableSaveButton(e) {
    var title = $('#title-input').val();
    var body = $('#body-input').val();
    var saveButton = $('.save-btn');
    // console.log(e);
    if (title === "" || body === "") {
        saveButton.prop('disabled', true)
    } else {
        saveButton.prop('disabled', false)
  } 
    
}


//New Functions//

function NewCard(id, title, body, quality ) {
    this.title = title;
    this.body = body;
    this.id = id;
    this.quality = "swill";
}


// function cardObject() {
//     var title = $('#title-input').val();
//     var body = $('#body-input').val();
//     var qualityVariable = "swill";
//     var newCardObject = new NewCard(title, body, quality);
// }

function displayCard(e) {
    e.preventDefault();
    var cardDisplay = $('.bottom-box');
    var id = id + 1;
    var title = $('#title-input').val();
    var body = $('#body-input').val();
    var quality = "swill";
    var newCardObject = new NewCard(title, body, quality);
    var template = `<div id="${id}" class="card-container"><h2 class="title-of-card"> 
            ${title}</h2>
            <button class="delete-button"></button>
            <p class="body-of-card">${body}</p>
            <button class="upvote"></button>
            <button class="downvote"></button>
            <p class="quality">quality: <span class="qualityVariable">${quality}</span></p>
            <hr>
            </div>`;
    cardDisplay.append(template);
    console.log(newCardObject);
    localStorage.setItem('card', JSON.stringify(newCardObject));
}






//Old Functions//


// function createNewCard(event) {
//     event.preventDefault();
//     numCards++;
//     $( ".bottom-box" ).prepend(newCardTemplate('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();
// };

// function newCardTemplate(id , title , body , quality) {
//     return `<div id="${id}" class="card-container"><h2 class="title-of-card"> 
//             ${title}</h2>
//             <button class="delete-button"></button>
//             <p class="body-of-card">${body}</p>
//             <button class="upvote"></button>
//             <button class="downvote"></button>
//             <p class="quality">quality: <span class="qualityVariable">${quality}</span></p>
//             <hr>
//             </div>`;
// };

// function cardObject() {
//    return {
//       title: $('#title-input').val(),
//       body: $('#body-input').val(),
//       quality: qualityVariable
//     };
//  }


// need to select something to iterate across
// $(this).each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     console.log(cardData);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

// function localStoreCard() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }

// //Separate into two function. Addin de

// // function increaseQuality()
// //   var currentQuality = $(event.target).siblings('p.quality').children().text();


// $(".bottom-box").on('click', function(event){
//     var currentQuality = $(event.target).siblings('p.quality').children().text();
//     console.log(currentQuality)
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     console.log(cardHTML[0].id)
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });

