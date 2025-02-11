import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const SplitTabs = ({
  users,
  amount,
  onChangeValues,
}: {
  users: any[];
  amount: number;
  onChangeValues: (users: any) => void;
}) => {
  const [splitUsers, setSplitUsers] = useState([]);

  useEffect(() => {
    setSplitUsers(users as any);
  }, [users]);

  return (
    <Tabs defaultValue="equally" className="">
      <TabsList className="bg-none rounded-full h-8 semibold">
        <TabsTrigger value="equally" className="rounded-full w-full semibold">
          Equally
        </TabsTrigger>
        <TabsTrigger value="unequally" className="rounded-full w-full">
          Unequally
        </TabsTrigger>
      </TabsList>
      <div className="my-3 medium text-sm">
        Split among ( <span className="text-yellow-500">click</span> to unselect
        )
      </div>
      <TabsContent value="equally" className="medium">
        <EqualSplitTab
          users={splitUsers}
          amount={amount}
          onValuesChange={onChangeValues}
        />
      </TabsContent>
      <TabsContent value="unequally" className="medium">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
};

const EqualSplitTab = ({
  users,
  amount,
  onValuesChange,
}: {
  users: any[];
  amount: number;
  onValuesChange: (values: any) => void;
}) => {
  const [usersWithSplit, setUsersSplitWith] = useState<any[]>([]);
  const [unSelectedUsers, setUnSelectedUsers] = useState([]);

  useEffect(() => {
    const remMembers = users.length - unSelectedUsers.length;
    console.log("Un Selected: ", unSelectedUsers);
    let amountSplit = 0;
    if (remMembers > 0) {
      amountSplit = amount / remMembers;
      amountSplit = Math.round(amountSplit * 100) / 100;
    }
    const data = users.map((user) => {
      if (unSelectedUsers.includes(user.username as never)) {
        return { ...user, amount: 0 };
      } else {
        return { ...user, amount: amountSplit };
      }
    });
    setUsersSplitWith(data as any[]);
    console.log("Equally Split: ", data);
  }, [users, unSelectedUsers]);

  const handleUserClick = (user: any) => {
    const selected = unSelectedUsers.find((u: any) => u === user.username);
    if (selected) {
      setUnSelectedUsers((prev) =>
        prev.filter((u: any) => !(u === user.username))
      );
    } else {
      setUnSelectedUsers((prev: any) => [...prev, user.username] as any);
    }
    console.log(selected);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {usersWithSplit.map((user) => {
        const isUnSelected = unSelectedUsers.includes(user.username as never);
        return (
          <div
            onClick={() => handleUserClick(user)}
            key={user.username}
            className={`p-1 rounded-md w-[5rem]  flex flex-col text-center medium text-xs cursor-pointer ${
              isUnSelected ? "bg-gray-400" : "bg-[#21AB7B]"
            }`}
          >
            <div className="text-white py-1">{user.username}</div>
            <div className="bg-white text-black rounded-b-md py-1">
              {user.amount}
            </div>
          </div>
        );
      })}
      <div className="mt-4 w-full">
        <Button
          onClick={() => onValuesChange(usersWithSplit)}
          className="w-full rounded-full semibold"
        >
          Save Expense
        </Button>
      </div>
    </div>
  );
};
