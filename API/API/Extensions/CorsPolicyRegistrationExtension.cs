using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class CorsPolicyRegistrationExtension
    {
        public static IServiceCollection AddCorsPolicy(this IServiceCollection services,IConfiguration configuration) 
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", builder =>
                {
                    builder.WithOrigins(configuration["CORS:AllowCorsApi"]) // Use the configuration value
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });
            return services;
        }
    }
}
