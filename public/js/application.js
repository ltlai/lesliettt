var xSquares = []
var oSquares = []
var emptySquares = ['0','1','2','3','4','5','6','7','8']
var winConditions = [['0','1','2'],
                     ['3','4','5'],
                     ['6','7','8'],
                     ['0','3','6'],
                     ['1','4','7'],
                     ['2','5','8'],
                     ['0','4','8'],
                     ['2','4','6']]

function computerMove() {
  if (oneNeededToWin() > -1) {
    claimSquare(oneNeededToWin());
  }
  else if (emptySquares.indexOf('4') > -1) {
    claimSquare('4');
  }
  else if (sameSets(xSquares, ['2', '6'])) {
    claimSquare('1');
  }
  else if (sameSets(xSquares, ['4', '8'])) {
    claimSquare('2');
  }
  else {
    claimSquare(emptySquares[0]);
  }
  checkWin();
}

function match(winningSet, claimedSquares, numberMatched) {
  var matched = 0;
  for(var i=0; i<winningSet.length; i++) {
    if (claimedSquares.indexOf(winningSet[i]) > -1) {
      matched += 1;
    }
    if (matched === numberMatched) {
      return true;
    }
  }
  return false;
}

function checkWin() {
  for(var i=0; i<winConditions.length; i++) {
    if (match(winConditions[i], xSquares, 3)) {
      alert('You won!');
      $('td').off('click');
    }
    else if (match(winConditions[i], oSquares, 3)) {
      alert('You lost!');
      $('td').off('click');
    }
  }
}

function checkTie() {
  if (emptySquares.length === 0) {
    alert('Game over. It\'s a tie!');
  }
}

function oneNeededToWin() {
  for(var i=0; i<winConditions.length; i++) {
    if (match(winConditions[i], xSquares, 2) || 
        match(winConditions[i], oSquares, 2)) {
      for(var j=0; j<3; j++) {
        var targetSquare = winConditions[i][j];
        if (emptySquares.indexOf(targetSquare) > -1) {
          return targetSquare;
        }
      }
    }
  }
  return -1;
}

function claimSquare(id, player) {
  var cell = '#' + id
  if (player === 'X') {
    $(cell).text('X');
    xSquares.push(id);
  }
  else {
    $(cell).text('O');
    oSquares.push(id);
  }
  $(cell).off('click');
  removeFromEmptySquares(id);
}

function removeFromEmptySquares(id) {
  emptySquares.splice(emptySquares.indexOf(id), 1)
}

function sameSets(a, b) {
  var i = a.length;
  if (i != b.length) {
    return false;
  }
  while (i--) {
    if (a.sort()[i] !== b.sort()[i]) {
      return false;
    }
  }
  return true;
}

$(document).ready(function() {
  $('td').click(function() {
    claimSquare(this.id, 'X');
    checkWin();
    checkTie();
    computerMove();
  });
});