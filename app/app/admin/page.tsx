"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type MenuItem = {
  name: string;
  price: number;
  available: boolean;
};

const initialMenu: MenuItem[] = [
  { name: "Duck Roast", price: 150, available: true },
  { name: "Pork Fry", price: 150, available: true },
  { name: "Crab Roast", price: 240, available: true },
  { name: "Beef Fry", price: 150, available: true },
  { name: "Beef Roast", price: 160, available: true },
  { name: "Beef Curry", price: 150, available: true },
  { name: "Botti Fry", price: 70, available: true },
  { name: "Naadan Kozhi", price: 150, available: true },
  { name: "Chicken Curry", price: 120, available: true },
  { name: "Chicken Roast", price: 140, available: true },
  { name: "Chicken Fry", price: 150, available: true },
  { name: "Chicken 65", price: 160, available: true },
];

export default function AdminPage() {
  const [menu, setMenu] = useState(initialMenu);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [password, setPassword] = useState("");
const [loginError, setLoginError] = useState("");

  useEffect(() => {
  const savedMenu = localStorage.getItem("kombanMenu");

  if (savedMenu) {
    try {
      setMenu(JSON.parse(savedMenu));
    } catch {
      console.error("Could not load saved menu");
    }
  }
}, []);

useEffect(() => {
  localStorage.setItem("kombanMenu", JSON.stringify(menu));
}, [menu]);
const handleLogin = () => {
  if (password === "Komban@2026") {
    setIsLoggedIn(true);
    setLoginError("");
  } else {
    setLoginError("Incorrect password");
  }
};

  const changePrice = (index: number, price: number) => {
    setMenu((current) =>
      current.map((item, i) =>
        i === index ? { ...item, price } : item
      )
    );
  };

  const toggleAvailability = async (index: number) => {
  const item = menu[index];
  const newAvailability = !item.available;

  const { error } = await supabase
    .from("menu_items")
    .update({ available: newAvailability })
    .eq("name", item.name);

  if (error) {
    console.error("Supabase update failed:", error);
    alert("Could not update item. Please try again.");
    return;
  }

  setMenu((current) =>
    current.map((menuItem, i) =>
      i === index
        ? { ...menuItem, available: newAvailability }
        : menuItem
    )
  );
};
if (!isLoggedIn) {
  return (
    <main className="min-h-screen bg-yellow-400 flex items-center justify-center p-6 text-black">
      <div className="w-full max-w-md rounded-2xl bg-black p-8 text-white shadow-xl">
        <h1 className="text-3xl font-black text-center">KOMBAN ADMIN</h1>

        <p className="mt-2 text-center text-gray-300">
          Restaurant Control Panel
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          placeholder="Enter admin password"
          className="mt-8 w-full rounded-xl bg-white p-4 text-black"
        />

        {loginError && (
          <p className="mt-3 text-red-400">{loginError}</p>
        )}

        <button
          onClick={handleLogin}
          className="mt-4 w-full rounded-xl bg-yellow-400 p-4 font-bold text-black"
        >
          LOGIN
        </button>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-yellow-400 p-6 text-black">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black">KOMBAN ADMIN</h1>
        <p className="mt-1 text-lg">Restaurant Control Panel</p>

        <div className="mt-8 rounded-2xl bg-black p-6 text-white">
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <p className="mt-1 text-gray-300">
            Change prices and control item availability.
          </p>

          <div className="mt-6 space-y-4">
            {menu.map((item, index) => (
              <div
                key={item.name}
                className="rounded-xl bg-white p-4 text-black"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <div className="min-w-48 flex-1">
                    <h3 className="text-lg font-bold">{item.name}</h3>

                    <p
                      className={
                        item.available
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {item.available ? "● Available" : "● Sold Out"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹</span>

                    <input
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) =>
                        changePrice(index, Number(e.target.value))
                      }
                      className="w-24 rounded-lg border border-gray-300 p-2"
                    />
                  </div>

                  <button
                    onClick={() => toggleAvailability(index)}
                    className={
                      item.available
                        ? "rounded-lg bg-red-600 px-4 py-2 font-bold text-white"
                        : "rounded-lg bg-green-600 px-4 py-2 font-bold text-white"
                    }
                  >
                    {item.available ? "Mark Sold Out" : "Make Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}