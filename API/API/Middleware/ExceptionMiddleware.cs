using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Middleware
{
    public class ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
    {
        private readonly ILogger<ExceptionMiddleware> _logger=logger;
        private readonly IHostEnvironment _env=env;
        private readonly RequestDelegate _next=next;

        public async Task InvokeAsync( HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);   
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, ex.Message);
                httpContext.Response.ContentType= "application/json";
                httpContext.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var resonse = _env.IsDevelopment() ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message,ex.StackTrace.ToString()): new ApiException((int)HttpStatusCode.InternalServerError);
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(resonse,options);
                await httpContext.Response.WriteAsync(json);    
            }
        }
    }
}
