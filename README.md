# Battleships-Net-React

## Description

 Project written in .Net and React. It's a Simulation of a Battleship Game. 
 Focus of the project was on the C# side, that's why most of the logic was created there, even if some of the logic would be easier to do in React.
  
## Design

 Project Assumptions:
 * Create a simulation of Battleship Game.
 * Battlemap size should be 10x10 squares;
 * Battleships that should be added to the game are:
  *	Carrier -	5 squares 
	* Battleship - 4 squares
	* Cruiser	- 3 squares
	* Submarine	- 3 squares
	* Destroyer	- 2 squares
 
### Decision 1. - How to handle generating Battleships?
 Between generating all ships in the backend from the start and taking actions in the frontend side to call for API(generating the whole game more slowly).
 I choose generating everything in the .Net. The whole operation could be done faster. We can avoid multimple calls to API. And since we have the whole record of the game,
 it could be easily stored in the database if that functionality would be needed in the future.
 
### Decision 2. - How to store data about generated Ships Locations?
 In this step I've made some mistakes, that could be fixed later on. Namely storing only initial coordinates of the ships, insteed of array of coordinates.
 Storing only initial coordinates made data send between frontend and backend smaller, but also made getting all squares occupied by ships so much harder. 
 To fix the problem it's required to write a function and iterate throug the size of the ship, based on the direction of the ship. On the other hand, storing the List of coordinates
 would let us accomplish the same effect much easier. Unfortuneattely to fix all those probems, most of the application would have to be rewritten. My initial decision to use 
 only starting coordinates came from checking the condition of ship generation. As the ship that is generated cannot be outside the map range, and cannot take any square 
 that is already occupied by another ship. By doing this logic in a funcion, in somewhat naturally flowed into the decision i've made.
 
### Decision 3. - How to display all the data in React, and how to modify certain squares?
 I decided to use simple method of creating multiple divs, and label all of them with different classes that corresponded to my coordinates. It seemed as the simplest method. 
 The only downside is that code for battlemap component is quite long. Displaying all the information on the frontend ended up somewhat more complicated than i anticipated.
 Mostly becouse my choice from last point. How i generate ships, and pass those informations to frontend.

## Backend APIs

  * /api/battleship/SimulateGame (GET)
  * /api/battleship/GenerateShips (POST)

## Technologies used.
 * React
   * Styled-Components
   * Axios
 * .Net

