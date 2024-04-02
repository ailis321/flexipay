

const SummaryWidget = ({ title, value }) => {
  return (
    <div className="summary-widget" style={{ margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default SummaryWidget;
