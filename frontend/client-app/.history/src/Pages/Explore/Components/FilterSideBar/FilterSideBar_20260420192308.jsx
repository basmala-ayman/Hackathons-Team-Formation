import styles from "./FIlterSideBar.module.css";
import { FilterIcon } from "../../../../assets/Icons";

function FilterSideBar() {
  // Put this outside your component function!
  const filterSections = [
    {
      id: "date",
      title: "Date",
      options: ["This week", "This Month", "Next 3 months", "Custom"],
    },
    {
      id: "categories",
      title: "Categories",
      options: ["AI/ML", "FinTech", "HealthTech", "Blockchain", "IoT"],
    },
    {
      id: "prizeRange",
      title: "Prize Range",
      options: ["Under $5k", "$5k-$10k", "$10k+"],
    },
  ];
  return (
    <div
      className="rounded-4 p-4"
      style={{ border: "2px solid var(--color-primary-dark)" }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <FilterIcon></FilterIcon>
        <h5 className="fw-bold mb-0 fs-3">Filter</h5>
      </div>
      <hr className="mb-4" />

      {filterSections.map((section)=>(
          <div key={section.id} className="mb-4">
                <h6 className="fw-bold fs-4 mb-3">{section.title}</h6>

                {section.options.map((option)=>(
            <div className="mb-2 d-flex align-items-center gap-4" key={option}>
              
              <input 
                className={`form-check-input m-0 ${styles.checkbox}`}
                type="checkbox" 
                id={`${section.id}-${option}`} 
              />
              
              <label className="text-secondary fs-4 mb-0" htmlFor={`${section.id}-${option}`}>
                {option}
              </label>
              
            </div>
                ))}
                <hr className="text-muted mt-4 mb-0" />
                <hr className={`{styles.divider />
          </div>
      ))}
    </div>
  );
}

export default FilterSideBar;
