import React from 'react';

const FAQSection = () => {
    return (
        <section className="py-5" style={{ color: '#53937d' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h2 className="mb-4">Have questions? We’ve got you covered</h2>
                        <div
                            className="accordion accordion-flush"
                            id="accordionFlushExample"
                        >
                            <div className="accordion-item">
                                <h2 className="accordion-header" style={{ color: '#53937d' }}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                    >
                                        Is there any sign-up fees?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body" style={{ color: '#53937d' }}>
                                        No, there are no sign-up fees to start using FlexiPay. However, as we partner with Stripe to handle our payment processing, 
                                        each successful transaction will incur a small fee. You can find detailed information about these transaction fees on 
                                        <a href="https://stripe.com/gb/pricing" target="_blank" rel="noopener noreferrer"> Stripe's pricing page</a>.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" style={{ color: '#53937d' }}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                    >
                                        Do I require much information to sign up?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body" style={{ color: '#53937d' }}>
                                    Signing up for FlexiPay is quick and straightforward, taking no more than 5 minutes. 
                                    You only need to provide some basic details such as your name, contact number, email, 
                                    business name, and password. After this initial signup, you will be redirected to 
                                    a Stripe-hosted onboarding page to enter further information. This includes your company 
                                    name and address, a bank account number and sort code for receiving payouts, 
                                    and other essential business details. Once this process is complete, 
                                    you will be directed back to FlexiPay, where you can start creating payment links and 
                                    adding clients to your client database.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" style={{ color: '#53937d' }}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseThree"
                                    >
                                        How do I know this is secure?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseThree"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                  <div className="accordion-body" style={{ color: '#53937d' }}>
                            <p>At FlexiPay, ensuring the security of your transactions is paramount. We use Stripe as our payment gateway, 
                                renowned for its rigorous security standards. Stripe is certified to PCI Service Provider Level 1, 
                                the highest level of certification available in the payments industry. This certification is part of Stripe's 
                                commitment to maintaining robust security measures, which include compliance with the PCI Data Security Standard 
                                (PCI DSS) to protect card data, implementation of strict access controls, and regular security audits.</p>

                             <p>Stripe also adheres to additional security standards such as the EMVCo standard for card terminals, ensuring secure card transactions. 
                                Their systems are designed to prevent unauthorised access and safeguard sensitive information, utilising strong cryptography and 
                                secure network architectures.</p>

                            <p>For more details on Stripe's security practices, you can visit their <a href="https://stripe.com/docs/security/stripe" target="_blank" rel="noopener noreferrer">security documentation</a>.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
