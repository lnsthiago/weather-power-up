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

// const getEstimateBadges = (t, opts) =>
//   Promise.all([
//     t.get('card', 'shared', 'remainingDev'),
//     t.get('card', 'shared', 'remainingQa'),
//     t.get('card', 'shared', 'remainingGp'),
//     t.get('card', 'shared', 'remainingUx')
//   ]).then(([remainingDev, remainingQa, remainingGp, remainingUx]) => {
//     var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
//     var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';

//     const badgeEstimateDev = {
//       dynamic(t) {
//         return {
//           icon: isEmpty(remainingDev) ? WHITE_ROCKET_ICON : GREY_ROCKET_ICON,
//           text: remainingDev || 'Não estimado',
//           color: isEmpty(remainingDev) ? 'red' : remainingDev === "0" ? 'green' : 'blue',
//         };
//       },
//     };

//     const badgeEstimateQa = {
//       dynamic(t) {
//         return {
//           icon: isEmpty(remainingQa) ? WHITE_ROCKET_ICON : GREY_ROCKET_ICON,
//           text: remainingQa || 'Não estimado',
//           color: isEmpty(remainingQa) ? 'red' : remainingQa === "0" ? 'green' : 'blue',
//         };
//       },
//     };

//     const badgeEstimateGp = {
//       dynamic(t) {
//         return {
//           // title: 'GP',
//           icon: isEmpty(remainingGp) ? WHITE_ROCKET_ICON : GREY_ROCKET_ICON,
//           text: remainingGp || 'Não estimado',
//           color: isEmpty(remainingGp) ? 'red' : remainingGp === "0" ? 'green' : 'blue',
//         };
//       },
//     };

//     const badgeEstimateUx = {
//       dynamic(t) {
//         return {
//           icon: isEmpty(remainingUx) ? WHITE_ROCKET_ICON : GREY_ROCKET_ICON,
//           text: remainingUx || 'Não estimado',
//           color: isEmpty(remainingUx) ? 'red' : remainingUx === "0" ? 'green' : 'blue',
//         };
//       },
//     };

//     let badges = [];

//     badges.push(badgeEstimateDev);
//     badges.push(badgeEstimateQa);
//     badges.push(badgeEstimateGp);
//     badges.push(badgeEstimateUx);
//     return badges;
//   });

function getPriorityColor(prioritySize) {
  if (prioritySize === 'Highest') return 'red';
  if (prioritySize === 'Critical') return 'orange';
  if (prioritySize === 'Alarming') return 'yellow';
  if (prioritySize === 'Act Soon') return 'green';
  if (prioritySize === 'Lowest') return 'blue';
  return 'grey';
}

var authenticationSuccess = function() {
  console.log('Successful authentication');
};

var authenticationFailure = function() {
  console.log('Failed authentication');
};

window.Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});

window.TrelloPowerUp.initialize({
  'card-badges': getEstimateBadgesDetails,
  'card-detail-badges': getEstimateBadgesDetails,
  'card-buttons': function() {
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
    ];
  },
});
