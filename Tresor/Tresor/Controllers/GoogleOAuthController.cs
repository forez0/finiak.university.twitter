using Microsoft.AspNetCore.Mvc;
using Tresor.Services;
using System.Diagnostics;
using Tresor.Models;
using Tresor.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Tresor.Controllers
{
    public class GoogleOAuthController : Controller
    {
        private const string PkceSessionKey = "codeVerifier";

        public IActionResult RedirectOnOAuthServer()
        {
            var scope = "https://www.googleapis.com/auth/youtube";
            var redirectUrl = "https://localhost:7278/GoogleOAuth/Code";
            var codeVerifier = Guid.NewGuid().ToString();
            HttpContext.Session.SetString(PkceSessionKey, codeVerifier);
            var codeChallenge = SHA256Helper.ComputeHash(codeVerifier);

            var url = GoogleOAuthService.GenerateOAuthRequestUrl(scope, redirectUrl, codeChallenge);
            return Redirect(url);
        }
        
        public async Task<IActionResult> CodeAsync(string code)
        {
            var codeVerifier = HttpContext.Session.GetString(PkceSessionKey);
            var redirectUrl = "https://localhost:7278/GoogleOAuth/Code";
            var tokenResult = await GoogleOAuthService.ExchangeCodeOnToken(code, codeVerifier, redirectUrl);
            var refreshTokenResult = await GoogleOAuthService.RefreshTokenAsync(tokenResult.RefreshToken);
            return Ok();
        }
    }
}
