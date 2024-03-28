import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Footer = () => {
  return (
    <footer className="footer-custom-bg text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>Email: support@FlexiPay.com</p>
            <p>Phone: 0800-789-7890</p>
          </div>
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#" className="text-light">Facebook</a></li>
              <li className="list-inline-item"><a href="#" className="text-light">Twitter</a></li>
              <li className="list-inline-item"><a href="#" className="text-light">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>&copy; 2024 FlexiPay Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
