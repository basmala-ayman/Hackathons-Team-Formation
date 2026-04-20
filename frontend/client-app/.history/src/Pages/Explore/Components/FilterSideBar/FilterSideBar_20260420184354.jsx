import styles from './FIlterSideBar.module.css'

function FilterSideBar() {
    // Put this outside your component function!
const FILTER_SECTIONS = [
  {
    id: "date",
    title: "Date",
    options: ["This week", "This Month", "Next 3 months", "Custom"]
  },
  {
    id: "categories",
    title: "Categories",
    options: ["AI/ML", "FinTech", "HealthTech", "Blockchain", "IoT"]
  },
  {
    id: "prizeRange",
    title: "Prize Range",
    options: ["Under $5k", "$5k-$10k", "$10k+"]
  }
];
  return (
    <div className='rounded-4'>
        <p>Filter</p>

      
    </div>
  )
}

export default FilterSideBar
