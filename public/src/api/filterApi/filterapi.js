export const filterUser = (searchTerm, allUser) => {
  const filterData = allUser.filter((user) =>
    user?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filterData, "filterDatakkkkkkkkkk");
  return filterData;
};
