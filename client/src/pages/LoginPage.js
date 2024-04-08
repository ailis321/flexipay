//main login page to sign in or can sign up from here as well
import React from 'react';
import Tagline from '../components/Tagline';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="LoginPage">
    <Tagline 
    title="Login to your account" 
    description="View your Dashboard where you can manage incoming payments and view payment reports and analytics. Don't have an account yet?" 
    buttonText="Sign Up" 
    buttonLink="http://localhost:3000/register" 
    imageUrl="https://nordvpn.com/wp-content/uploads/blog-social-nordvpn-login-and-sign-up-process-explained-1200x628-2.png" />
    <LoginForm />
    </div>

  );
}
export default LoginPage;
