
import PaymentLink from '../components/PaymentLink';

const CustomerPaymentLinkPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user paymnt link page :', user);
    const token = user.token;
    console.log('token:', token);

    if (!token) {
        return null;
    }
  

  return (
    <div className="CustomerPaymentLinkPage">
      <PaymentLink token={token} />
    </div>
  );
};

export default CustomerPaymentLinkPage;