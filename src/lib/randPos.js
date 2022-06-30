// 1. choose random square
// 2. choose random piece
// 3. Add piece and square to position object

function randArrEl(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function randSquare(f, r) {
    return randArrEl(f) + randArrEl(r);
}

function randPiece(c, p) {
    return randArrEl(c) + randArrEl(p);
}

function randPos(n) {
    const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const PIECES = ['P', 'K', 'Q', 'B', 'N', 'R'];
    const COLORS = ['w', 'b'];

    let position = {};

    while(Object.keys(position).length < n) {
        let square = randSquare(FILES, RANKS);
        let piece = randPiece(COLORS, PIECES);

        // checking if square isn't filled
        if(position[square] === undefined) {
            position[square] = piece;
        }
    } 

    return position;
}

export default randPos;