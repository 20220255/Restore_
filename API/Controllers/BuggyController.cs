using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            // 404
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            // 400
            return BadRequest(new ProblemDetails { Title = "This is a bad request." });
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            // 401
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem 1", "This is the first error.");
            ModelState.AddModelError("Problem 2", "This is the second error.");
            // 400
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}