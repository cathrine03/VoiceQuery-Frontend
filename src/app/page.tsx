import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">

      {/* NAVBAR */}
      <nav className="border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="text-xl font-bold">
            VoiceQuery AI
          </div>

          <div className="flex items-center gap-6">

            <a
              href="#features"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              About
            </a>

            <Link
              href="/login"
              className="text-sm font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium"
            >
              Get Started
            </Link>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[85vh] flex items-center justify-center px-6">

        <div className="max-w-4xl text-center">

          <h1 className="text-6xl font-bold tracking-tight">
            VoiceQuery AI
          </h1>

          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
            Convert natural language into SQL queries,
            analyze data instantly, and generate business insights
            through an AI-powered analytics platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium"
            >
              Start Free
            </Link>

            <Link
              href="/login"
              className="px-6 py-3 rounded-lg border dark:border-gray-700 font-medium"
            >
              Sign In
            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 pb-24"
      >

        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg">
              Natural Language to SQL
            </h3>
            <p className="mt-2 text-gray-500">
              Ask questions in plain English and generate SQL instantly.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg">
              Voice Input
            </h3>
            <p className="mt-2 text-gray-500">
              Speak your query and let AI handle the rest.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg">
              Analytics Dashboard
            </h3>
            <p className="mt-2 text-gray-500">
              Track usage, performance, query history, and trends.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}