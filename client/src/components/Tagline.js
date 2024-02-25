

const TaglineComponent = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="display-4">Accept Payments Online</h1>
            <p className="lead">Simple and secure payment solutions for organisations. Get started today!</p>
            <button className="btn btn-primary btn-lg">Sign Up</button>
          </div>
          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <img src="https://qph.cf2.quoracdn.net/main-qimg-367cac9f2514e421d6f90cabd770c18d" alt="Payment" className="img-fluid" style={{ maxHeight: '500px', width: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaglineComponent;
