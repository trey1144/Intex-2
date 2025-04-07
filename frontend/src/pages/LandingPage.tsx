import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">CineNiche</h1>
        <div className="button-group">
          <button className="primary-button" onClick={() => navigate('/createAccount')}>
            Create Account
          </button>
          <button className="secondary-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
