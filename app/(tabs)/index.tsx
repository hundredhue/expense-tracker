import CircularProgressBar from "@/components/circular-progress/CircularProgress";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import CashFlowItem from "@/components/CashFlowItem/CashFlowItem";
import CreditCard from "@/assets/icons/CreditCard";
import tw from "twrnc";
import GoalReachedComponent from "@/components/goal-reached-component/GoalReachedComponent";
import FloatingTransactionButton from "@/components/buttons/FloatingTransactionButton";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();

  const cash_flow = [
    {
      name: "Amazon",
      description: "shopping",
      amount: 1672.5,
      type: "expense",
    },
    { name: "Derreck", description: "received", amount: 50.0, type: "income" },
    {
      name: "Travelling",
      description: "chi-hr",
      amount: 10.0,
      type: "expense",
    },
  ];

  return (
    <View style={[tw`h-full gap-6 bg-zinc-50 relative`]}>
      <FloatingTransactionButton />
      <View
        style={[
          tw`min-h-[20%] bg-[#363946] items-center`,
          {
            paddingTop: insets.top,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          },
        ]}
      >
        <View style={tw`w-full py-12 px-8`}>
          <Text style={tw`text-xl text-white`}>Hello tatenda,</Text>
          <Text style={tw`text-xs text-white`}>
            What would you like to do today?
          </Text>
        </View>
        <View style={tw`flex-1`}></View>
        <View
          style={[
            tw`bg-[#5A6868] w-[75%] rounded-t-3xl h-5 overflow-hidden`,
            styles.centeredView,
          ]}
        ></View>
        <View
          style={[
            tw`bg-[#819595] w-[85%] rounded-t-3xl h-44 overflow-hidden`,
            styles.centeredView,
          ]}
        >
          <View style={tw`w-full`}>
            <View
              style={tw`bg-[#D9D9D9] top-0 absolute items-end p-4 right-0 h-32 w-40 rounded-bl-full `}
            >
              <View style={tw`h-12 w-12 `}>
                <CreditCard />
              </View>
            </View>
            <View style={tw`w-full h-full p-8 gap-4`}>
              <View style={tw`gap-0 flex-1`}>
                <Text style={tw`text-left text-xs text-white`}>Wallet</Text>
                <Text style={tw`text-left  text-xs text-white`}>Ballance</Text>
              </View>
              <Text style={tw`text-3xl text-white font-semibold`}>
                $1672.50
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tw`px-4 gap-4 flex-1`}>
        <GoalReachedComponent />
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-lg font-bold text-zinc-950`}>Transactions</Text>
          <TouchableOpacity>
            <AntDesign name="arrowright" size={20} color="#a1a1aa" />
          </TouchableOpacity>
        </View>
        <View
          style={tw`bg-white flex-1 p-2 gap-4 rounded-3xl border border-zinc-200/50`}
        >
          {/* Money Item */}
          {cash_flow.map((item, index) => (
            <CashFlowItem
              key={index}
              name={item.name}
              description={item.description}
              amount={item.amount}
              type={item.type}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
