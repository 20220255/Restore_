// using uses the Mvc core framework that makes the code work such as ControllerBase
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
// how to get to this endpoint
// inside the bracket is just a placeholder and just basically being replaced
// by L10 - WeatherForecastController w/o the word controller
// http://localhost:5243/WeatherForecast 

// This is just an HTTP GET with a route WeatherForecast
// so if you check our program.cs, the line addcontroller is where this controller
// is being retrieved.

[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
