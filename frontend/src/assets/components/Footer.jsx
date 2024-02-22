import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareXTwitter,FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={socialLinksStyle}>
        {/* Add your social links here */}
        <span style={signatureStyle}>~Aryan Sindhi, Let us connect: </span>
        <a title="Github" href="https://github.com/aryansindhi18" target="_blank" rel="noopener noreferrer"><FaSquareGithub className="icons" /></a>
        <a title="Twitter" href="https://twitter.com/AryanSindhi" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter className="icons" /></a>
        <a title="Instagram" href="https://instagram.com/aryansindhi18" target="_blank" rel="noopener noreferrer"><FaSquareInstagram className="icons" /></a>
        <a title="LinkedIn" href="https://www.linkedin.com/in/aryan-sindhi/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="icons" /></a>
        
      </div>
    </footer>
  );
};

const footerStyle = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  backgroundColor: '#333',
  color: '#fff',
  padding: '0.5rem',
};

const signatureStyle = {
  verticalAlign: 'middle',
  fontSize: '1.2rem',
//   marginBottom: '0.5rem',
};

const socialLinksStyle = {
  display: 'flex',
  alignItems: 'center', // Align items vertically
  gap: '1rem',
};


