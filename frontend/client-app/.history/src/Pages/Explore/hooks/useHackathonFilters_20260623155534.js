// hooks/useHackathonFilters.js
import { useState, useMemo, useCallback } from "react";
import { filterHackathons } from "../utils/hackathonFilterUtils";

export default function useHackathonFilters(hackathons) {
  const [searchWord, setSearchWord] = useState("");
  const [filters, setFilters] = useState({
    tags: [],
    prizeAmount: [],
    type: [], // 'Official', 'User Created'
    dateAdded: [],    // 'Last 7 days', 'Last 30 days'


    
  });

  // handle Search logic
  const handleSearch = useCallback((word) => {
    setSearchWord(word);
  }, []);

  //handle filter part
  const handleFilter = useCallback((filterType, selectedValue) => {
    setFilters((prev) => {
      const currentList = prev[filterType];
      const isValueIncluded = currentList.includes(selectedValue);
      //if the selected filter value included already remove it , else add in the filter list under its category

      const updatedList = isValueIncluded
        ? currentList.filter((item) => item !== selectedValue)
        : [...currentList, selectedValue];
      //return the filter but edit the filter type which its list is changed

      return { ...prev, [filterType]: updatedList };
    });
  }, []);

  //Memo is used to cash result
  //if searchWord or hackathons changed -> refilter
  const filteredHackathons = useMemo(() => {
    return filterHackathons(hackathons, searchWord, filters);
  }, [searchWord, filters, hackathons]);

  return {
    searchWord,
    filters,
    handleSearch,
    handleFilter,
    filteredHackathons,
  };
}
