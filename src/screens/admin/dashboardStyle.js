import { StyleSheet } from "react-native";

const stylesdash = StyleSheet.create({
  mainview: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: "#DFE8CC",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#584153",
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
    padding: 0,
  },
  subheading: { color: "gray", fontSize: 16, fontWeight: "400" },
  card: {
    height: 170,
    width: 170,
    backgroundColor: "lightblue",
    margin: 10,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: { fontSize: 16, fontWeight: "400" },
});

export { stylesdash };
