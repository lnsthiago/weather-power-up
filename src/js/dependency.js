var trello = window.TrelloPowerUp.iframe();

window.dependency.addEventListener('submit', function (event) {
    event.preventDefault();
    return trello.set('card', 'shared', 'dependencyKind', window.dependencyKind.value)
        .then(function () {
            trello.closePopup();
        });
});

trello.render(function () {
    return trello.get('card', 'shared', 'dependencyKind')
        .then(function (dependencyKind) {
            if (dependencyKind === undefined)
                dependencyKind = null;
            window.dependencyKind.value = dependencyKind;
        })
        .then(function () {
            trello.sizeTo('#dependency').done();
        });
});