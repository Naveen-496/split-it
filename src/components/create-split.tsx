import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentUser } from "@/hooks/use-user";
import { ExpenseCategory, User } from "@/types";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AddFriends } from "./add-friends";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SplitTabs } from "./split-tabs";

export const AddSplitExpense = ({
  onExpenseAdded,
}: {
  onExpenseAdded: () => void;
}) => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    categoryId: null,
    paidBy: null,
  });
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUses] = useState([]);
  const [error, setError] = useState("");
  const [addFriendsOpen, setAddFriendsOpen] = useState(false);
  const currentUser = useCurrentUser();
  const [splitMembers, setSplitMembers] = useState([]);

  const fetchCategories = async () => {
    const localCategories = localStorage.getItem("categories");
    const data = JSON.parse(localCategories || "[]");
    setCategories(data);
  };

  const fetchUsers = async () => {
    const localUsers = localStorage.getItem("app_users");
    const data = JSON.parse(localUsers || "[]");
    setUsers(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const saveExpense = async (splitMembers: any) => {
    if (isNaN(expense.amount as unknown as number)) {
      setError("Amount is not valid.");
    } else {
      console.log("Split Members: ", splitMembers);
      const members = splitMembers.map((m: any) => ({
        username: m.username,
        amount: m.amount,
      }));
      const actualExpense = {
        ...expense,
        category: categories.find((cat) => cat.id == expense.categoryId),
        splitMembers: members,
        date: new Date(),
      };
      let localExpenses = localStorage.getItem("expenses");
      let expenses = JSON.parse(localExpenses || "[]");
      expenses.push(actualExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      setExpense({
        description: "",
        amount: "",
        categoryId: null,
        paidBy: null,
      });
      setSelectedUses([]);
      onExpenseAdded();
    }
  };

  const handleUserCancel = (user: any) => {
    setSelectedUses((prev) =>
      prev.filter((u: any) => !(u.username === user.username))
    );
  };

  const amount = isNaN(expense.amount as unknown as number)
    ? 0
    : expense.amount;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Button className="rounded-full flex items-center">
            <Plus className="size-5" />
            Add
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-1/2" showClose={true}>
        <SheetHeader>
          <SheetTitle>Add Bill</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex items-center gap-1 flex-wrap">
          <AddFriends
            open={addFriendsOpen}
            onClose={() => setAddFriendsOpen((prev) => !prev)}
            selected={selectedUsers}
            onDone={(values) => {
              setSelectedUses(values as any);
            }}
          />

          <div className="flex items-center gap-6 flex-wrap px-4 my-6">
            <div className="flex flex-col items-center">
              <img
                src={`/icons/${currentUser.imageUrl}`}
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <div className="semibold text-xs">You</div>
            </div>

            {selectedUsers.map((selected: any) => {
              return (
                <div
                  className="flex flex-col items-center relative"
                  key={selected.username}
                >
                  <img
                    src={`/icons/${selected.imageUrl}`}
                    alt="User"
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="semibold text-xs">{selected.username}</div>
                  <div
                    className="absolute -top-2 -right-2 rounded-full bg-gray-200 cursor-pointer"
                    onClick={() => handleUserCancel(selected)}
                  >
                    <X className="size-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 py-4 mt-4">
          {error && <p className="text-red-400 text-sm semibold">{error}</p>}
          <div className="w-full flex items-center gap-2">
            <div className="space-y-1 w-[50%]">
              <Input
                id="description"
                value={expense.description}
                onChange={({ target }) =>
                  setExpense((prev) => ({ ...prev, description: target.value }))
                }
                placeholder="description for the bill..."
                className="col-span-3 focus-visible:ring-transparent focus-visible:ring-offset-0 border-t-0 border-l-0 border-r-0 border-b border-b-black rounded-none px-0 semibold"
              />
            </div>
            <div className="space-y-1 w-[50%]">
              <Select
                onValueChange={(value) => {
                  setExpense((prev) => ({ ...prev, paidBy: value as any }));
                }}
              >
                <SelectTrigger className="w-full border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus:ring-0 focus:border-collapse border-b border-black rounded-none semibold">
                  <SelectValue placeholder="Paid By"></SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel>Paid By</SelectLabel>
                    {[currentUser, ...selectedUsers].map((user) => {
                      return (
                        <SelectItem key={user.id} value={user.username}>
                          <div className="flex items-center gap-4">
                            <img
                              src={`/icons/${user.imageUrl}`}
                              alt="User"
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <p className="semibold">
                                {user.username === currentUser.username
                                  ? "You"
                                  : user.username}
                              </p>
                              {/* <p className="text-[10px] semibold">
                                {user.mobile}
                              </p> */}
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="space-y-1 w-[50%]">
              <Input
                id="amount"
                type="text"
                placeholder="Bill amount..."
                value={expense.amount}
                className="col-span-3 focus-visible:ring-transparent focus-visible:ring-offset-0 border-t-0 border-l-0 border-r-0 border-b border-b-black rounded-none px-0 semibold"
                onChange={({ target }) =>
                  setExpense((prev) => ({
                    ...prev,
                    amount: target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1 w-[50%]">
              <Select
                onValueChange={(value) => {
                  setExpense((prev) => ({ ...prev, categoryId: value as any }));
                }}
              >
                <SelectTrigger className="w-full border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus:ring-0 focus:border-collapse border-b border-black rounded-none semibold">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => {
                      return (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={`/icons/${category.imageUrl}`}
                              alt="Home"
                              className="w-5 h-5"
                            />
                            <p className="semibold">{category.name}</p>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <div className="medium mb-1.5">Split:</div>
          <SplitTabs
            onChangeValues={(values) => saveExpense(values)}
            amount={Number(amount)}
            users={[{ ...currentUser, username: "You" }, ...selectedUsers]}
          />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
