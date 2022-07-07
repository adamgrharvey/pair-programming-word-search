const transpose = function(matrix) {
  
  let array = [];
  
  for (let i = 0; i < matrix[0].length; i++) {
    array.push([]);
  }
  
  for (let row = 0; row < matrix.length; row ++) {
    for (let col = 0; col < matrix[row].length; col++) {
      array[col][row] = matrix[row][col];
    }
  }
  return array;
    
};

const reverse = function(s) {
  return s.split("").reverse().join("");
};

const diagonal = function(word, array) {
  // where we are at in word
  let wordIndex = 0;
  // just a boolean
  let good = true;
  let out = word[0];
  // used later when we start a direction
  let direction = "";
  // go through entire array, look for first letter of word.
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      // if we find it,
      if (array[i][j] === word[wordIndex]) {
        // we are GOOD to continue looking.
        good = true;
        // while we are good to look...
        while (good) {
          // we want to check the next letter in word
          wordIndex++;
          // if our word has been spelled, we can return true!
          if (out === word) {
            return true;
          }
          // check UP LEFT
          if (((i - wordIndex) >= 0 && (j - wordIndex) >= 0) && (direction === 'up left' || direction === "")) {
            if (array[i - wordIndex][j - wordIndex] === word[wordIndex]) {
              out += word[wordIndex];
              direction = 'up left';
              continue;
            }
          }
          // check UP RIGHT
          if (((i - wordIndex) >= 0 && (j + wordIndex) < array[i].length) && (direction === 'up right' || direction === "")) {
            if (array[i - wordIndex][j + wordIndex] === word[wordIndex]) {
              out += word[wordIndex];
              direction = 'up right';
              continue;
            }
          }
          // check DOWN LEFT
          if (((i + wordIndex) < array.length && (j - wordIndex) >= 0) && (direction === 'down left' || direction === "")) {
            if (array[i + wordIndex][j - wordIndex] === word[wordIndex]) {
              out += word[wordIndex];
              direction = "down left";
              continue;
            }
          }
          // check DOWN RIGHT
          if (((i + wordIndex) < array.length && (j + wordIndex) < array[i].length) && (direction === 'down right' || direction === "")) {
            if (array[i + wordIndex][j + wordIndex] === word[wordIndex]) {
              out += word[wordIndex];
              direction = 'down right';
              continue;
            }
          }
          // if the letters dont match, get out of this and go through the for loops again
          good = false;
        }
        // restart the word.
        wordIndex = 0;
        out = word[0];
      }
    }
  }
  // if we didnt find it diagonally, return false.
  return false;
};

const wordSearch = (letters, word) => {
  if (letters.length === 0 || word === undefined) {
    return undefined;
  }
  word = word.toUpperCase();
  const wordReverse = reverse(word);
  const lettersTranspose = transpose(letters);
  const verticalJoin = lettersTranspose.map(ls => ls.join(''));
  const horizontalJoin = letters.map(ls => ls.join(''));

  for (l of horizontalJoin) {
    if (l.includes(word)) return true;
    if (l.includes(wordReverse)) return true;
  }
  for (l of verticalJoin) {
    if (l.includes(word)) return true;
    if (l.includes(wordReverse)) return true;
  }
  if (diagonal(word, horizontalJoin)) return true;
  if (diagonal(wordReverse, horizontalJoin)) return true;
  return false;
};

module.exports = wordSearch;