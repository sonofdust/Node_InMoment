/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search(grid, wordlist) {
  /* FUNCTION TO EXTRACT ALL POSSIBLE WORD STRINGS FROMM GRID */
  const getCheckSet = matrix => {
    const set = new Set();
    /*******************************/
    /****   LOAD HORIZONTAL     ****/
    /*******************************/
    let buff = [];
    matrix.forEach(row => buff.push([]));

    matrix.forEach(row => {
      set.add(row.join(""));
      row.forEach((elem, idx2) => {
        buff[idx2].push(elem);
      });
    });
    /*******************************/
    /****     LOAD VERTICAL     ****/
    /*******************************/
    buff.forEach(row => set.add(row.join("")));
    /*******************************/
    /****     LOAD DIAGONAL     ****/
    /*******************************/
    const loadSet = matrix => {
      let buff = [];
      matrix.forEach(row => buff.push([]));
      matrix.forEach((row, idx1) => {
        row.forEach((elm, idx2) => {
          if (row[idx2 - idx1]) buff[idx2].push(row[idx2 - idx1]);
        });
      });

      buff.forEach(item => {
        let x1 = item.join("");
        let x2 = item.reverse().join("");
        try {
          if (!(set.has(x1) || set.has(x2))) {
            set.add(x1);
          }
        } catch (e) {}
      });
    };
    loadSet(matrix);
    loadSet(matrix.reverse());
    matrix = matrix.map(row => row.reverse());
    loadSet(matrix);
    loadSet(matrix.reverse());

    return set;
  };
  /**********************************/
  /* MAKE ALL CHARACTERS SAME CASE */
  /**********************************/
  wordlist = wordlist.map(item => item.toUpperCase());
  grid = grid.map(item => item.map(elem => elem.toUpperCase()));

  /* SEARCH CHECK LIST TO FIND MATCHING WORDS */

  //    console.log(wordlist);
  //    console.log(grid);
  const checkSet = getCheckSet(grid);
  const matchList = [];
  const words = new Set(wordlist);
  for (let word of words) {
    for (let elm of checkSet) {
      let elm1 = elm;
      let elm2 = elm
        .split("")
        .reverse()
        .join("");
      if (elm1.indexOf(word) !== -1 || elm2.indexOf(word) !== -1) {
        matchList.push(word);
        break;
      }
    }
  }
  return matchList;
};
