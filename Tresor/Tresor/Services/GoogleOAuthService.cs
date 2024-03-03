using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json.Serialization;
using System;
using Tresor.Helpers;

namespace Tresor.Services
{
    public class GoogleOAuthService
    {
        private const string ClientID = "322126658127-g56tdjpg42lvrtppv0u1oq86bdr61s2j.apps.googleusercontent.com";
        private const string ClientSecret = "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";


        public static string GenerateOAuthRequestUrl(string scope, string redirectUrl, string codeChallenge)
        {
            var oAuthServerEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
            var queryParams = new Dictionary<string, string> {
                {"client_id", ClientID },
                {"redirect_url", redirectUrl},
                {"response_type", "code" },
                {"scope", scope },
                {"code_challenge", codeChallenge},
                {"code_challenge_method", "S256" },
                {"access_type", "offline" }
            };
            var url = QueryHelpers.AddQueryString(oAuthServerEndpoint, queryParams);
            return url;
        }

        public static async Task<TokenResult> ExchangeCodeOnToken(string code, string codeVerifier, string redirectUrl)
        {
            var tokenEndpoint = "https://oauth2.googleapis.com/token";
            var authParams = new Dictionary<string, string>
            {
                {"client_id", ClientID},
                {"client_secret", ClientSecret},
                {"code", code},
                {"code_verifier", codeVerifier},
                {"grant_type", "authorization_code" },
                {"redirect_uri", redirectUrl }
            };

           var tokenResult = await HttpClientHelper.SendPostRequest<TokenResult>(tokenEndpoint, authParams);
            return tokenResult;
        }

        public static async Task<TokenResult> RefreshTokenAsync(string refreshToken)
        {
            var refreshEndpoint = "https://oauth2.googleapis.com/token";
            var refreshParams = new Dictionary<string, string>
            {
                {"client_id", ClientID},
                {"client_secret", ClientSecret},
                {"grant_type", "refresh_token" },
                {"refresh_token", refreshToken }
            };
            var tokenResult = await HttpClientHelper.SendPostRequest<TokenResult>(refreshEndpoint, refreshParams);
            return tokenResult;
        }
    }
}
