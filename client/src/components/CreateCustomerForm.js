import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import { useCreateCustomerForm } from '../hooks/useCreateCustomerForm';

const CreateCustomerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { createCustomer, error, isLoading } = useCreateCustomerForm();
    const { user } = useAuthenticationContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        if (!user) {
            
            navigate('/login');
            return;
        }

        try {
            
            await createCustomer({ firstName, surname, email, phone });

          
            setSuccessMessage(`${firstName} has been successfully added to your customer directory`);
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    }


const handleAddAnotherCustomer = () => {
    setFirstName('');
    setSurname('');
    setEmail('');
    setPhone('');
    setSuccessMessage('');
};



    const handleViewCustomers = () => {
    
        navigate('/view-customers');
    };

    return (
        <section className="bg-light py-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="text-lg-start text-center">
                            <h2 className="fw-bold mb-4" style={{ color: '#53937d' }}>Build your client directory by adding customers</h2>
                            <p className="lead mb-4 pb-5" style={{ color: '#53937d' }}>
                                Once added, you can effortlessly generate payment links and promptly send them to your clients, enabling them to conveniently make payments from the comfort of their home.
                            </p>
                            <img src="https://images.pexels.com/photos/5257345/pexels-photo-5257345.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Customer Image" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-6 py-5">
                        {successMessage ? (
                            <div className="text-center">
                                <p className="display-6 fw-bold mb-3" style={{ color: '#53937d' }}>{successMessage} </p>
                                <img src="https://cdn-icons-png.flaticon.com/512/9746/9746205.png" alt="Success Icon" className="img-fluid mb-3" />

                                <div>
                                    <button className="btn btn-primary me-2" onClick={handleAddAnotherCustomer}>Add Another Customer</button>
                                    <button className="btn btn-secondary" onClick={handleViewCustomers}>View Customer List </button>
                                </div>
                            </div>
                        ) : (
                            <div className="card p-4 shadow py-5" style={{ borderRadius: '70px' }}>
                                <h2 className="mb-4 text-center">Create Customer</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="surname" className="form-label">Surname</label>
                                            <input type="text" className="form-control" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input type="tel" className="form-control" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary" disabled={isLoading}>Add Customer</button>
                                    </div>
                                    {error && <div className="text-center mt-3 alert alert-danger">{error}</div>}
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateCustomerForm;
