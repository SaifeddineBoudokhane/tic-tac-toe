let gameBoard=(function(){
    let board=[ [null,null,null],
                [null,null,null],
                [null,null,null]];
    
    function _testWinRow(indexRow){
        if(board[indexRow][0]!=null&&
            board[indexRow][1]!=null&&
            board[indexRow][2]!=null){

            if(board[indexRow][0]==board[indexRow][1]&&
                board[indexRow][1]==board[indexRow][2]){

                return true;
            }
            return false;
        }
        return false;
    };

    function _testWinColumn(indexColumn){
        if(board[0][indexColumn]!=null&&
            board[1][indexColumn]!=null&&
            board[2][indexColumn]!=null){

            if(board[0][indexColumn]==board[1][indexColumn]&&
                board[1][indexColumn]==board[2][indexColumn]){

                return true;
            }
            return false;
        }
        return false;
    };

    function _testWinDiagonal(){
        if(board[1][1]!=null&&(
            (board[0][0]!=null&&
            board[2][2]!=null)||
            (board[0][2]!=null&&
            board[2][0]!=null))){

            if((board[0][0]==board[1][1]&&
                board[1][1]==board[2][2])||
                (board[0][2]==board[1][1]&&
                board[1][1]==board[2][0])){

                    return true;
                }

            return false;
        }
    
        return false;
    };

    function _testWin(indexRow,indexColumn){
        return(_testWinColumn(indexColumn)||
                _testWinRow(indexRow)||
                _testWinDiagonal());
    }

    function setBoardValue(indexRow,indexColumn,value){
        board[indexRow][indexColumn]=value;
        if(_testWin(indexRow,indexColumn)){
            console.log("WIN!");
        }
    }

    return{
        board : board,
        setBoardValue : setBoardValue
    };
})();

function player(symbolValue,nameValue){
    const symbol=symbolValue;
    const name=nameValue;

    function getSymbol(){
        return symbol;
    }
    
    function getName(){
        return name;
    }
    return{
        getSymbol : getSymbol,
        getName : getName
    }
}

let player1=player("X","player1");
let player2=player("O","player2");