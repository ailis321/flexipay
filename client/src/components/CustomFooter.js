import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CustomFooter = ({ email, phone, colour, businessName }) => {

  const footerStyle = {
    backgroundColor: colour || 'defaultColor', 
    color: 'white', 
    paddingTop: '20px',
    paddingBottom: '20px'
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>&copy; {businessName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
