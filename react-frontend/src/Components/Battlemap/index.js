import React, { useState, useEffect } from 'react';
import * as axios from 'axios';
import { Square, Row, IdentificatorsCol, BattlemapContainer, BattlemapWrap, Letter, Number, Numbers } from './BattlemapElements';

const axiosInst = axios.create({
    baseURL: 'https://localhost:44302/api',
})

export const Battlemap = () => {


    const [test, setTest] = useState("default test text");

    const getString = async () => {
        try {
            const { data } = await axiosInst.get('/battleship');

            setTest(data);

        }
        catch {
            console.log("Error! Could not load battleship data.");
        }



    }   



    useEffect(() => {
        getString();
        
    }, []);





    return (
        <>
            <BattlemapContainer>
                <Numbers>
                    <Number />
                    <Number>1</Number>
                    <Number>2</Number>
                    <Number>3</Number>
                    <Number>4</Number>
                    <Number>5</Number>
                    <Number>6</Number>
                    <Number>7</Number>
                    <Number>8</Number>
                    <Number>9</Number>
                    <Number>10</Number>
                </Numbers>

                <BattlemapWrap>
                    <IdentificatorsCol>

                        <Letter>a</Letter>
                        <Letter>b</Letter>
                        <Letter>c</Letter>
                        <Letter>d</Letter>
                        <Letter>e</Letter>
                        <Letter>f</Letter>
                        <Letter>g</Letter>
                        <Letter>h</Letter>
                        <Letter>i</Letter>
                        <Letter>j</Letter>

                    </IdentificatorsCol>
                    <Row>
                        <Square className="1a" />
                        <Square className="1b" />
                        <Square className="1c" />
                        <Square className="1d" />
                        <Square className="1e" />
                        <Square className="1f" />
                        <Square className="1g" />
                        <Square className="1h" />
                        <Square className="1i" />
                        <Square className="1j" />
                    </Row>

                    <Row>
                        <Square className="2a" />
                        <Square className="2b" />
                        <Square className="2c" />
                        <Square className="2d" />
                        <Square className="2e" />
                        <Square className="2f" />
                        <Square className="2g" />
                        <Square className="2h" />
                        <Square className="2i" />
                        <Square className="2j" />
                    </Row>

                    <Row>
                        <Square className="3a" />
                        <Square className="3b" />
                        <Square className="3c" />
                        <Square className="3d" />
                        <Square className="3e" />
                        <Square className="3f" />
                        <Square className="3g" />
                        <Square className="3h" />
                        <Square className="3i" />
                        <Square className="3j" />
                    </Row>

                    <Row>
                        <Square className="4a" />
                        <Square className="4b" />
                        <Square className="4c" />
                        <Square className="4d" />
                        <Square className="4e" />
                        <Square className="4f" />
                        <Square className="4g" />
                        <Square className="4h" />
                        <Square className="4i" />
                        <Square className="4j" />
                    </Row>

                    <Row>
                        <Square className="5a" />
                        <Square className="5b" />
                        <Square className="5c" />
                        <Square className="5d" />
                        <Square className="5e" />
                        <Square className="5f" />
                        <Square className="5g" />
                        <Square className="5h" />
                        <Square className="5i" />
                        <Square className="5j" />
                    </Row>

                    <Row>
                        <Square className="6a" />
                        <Square className="6b" />
                        <Square className="6c" />
                        <Square className="6d" />
                        <Square className="6e" />
                        <Square className="6f" />
                        <Square className="6g" />
                        <Square className="6h" />
                        <Square className="6i" />
                        <Square className="6j" />
                    </Row>

                    <Row>
                        <Square className="7a" />
                        <Square className="7b" />
                        <Square className="7c" />
                        <Square className="7d" />
                        <Square className="7e" />
                        <Square className="7f" />
                        <Square className="7g" />
                        <Square className="7h" />
                        <Square className="7i" />
                        <Square className="7j" />
                    </Row>

                    <Row>
                        <Square className="8a" />
                        <Square className="8b" />
                        <Square className="8c" />
                        <Square className="8d" />
                        <Square className="8e" />
                        <Square className="8f" />
                        <Square className="8g" />
                        <Square className="8h" />
                        <Square className="8i" />
                        <Square className="8j" />
                    </Row>

                    <Row>
                        <Square className="9a" />
                        <Square className="9b" />
                        <Square className="9c" />
                        <Square className="9d" />
                        <Square className="9e" />
                        <Square className="9f" />
                        <Square className="9g" />
                        <Square className="9h" />
                        <Square className="9i" />
                        <Square className="9j" />
                    </Row>

                    <Row>
                        <Square className="10a" />
                        <Square className="10b" />
                        <Square className="10c" />
                        <Square className="10d" />
                        <Square className="10e" />
                        <Square className="10f" />
                        <Square className="10g" />
                        <Square className="10h" />
                        <Square className="10i" />
                        <Square className="10j" />
                    </Row>

                </BattlemapWrap>
            </BattlemapContainer>
        </>
    )
}
