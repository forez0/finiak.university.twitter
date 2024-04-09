import logo from '../TresorLogo.png';
import React from "react";
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
import  google  from '../misc/Google_icon.png'
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"

function Login() {
  const login = useGoogleLogin({
    onSuccess: async respose => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${respose.access_token}`
                }
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
  });

  // test
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <p className="text">
          Tresor
        </p>

        <button onClick={login} className="row-button">
        <img src={google} className="Google-logo" alt="Google Logo" />
                    <i class="fa-brands fa-google"></i>
                    Continue with Google
                </button>
        {/* <GoogleLogin className="Google"
    onSuccess={credentialResponse => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/> */}
      </header>
    </div>
  )
}

export default Login;
