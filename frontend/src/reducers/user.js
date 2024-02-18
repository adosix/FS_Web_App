// reducers/users.js
const initialState = {
    userId: '',
    users: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        return {
          ...state,
          userId: action.payload,
        };
      case 'SET_USERS':
        
        console.log("users in reducer" + state.users)
        console.log("users in reduceraction" + action.payload)
        return {
          ...state,
          users: action.payload,
        };
      case 'UPDATE_USER_POSITION':
        const { userId, newPosition } = action.payload;
        // Find the user by userId and update their coordinates

        console.log("users before update: " +JSON.stringify(state.users))

        console.log("type user.id : " + state.users[0].id)

        console.log("type userId: " + userId)


        const updatedUsers = state.users.map((user) => {
            if (String(user.id) === String(userId)) {
              // Ensure newPosition is an array with at least two elements before updating
              const [newX, newY] = newPosition || [0, 0];
              return { ...user, x: user.x + newX, y: user.y + newY };
            } else {
              return user;
            }
          });

        console.log("updated users: " +JSON.stringify(updatedUsers))
        return {
          ...state,
          users: updatedUsers,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  