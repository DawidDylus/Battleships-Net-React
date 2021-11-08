using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Battleships_backend_API.Models;

namespace Battleships_backend_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BattleshipController : Controller
    {

        Random rng = new Random();
        List<Ship> ships = new List<Ship>();       

        public BattleshipController()
        {

            Ship Carrier = new Ship("Carrier", 5, 0, 0, true);
            Ship Battleship = new Ship("Battleship", 4, 0, 0, true);
            Ship Cruiser = new Ship("Cruiser", 3, 0, 0, true);
            Ship Submarine = new Ship("Submarine", 3, 0, 0, true);
            Ship Destroyer = new Ship("Destroyer", 2, 0, 0, true);

            ships.Add(Carrier);
            ships.Add(Battleship);
            ships.Add(Cruiser);
            ships.Add(Submarine);
            ships.Add(Destroyer);
        }


        [HttpGet("GenerateShips")]
        public IActionResult GenerateShips()
        {
            try
            {
                bool[,] OccupiedSquares = new bool[10, 10];

                // Loop through all ships.
                foreach (Ship CurrentShip in ships)
                {
                    // check If ship within battlemap, is new ship not colliding with the existing one.
                    bool areCreatingRulesMeet = false;

                    CurrentShip.isShipDirectionHorizontal = rng.Next(2) == 0;

                    while (!areCreatingRulesMeet)
                    {
                        bool isShipBlocked = false;

                        int RandomXCoordinate = rng.Next(10);
                        int RandomYCoordinate = rng.Next(10);

                        // check if ship direction is horizontal
                        if (CurrentShip.isShipDirectionHorizontal == true)
                        {
                            // check if X coordinate is over the board
                            if ((CurrentShip.ShipSize + RandomXCoordinate) < 10)
                            {
                                CurrentShip.XStartCoordinates = RandomXCoordinate;
                                CurrentShip.YStartCoordinates = RandomYCoordinate;

                                int tempX = CurrentShip.XStartCoordinates;

                                // Check if all squares are free. No other ship is there yet.
                                for (int i = 0; i < CurrentShip.ShipSize; i++)
                                {
                                    bool TargetedSquare = OccupiedSquares[tempX, CurrentShip.YStartCoordinates];

                                    // Stop loop if the square is already occupied
                                    if (TargetedSquare == true)
                                    {
                                        isShipBlocked = true;
                                    }

                                    tempX += 1;
                                }

                                int CoordinatesX = CurrentShip.XStartCoordinates;

                                if (!isShipBlocked)
                                {
                                    // Add Ship to the array of ocupied coordinates
                                    for (int i = 0; i < CurrentShip.ShipSize; i++)
                                    {
                                        OccupiedSquares[CoordinatesX, CurrentShip.YStartCoordinates] = true;
                                        CoordinatesX += 1;
                                    }
                                    areCreatingRulesMeet = true;
                                }
                            }
                        }
                        else
                        {
                            // check if Y coordinate is over the board
                            if ((CurrentShip.ShipSize + RandomYCoordinate) < 10)
                            {
                                CurrentShip.XStartCoordinates = RandomXCoordinate;
                                CurrentShip.YStartCoordinates = RandomYCoordinate;

                                int tempY = CurrentShip.YStartCoordinates;
                                // Add Coordinates of the ship to occupied squares array
                                for (int i = 0; i <= CurrentShip.ShipSize; i++)
                                {
                                    bool TargetedSquare = OccupiedSquares[CurrentShip.XStartCoordinates, tempY];

                                    if (TargetedSquare == true)
                                    {
                                        isShipBlocked = true;
                                    }
                                    tempY += 1;
                                }

                                int CoordinatesY = CurrentShip.YStartCoordinates;

                                if (!isShipBlocked)
                                {
                                    for (int i = 0; i <= CurrentShip.ShipSize; i++)
                                    {
                                        OccupiedSquares[CurrentShip.XStartCoordinates, CoordinatesY] = true;
                                        CoordinatesY += 1;
                                    }
                                    areCreatingRulesMeet = true;
                                }
                            }
                        }
                    }
                }
                PlayerShips shipsP = new PlayerShips();
                shipsP.ShipsPlayerOne = ships;
                return Ok(shipsP);
            }
            catch
            {
                return StatusCode(500);
            }
           
        }

        private bool[,] GetShipLocations(List<Ship> ShipList)
        {
            bool[,] SquaresOccupiedByShips = new bool[10, 10];

            foreach (Ship CurrentShip in ShipList)
            { 
                // if ship direction is horizontal
                if (CurrentShip.isShipDirectionHorizontal == true)
                {
                    int CoordinatesX = CurrentShip.XStartCoordinates;
                    // Add Ship to the array of ocupied coordinates
                    for (int k = 0; k < CurrentShip.ShipSize; k++)
                    {
                        SquaresOccupiedByShips[CoordinatesX, CurrentShip.YStartCoordinates] = true;
                        CoordinatesX += 1;                                             
                    }
                }
                else
                {
                    int CoordinatesY = CurrentShip.YStartCoordinates;
                    for (int l = 0; l < CurrentShip.ShipSize; l++)
                    {                       
                        SquaresOccupiedByShips[CurrentShip.XStartCoordinates, CoordinatesY] = true;
                        CoordinatesY += 1;                      
                    }
                }
            }
            return SquaresOccupiedByShips;
        }

        private PlayerRecord SimulateShoots(bool[,] enemyShipLocations)
        {
            PlayerRecord playerRecord = new PlayerRecord();

            // check if the squeare was already hit, and roll again if it did.           
            bool[,] ShootSquares = new bool[10, 10];           

            int numberOfShipSegmentsHit = 0;

            List<PlayerShot> pls = new List<PlayerShot>();

            while (true)
            {
                // random number in between 0 9
                int RngX = rng.Next(10);
                int RngY = rng.Next(10);

                // check if this square was already hit 
                if (ShootSquares[RngX, RngY] == false)
                {
                    ShootSquares[RngX, RngY] = true;
                    PlayerShot playerShot = new PlayerShot();
                    Coordinates coordinates = new Coordinates(RngX, RngY);

                    playerShot.HitCoordinates = coordinates;

                    // Check if square that was hit had a ship on it
                    if (enemyShipLocations[RngX, RngY] == true)
                    {
                        playerShot.result = "hit";
                        numberOfShipSegmentsHit += 1;                        
                    }
                    else
                    {
                        playerShot.result = "miss";
                    }

                    pls.Add(playerShot);
                   
                }

                if (numberOfShipSegmentsHit == 17)
                {
                    playerRecord.PlayerShots = pls;
                    return playerRecord;
                }
            }
        }

        [HttpPost("simulategame")]
        public IActionResult SimulateGame([FromBody] PlayerShips Players)
        {
            try
            {
                // Get Squares occupied by ships, by each player.
                bool[,] SquaresOccupiedByPlayerOneShips = GetShipLocations(Players.ShipsPlayerOne);
                bool[,] SquaresOccupiedByPlayerTwoShips = GetShipLocations(Players.ShipsPlayerTwo);
               
                SimulationRecord simulationRecord = new SimulationRecord();

                simulationRecord.PlayerOne = SimulateShoots(SquaresOccupiedByPlayerTwoShips);
                simulationRecord.PlayerTwo = SimulateShoots(SquaresOccupiedByPlayerOneShips);

                return Ok(simulationRecord);
            }
            catch
            {
                return StatusCode(500);
            }
          
        }
        
    }
    
}
