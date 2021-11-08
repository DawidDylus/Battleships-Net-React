using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Battleships_backend_API.Models
{

    public class Coordinates
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Coordinates()
        {
        }
        public Coordinates(int _X, int _Y)
        {
            X = _X;
            Y = _Y;
        }
    }

    public class PlayerShot
    {
        public Coordinates HitCoordinates { get; set; }
        public string result { get; set; }

        public PlayerShot()
        {
        }
        public PlayerShot(Coordinates _HitCoordinates, string _result)
        {
            HitCoordinates = _HitCoordinates;
            result = _result;

        }


    }

    public class PlayerRecord
    {
        public List<PlayerShot> PlayerShots { get; set; }

        public PlayerRecord()
        {
        }

        public PlayerRecord(List<PlayerShot> _PlayerShots)
        {
            PlayerShots = _PlayerShots;
        }
    }

    public class SimulationRecord
    {

        public PlayerRecord PlayerOne { get; set; }
        public PlayerRecord PlayerTwo { get; set; }

        public SimulationRecord()
        {

        }

        public SimulationRecord(PlayerRecord _PlayerOne, PlayerRecord _PlayerTwo)
        {
            PlayerOne = _PlayerOne;
            PlayerTwo = _PlayerTwo;
        }

    }
}
