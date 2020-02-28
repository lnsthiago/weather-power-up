var trello = window.TrelloPowerUp.iframe();

document.getElementById("cardSize").addEventListener('change', calculateRemaining);

function calculateRemaining(){
    var size = document.getElementById('cardSize').value;
    var spent = document.getElementById('cardSpent').value;

    var remaining = size - spent;

    document.getElementById('cardRemaining').value = remaining < 0 ? 0 : remaining;
}

window.estimate.addEventListener('submit', function (event) {
    event.preventDefault();
    debugger;
    return trello.set('card', 'shared', 'cardSize', window.cardSize.value)
        .then(function () {
            trello.set('card', 'shared', 'cardSpent', window.cardSpent.value)
                .then(function () {
                    trello.set('card', 'shared', 'cardRemaining', window.cardRemaining.value)
                        .then(function () {
                            trello.closePopup();
                        })
                })
        });
});

trello.render(function () {
    return trello.get('card', 'shared', 'cardSize')
        .then(function (cardSize) {
            if (cardSize === undefined)
            cardSize = null;
            window.cardSize.value = cardSize;
        })
        .then(function () {
            trello.get('card', 'shared', 'cardSpent')
                .then(function (cardSpent) {
                    if (cardSpent === undefined)
                        cardSpent = null;
                    window.cardSpent.value = cardSpent;
                }).then(function () {
                    trello.get('card', 'shared', 'cardRemaining')
                        .then(function (cardRemaining) {
                            if (cardRemaining == undefined)
                                cardRemaining = null;
                            window.cardRemaining.value = cardRemaining
                        })
                        .then(function () {
                            trello.sizeTo('#estimate').done();
                        })
                })
        });
});