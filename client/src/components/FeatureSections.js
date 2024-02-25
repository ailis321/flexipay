

const FeatureSections = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img src="https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/users-icon.png" alt="Users" className="mb-3" style={{ width: '80px' }} />
              <h4>Create Customers</h4>
              <p>Create and manage customer profiles with ease.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3430550/link-icon-md.png" alt="Link" className="mb-3" style={{ width: '80px' }} />
              <h4>Create a Payment Link</h4>
              <p>Generate payment links to share with your customers.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <img src="https://static-00.iconduck.com/assets.00/trend-icon-256x206-gjph9pzb.png" alt="Trend" className="mb-3" style={{ width: '80px' }} />
              <h4>View Payment Trends</h4>
              <p>Track your payment trends and analytics in real-time.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/4492/4492201.png" alt="Security" className="mb-3" style={{ width: '80px' }} />
              <h4>Secure Transactions</h4>
              <p>Ensure secure transactions with advanced encryption and fraud detection.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSections;
