import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExpenseCategory } from "@/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const SelectCategory = ({
  categories,
  selectedCategories,
  onSelectCategories,
}: {
  categories: ExpenseCategory[];
  selectedCategories: number[];
  onSelectCategories: (selected: number[]) => void;
}) => {
  const [selected, setSelected] = useState<number[]>([...selectedCategories]);

  const handleSelectCategory = (categoryId: number) => {
    let temp = [...selected];
    if (!selected.includes(categoryId)) {
      temp.push(categoryId);
    } else {
      temp = temp.filter((cat) => cat !== categoryId);
    }
    setSelected(temp);
    onSelectCategories(temp);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-3">
          Category
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="">
          {categories.map((category) => {
            return (
              <div
                key={category.name}
                className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleSelectCategory(category.id);
                }}
              >
                <div className="flex items-center gap-2 w-[15rem]">
                  <Input
                    checked={selected.includes(category.id)}
                    type="checkbox"
                    className="size-3.5 mr-3 accent-black cursor-pointer"
                    onChange={(event) => {
                      event.stopPropagation();
                    }}
                  />
                  <img
                    src={`/icons/${category.imageUrl}`}
                    alt="Home"
                    className="w-4 h-4"
                  />
                  <p>{category.name}</p>
                </div>
              </div>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
