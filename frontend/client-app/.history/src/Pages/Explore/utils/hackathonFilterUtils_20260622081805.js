export const filterHackathons = (hackathons, searchWord, filters) => {
  if (!hackathons) return [];

  const lowerSearchWord = searchWord.toLowerCase();
  const dateNow = new Date();

  return hackathons.filter((hackathon) => {
    const isSearchMatch = hackathon.title
      .toLowerCase()
      .includes(lowerSearchWord); //if search bar is empty -> return true

    //check if hackthon properties matches filter
    const isTagsMatch =
      filters.tags.length === 0 ||
      (hackathon.tags &&
        filters.tags.some((selectedTag) =>
          hackathon.tags.includes(selectedTag),
        ));

    const isStatusMatch =
      filters.status.length === 0 || filters.status.includes(hackathon.status);
    const isLocationMatch =
      filters.location.length === 0 ||
      filters.location.includes(hackathon.location);

      let isTypeMatch = true;
    if (filters.type.length > 0) {
      if (hackathon.userCreated && !filters.type.includes("User Created")) isTypeMatch = false;
      if (!hackathon.userCreated && !filters.type.includes("Official")) isTypeMatch = false;
    }
    const isPrizeAmountMatch =
      filters.prizeAmount.length === 0 ||
      filters.prizeAmount.includes(hackathon.prizeAmount);

    // Only return if all conditions match
    return isSearchMatch && isTagsMatch && isPrizeAmountMatch;
  });
};
