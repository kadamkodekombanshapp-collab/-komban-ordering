export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-100 text-black">

      {/* Header */}
      <section className="bg-yellow-500 py-10 shadow-lg">
        <div className="max-w-6xl mx-auto text-center px-6">
          <img
            src="/logo.jpg"
            alt="Komban Toddy Shop"
            className="mx-auto w-56 rounded-lg shadow-lg"
          />

          <h1 className="text-5xl font-extrabold mt-6">
            Komban Toddy Shop
          </h1>

          <p className="text-xl mt-3">
            Good Toddy • Better Food
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="tel:+917010204342"
              className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/917010204342"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6">
          Welcome to Komban Toddy Shop
        </h2>

        <p className="text-lg leading-8">
          Experience authentic Kerala toddy and traditional food served fresh
          every day. Enjoy delicious seafood, naadan dishes, duck roast,
          beef fry, pork fry and much more in a beautiful Kerala atmosphere.
        </p>
      </section>

      {/* Contact */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-8">
            Contact Us
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              📍 N.H. Bye-Pass Road,
              Salem–Kanyakumari Highway,
              Kadamkode,
              Kalmandapam,
              Palakkad,
              Kerala – 678013
            </p>

            <p>📞 +91 7010204342</p>

            <p>💬 WhatsApp: +91 7010204342</p>

            <p>🕗 Open Daily: 8:00 AM – 8:00 PM</p>

          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-16 max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8">
          Our Popular Menu
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            ["Duck Roast","₹150"],
            ["Pork Fry","₹150"],
            ["Beef Fry","₹150"],
            ["Beef Roast","₹160"],
            ["Chicken Roast","₹140"],
            ["Chicken Fry","₹150"],
            ["Chicken Curry","₹120"],
            ["Crab Roast","₹240"],
            ["Karimeen Pollichathu","₹250"],
            ["Kappa","₹20"],
            ["Porotta","₹15"],
            ["Appam","₹15"]
          ].map(([item,price])=>(
            <div
              key={item}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold">{item}</h3>
              <p className="text-yellow-700 font-bold text-xl mt-2">
                {price}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-black text-white py-8 text-center">
        © 2026 Komban Toddy Shop • All Rights Reserved
      </footer>

    </main>
  );
}