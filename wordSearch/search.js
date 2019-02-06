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
  //********************************* MATRIX TRAVERSE *********************************
  const searchWord = (word, matrix) => {
    let points = {};
    const wordPoints = () => {
      if (!points[word]) points[word] = [];

      wordCars = word.split("");

      matrix.forEach((row, y) =>
        row.forEach((elm, x) => {
          if (elm === wordCars[0]) {
            const checkPath = path => {
              let pointList = [];
              try {
                for (let i = 0; i < wordCars.length; i++) {
                  if (matrix[path(x, y, i).y][path(x, y, i).x] == wordCars[i]) {
                    point = new Object();
                    point.x = path(x, y, i).x;
                    point.y = path(x, y, i).y;
                    pointList.push(point);
                  } else {
                    pointList = [];
                    break;
                  }
                }
              } catch (e) {
                pointList = [];
              }
              if (pointList.length) {
                points[word].push(pointList);
              }
            };
            /***** CREATE FUNCTIONS TO NAVIGATE MATRIX*******/
            const funcArray = [];
            const west = (x, y, i) => ({
              x: x - i,
              y: y
            });
            funcArray.push(west);
            const east = (x, y, i) => ({
              x: x + i,
              y: y
            });
            funcArray.push(east);
            const north = (x, y, i) => ({
              x: x,
              y: y - i
            });
            funcArray.push(north);
            const south = (x, y, i) => ({
              x: x,
              y: y + i
            });
            funcArray.push(south);
            const northwest = (x, y, i) => ({
              x: x - i,
              y: y - i
            });
            funcArray.push(northwest);
            const northeast = (x, y, i) => ({
              x: x + i,
              y: y - i
            });
            funcArray.push(northeast);
            const southeast = (x, y, i) => ({
              x: x + i,
              y: y + i
            });
            funcArray.push(southeast);
            const southweast = (x, y, i) => ({
              x: x - i,
              y: y + i
            });
            funcArray.push(southweast);
            funcArray.forEach(item => checkPath(item));
          }
        })
      );
    };
    /********************  CASE INSENSITIVE **********************/
    word = word.toUpperCase();
    matrix = matrix.map(row => row.map(ele => ele.toUpperCase()));
    /********************  FIND WORDS IN MATRIX ******************/

    wordPoints(word, matrix);
    return points;
  };

  /* SEARCH CHECK LIST TO FIND MATCHING WORDS */

 //  console.log(wordlist);
 //  console.log(grid);
  let matchList = [];
  wordlist.forEach(word => {
    let points = searchWord(word.toUpperCase(), grid);
    if (points[word.toUpperCase()].length) {
      matchList.push(word.toUpperCase());
    }
  });

  return matchList;
};
