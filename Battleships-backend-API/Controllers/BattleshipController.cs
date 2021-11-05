using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Battleships_backend_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BattleshipController : Controller
    {

        string test = "test text";


        [HttpGet]
        public IActionResult GetString()
        {         

            return Ok(test);
        }

        [HttpPut("{change}")]
        public IActionResult EditString([FromRoute] string change)
        {
            test = change;
            return Ok(test);
        }

    }
}
