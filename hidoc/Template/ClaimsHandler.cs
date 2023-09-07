using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using NuGet.Common;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace hidoc.Template
{
    public class ClaimsHandler
    {
        private String _token;
        public ClaimsHandler(String token ) {
            _token = token;
        }
        public IEnumerable<Claim> getClaims(String secret)
        {
            var jwt = new JwtSecurityTokenHandler();
            var secretByte = Encoding.UTF8.GetBytes(secret);
            ClaimsPrincipal result = jwt.ValidateToken(_token, new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidIssuer = "Sample",
                ValidAudience = "Sample",
                IssuerSigningKey = new SymmetricSecurityKey(secretByte),
            }, out _);
            
            if (result.Claims != null)
            {
                IEnumerable<Claim> claims = result.Claims;
                return claims;
            }
            return null;
        }
        
    }
}
