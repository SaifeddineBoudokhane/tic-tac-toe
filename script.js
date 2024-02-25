(function(){
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
                _resetBoard();
                return symbol;
            }else{
                if(_testBoardFull()){
                    _resetBoard();
                    return "tie";
                }
                return null;
            }
            return null;
        }

        return{
            board:board,
            setBoardSymbol : setBoardSymbol
        };
    })();

    let playGame=(function(){
        const board=document.querySelectorAll(".cell");
        let currentSymbol=null;
        let gameResult=null;

        function startGame(){
            board.forEach(element=>{
                element.textContent="";
                _removeClickEvent(element);
            })
            _addClickEvents();
            setSymbol("X");
        }
        function _endGame(){
            board.forEach(element=>{
                _removeClickEvent(element);
            })
            setSymbol(null);
        }

        function _addClickEvents(){
            board.forEach(element=>{
                element.addEventListener("click",_setElementContent);
            })
        }

        function _removeClickEvent(element){
            element.removeEventListener("click",_setElementContent)
        }

        function _setElementContent(event){
            if(currentSymbol!=null){
                event.target.textContent=currentSymbol;
                _removeClickEvent(event.target)
                const indexRow=event.target.id.charAt(4);
                const indexColumn=event.target.id.charAt(5);
                gameResult=gameBoard.setBoardSymbol(indexRow,indexColumn,currentSymbol);
                _switchSymbol();
                _checkGameEnd();
            }
        }

        function _checkGameEnd(){
            switch(gameResult){
                case null:
                    break;
                case "tie":
                    domResult.textContent="It was a tie";;
                    _endGame();
                    break;
                case "X":
                    domResult.textContent="player1 won : X";
                    _endGame();
                    break;
                case "O":
                    domResult.textContent="player2 won : O";
                    _endGame();
                    break;
                default:
                    console.log("error");
                    _endGame();
                    break;
            }
        }

        function _switchSymbol(){
            if(currentSymbol=="X"){
                currentSymbol="O";
            }else{
                currentSymbol="X";
            }
        }

        function setSymbol(symbol){
            if(symbol!="X"&&symbol!="O"){
                currentSymbol=null;
            }else{
                currentSymbol=symbol;
            }
        }

        return{
            startGame:startGame,
            setSymbol:setSymbol
        }
    }());

    function player(symbolValue,nameValue){
        const symbol=symbolValue;
        const name=nameValue;

        function getSymbol(){
            return symbol;
        }
        
        function getName(){
            return name;
        }

        function setName(name){
            this.name=name;
        }
        return{
            getSymbol : getSymbol,
            getName : getName
        }
    }

    let player1=player("X","player1");
    let player2=player("O","player2");

    const startGameButton=document.getElementById("start-game");
    startGameButton.addEventListener("click",playGame.startGame);
    const domResult=document.getElementById("result");
})();