using hidoc.Model;
using hidoc.Template;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace hidoc.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)   
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();

            if (token != null)
            {
                token = token.Split(" ").Last();
                await AttachUserToContext(context, token);
            }

            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("HiDoctorAPIweb52000650");
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "id").Value;
                var role = int.Parse(jwtToken.Claims.First(x => x.Type == "role").Value);
                var email = jwtToken.Claims.First(x => x.Type == "email").Value;
                var name = jwtToken.Claims.First(x => x.Type == "name").Value;

                var user = new UserTemplate(userId ,name,role,email);
                context.Items["User"] = user;
            }
            catch
            {
                // Do nothing if token validation fails
            }
        }
    }

    public static class JwtMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtMiddleware>();
        }
    }
}
