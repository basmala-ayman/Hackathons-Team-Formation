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
      filters.tags.length === 0 || (hackathon.tags &&
        filters.tags.some((selectedTag) =>
          hackathon.tags.includes(selectedTag),
        ));
        const hackathonType = hackathon.userCreated ? "User Created" : "Official";
        const isTypeMatch =
          filters.type.length === 0 || filters.type.includes(hackathonType);

    // const isStatusMatch =
    //   filters.status.length === 0 || filters.status.includes(hackathon.status);
    // const isLocationMatch =
    //   filters.location.length === 0 ||
    //   filters.location.includes(hackathon.location);


    // const isPrizeAmountMatch =
    //   filters.prizeAmount.length === 0 ||
    //   filters.prizeAmount.includes(hackathon.prizeAmount);

    // Only return if all conditions match
    return isSearchMatch && isTagsMatch && isTypeMatch && isPrizeAmountMatch;
  });
};
