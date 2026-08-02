"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
};

export default function AdminPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Specials");

 useEffect(() => {
  const loadMenu = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setMenu(data || []);
  };

  loadMenu();
}, []);
const handleLogin = async () => {
  setLoginError("");

  try {
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setIsLoggedIn(true);
      setPassword("");
    } else {
      setLoginError(data.error || "Incorrect password");
    }
  } catch {
    setLoginError("Login failed. Please try again.");
  }
};

  const changePrice = async (index: number, price: number) => {
  const item = menu[index];

  const { error } = await supabase
    .from("menu_items")
    .update({ price })
    .eq("id", item.id);

  if (error) {
    console.log(error);
alert(JSON.stringify(error));
    alert("Could not update price.");
    return;
  }

  setMenu((current) =>
    current.map((menuItem, i) =>
      i === index
        ? { ...menuItem, price }
        : menuItem
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
                      onBlur={(e) =>
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