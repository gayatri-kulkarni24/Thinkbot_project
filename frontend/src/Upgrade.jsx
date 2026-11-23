import PageLayout from "./PageLayout";
import "./Upgrade.css";

function Upgrade({ goBack }) {
  return (
    <PageLayout
      title="Upgrade Plan"
      subtitle="Unlock the full power of ThinkBot"
      onBack={goBack}
    >
      <div className="plan current">
        <h3>Free Plan</h3>
        <ul>
          <li>Limited chats</li>
          <li>Standard response speed</li>
          <li>No priority support</li>
        </ul>
        <span className="badge">Current</span>
      </div>

      <div className="plan pro">
        <h3>Pro Plan</h3>
        <ul>
          <li>Unlimited chats</li>
          <li>Faster AI responses</li>
          <li>Priority support</li>
        </ul>
        <button className="upgrade-btn">Upgrade to Pro</button>
      </div>
    </PageLayout>
  );
}

export default Upgrade;
