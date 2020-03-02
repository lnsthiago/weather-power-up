const { Promise } = window.TrelloPowerUp;
const REFRESH_INTERVAL = 1800;

const getEstimateBadgesDetails = (t, opts) =>
  Promise.all([
    t.get('card', 'shared', 'cardEstimate'),
    t.get('card', 'shared', 'cardSpent'),
    t.get('card', 'shared', 'cardRemaining'),
    t.get('card', 'shared', 'prioritySize')
  ]).then(([cardEstimate, cardSpent, cardRemaining, prioritySize]) => {
    const badgeCardEstimate = {
      dynamic(t) {
        return {
          icon: './../images/tarefa.svg',
          title: 'SIZE',
          text: cardEstimate || '0',
          color: 'orange'
        };
      },
    };

    const badgeCardSpent = {
      dynamic(t) {
        return {
          icon: './tarefa.svg',
          title: 'SPENT',
          text: cardSpent || '0',
          color: 'green'
        };
      },
    };

    const badgeCardRemaining = {
      dynamic(t) {
        return {
          icon: 'tarefa.svg',
          title: 'REMAINING',
          text: cardRemaining || '0',
          color: 'blue'
        };
      },
    };

    const badgePrioritySize = {
      dynamic(t) {
        return {
          title: 'PRIORITY',
          text: prioritySize || 'No priority',
          color: getPriorityColor(prioritySize),
        };
      },
    };

    let badges = [];

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
  if (prioritySize === 'Highest')
    return 'red';
  if (prioritySize === 'Critical')
    return 'orange';
  if (prioritySize === 'Alarming')
    return 'yellow';
  if (prioritySize === 'Act Soon')
    return 'green';
  if (prioritySize === 'Lowest')
    return 'blue';
  return 'grey';
}

function isEmpty(val) {
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}

window.TrelloPowerUp.initialize(
  {
    'card-badges': getEstimateBadgesDetails,
    'card-detail-badges': getEstimateBadgesDetails,
    'card-buttons': function (t, options) {
      return [{
        icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
        text: 'Card Size',
        callback: function (t) {
          return t.popup({
            title: "Card Size",
            url: 'estimate.html'
          });
        }
      },
      {
        icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
        text: 'Card Priority',
        callback: function (t) {
          return t.popup({
            title: "Card Priority",
            url: 'priority.html'
          });
        }
      }];
    },
  }
);
