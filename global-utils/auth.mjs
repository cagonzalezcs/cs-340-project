const isAdminUser = (userRoleId) => {
  return userRoleId === 1;
};

const isManagerUser = (userRoleId) => {
  return userRoleId === 2;
};

const isSalesUser = (userRoleId) => {
  return userRoleId === 3;
};

const isCustomerUser = (userRoleId) => {
  return userRoleId === 4;
};

export {
  isAdminUser,
  isManagerUser,
  isSalesUser,
  isCustomerUser,
};
