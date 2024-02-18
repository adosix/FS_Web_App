// actions/user.js
export const setUserId = (userId) => {
    return {
      type: 'SET_USER_ID',
      payload: userId,
    };
  };
  
  export const setUsers = (users) => {
    return {
      type: 'SET_USERS',
      payload: users,
    };
  };
  
  export const updateUserPosition = (userId, newPosition) => {
    return {
      type: 'UPDATE_USER_POSITION',
      payload: {
        userId,
        newPosition: newPosition,
      },
    };
  };
  