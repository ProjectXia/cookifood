import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Welcome } from "../screens/welcome/welcome";
import { SignIN } from "../screens/signin/signin";
import { SignUP } from "../screens/signup/signup";
import { Home } from "../screens/home/home";
import { Ionicons } from "@expo/vector-icons";
import { TabIcon } from "../components/TabIcon";
import icons from "../components/icons";
import { Search } from "../screens/search/search";
import { Bookmark } from "../screens/bookmark/bookmark";
import { Settings } from "../screens/settings/settings";
import { RecipesDetail } from "../screens/recipesDetail/recipesdetail";
import { ShoppingCart } from "../screens/cart/cart";
import { Profile } from "../profile/profile";
import { AboutUs } from "../about/about";
import { Order } from "../order/order";

// const bottomNav = () => {
//   <NavigationContainer>
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//     </Tab.Navigator>
//   </NavigationContainer>;
// };

function AppNav() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const iconSize = 18;

  const TabNav = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 2,
            backgroundColor: "#DAE2B6",
            borderTopColor: "#DAE2B6",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 75,
          },
        }}
      >
        <Tab.Screen
          name="home1"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={focused ? "home" : "home-outline"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={focused ? "search" : "search-outline"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={focused ? "bookmark" : "bookmark-outline"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Shopping Cart"
          component={ShoppingCart}
          options={{
            tabBarBadge: 0,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={focused ? "cart" : "cart-outline"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={focused ? "settings" : "settings-outline"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signin" component={SignIN} />
        <Stack.Screen name="Signup" component={SignUP} />
        <Stack.Screen name="Home" component={TabNav} />
        <Stack.Screen name="detail" component={RecipesDetail} />
        <Stack.Screen name="order" component={Order} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="about" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { AppNav };
