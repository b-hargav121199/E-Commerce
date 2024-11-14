using API.Errors;
using Infrastucture.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class BuggyController(StoreContext storeContext) : BaseApiController
    {
        private readonly StoreContext _storeContext=storeContext;

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> getSecrateText()
        {
            return "secrate stuff";
        }

        [HttpGet("NotFound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _storeContext.Products.Find(45);
            if (thing == null)
            {
                return NotFound(new ApiResponse(404));  
            }
            return Ok();
        }

        [HttpGet("ServerError")]
        public ActionResult GetServerError()
        {
            var thing = _storeContext.Products.Find(45);
            var thingreturn =thing.ToString();
            return Ok();
        }


        [HttpGet("BadRequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("BadRequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }

    }
}
