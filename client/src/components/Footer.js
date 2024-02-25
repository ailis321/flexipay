import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#">Facebook</a></li>
              <li className="list-inline-item"><a href="#">Twitter</a></li>
              <li className="list-inline-item"><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
