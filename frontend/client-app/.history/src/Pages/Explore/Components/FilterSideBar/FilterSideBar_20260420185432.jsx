import styles from "./FIlterSideBar.module.css";
import { FilterIcon } from "../../../../assets/Icons";

function FilterSideBar() {
  // Put this outside your component function!
  const FILTER_SECTIONS = [
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
        <h5 className="fw-bold mb-0">Filter</h5>
      </div>
      <hr className="mb-4" />

      {}
    </div>
  );
}

export default FilterSideBar;
