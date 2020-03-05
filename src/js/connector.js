const { Promise } = window.TrelloPowerUp;

const getEstimateBadgesDetails = t =>
  Promise.all([
    t.get('card', 'shared', 'cardEstimate'),
    t.get('card', 'shared', 'cardSpent'),
    t.get('card', 'shared', 'cardRemaining'),
    t.get('card', 'shared', 'prioritySize'),
  ]).then(([cardEstimate, cardSpent, cardRemaining, prioritySize]) => {
    const badgeCardEstimate = {
      dynamic() {
        return {
          icon:
            'https://cdn0.iconfinder.com/data/icons/revamp-2/24/interface_time_stop_watch_estimated-512.png',
          title: 'SIZE',
          text: cardEstimate || '0',
          color: 'orange',
        };
      },
    };

    const badgeCardSpent = {
      dynamic() {
        return {
          icon: 'https://cdn4.iconfinder.com/data/icons/vectory-bonus-1/40/time_check-512.png',
          title: 'SPENT',
          text: cardSpent || '0',
          color: 'green',
        };
      },
    };

    const badgeCardRemaining = {
      dynamic() {
        return {
          icon: 'https://cdn3.iconfinder.com/data/icons/foodycons/100/hourglass-512.png',
          title: 'REMAINING',
          text: cardRemaining || '0',
          color: 'blue',
        };
      },
    };

    const badgePrioritySize = {
      dynamic() {
        return {
          icon:
            'https://cdn3.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-5/24/2085-512.png',
          title: 'PRIORITY',
          text: prioritySize || 'No priority',
          // eslint-disable-next-line no-use-before-define
          color: getPriorityColor(prioritySize),
        };
      },
    };

    const badges = [];

    badges.push(badgeCardEstimate);
    badges.push(badgeCardSpent);
    badges.push(badgeCardRemaining);
    badges.push(badgePrioritySize);

    return badges;
  });

function getPriorityColor(prioritySize) {
  if (prioritySize === 'Highest') return 'red';
  if (prioritySize === 'Critical') return 'orange';
  if (prioritySize === 'Alarming') return 'yellow';
  if (prioritySize === 'Act Soon') return 'green';
  if (prioritySize === 'Lowest') return 'blue';
  return 'grey';
}

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var cardButtonCallback = function (t) {
  return t.popup({
    title: 'Search Cards',
    items: function (t, options) {
      return t.cards('id', 'name', 'desc', 'shortLink', 'idShort')
        .then(function (cards) {
          const searchText = options.search; // The text the user has input.
          const matchedCards = cards.filter(function (card) {
            const textToSearch = card.id + card.name + card.desc + card.shortLink + card.idShort;
            return textToSearch.toLowerCase().includes(searchText.toLowerCase());
          })
          let items = matchedCards.map(function (card) {
            const cardUrl = `https://trello.com/c/${card.id}`
            return {
              text: card.name,
              url: cardUrl,
              callback: function (t) {
                return t.attach({ url: cardUrl, name: 'hahaha' })
                  .then(function () {
                    return t.closePopup();
                  });
              }
            }
          })
          return items;
        })
    },

    search: {
      placeholder: 'Card name, description, or ID',
      empty: 'Huh, nothing there 🤔',
      searching: 'Searching your cards...'
    }
  });
};

window.TrelloPowerUp.initialize({
  'authorization-status': (t) =>
    new TrelloPowerUp.Promise((resolve) => resolve({ authorized: false })),
  'show-authorization': (t) =>
    t.popup({
      title: 'My Auth Popup',
      url: 'authorize.html',
      height: 140,
    }),
  'card-badges': getEstimateBadgesDetails,
  'card-detail-badges': getEstimateBadgesDetails,
  'card-buttons': function () {
    return [
      {
        icon:
          'https://cdn0.iconfinder.com/data/icons/revamp-2/24/interface_time_stop_watch_estimated-512.png',
        text: 'Card Size',
        callback(t) {
          return t.popup({
            title: 'Card Size',
            url: 'estimate.html',
          });
        },
      },
      {
        icon:
          'https://cdn3.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-5/24/2085-512.png',
        text: 'Card Priority',
        callback(t) {
          return t.popup({
            title: 'Card Priority',
            url: 'priority.html',
          });
        },
      },
      {
        icon:
          'https://cdn2.iconfinder.com/data/icons/universal-simple/288/Simple-55-512.png',
        text: 'Dependencies',
        callback(t) {
          return t.popup({
            title: 'Add a dependency',
            url: 'dependency.html',
          });
        },
      },
      {
        icon: GRAY_ICON,
        text: 'Search Your Cards',
        callback: cardButtonCallback
      }
    ];
  }
});
