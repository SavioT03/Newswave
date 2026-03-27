import { GNEWS_TABS } from "../../api/useGNews";
import "./CategoryTabs.css";

export default function CategoryTabs({ activeTab, setActiveTab }) {
  return (
    <div className="category-tabs">
      <div className="category-tabs-inner">
        {/* Desktop */}
        <ul className="category-tabs-list">
          {GNEWS_TABS.map((tab) => (
            <li key={tab}>
              <button
                className={`tab-btn${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile  dropdown (shown only on small screens) */}
        <select
          className="category-tabs-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          aria-label="Select category"
        >
          {GNEWS_TABS.map((tab) => (
            <option key={tab} value={tab}>{tab}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
