 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Battleships_backend_API.Controllers;

namespace Battleships_backend_API.Models
{
    public class PlayerShips
    {       
        public List<Ship> ShipsPlayerOne { get; set; }
        public List<Ship> ShipsPlayerTwo { get; set; }

        public PlayerShips()
        {
        }
        public PlayerShips(List<Ship> _ShipsPlayerOne, List<Ship> _ShipsPlayerTwo)
        {
            ShipsPlayerOne = _ShipsPlayerOne;
            ShipsPlayerTwo = _ShipsPlayerTwo;
        }


    }
}
