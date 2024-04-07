import logo from './TresorLogo.png';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"
function App() {
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
  return (
    <div className="App">
      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Text">
          Tresor
        </p>

        <button onClick={login}>
                    <i class="fa-brands fa-google"></i>
                    Continue with google
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

export default App;
