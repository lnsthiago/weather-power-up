var trello = window.TrelloPowerUp.iframe();

window.priority.addEventListener('submit', function (event) {
    event.preventDefault();
    debugger;
    return trello.set('card', 'shared', 'prioritySize', window.prioritySize.value)
        .then(function () {
            trello.closePopup();
        });
});

trello.render(function () {
    return trello.get('card', 'shared', 'prioritySize')
        .then(function (prioritySize) {
            if (prioritySize === undefined)
                prioritySize = null;
            window.prioritySize.value = prioritySize;
        })
        .then(function () {
            trello.sizeTo('#priority').done();
        });
});