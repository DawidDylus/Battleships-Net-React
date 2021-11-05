import './App.css';
import { Battlemap } from './Components/Battlemap';
import styled from 'styled-components';
import React, { useEffect } from 'react';

const Container = styled.div`
display: flex;
flex-direction: row;
width: 90vh;
justify-content: space-around;
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
`;

const Wrapper = styled.div`
width: 100%;
`;



function App() {

  const Change = () => {

    var elements = document.getElementsByClassName('5c')[0].className += ' hit';
    console.log(elements);

  }



  return (
    <Wrapper>

      <Container>

        <Battlemap />
        <Battlemap />
      </Container>

      <Container>
        <Battlemap />
        <Battlemap  />
      </Container>

      <Container>
        <Button onClick={Change} >Generate Ships</Button>
        <Button>Simulate Battle</Button>
      </Container>

    </Wrapper>
  );
}

export default App;
