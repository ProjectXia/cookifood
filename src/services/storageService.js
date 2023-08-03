import { Storage } from "expo-storage";

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

async function storeRecipeId(rid) {
  try {
    await Storage.setItem({ key: "recipe_id", value: rid });
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

export {
  storeUserSession,
  storeRecipeId,
  getUserLoggedInStatus,
  getUserId,
  getUserName,
  clearUserSession,
};
