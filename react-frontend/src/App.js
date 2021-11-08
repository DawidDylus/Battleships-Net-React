import './App.css';
import { Battlemap } from './Components/Battlemap';
import styled from 'styled-components';
import React, { useState} from 'react';
import { GenerateShips, SimulateGame } from './services';

const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const Container = styled.div`
display: flex;
flex-direction: row;
width: 90vh;
justify-content: space-around;
`;

const InstructionsContainer = styled.div`
display: flex;
flex-direction: column;
width: 90vh;
justify-content: center;
align-items: center;
`;

const Button = styled.button`
margin: 20px;
width: 30vh;
height: 5vh;
background: #4d94ff;
color: white;
font-size: 2rem;
&:hover {
  background: #1a75ff;
}

&.disabled {
  background: lightgrey;
}
`;

const Wrapper = styled.div`
width: 100%;
`;

const Instructions = [
  "Click Generate Ships Button, to create new ships on the map for both players.",
  "Click Generate Ships to change placing of the ships. || Click Simulate Battle to see which player will win.",
  "Wait for players to end battle. || Grey squares - ships || Blue Squares - shoots that missed || Red Squares - ships that've been hit.",
  "Player One Wins! || Click Generate Ships Button, to create new ships on the map for both players.",
  "Player Two Wins! || Click Generate Ships Button, to create new ships on the map for both players."
]

var playersShips;

function App() {

  const [DisableGenerateButton, setDisableGenerateButton] = useState(false);
  const [DisableSimulateBattleButton, setDisableSimulateBattleButton] = useState(true);

  const [InstructionsSteps, setInstructionsSteps] = useState(Instructions[0]);

  var battlemap = 0; 

  const generateShips = async () => {

    let res = await GenerateShips();

    playersShips = res;
    
    res.shipsPlayerOne.map(data => {
     
      var xCoordinates = data.xStartCoordinates + 1;
      var yCoordinates = data.yStartCoordinates + 1;

      for (var i = 0; i < data.shipSize; i++) {

        document.getElementsByClassName(xCoordinates + "." + yCoordinates)[battlemap].classList.add("ship");

        if (data.isShipDirectionHorizontal) {
          xCoordinates += 1;
        }
        else {
          yCoordinates += 1;
        }
      } 
    })    
    setDisableSimulateBattleButton(false);
    return res.shipsPlayerOne;

  }

  const clearBattlemap = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 11; j++) {
        for (let k = 1; k < 11; k++) {
          let element = document.getElementsByClassName(j + "." + k)[i];

          element.classList.remove("ship");
          element.classList.remove("hit");
          element.classList.remove("miss");
        }
      }
    }
  }
 
  const clickGenerateShips = async () => {
   
    setInstructionsSteps(Instructions[1]);

    clearBattlemap();

    battlemap = 0;
    let P1 = await generateShips();   
    
    battlemap = 2;
    let P2 = await generateShips();  
   
    playersShips.shipsPlayerOne = P1;
    playersShips.shipsPlayerTwo = P2;
    console.log(playersShips);
   
  }

  const clickSimulateBattle = async () => {
    
    setInstructionsSteps(Instructions[2]);

    setDisableGenerateButton(true);
    setDisableSimulateBattleButton(true);    

    let results = await SimulateGame(playersShips);

    let shotsP1 = results.playerOne.playerShots;
    let shotsP2 = results.playerTwo.playerShots;

    let gameLength = shotsP1.length + shotsP2.length;

    for (let n = 0; n < gameLength; n++) {

      if (n === shotsP1.length) {

        console.log("Player One wins");

        setDisableGenerateButton(false);
        setInstructionsSteps(Instructions[3]);
        return;
      }
      else if (n === shotsP2.length) {

        console.log("Player Two wins");

        setDisableGenerateButton(false);
        setInstructionsSteps(Instructions[4]);
        return;
      }

      var xCoordinatesP1 = shotsP1[n].hitCoordinates.x + 1;
      var yCoordinatesP1 = shotsP1[n].hitCoordinates.y + 1;

      var xCoordinatesP2 = shotsP2[n].hitCoordinates.x + 1;
      var yCoordinatesP2 = shotsP2[n].hitCoordinates.y + 1;

      if (shotsP1[n].result === "hit") {
        document.getElementsByClassName(xCoordinatesP1 + "." + yCoordinatesP1)[1].classList.add("hit");
      }
      else if (shotsP1[n].result === "miss") {
        document.getElementsByClassName(xCoordinatesP1 + "." + yCoordinatesP1)[1].classList.add("miss");
      }

      await sleep(100);

      if (shotsP2[n].result === "hit") {
        document.getElementsByClassName(xCoordinatesP2 + "." + yCoordinatesP2)[3].classList.add("hit");
      }
      else if (shotsP2[n].result === "miss") {
        document.getElementsByClassName(xCoordinatesP2 + "." + yCoordinatesP2)[3].classList.add("miss");
      }
      await sleep(100);

    }
  }

  return (
    <Wrapper>
      <Container>
        <h1>Player One</h1>
      </Container>
      <Container>
        <Battlemap />
        <Battlemap />
      </Container>

      <Container>
        <h1>Player Two</h1>
      </Container>
      <Container>
        <Battlemap />
        <Battlemap />
      </Container>


      <Container>
        <Button disabled={DisableGenerateButton} onClick={clickGenerateShips} className={DisableGenerateButton === true ? 'disabled' : null}>Generate Ships</Button>
        <Button disabled={DisableSimulateBattleButton} onClick={clickSimulateBattle} className={DisableSimulateBattleButton === true ? 'disabled' : null}> Simulate Battle</Button>
      </Container>
      <InstructionsContainer>
        <h1>Instructions</h1>

        {InstructionsSteps}
      </InstructionsContainer>


    </Wrapper>
  );
}

export default App;
