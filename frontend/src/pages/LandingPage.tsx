import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <h2>Landing Page</h2>
      <button onClick={() => navigate(`/login`)}>Log In</button>
      <button onClick={() => navigate(`/createAccount`)}>Create Account</button>
      <Footer />
    </>
  );
}
export default LandingPage;
