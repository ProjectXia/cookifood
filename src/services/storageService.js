import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShowToast } from "../utils/help";

/** if i were to do the same function in async await mode
 *
 */
async function storeUserSession(uid, sessionState, uemail) {
  try {
    await AsyncStorage.setItem("user_uid", uid);
    await AsyncStorage.setItem("user_is_logged_in", sessionState);
    await AsyncStorage.setItem("user_email", uemail);
  } catch (error) {
    ShowToast("error", error.message);
  }
}

function getUserId() {
  return AsyncStorage.getItem("user_uid");
}

function getUserLoggedInStatus() {
  return AsyncStorage.getItem("user_is_logged_in");
}

async function clearUserSession(uid, sessionState) {
  try {
    await AsyncStorage.setItem("user_uid", uid);
    await AsyncStorage.setItem("user_is_logged_in", sessionState);
  } catch (error) {
    ShowToast("error", error.message);
  }
}

export { storeUserSession, getUserLoggedInStatus, getUserId, clearUserSession };

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
