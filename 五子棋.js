class Board{
    blackchess='▲';
    whitechess='△';
    constructor(size){
        this.size=size;
        this.board=new Array(size).fill('0');
            for(let i=0; i<size; i++){
                this.board[i]=new Array(size).fill('0');
            }
    }
    Down(x,y,color){
        if(x<1 || x>this.size || y<1 || y>this.size){
            console.log('坐标超出棋盘范围了');
            return false;
        }
        if(this.board[x-1][y-1]!='0'){
            console.log('该位置已经有棋子了');
            let input=prompt('请输入你要下棋的坐标,格式为x,y');
            let [x, y] = input.split(',').map(Number);
            return Down(x, y, color);
        }
        if(color=='black'){
            this.board[x-1][y-1]=this.blackchess;
        }
        else if(color=='white'){
            this.board[x-1][y-1]=this.whitechess;
        }
        return true;
    }
    Show(){
        console.clear();
        for(let i=0; i<this.size; i++){
            console.log(this.board[i].join('  '));
        }
    }
}
class game{
    constructor(size){
        this.size=size;
        this.board=new Board(size);
        this.color=this.yanse();
        this.computercolor=this.color=='black'?'white':'black';
    }
    yanse(){
        let color=prompt('请选择你的棋子颜色，输入black或white');
        if(color!='black' && color!='white'){
            console.log('输入的颜色不合法，请重新选择');
            return this.yanse();
        }
        return color;
    }
    play(){
        while(true){
           if (this.playerround()==true){
               console.log('玩家获胜了');
               break;
           }
            if (this.computerround()==true){
                console.log('电脑获胜了');
                break;
            }
        }
    }
    playerround(){
            let input=prompt('请输入你要下棋的坐标,格式为x,y');
            let [x, y] = input.split(',').map(Number);
            this.board.Down(x, y, this.color);
            this.board.Show();
            if(this.checkwin(x,y,this.color)){
                return true;
            }
            return false;
        }
    computerround(){
        if(this.computercolor=='black'){
            let a=1;
            if(a){
                x=Math.floor(Math.random()*this.size)+1;
                y=Math.floor(Math.random()*this.size)+1;
                a--;
                this.board.Down(x, y, this.computercolor);
                this.board.Show();
                if(this.checkwin(x,y,this.computercolor)){
                return true;
              }
            }
            else{
                
                this.board.Down(x, y, this.computercolor);
                this.board.Show();
                if(this.checkwin(x,y,this.computercolor)){
                return true;
              }
              return false;
            }
        }
    }
    checkwin(x,y,color){
        if(color=='black'){
            color='▲';
        }
        else if(color=='white'){
            color='△';
        }
        if(x>=5){
            for(let i=0; i<5; i++){
                if(this.board[x-i-1][y-1]!=color){
                    break;
                }
            }
            return true;
        }
        if(y<=this.size-5 && x>=5){
            for(let i=0; i<5; i++){
                if(this.board[x-i-1][y+i-1]!=color){
                    break;
                }
            }
            return true;
        }
        if(y<=this.size-5){
            for(let i=0; i<5; i++){
                if(this.board[x-1][y+i-1]!=color){
                    break;
                }
            }
            return true;
        }
        if(y<=this.size-5 && x<=this.size-5){
            for(let i=0; i<5; i++){
                if(this.board[x+i-1][y+i-1]!=color){
                    break;
                }
                return true;
            }
        return false;
       }
       if(x<=this.size-5){
            for(let i=0; i<5; i++){
                if(this.board[x+i-1][y-1]!=color){
                    break;
                }
            }
            return true;
        }
        if(y>=5 && x<=this.size-5){
            for(let i=0; i<5; i++){
                if(this.board[x+i-1][y-i-1]!=color){
                    break;
                }
            }
            return true;
        }
        if(y>=5){
            for(let i=0; i<5; i++){
                if(this.board[x-1][y-i-1]!=color){
                    break;
                }
            }
            return true;
        }
        if(y>=5 && x>=5){
            for(let i=0; i<5; i++){
                if(this.board[x-i-1][y-i-1]!=color){
                    break;
                }
            }
            return true;
        }
        return false;
    }
}
let g = new game(size);
g.play();