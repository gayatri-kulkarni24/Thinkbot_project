import PageLayout from "./PageLayout";
import "./Settings.css";

function Settings({ goBack }) {
  return (
    <PageLayout
      title="Settings"
      subtitle="Customize your ThinkBot experience"
      onBack={goBack}
    >
      <div className="setting-row">
        <span>Theme</span>
        <select>
          <option>Dark</option>
          <option>Light</option>
        </select>
      </div>

      <div className="setting-row">
        <span>Typing Animation</span>
        <input type="range" defaultChecked />
      </div>

      <div className="setting-row">
        <span>Auto Save Chats</span>
        <input type="checkbox" defaultChecked />
      </div>

      <div className="setting-row disabled">
        <span>Account</span>
        <span>Free User</span>
      </div>
    </PageLayout>
  );
}

export default Settings;
