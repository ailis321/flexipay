import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import PaymentLink from '../components/PaymentLink';

const PaymentLinkPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user paymnt link page :', user);
    const token = user.token;
    console.log('token:', token);
  

  return (
    <div className="PaymentLinkPage">

      <PaymentLink token={token} />
    </div>
  );
};

export default PaymentLinkPage;