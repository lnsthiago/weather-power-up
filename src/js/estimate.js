var trello = window.TrelloPowerUp.iframe();

document.getElementById("cardEstimate").addEventListener('change', calculateRemaining);
document.getElementById("cardSpent").addEventListener('change', calculateRemaining);

function calculateRemaining() {
    var size = document.getElementById('cardEstimate').value;
    var spent = document.getElementById('cardSpent').value;

    var remaining = size - spent;

    document.getElementById('cardRemaining').value = remaining < 0 ? 0 : remaining;
}

window.estimate.addEventListener('submit', function (event) {
    event.preventDefault();
    debugger;
    return trello.set('card', 'shared', 'cardEstimate', window.cardEstimate.value)
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
    return trello.get('card', 'shared', 'cardEstimate')
        .then(function (cardEstimate) {
            if (cardEstimate === undefined)
                cardEstimate = null;
            window.cardEstimate.value = cardEstimate;
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