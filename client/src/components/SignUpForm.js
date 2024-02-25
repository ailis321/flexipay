// SignUpForm.js
import React from 'react';

const SignUpForm = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5"> {/* Decreased the column width to move the image slightly to the right */}
          <img src="https://www.projectcounter.org/wp-content/uploads/2016/03/icon-register.png" className="img-fluid pl-3" alt="Illustration" /> {/* Added padding to the left of the image */}
        </div>
        <div className="col-md-7"> {/* Increased the column width for the form */}
          <h2 className="mb-4">Create Your Account</h2>
          <form>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Full Name" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email Address" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Choose a Password" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Get Started</button>
          </form>
          <p className="mt-3 text-center">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
