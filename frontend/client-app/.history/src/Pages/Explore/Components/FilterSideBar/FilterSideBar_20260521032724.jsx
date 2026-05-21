import styles from "./FIlterSideBar.module.css";
import { FilterIcon } from "../../../../assets/Icons";

function FilterSideBar({ onFilterChange, activeFilters }) {
  // Put this outside your component function!
  const INITIAL_VISIBLE_COUNT = 5;
  const [expandedSections, setExpandedSections] = useState({});
  const filterSections = [
    {
      id: "tags",
      title: "Tags",
      options: [
        "AR/VR",
        "Beginner Friendly",
        "Blockchain",
        "Communication",
        "Cybersecurity",
        "Databases",
        "Design",
        "DevOps",
        "E-commerce/Retail",
        "Education",
        "Enterprise",
        "Fintech",
        "Gaming",
        "Health",
        "IoT",
        "Lifehacks",
        "Low/No Code",
        "Machine Learning/AI",
        "Mobile",
        "Music/Art",
        "Open Ended",
        "Productivity",
        "Quantum",
        "Robotic Process Automation",
        "Serverless",
        "Social Good",
        "Voice skills",
        "Web",
      ],
    },
    {
      id: "prizeAmount",
      title: "Prize Amount",
      options: ["Under $5k", "$5k-$10k", "$10k+"],
    },
  ];
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };
  return (
    <div
      className="rounded-4 p-4"
      style={{ border: "2px solid var(--color-primary-dark)" }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <FilterIcon></FilterIcon>
        <h5 className="fw-bold mb-0 fs-3">Filter</h5>
      </div>
      <hr className={`${styles.divider} mb-4`} />

      {/* first loop */}
      {filterSections.map((section, index) => 
      
      (
        <div key={section.id} className="mb-4">
          <h6 className="fw-bold fs-4 mb-3">{section.title}</h6>
          {/* inner loop */}
          {section.options.map((option) => (
            <div className="mb-2 d-flex align-items-center gap-4" key={option}>
              <input
                className={`form-check-input m-0 ${styles.checkbox}`}
                type="checkbox"
                id={`${section.id}-${option}`}
                onChange={() => onFilterChange(section.id, option)}
                checked={activeFilters[section.id]?.includes(option) || false}
              />

              <label
                className="text-secondary fs-4 mb-0"
                htmlFor={`${section.id}-${option}`}
              >
                {option}
              </label>
            </div>
          ))}
          {index !== filterSections.length - 1 && (
            <hr className={`${styles.divider} mt-4 mb-0`} />
          )}
        </div>
      )})}
    </div>
  );
}

export default FilterSideBar;
