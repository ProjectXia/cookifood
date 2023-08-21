import { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IngredientCard } from "../../components/ingredient";
import { Storage } from "expo-storage";
import { Button } from "react-native-paper";
import { firebase } from "../../services/firebaseConfig";
import { getARandomIds } from "../../utils/help";

function RecipesDetail({ route, navigation }) {
  const { recipeID, bookm, rname, mint, serving, price, imgUrl } = route.params;

  // console.log("detail Recipe Id: " + recipeID);

  const [ingredient, setIngredient] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [count, setCount] = useState();
  const [serv, setServ] = useState();
  const [newPrice, setNewPrice] = useState();
  const [cartText, setCartText] = useState("Add to Cart");
  const [orderId, setOrderId] = useState();

  const getIngrediants = () => {
    firebase
      .firestore()
      .collection("ingrediants")
      .where("recipeId", "==", recipeID)
      .get()
      .then((response) => {
        setIngredient(response.docs);
        setCount(response.docs.length);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const __renderIngredient = ({ item, index }) => {
    const listing = item.data();
    const listId = item.id;

    let num = index + 1;
    return (
      <View>
        <IngredientCard
          iconName={num <= count ? num : ""}
          IngredientName={listing.name}
          IngredientMsr={listing.quantity}
        />
      </View>
    );
  };

  ///////////////////////////////////////////////////////////////
  const checkifOrdercreated = (uuid) => {
    const docId = getARandomIds();
    firebase
      .firestore()
      .collection("order")
      .where("usid", "==", uuid)
      .get()
      .then((response) => {
        if (response.empty) {
          // alert("nott found");
          firebase
            .firestore()
            .collection("order")
            .doc(docId)
            .set({
              orderdate: new Date(),
              shipaddress: "",
              items: 0,
              totalAmount: 0,
              status: "Pending",
              usid: uuid,
            })
            .then(async (response) => {
              ToastAndroid.show(
                "Order Created Successfully",
                ToastAndroid.SHORT
              );
              // console.log(response.doc.id);
              setOrderId(docId);
              await Storage.setItem({
                key: "order_id",
                value: docId,
              });
              await Storage.setItem({
                key: "order_status",
                value: "Pending",
              });
              addListingOrders(docId, newPrice, serv, recipeID, rname);
            })
            .catch((error) => {
              console.log("error: " + error);
            });
        }
        response.forEach((doc) => {
          if (doc.data().status === "Pending") {
            ///////////////////////////// Pending Orders///////////////////
            //alert("already order pending -" + doc.id);
            // checkifListingOrderAlreadyExist(doc.id);
            firebase
              .firestore()
              .collection("orderlines")
              .where("oid", "==", orderId)
              .get()
              .then((response) => {
                if (response.empty) {
                  addListingOrders(orderId, newPrice, serv, recipeID, rname);
                }
                response.forEach((doc1) => {
                  if (doc1.data().recipeId === recipeID) {
                    // alert("Already Added to Cart");
                  } else {
                    const docId = getARandomIds();
                    firebase
                      .firestore()
                      .collection("orderlines")
                      .doc(docId)
                      .set({
                        oid: orderId,
                        price: newPrice,
                        quantity: serv,
                        recipeId: recipeID,
                        title: rname,
                      })
                      .then((response) => {
                        ToastAndroid.show(
                          "Orderlist added Successfully",
                          ToastAndroid.SHORT
                        );
                      })
                      .catch((error) => {
                        console.log("error: " + error);
                      });
                  }
                });
              })
              .catch((error) => {
                console.log(error);
              });
            //////////////////////////////////////////////////////////////
          } else {
            ///////////////////////NO Pending Order///////////////////////
            // alert("no pending order");
            firebase
              .firestore()
              .collection("order")
              .doc(docId)
              .set({
                orderdate: new Date(),
                shipaddress: "",
                items: 0,
                totalAmount: 0,
                status: "Pending",
                usid: uuid,
              })
              .then(async (response) => {
                ToastAndroid.show(
                  "Order Created Successfully",
                  ToastAndroid.SHORT
                );
                await Storage.setItem({
                  key: "order_id",
                  value: response.doc.id,
                });
                await Storage.setItem({
                  key: "order_status",
                  value: "Pending",
                });
                firebase
                  .firestore()
                  .collection("orderlines")
                  .where("oid", "==", orderId)
                  .get()
                  .then((response) => {
                    if (response.empty) {
                      addListingOrders(
                        orderId,
                        newPrice,
                        serv,
                        recipeID,
                        rname
                      );
                    }
                    response.forEach((doc1) => {
                      if (doc1.data().recipeId === recipeID) {
                        //  alert("Already Added to Cart");
                      } else {
                        const docId = getARandomIds();
                        firebase
                          .firestore()
                          .collection("orderlines")
                          .doc(docId)
                          .set({
                            oid: orderId,
                            price: newPrice,
                            quantity: serv,
                            recipeId: recipeID,
                            title: rname,
                          })
                          .then((response) => {
                            ToastAndroid.show(
                              "Orderlist added Successfully",
                              ToastAndroid.SHORT
                            );
                          })
                          .catch((error) => {
                            console.log("error: " + error);
                          });
                      }
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log("error: " + error);
              });
            //////////////////////created order//////////////
          }
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const addListingOrders = (oID, p, q, rID, rName) => {
    const docId = getARandomIds();
    firebase
      .firestore()
      .collection("orderlines")
      .doc(docId)
      .set({
        oid: oID,
        price: p,
        quantity: q,
        recipeId: rID,
        title: rName,
      })
      .then((response) => {
        ToastAndroid.show("Orderlist added Successfully", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };
  const checkifListingOrderAlreadyExist = (oID) => {
    firebase
      .firestore()
      .collection("orderlines")
      .where("oid", "==", oID)
      .get()
      .then((response) => {
        if (response.empty) {
          addListingOrders(oID, newPrice, serv, recipeID, rname);
        }
        response.forEach((doc) => {
          if (doc.data.recipeId === recipeID) {
            alert("Already Added to Cart");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    getIngrediants();
    setServ(serving);
    setNewPrice(price);
    setCartText("Add to Cart");
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ImageBackground
        source={{ uri: imgUrl }}
        style={{ width: "100%", height: 300, opacity: 0.9 }}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            style={{
              position: "absolute",
              left: 20,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 2,
            }}
            color={"white"}
            onPress={() => {
              navigation.back();
            }}
          />
          <Ionicons
            name={bookm === true ? "bookmark" : "bookmark-outline"}
            size={35}
            style={{ position: "absolute", left: "80%" }}
            color={"lightgreen"}
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            width: "90%",
            height: 90,
            alignSelf: "center",
            position: "absolute",
            top: 200,
            borderRadius: 10,
            borderColor: "white",
            borderWidth: 0.2,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "orange",
              borderRadius: 30,
              position: "absolute",
              top: 15,
              left: 30,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={require("../../../assets/re1.png")}
              style={{ width: 58, height: 58, borderRadius: 30 }}
            />
            {/* <Ionicons name="person-circle-outline" size={60} color={"white"} /> */}
          </View>
          <View
            style={{
              position: "absolute",
              top: 15,
              left: 105,
            }}
          >
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "400" }}>
              Recipe by:
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Maria
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: "white",
              position: "absolute",
              top: 25,
              right: 25,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              paddingVertical: 5,
              paddingHorizontal: 20,
            }}
          >
            Rs.{newPrice}
          </Text>
        </View>
        {/* </View> */}
      </ImageBackground>
      {/* ///////////////////////////////////////////BODY//////////////////////////////////////////////// */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 115,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ width: 200, fontSize: 24, fontWeight: "800" }}>
          {rname}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 90,
            left: 22,
            color: "gray",
          }}
        >
          <Text>
            {mint} mins |{" "}
            <Button
              mode="elevated"
              onPress={() => {
                if (serv >= 2) {
                  let newServing = serv - 1;
                  setServ(newServing);
                  let nprice = price * newServing;
                  setNewPrice(nprice);
                  if (newServing < 10) {
                    setCartText("Add to Cart");
                  }
                }
              }}
            >
              -
            </Button>
            <Button mode="outlined">{serv}</Button>
            <Button
              mode="elevated"
              onPress={() => {
                let newServing = serv + 1;
                setServ(newServing);
                let nprice = newServing * price;
                setNewPrice(nprice);
                if (serv >= 9) {
                  setCartText("Special Order");
                } else {
                  setCartText("Add to Cart");
                }
              }}
            >
              +
            </Button>
            Serving
          </Text>
        </View>
        <View
          style={{
            width: "40%",
            height: 55,
            position: "absolute",
            top: 15,
            left: "65%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              // alert(
              //   "Recipe added successfully!" +
              //     (await Storage.getItem({ key: "user_uid" })) +
              //     " = " +
              //     serv
              // );
              setOrderId(await Storage.getItem({ key: "order_id" }));
              checkifOrdercreated(await Storage.getItem({ key: "user_uid" }));
            }}
          >
            <Button mode="contained">{cartText}</Button>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "800" }}>Ingredients</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            position: "absolute",
            left: "86%",
            color: "gray",
          }}
        >
          {count} items
        </Text>
        <View style={{ height: 20 }} />
        <FlatList
          data={ingredient}
          renderItem={__renderIngredient}
          horizontal={false}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                No Ingredient found !
              </Text>
            </View>
          }
          refreshing={showLoading}
          onRefresh={() => getIngrediants()}
        />
      </View>
    </View>
  );
}

export { RecipesDetail };
