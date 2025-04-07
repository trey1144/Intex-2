import Footer from '../components/Footer';
//import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../LandingPage.css';


function LandingPage() {
 const navigate = useNavigate();


 return (
   <div className="landing-container">
     <div className="landing-content">
       <h1 className="landing-title">CineNiche</h1>
       <div className="button-group">
         <button
           className="primary-button"
           onClick={() => navigate('/createAccount')}
         >
           Create Account
         </button>
         <button
           className="secondary-button"
           onClick={() => navigate('/login')}
         >
           Login
         </button>
       </div>
       <div className="carousel">
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/Boom.jpg')" }}
         ></div>
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/Brain on Fire.jpg')" }}
         ></div>
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/About Time.jpg')" }}
         ></div>
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/Bright.jpg')" }}
         ></div>
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/Pope Francis A Man of His Word 2.jpg')" }}
           
         ></div>
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/WE.jpg')" }}
           
         ></div>
         <div
           className="movie-card"
           style={{ backgroundImage: "url('/images/American Woman.jpg')" }}
           
         ></div>
       </div>
     </div>
     <Footer />
   </div>
 );
}


export default LandingPage;