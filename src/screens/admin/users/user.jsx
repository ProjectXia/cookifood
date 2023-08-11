import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { stylesuser } from "./userStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../../services/firebaseConfig";
import { UserCard } from "../../../components/userCard";

function Users() {
  const [profiles, setProfiles] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const getAllProfile = async () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("profiles")
      .get()
      .then((response) => {
        setProfiles(response.docs);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const __renderProfile = ({ item, index }) => {
    const listing = item.data();
    const listId = item.id;
    let serial = index + 1;

    return (
      <View>
        <UserCard
          serialNo={serial}
          name={listing.fullname}
          email={listing.email}
          address={listing.address}
          created={listing.updatedat}
        />
      </View>
    );
  };

  useEffect(() => {
    getAllProfile();
  }, []);

  return (
    <View style={stylesuser.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 5,
          padding: 10,
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          top: 15,
        }}
      >
        <Ionicons name="information-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>All Users</Text>
      </View>
      <View style={{ marginTop: 70 }}>
        <FlatList
          data={profiles}
          horizontal={false}
          renderItem={__renderProfile}
          ListEmptyComponent={
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
              No listing found !
            </Text>
          }
          refreshing={showLoading}
          onRefresh={() => getAllProfile()}
        />
      </View>
    </View>
  );
}

export { Users };
