let gameBoard=(function(){
    let board=[ [null,null,null],
                [null,null,null],
                [null,null,null]];
    
    function _resetBoard(){
        board=[ [null,null,null],
                [null,null,null],
                [null,null,null]];
    }

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

    function _testBoardFull(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]==null){
                    return false;
                }
            }
        }
        return true;
    }

    function setBoardSymbol(indexRow,indexColumn,symbol){
        board[indexRow][indexColumn]=symbol;
        if(_testWin(indexRow,indexColumn)){
            let gameResult={
                result: "Win",
                winningSymbol : symbol,
                finalBoard : board
            }
            _resetBoard();
            return gameResult;
        }else{
            if(_testBoardFull()){
                let gameResult={
                    result: "Tie",
                    winningSymbol : null,
                    finalBoard : board
                }
                _resetBoard();
                return gameResult;
            }
            return false;
        }
    }

    return{
        board : board,
        setBoardSymbol : setBoardSymbol
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

(function playGame(){
    let gameEnd=false;
    let currentPlayer=true // true = player1 and false = player1
    let CurrentSymbol;
    let stringIndex;
    let indexRow;
    let indexColumn;
    while(gameEnd==false){
        if(currentPlayer){
            stringIndex=prompt("where to put the : X");
            indexRow=Number(stringIndex.charAt(0));
            indexColumn=Number(stringIndex.charAt(1));
            gameEnd=gameBoard.setBoardSymbol(indexRow,indexColumn,'X');
        }else{
            stringIndex=prompt("where to put the : O");
            indexRow=Number(stringIndex.charAt(0));
            indexColumn=Number(stringIndex.charAt(1));
            gameEnd=gameBoard.setBoardSymbol(indexRow,indexColumn,'O');
        }
        currentPlayer=!currentPlayer;
    }
    if(gameEnd.winningSymbol=='X'){
        alert("player1 wins");
    }else if(gameEnd.winningSymbol=='O'){
        alert("player2 wins");
    }else{
        alert("TIE!")
    }
})();