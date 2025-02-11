"use client";

import { useEffect, useState } from "react";

import { Expense, ExpenseCategory } from "@/types";
import { useCurrentUser } from "@/hooks/use-user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddSplitExpense } from "@/components/create-split";
import { SelectCategory } from "@/components/select-category";
import { Button } from "@/components/ui/button";

function formatAmount(amount: number) {
  return new Intl.NumberFormat().format(amount);
}

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-4 bg-slate-200 ">
      <h2 className="font-semibold">Main Page</h2>
    </main>
  );
}

// export default function App() {
//   const [categories, setCategories] = useState<ExpenseCategory[]>([]);
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [limit, setLimit] = useState(5);
//   const [type, setType] = useState<"all" | "expense" | "income">("all");
//   const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
//   const [summary, setSummary] = useState({ totalExpense: 0, totalIncome: 0 });
//   const currentUser = useCurrentUser();

//   const fetchSummary = async () => {};

//   const fetchExpenses = async () => {
//     const localExpenses = localStorage.getItem("expenses");
//     const expensesJson = JSON.parse(localExpenses || "[]");
//     let [income, expense] = [0, 0];
//     for (const exp of expensesJson) {
//       console.log(exp);
//       const amount = exp.splitMembers.find(
//         (mem) => mem.username === "You"
//       ).amount;
//       if (exp.paidBy === currentUser.username) {
//         income = income + (exp.amount - amount);
//       } else {
//         expense += amount;
//       }
//     }
//     if (income - expense > 0) {
//       income = income - expense;
//       expense = 0;
//     } else {
//       income = 0;
//       expense = Math.abs(income - expense);
//     }
//     setExpenses(expensesJson);
//     setSummary({ totalExpense: expense, totalIncome: income });
//   };

//   const fetchCategories = async () => {};

//   useEffect(() => {
//     fetchExpenses();
//   }, [limit, type, selectedCategories]);

//   useEffect(() => {
//     const currentUser = {
//       username: "Naveen",
//       mobile: "8860707979",
//       id: 1,
//       imageUrl: "ava-one.jpeg",
//     };
//     localStorage.setItem("current_user", JSON.stringify(currentUser));
//     fetchSummary();
//     fetchCategories();
//   }, []);

//   const getPaymentDetails = (expense: Expense) => {
//     const isPaidByCurrentUser = expense.paidBy === currentUser.username;
//     const amount = expense.splitMembers.find(
//       (mem) => mem.username === "You"
//     ).amount;
//     if (isPaidByCurrentUser) {
//       const remAmount = expense.amount - amount;
//       return { amount: remAmount, isPaid: true };
//     } else {
//       return { amount, isPaid: false };
//     }
//   };

//   return (
//     <main className="container max-w-4xl mx-auto p-4 jost-regular-400">
//       <div className="p-4 w-full border rounded mb-4 flex items-center justify-between">
//         <div className="w-[50%] border-r h-full text-center semibold">
//           <h2 className="">Will Get</h2>
//           <div className="text-xl text-green-500 ">
//             ₹{formatAmount(summary.totalIncome)}
//           </div>
//         </div>
//         <div className="w-[50%] h-full text-center semibold">
//           <h2 className="">Will Pay</h2>
//           <div className="text-xl text-red-500">
//             ₹{formatAmount(summary.totalExpense)}
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="font-semibold text-xl">Bills</h2>
//           <p className="text-slate-400 text-sm">
//             {/* You had 2 incomes and 23 expenses this month */}
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div>
//             <Select onValueChange={(value) => setType(value as typeof type)}>
//               <SelectTrigger className="flex items-center gap-3 focus:bg-gray-100 focus:outline-none focus:border-none focus-visible:outline-none">
//                 <SelectValue placeholder="Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="expense">Expense</SelectItem>
//                 <SelectItem value="income">Income</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <div>
//               <SelectCategory
//                 categories={categories}
//                 selectedCategories={selectedCategories}
//                 onSelectCategories={(selected: number[]) => {
//                   setSelectedCategories(selected);
//                 }}
//               />
//             </div>
//           </div>
//           <div>
//             <AddSplitExpense onExpenseAdded={fetchExpenses} />
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <div className="w-full border-b mb-2"></div>

//         {expenses.length === 0 && (
//           <div className="text-center text-slate-500 text-sm">
//             <p>No Expenses found. Please add one</p>
//           </div>
//         )}
//       </div>
//       <div>
//         {expenses.map((expense) => {
//           const { amount, isPaid } = getPaymentDetails(expense);
//           return (
//             <div key={expense.description}>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-5 my-4">
//                   <img
//                     src={`/icons/${expense.category.imageUrl}`}
//                     alt="User"
//                     className="w-6 h-6 rounded-full"
//                   />
//                   <div>
//                     <p className="semibold">{expense.description}</p>
//                     <p className="text-[10px] medium text-slate-500">
//                       {expense.paidBy === currentUser.username
//                         ? "You"
//                         : expense.paidBy}{" "}
//                       paid {expense.amount}
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   className={`${
//                     isPaid ? "text-green-500" : "text-red-500"
//                   } text-sm text-right`}
//                 >
//                   <div>{isPaid ? "You get" : "You pay"}</div>
//                   <div className="medium">₹{amount}</div>
//                 </div>
//               </div>

//               <div className="border-b"></div>
//             </div>
//           );
//         })}
//       </div>
//       {expenses.length > 5 && (
//         <div className="mt-3 flex items-center justify-center">
//           <Button
//             variant="outline"
//             onClick={() => {
//               setLimit((prev) => prev + 5);
//             }}
//           >
//             Load More
//           </Button>
//         </div>
//       )}
//       {/* <ChatBot expenseCallback={fetchExpenses} /> */}
//     </main>
//   );
// }
