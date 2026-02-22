import Link from "next/link";
import Image from "next/image";

const designs = [
  {
    image: "/design.webp",
    title: "Modern Minimal",
    description: "Living Room • Soft Lighting"
  },
  {
    image: "/design2.jpg",
    title: "Luxury Classic",
    description: "Bedroom • Royal Interior"
  },
  {
    image: "/design3.jfif",
    title: "Scandinavian",
    description: "Workspace • Natural Wood"
  },
  {
    image: "/design4.jfif",
    title: "Bohemian",
    description: "Studio • Artistic Decor"
  },
  {
    image: "/design5.jpg",
    title: "Industrial",
    description: "Loft • Dark Theme"
  },
  {
    image: "/design6.webp",
    title: "Contemporary",
    description: "Dining • Elegant Finish"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-200 blur-3xl opacity-40" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-200 blur-3xl opacity-30" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="font-extrabold tracking-tight text-xl">
            AI Interior Studio
          </Link>

          {/* CENTER NAV */}
          {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#gallery" className="hover:text-black transition">
              Gallery
            </Link>
            <Link href="#features" className="hover:text-black transition">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-black transition">
              Pricing
            </Link>
          </nav> */}

          {/* RIGHT: Login / Signup */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-semibold px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition"
            >
              Login
            </Link>

            <Link
              href="/sign-up"
              className="text-sm font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border bg-white">
              ✨ AI Room Redesign • Photorealistic
            </p>

            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight">
              Turn your room into a{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                designer interior
              </span>{" "}
              — instantly.
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Upload a room photo, select a style, and our AI generates a
              realistic redesign while keeping the layout.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/sign-in"
                className="inline-flex justify-center text-sm font-semibold px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition"
              >
                Upload & Generate
              </Link>

              <Link
                href="#gallery"
                className="inline-flex justify-center text-sm font-semibold px-6 py-3 rounded-md border border-gray-200 hover:bg-gray-50 transition"
              >
                View Examples
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: BEFORE / AFTER */}
          <div className="relative">
            <div className="rounded-2xl border bg-white shadow-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Before / After Preview</p>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  Example
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                
                {/* BEFORE */}
                <div className="relative rounded-xl overflow-hidden border h-52">
                  <img
                    src="https://cdn.home-designing.com/wp-content/uploads/2019/10/before-and-after-bedroom-renovation-decor-ideas-for-modern-homes-600x400.jpg"
                    alt="Before Room"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    Before
                  </div>
                </div>

                {/* AFTER */}
                <div className="relative rounded-xl overflow-hidden border h-52">
                  <img
                    src="https://cdn.home-designing.com/wp-content/uploads/2019/10/luxurious-modern-living-room-before-and-after-photoset-dining-room-renovation-motivation-600x400.jpg"
                    alt="After Room"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                    After
                  </div>
                </div>

              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border p-4">
                <p className="text-sm font-semibold">Try styles like:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Modern", "Minimal", "Luxury", "Boho", "Industrial"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-white border"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold">Design Gallery</h2>
          <p className="mt-2 text-gray-600">
            Explore some example transformations.
          </p>

         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
  {designs.map((item, i) => (
    <div
      key={i}
      className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition"
    >
      <div className="relative h-48">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <p className="font-bold text-sm">{item.title}</p>
        <p className="text-xs text-gray-600 mt-1">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} AI Interior Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
