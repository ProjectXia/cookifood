import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";

function ShowToast(toastType, toastMessage, toastPosition = "top") {
  Toast.show({
    type: toastType,
    text1: "Hi",
    text2: toastMessage,
    position: toastPosition,
    duration: 3000,
  });
}

function showLoadingLottie() {
  return (
    <LottieView
      source={require("../../assets/animations/photos.json")}
      autoPlay
      loop
    />
  );
}

function getARandomImageName() {
  const prefix = "img_";
  const randomNum = Math.random();
  return prefix + randomNum + ".jpg";
}

function getARandomIds() {
  const prefix = "id_";
  const randomNum = Math.random();
  return prefix + randomNum;
}

export { ShowToast, getARandomImageName, getARandomIds, showLoadingLottie };
