import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(`/privacyPolicy`)}>Privacy Policy</button>
    </>
  );
}
export default Footer;
