import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Expense, ExpenseCategory } from "@/types";

export const AddExpense = ({
  onExpenseAdded,
}: {
  onExpenseAdded: () => void;
}) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: 1,
    categoryId: null,
    type: "income",
  });
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);

  const fetchCategories = async () => {
    const response = await axios.get("/api/categories");
    if (response.status == 200) {
      const data = response.data;
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const saveExpense = async () => {
    const response = await axios.post("/api/expenses", expense);
    if (response.status == 200) {
      onExpenseAdded();
    }
  };

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Expense</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <Input
              id="name"
              value={expense.name}
              onChange={({ target }) =>
                setExpense((prev) => ({ ...prev, name: target.value }))
              }
              className="col-span-3"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username" className="text-right">
              Amount:
            </Label>
            <Input
              id="amount"
              type="number"
              value={expense.amount ?? 1}
              className="col-span-3"
              onChange={({ target }) =>
                setExpense((prev) => ({
                  ...prev,
                  amount: Number(target.value),
                }))
              }
            />
          </div>
          <div className="w-full space-y-1">
            <Label>Category:</Label>
            <Select
              onValueChange={(value) => {
                setExpense((prev) => ({ ...prev, categoryId: value }));
              }}
            >
              <SelectTrigger className="w-[100%]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => {
                    return (
                      <SelectItem key={category.id} value={String(category.id)}>
                        <div className="flex items-center gap-4">
                          <img
                            src={`/icons/${category.imageUrl}`}
                            alt="Home"
                            className="w-4 h-4"
                          />
                          <p>{category.name}</p>
                        </div>
                      </SelectItem>
                    );
                  })}
                  {/* <SelectItem value="">
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/home.png"
                        alt="Home"
                        className="w-4 h-4"
                      />
                      <p>Rent</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="">
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/cart.jpg"
                        alt="Groceries"
                        className="w-4 h-4"
                      />
                      <p>Groceries</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="">
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/popcorn.png"
                        alt="Home"
                        className="w-4 h-4"
                      />
                      <p>Streaming</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="">
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/coffee.png"
                        alt="Home"
                        className="w-4 h-4"
                      />
                      <p>Coffee</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="">
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/hotel.png"
                        alt="Home"
                        className="w-4 h-4"
                      />
                      <p>Restaurant</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="">
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/travel.png"
                        alt="Home"
                        className="w-4 h-4"
                      />
                      <p>Travel</p>
                    </div>
                  </SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Input
              type="checkbox"
              className="size-5"
              onChange={(e) => {
                setExpense((prev) => ({
                  ...prev,
                  type: e.target.checked ? "expense" : "income",
                }));
              }}
            />
            <div>Expense</div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={saveExpense}>Save Expense</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
