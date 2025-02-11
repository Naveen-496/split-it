import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentUser, useUsers } from "@/hooks/use-user";
import { ArrowLeft, Check, Circle, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const AddFriends = ({
  selected,
  onDone,
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  selected: any[];
  onDone: (values: any[]) => void;
}) => {
  const users = useUsers();
  const currentUser = useCurrentUser();
  const [selectedUsers, setSelectedUsers] = useState(selected);
  const selectedUsernames = selectedUsers.map((user) => user.username);

  useEffect(() => {
    setSelectedUsers(selected);
  }, [selected]);

  const handleUserClick = (user: any) => {
    const userExists = selectedUsers.find((u) => u.username === user.username);
    if (!userExists) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) =>
        prev.filter((p) => !(p.username === user.username))
      );
    }
  };

  const otherUsers = users.filter(
    (u) => !(u.username === currentUser.username)
  );

  const onSave = () => {
    if (selectedUsers.length > 0) {
      onDone(selectedUsers);
      setSelectedUsers([]);
      onClose();
    }
  };

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <div className="w-fit flex flex-col justify-center items-center gap-1 text-sm semibold">
          <Button className="w-fit rounded-full px-3 py-0" onClick={onClose}>
            <Plus className="size-8" />
          </Button>
          Add friends
        </div>
      </SheetTrigger>
      <SheetContent className="w-[30%]" showClose={false}>
        <SheetHeader>
          <SheetDescription></SheetDescription>
          <SheetTitle className="px-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="py-0 px-2 rounded-full" onClick={onClose}>
                  <ArrowLeft className="size-5" />
                </button>
                <div className="semibold">Add Friends</div>
              </div>
              <Button
                variant="ghost"
                className="text-violet-500 hover:text-violet-600 semibold"
                onClick={onSave}
              >
                Done
              </Button>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="w-full">
          <div className="flex items-center gap-6 flex-wrap px-4 my-6">
            <div className="flex flex-col items-center">
              <img
                src={`/icons/${currentUser.imageUrl}`}
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <div className="semibold text-xs">You</div>
            </div>

            {selectedUsers.map((selected) => {
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
                    onClick={() => handleUserClick(selected)}
                  >
                    <X className="size-3" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full">
            <div className="relative">
              <Input
                className="w-full pl-10 py-1 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-xs placeholder:semibold semibold focus-visible:outline-none mb-2 rounded-full"
                placeholder="search by name..."
              />
              <div className="p-1 rounded-full bg-gray-200 absolute left-3 top-2.5">
                <Search className="size-3" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            {otherUsers.map((user) => {
              return (
                <div
                  key={user.username}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`/icons/${user.imageUrl}`}
                      alt="User"
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="semibold">{user.username}</div>
                  </div>
                  <div>
                    {selectedUsernames.includes(user.username) ? (
                      <Check className="size-5 text-green-500" />
                    ) : (
                      <Circle className="size-5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
