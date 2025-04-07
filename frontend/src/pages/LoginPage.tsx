import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder: Replace with actual login logic
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <Header />
      <h2>Log In</h2>
      <div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>
      </div>
      <button style={{ marginTop: '10px' }} onClick={handleLogin}>
        Log In
      </button>
      <Footer />
    </>
  );
}

export default Login;
