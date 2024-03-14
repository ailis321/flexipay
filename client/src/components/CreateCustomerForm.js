import { useState } from 'react';
import { useCreateCustomerForm } from '../hooks/useCreateCustomerForm';


const CreateCustomerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { createCustomer, error, isLoading } = useCreateCustomerForm();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Submit the form data to the backend
        await createCustomer({ firstName, surname, email, phone });

        // Clear the form fields after submission
        setFirstName('');
        setSurname('');
        setEmail('');
        setPhone('');
    }

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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateCustomerForm;
