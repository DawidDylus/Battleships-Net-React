using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Battleships_backend_API.Models
{
    public class Ship
    {

        public string Name { get; set; }
        public int ShipSize { get; set; }
        public int XStartCoordinates { get; set; }
        public int YStartCoordinates { get; set; }
        public bool isShipDirectionHorizontal { get; set; }

        public Ship()
        {

        }

        public Ship(string _Name, int _ShipSize, int _XStartCoordinates, int _YStartCoordinates, bool _ShipDirectionHorizontal)
        {
            Name = _Name;
            ShipSize = _ShipSize;
            XStartCoordinates = _XStartCoordinates;
            YStartCoordinates = _YStartCoordinates;
            isShipDirectionHorizontal = _ShipDirectionHorizontal;
        }

    }
}
