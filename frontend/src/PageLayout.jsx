import "./PageLayout.css";

function PageLayout({ title, subtitle, children, onBack }) {
  return (
    <div className="page">
      <div className="page-card">
        <div className="page-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="page-content">{children}</div>

        <button className="page-back" onClick={onBack}>
          ← Back to Chat
        </button>
      </div>
    </div>
  );
}

export default PageLayout;
