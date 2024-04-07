import logo from './TresorLogo.png';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tresor
        </p>
        <span>
        <GoogleLogin
  onSuccess={credentialResponse => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  auto_select
/>
</span> 
      </header>
    </div>
  )
}

export default App;
