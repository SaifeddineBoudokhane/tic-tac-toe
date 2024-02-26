(function(){

    const domManipulation=(function(){
        //Game DOM
        const page=document.querySelector("body");
        const player1NameDisplay=document.getElementById("player1-name-display");
        const player2NameDisplay=document.getElementById("player2-name-display");
        const player1ScoreDisplay=document.getElementById("player1-score");
        const player2ScoreDisplay=document.getElementById("player2-score");
        const domGameResult=document.getElementById("round-result");
        const gameButtonRestart=document.getElementById("game-restart");
        const gameButtonRestartNew=document.getElementById("game-new-restart");
        //Dialog New Game DOM
        const dialogNewGame=document.getElementById("pop-up");
        const form=document.getElementById("form-new-game");
        const player1NameInput=document.getElementById("player1-name-input");
        const player2NameInput=document.getElementById("player2-name-input");
        const roundsInput=document.getElementById("rounds");
        const gameButtonStartNew=document.getElementById("game-start");
        //Div Announce Winner
        const divDisplayWinner=document.getElementById("display-winner");

        gameButtonRestart.addEventListener("click",()=>playGame.startGame(Number(roundsInput.value)));
        gameButtonRestartNew.addEventListener("click",startNewGame);
        gameButtonStartNew.addEventListener("click",()=>{
            if(form.checkValidity()){
                player1.setName(player1NameInput.value.toUpperCase());
                player2.setName(player2NameInput.value.toUpperCase());
                dialogNewGame.close();
                changeTextContent(player1NameDisplay,player1.getName());
                changeTextContent(player2NameDisplay,player2.getName());
                page.classList.remove("blur");
                playGame.startGame(Number(roundsInput.value));
            }
        });

        divDisplayWinner.addEventListener("click",()=>{
            removeClass(divDisplayWinner,"display-on");
            addClass(divDisplayWinner,"display-off");
        })

        startNewGame();

        function startNewGame(){
            dialogNewGame.showModal();
            addClass(page,"blur");
        }

        function changeTextContent(element,content){
            element.textContent=content;
        }
        function addClass(element,eClass){
            element.classList.add(eClass);
        }
        function removeClass(element,eClass){
            element.classList.remove(eClass);
        }
        function displayRoundResult(content){
            domGameResult.textContent=content;
        }
        function renderScores(){
            changeTextContent(player1ScoreDisplay,player1.getScore());
            changeTextContent(player2ScoreDisplay,player2.getScore());
        }
        function announceWinner(){
            if(player1.getScore()>player2.getScore()){
                changeTextContent(divDisplayWinner.querySelector(".text"),`${player1.getName()} WINS!`);
            }else if(player1.getScore()<player2.getScore()){
                    changeTextContent(divDisplayWinner.querySelector(".text"),`${player2.getName()} WINS!`);
                }else{
                    changeTextContent(divDisplayWinner.querySelector(".text"),"IT WAS A TIE!");
                }
            addClass(divDisplayWinner,"display-on");
            removeClass(divDisplayWinner,"display-off");
        }

        return{
            displayRoundResult:displayRoundResult,
            changeTextContent:changeTextContent,
            addClass:addClass,
            removeClass:removeClass,
            renderScores:renderScores,
            announceWinner:announceWinner
        }
    })();

    const gameBoard=(function(){
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

    const playGame=(function(){
        const board=document.querySelectorAll(".cell");
        let currentSymbol=null;
        let roundResult=null;
        let maxRound;
        let currentRound;

        function startGame(newMaxRound){
            maxRound=newMaxRound;
            currentRound=1;
            _emptyBoard();
            _removeAllClickEvents();
            _addClickEvents();
            setSymbol("X");
            player1.restartScore();
            player1.setSymbol("X");
            player2.restartScore();
            player2.setSymbol("O");
            domManipulation.renderScores();
            domManipulation.displayRoundResult("Last Round's Result");
        }
        function _endRound(){
            _incrementRound();
            if(!_checkGameEnd()){
                _emptyBoard();
                _removeAllClickEvents();
                _addClickEvents();
                setSymbol("X");
            }else{
                _endGame();
            }
            
        }
        function _endGame(){
            _removeAllClickEvents();
            setSymbol(null);
            domManipulation.announceWinner();
        }

        function _addClickEvents(){
            board.forEach(element=>{
                element.addEventListener("click",_setElementContent);
            })
        }

        function _incrementRound(){
            currentRound++;
        }

        function _checkGameEnd(){
            if(currentRound<=maxRound){
                return false;
            }else{
                return true;
            }
        }

        function _emptyBoard(){
            board.forEach(element=>{
                domManipulation.removeClass(element,"X");
                domManipulation.removeClass(element,"O");
                domManipulation.changeTextContent(element,"");
            })
        }
        function _removeAllClickEvents(){
            board.forEach(element=>{
                _removeClickEvent(element);
            })
        }
        function _removeClickEvent(element){
            element.removeEventListener("click",_setElementContent)
        }

        function _setElementContent(event){
            if(currentSymbol!=null){
                domManipulation.changeTextContent(event.target,currentSymbol);
                domManipulation.addClass(event.target,currentSymbol)
                _removeClickEvent(event.target)
                const indexRow=event.target.id.charAt(4);
                const indexColumn=event.target.id.charAt(5);
                roundResult=gameBoard.setBoardSymbol(indexRow,indexColumn,currentSymbol);
                _switchSymbol();
                _checkRoundEnd();
            }
        }

        function _checkRoundEnd(){
            switch(roundResult){
                case null:
                    break;
                case "tie":
                    domManipulation.displayRoundResult("It was a tied Round");
                    _switchPlayersSymbol();
                    _endRound();
                    break;
                case "X":
                    if(player1.getSymbol()==roundResult){
                        domManipulation.displayRoundResult(player1.getName()+" Won! the last Round");
                        player1.incrementScore();
                    }else{
                        domManipulation.displayRoundResult(player2.getName()+" Won! the last Round");
                        player2.incrementScore();
                    }
                    domManipulation.renderScores();
                    _switchPlayersSymbol();
                    _endRound();
                    break;
                case "O":
                    if(player1.getSymbol()==roundResult){
                        domManipulation.displayRoundResult(player1.getName()+" Won! the last Round");
                        player1.incrementScore();
                    }else{
                        domManipulation.displayRoundResult(player2.getName()+" Won! the last Round");
                        player2.incrementScore();
                    }
                    domManipulation.renderScores();
                    _switchPlayersSymbol();
                    _endRound();
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

        function _switchPlayersSymbol(){
            let symbol=player1.getSymbol();
            player1.setSymbol(player2.getSymbol());
            player2.setSymbol(symbol);
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

    function player(){
        let symbol;
        let name;
        let score=0;

        function setName(newName){
            name=newName;
        }
        function setSymbol(newSymbol){
            symbol=newSymbol;
        }
        function incrementScore(){
            score++;
        }
        function getSymbol(){
            return symbol;
        }
        function getName(){
            return name;
        }
        function getScore(){
            return score;
        }
        function restartScore(){
            score=0;
        }
        return{
            setName : setName,
            setSymbol : setSymbol,
            incrementScore : incrementScore,
            getName : getName,
            getSymbol : getSymbol,
            getScore : getScore,
            restartScore : restartScore
        }
    }

    let player1=player();
    let player2=player();

})();