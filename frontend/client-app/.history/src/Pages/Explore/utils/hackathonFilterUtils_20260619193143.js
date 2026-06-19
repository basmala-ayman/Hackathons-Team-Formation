export const filterHackathons = (hackathons, searchWord, filters) => {
  if (!hackathons) return [];

  const lowerSearchWord = searchWord.toLowerCase();

  return hackathons.filter((hackathon) => {
    // 1. Check Search Match
    const isSearchMatch = hackathon.title.toLowerCase().includes(lowerSearchWord);

    // 2. Check Tag Match
    const isTagsMatch =
      filters.tags.length === 0 ||
      (hackathon.tags &&
        filters.tags.some((selectedTag) => hackathon.tags.includes(selectedTag)));

    // 3. Check Prize Match
    const isPrizeAmountMatch =
      filters.prizeAmount.length === 0 ||
      filters.prizeAmount.includes(hackathon.prizeAmount);

    // Only return if all conditions match
    return isSearchMatch && isTagsMatch && isPrizeAmountMatch;
  });
};