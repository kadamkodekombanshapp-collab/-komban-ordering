"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  name: string;
  price: number;
  category: string;
};

const menu: MenuItem[] = [
  { name: "Duck Roast", price: 150, category: "Specials" },
  { name: "Pork Fry", price: 150, category: "Specials" },
  { name: "Crab Roast", price: 240, category: "Seafood" },
  { name: "Beef Fry", price: 150, category: "Beef" },
  { name: "Beef Roast", price: 160, category: "Beef" },
  { name: "Beef Curry", price: 150, category: "Beef" },
  { name: "Botti Fry", price: 70, category: "Specials" },
  { name: "Naadan Kozhi", price: 150, category: "Chicken" },
  { name: "Chicken Curry", price: 120, category: "Chicken" },
  { name: "Chicken Roast", price: 140, category: "Chicken" },
  { name: "Chicken Fry", price: 150, category: "Chicken" },
  { name: "Chicken 65", price: 160, category: "Chicken" },
  { name: "Pepper Chicken", price: 160, category: "Chicken" },
  { name: "Kaada Fry", price: 140, category: "Specials" },
  { name: "Kappa", price: 50, category: "Sides" },
  { name: "Pathiri", price: 10, category: "Sides" },
  { name: "Porotta", price: 15, category: "Sides" },
  { name: "Chapathi", price: 15, category: "Sides" },
  { name: "Appam", price: 15, category: "Sides" },
  { name: "Idiyappam", price: 15, category: "Sides" },
  { name: "Omelette", price: 40, category: "Egg" },
  { name: "Egg Bhurji", price: 50, category: "Egg" },
];

  export default function Home() {
  const [table, setTable] = useState("");

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  setTable(params.get("table") || "");
}, []);
  // your existing code continues here
  const [cart, setCart] = useState<Record<string, number>>({});

  const changeQuantity = (name: string, change: number) => {
    setCart((current) => {
      const quantity = Math.max((current[name] || 0) + change, 0);
      const updated = { ...current };

      if (quantity === 0) delete updated[name];
      else updated[name] = quantity;

      return updated;
    });
  };

  const total = menu.reduce(
    (sum, item) => sum + (cart[item.name] || 0) * item.price,
    0
  );

  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const orderWhatsApp = () => {
    const selected = menu.filter((item) => cart[item.name]);

    if (!selected.length) {
      alert("Please add something to your order.");
      return;
    }

    const lines = selected.map(
      (item) =>
        `${item.name} x ${cart[item.name]} = ₹${
          item.price * cart[item.name]
        }`
    );

    const message =
  `🍽️ KOMBAN TODDY SHOP\n` +
  `TABLE ${table || "N/A"}\n\n` +
  `ORDER:\n${lines.join("\n")}` +
  `\n\nTotal: ₹${total}`;

    window.open(
      `https://wa.me/917010204342?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const categories = [...new Set(menu.map((item) => item.category))];

  return (
    <main className="min-h-screen bg-[#fffaf0] text-black">
      <header className="bg-[#f5a623] px-5 py-10 text-center">
        <img
          src="/logo.jpg"
          alt="Komban Toddy Shop"
          className="mx-auto mb-4 w-44 rounded-xl shadow-lg"
        />

        <h1 className="text-4xl font-bold">Komban Toddy Shop</h1>
        <p className="mt-2 text-lg">Good Toddy • Better Food</p>
        <p className="mt-2">Kadamkode, Palakkad</p>
        {table && (
  <div className="mt-4 inline-block rounded-full bg-black px-5 py-2 font-bold text-white">
    TABLE {table}
  </div>
)}
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="mb-2 text-3xl font-bold">Order Food</h2>
        <p className="mb-8 text-gray-600">
          Select your dishes and send your order directly through WhatsApp.
        </p>

        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h3 className="mb-4 border-b-2 border-orange-400 pb-2 text-2xl font-bold">
              {category}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              {menu
                .filter((item) => item.category === category)
                .map((item) => {
                  const quantity = cart[item.name] || 0;

                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl bg-white p-5 shadow"
                    >
                      <div>
                        <h4 className="text-lg font-bold">{item.name}</h4>
                        <p className="font-semibold text-orange-600">
                          ₹{item.price}
                        </p>
                      </div>

                      {quantity === 0 ? (
                        <button
                          onClick={() => changeQuantity(item.name, 1)}
                          className="rounded-xl bg-black px-5 py-2 font-bold text-white"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => changeQuantity(item.name, -1)}
                            className="h-9 w-9 rounded-full bg-gray-200 text-xl font-bold"
                          >
                            −
                          </button>

                          <span className="font-bold">{quantity}</span>

                          <button
                            onClick={() => changeQuantity(item.name, 1)}
                            className="h-9 w-9 rounded-full bg-orange-500 text-xl font-bold text-white"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </section>

      {itemCount > 0 && (
        <div className="sticky bottom-0 border-t bg-white p-4 shadow-2xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div>
              <p className="font-bold">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
              <p className="text-xl font-bold">₹{total}</p>
            </div>

            <button
              onClick={orderWhatsApp}
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}

      <footer className="bg-black px-4 py-8 text-center text-white">
        © 2026 Komban Toddy Shop • Kadamkode, Palakkad
      </footer>
    </main>
  );
}