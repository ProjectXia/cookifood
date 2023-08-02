// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "expo-storage";
/** if i were to do the same function in async await mode
 *
 */

async function storeUserSession(uid, sessionState, uemail, uname) {
  try {
    await Storage.setItem({ key: "user_uid", value: uid });
    await Storage.setItem({
      key: "user_is_logged_in",
      value: sessionState,
    });
    await Storage.setItem({ key: "user_name", value: uname });
    await Storage.setItem({ key: "user_email", value: uemail });
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserId() {
  try {
    const value = await Storage.getItem({ key: "user_uid" });
    if (value !== null) {
      // We have data!!
      console.log("Get ID: " + value);
      return value;
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function getUserName() {
  try {
    const value = await Storage.getItem({ key: "user_name" });
    if (value !== null) {
      // We have data!!
      console.log("Get Name: " + value);
      return value;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserLoggedInStatus() {
  try {
    const value = await Storage.getItem({ key: "user_is_logged_in" });
    if (value !== null) {
      // We have data!!
      console.log(value);
      return value;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function clearUserSession(uid, sessionState) {
  try {
    await Storage.setItem({ key: "user_uid", value: uid });
    await Storage.setItem({ key: "user_is_logged_in", value: sessionState });
  } catch (error) {
    console.log(error.message);
  }
}

// async function storeUserSession(uid, sessionState, uemail) {
//   try {
//     await AsyncStorage.setItem("user_uid", uid);
//     await AsyncStorage.setItem("user_is_logged_in", sessionState);
//     await AsyncStorage.setItem("user_email", uemail);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function getUserId() {
//   try {
//     const value = await AsyncStorage.getItem("user_uid");
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//       return value;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// function getUserLoggedInStatus() {
//   return AsyncStorage.getItem("user_is_logged_in");
// }

// async function clearUserSession(uid, sessionState) {
//   try {
//     await AsyncStorage.setItem("user_uid", uid);
//     await AsyncStorage.setItem("user_is_logged_in", sessionState);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

export {
  storeUserSession,
  getUserLoggedInStatus,
  getUserId,
  getUserName,
  clearUserSession,
};

// THEN CATCH REPLACEMEBT OF ABOVE FUNC

// uid will be a string of user id
// session state will be a string of "true", "false"
// function storeUserSession(uid, sessionState) {
//   AsyncStorage.setItem("user_uid", uid)
//     .then((uidResponse) => {
//       AsyncStorage.setItem("user_is_logged_in", sessionState)
//         .then((sessionResponse) => {})
//         .catch((sessionError) => {
//           showToast("error", sessionError.message);
//         });
//     })
//     .catch((uidError) => {
//       showToast("error", uidError.message);
//     });
// }
