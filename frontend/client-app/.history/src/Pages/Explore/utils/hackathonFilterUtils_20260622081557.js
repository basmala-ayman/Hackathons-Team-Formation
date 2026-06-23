export const filterHackathons = (hackathons, searchWord, filters) => {
  if (!hackathons) return [];

  const lowerSearchWord = searchWord.toLowerCase();
  const now = new Date();

  return hackathons.filter((hackathon) => {
    const isSearchMatch = hackathon.title.toLowerCase().includes(lowerSearchWord);  //if search bar is empty -> return true

    //check if hackthon properties matches filter
    const isTagsMatch =
      filters.tags.length === 0 ||
      (hackathon.tags &&
        filters.tags.some((selectedTag) => hackathon.tags.includes(selectedTag)));


    const isPrizeAmountMatch =
      filters.prizeAmount.length === 0 ||
      filters.prizeAmount.includes(hackathon.prizeAmount);

    // Only return if all conditions match
    return isSearchMatch && isTagsMatch && isPrizeAmountMatch;
  });
};