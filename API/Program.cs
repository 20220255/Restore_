// creating a web application host
using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// dependency injection container. when using a services in one
// of our classes, we need a facility to use dependency injection

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// since we're using the DbContext services, we need to add it here.
// use StoreContext we just created with DbContext class from entity framework
// since Storecontext has options, we need to pass arguments here w/c is
// the connection string.
// you need to go to the appsetting.Development.json to specify the connection string there
builder.Services.AddDbContext<StoreContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();


// pipeline is what's happening when requesting ig going to API and then when it
// goes out of API
// Configure the HTTP request pipeline. 
if (app.Environment.IsDevelopment())
{
    // this is the middleware
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

// basically goes this responsible so the data goes to the weatherforecast controller.
app.MapControllers();

// this is how you create database in your code instead of using dotnet ef update database
// use CreateScope to get the Storecontext service or the service to create database
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
// same goes for logger where we log errors in the terminal use the type Program.cs class
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    // applies any pending database migration
    context.Database.Migrate();
    DbInitializer.Initialize(context);

}
catch (Exception ex)
{
    
    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
