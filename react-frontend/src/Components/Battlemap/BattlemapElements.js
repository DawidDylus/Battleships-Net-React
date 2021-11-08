import styled from "styled-components";

export const BattlemapWrap = styled.div`

`;

export const BattlemapContainer = styled.div`
    margin: 50px;
    display: flex;
`;

export const Row = styled.div`   
    display: flex; 
    flex-wrap: wrap;
    height: 20px;
    width: 200px;
`;

export const Square = styled.div`        
    width: 9%;
    height: 99%;
    border: 1px solid black;  
    
    &.ship {
        background-color: grey;
    }
    
    &.miss {
        background-color: blue;
    }

    &.hit {
        background-color: red;       
    }
`;

export const IdentificatorsCol = styled.div`   
    display: flex; 
    flex-wrap: wrap;
    height: 20px;
    width: 200px;
`;

export const Letter = styled.div`        
    width: 10%;
    height: 99%;  
    text-align: center;   
`;

export const Numbers = styled.div`        
    width: 20px;
    height: 200px;     
    text-align: center;
`;

export const Number = styled.div`        
    width: 100%;
    height: 10%;     
`;