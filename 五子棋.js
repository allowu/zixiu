class Board {
    blackchess = '▲';
    whitechess = '△';

    constructor(size) {
        this.size = size;
        this.board = new Array(size);
        for (let i = 0; i < size; i++) {
            this.board[i] = new Array(size).fill('0');
        }
    }

    Down(x, y, color) {
        if (x < 1 || x > this.size || y < 1 || y > this.size) {
            console.log('坐标超出棋盘范围了');
            return false;
        }

        if (this.board[x - 1][y - 1] !== '0') {
            console.log('该位置已经有棋子了');
            return false;
        }

        if (color === 'black') {
            this.board[x - 1][y - 1] = this.blackchess;
        } else if (color === 'white') {
            this.board[x - 1][y - 1] = this.whitechess;
        }

        return true;
    }

        Show() {
    console.clear();

    let cellWidth = 6; // 每个格子的显示宽度，越大间距越宽

    // 计算字符显示宽度
    function visualLength(str) {
        let len = 0;

        for (let ch of str) {
            // 中文、三角形、特殊符号通常占2格
            if (/[\u4e00-\u9fa5▲△]/.test(ch)) {
                len += 2;
            } else {
                len += 1;
            }
        }

        return len;
    }

    // 按显示宽度补空格
    function padVisual(str, width) {
        str = String(str);
        let len = visualLength(str);
        return str + ' '.repeat(Math.max(width - len, 0));
    }

    // 打印列号
    let header = padVisual('', cellWidth);

    for (let i = 1; i <= this.size; i++) {
        header += padVisual(i, cellWidth);
    }

    console.log(header);

    // 打印棋盘
    for (let i = 0; i < this.size; i++) {
        let row = padVisual(i + 1, cellWidth);

        for (let j = 0; j < this.size; j++) {
            row += padVisual(this.board[i][j], cellWidth);
        }

        console.log(row);
    }
}
}

class Game {
    constructor(size) {
        this.size = size;
        this.board = new Board(size);
        this.color = this.yanse();
        this.computercolor = this.color === 'black' ? 'white' : 'black';
    }

    yanse() {
        let color = prompt('请选择你的棋子颜色，输入black或white');
        if (color !== 'black' && color !== 'white') {
            console.log('输入的颜色不合法，请重新选择');
            return this.yanse();
        }
        return color;
    }

    getChess(color) {
        if (color === 'black') {
            return '▲';
        } else {
            return '△';
        }
    }

    play() {
        this.board.Show();

        while (true) {
            if (this.playerround() === true) {
                console.log('玩家获胜了');
                break;
            }

            if (this.computerround() === true) {
                console.log('电脑获胜了');
                break;
            }
        }
    }

    playerround() {
        let input = prompt('请输入你要下棋的坐标，格式为x,y');
        let [x, y] = input.split(',').map(Number);

        while (!this.board.Down(x, y, this.color)) {
            input = prompt('位置不合法，请重新输入坐标，格式为x,y');
            [x, y] = input.split(',').map(Number);
        }

        this.board.Show();

        if (this.checkwin(x, y, this.color)) {
            return true;
        }

        return false;
    }

    computerround() {
        let move = this.findBestMove();

        let x = move.x;
        let y = move.y;

        this.board.Down(x, y, this.computercolor);

        console.log(`电脑下在：${x},${y}`);

        this.board.Show();

        if (this.checkwin(x, y, this.computercolor)) {
            return true;
        }

        return false;
    }

    findBestMove() {
        // 1. 如果电脑自己能赢，先赢
        let winMove = this.findAttackMove(4);
        if (winMove !== null) {
            return winMove;
        }

        // 2. 如果玩家快赢了，先堵玩家的4连
        let block4 = this.findBlockMove(4);
        if (block4 !== null) {
            return block4;
        }

        // 3. 堵玩家的3连
        let block3 = this.findBlockMove(3);
        if (block3 !== null) {
            return block3;
        }

        // 4. 堵玩家的2连
        let block2 = this.findBlockMove(2);
        if (block2 !== null) {
            return block2;
        }

        // 5. 没有威胁，随机下
        return this.randomMove();
    }

    findAttackMove(targetCount) {
        return this.findMoveByColor(this.computercolor, targetCount);
    }

    findBlockMove(targetCount) {
        return this.findMoveByColor(this.color, targetCount);
    }

    findMoveByColor(color, targetCount) {
        let chess = this.getChess(color);

        let directions = [
            [1, 0],   // 竖
            [0, 1],   // 横
            [1, 1],   // 右下斜
            [1, -1]   // 左下斜
        ];

        for (let x = 1; x <= this.size; x++) {
            for (let y = 1; y <= this.size; y++) {
                if (this.board.board[x - 1][y - 1] !== chess) {
                    continue;
                }

                for (let [dx, dy] of directions) {
                    let count = 1;

                    let nx = x + dx;
                    let ny = y + dy;

                    while (
                        nx >= 1 &&
                        nx <= this.size &&
                        ny >= 1 &&
                        ny <= this.size &&
                        this.board.board[nx - 1][ny - 1] === chess
                    ) {
                        count++;
                        nx += dx;
                        ny += dy;
                    }

                    if (count >= targetCount) {
                        // 连子前面的位置
                        let beforeX = x - dx;
                        let beforeY = y - dy;

                        if (this.isEmpty(beforeX, beforeY)) {
                            return {
                                x: beforeX,
                                y: beforeY
                            };
                        }

                        // 连子后面的位置
                        let afterX = x + dx * count;
                        let afterY = y + dy * count;

                        if (this.isEmpty(afterX, afterY)) {
                            return {
                                x: afterX,
                                y: afterY
                            };
                        }
                    }
                }
            }
        }

        return null;
    }

    isEmpty(x, y) {
        if (x < 1 || x > this.size || y < 1 || y > this.size) {
            return false;
        }

        return this.board.board[x - 1][y - 1] === '0';
    }

    randomMove() {
        let x;
        let y;

        do {
            x = Math.floor(Math.random() * this.size) + 1;
            y = Math.floor(Math.random() * this.size) + 1;
        } while (!this.isEmpty(x, y));

        return {
            x: x,
            y: y
        };
    }

    checkwin(x, y, color) {
        let chess = this.getChess(color);

        let directions = [
            [1, 0],
            [0, 1],
            [1, 1],
            [1, -1]
        ];

        for (let [dx, dy] of directions) {
            let count = 1;

            // 正方向数
            let nx = x + dx;
            let ny = y + dy;

            while (
                nx >= 1 &&
                nx <= this.size &&
                ny >= 1 &&
                ny <= this.size &&
                this.board.board[nx - 1][ny - 1] === chess
            ) {
                count++;
                nx += dx;
                ny += dy;
            }

            // 反方向数
            nx = x - dx;
            ny = y - dy;

            while (
                nx >= 1 &&
                nx <= this.size &&
                ny >= 1 &&
                ny <= this.size &&
                this.board.board[nx - 1][ny - 1] === chess
            ) {
                count++;
                nx -= dx;
                ny -= dy;
            }

            if (count >= 5) {
                return true;
            }
        }

        return false;
    }
}

let size = 15;
let g = new Game(size);
g.play();