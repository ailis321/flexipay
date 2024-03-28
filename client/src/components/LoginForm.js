import React, { useState } from 'react';
import { useLoginForm } from '../hooks/useLogin';

const LoginForm = () => {
  
  
  const { login, isLoading, error } = useLoginForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   await login({ email, password });
  };

  return (
    <section className="py-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(83, 147, 125, 0.8)", minHeight: "80vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img src="https://i0.wp.com/gentem.com/wp-content/uploads/2023/05/Messaging-workflow-illustration.png?fit=512%2C512&ssl=1" className="img-fluid" alt="Illustration" /> 
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6" style={{paddingTop: "30px"}}>
            <div className="card" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", paddingTop: "30px" }}>
              <div className="card-body">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Remember me
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>} 
                {isLoading && <div className="text-center mt-3">Loading...</div>} 
                <div className="text-center mt-3">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
