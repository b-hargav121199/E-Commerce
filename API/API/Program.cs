using API.Extensions;
using API.Middleware;
using Infrastucture.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace API;
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        //Add services to the container.

        builder.Services.AddControllers();
        //Learn more about configuring Swagger / OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerDocumentation();
        builder.Services.AddDbContext<StoreContext>(b => b.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddApplicationServices();
        builder.Services.AddCorsPolicy(builder.Configuration);




        var app = builder.Build();
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                var context = services.GetRequiredService<StoreContext>();
                await context.Database.MigrateAsync();
                await StoreContextSeed.SeedAsync(context, loggerFactory);
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError(ex, "An Error occured during Migration");
            }

        }
        //Configure the HTTP request pipeline.
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseSwaggerDocumentation();
        app.UseStatusCodePagesWithReExecute("/errors/{0}");
        app.UseHttpsRedirection();
        app.UseCors("AllowSpecificOrigins");
        app.UseRouting();
        app.UseStaticFiles();

        app.UseAuthorization();


        app.MapControllers();


        app.Run();
    }
}

