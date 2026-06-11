import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      title: "Natural Language to SQL",
      description:
        "Convert plain English questions into executable SQL queries instantly.",
    },
    {
      title: "Voice Queries",
      description:
        "Speak your questions using voice input and generate SQL automatically.",
    },
    {
      title: "Query Explanation",
      description:
        "AI explains generated SQL in simple business language.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track usage, query trends, execution metrics and activity.",
    },
    {
      title: "Query History",
      description:
        "Access all previously generated queries and results.",
    },
    {
      title: "CSV Export",
      description:
        "Export query results instantly for reporting and analysis.",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">

      {/* NAVBAR */}
      <nav className="border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold">
            VoiceQuery AI
          </h1>

          <div className="flex items-center gap-4">

            <Link
              href="/login"
              className="px-4 py-2 rounded border dark:border-gray-700"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-medium"
            >
              Get Started
            </Link>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <div className="inline-block px-4 py-2 rounded-full border dark:border-gray-700 mb-6 text-sm">
          AI-Powered Analytics Platform
        </div>

        <h1 className="text-6xl font-bold leading-tight">
          Ask Questions.
          <br />
          Get SQL.
          <br />
          Discover Insights.
        </h1>

        <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          VoiceQuery AI transforms natural language and voice commands
          into SQL queries, executes them against your database,
          and explains results in plain English.
        </p>


        {/* TECH STACK */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">

          {[
            "Next.js",
            "FastAPI",
            "PostgreSQL",
            "Groq AI",
            "TailwindCSS",
            "JWT Auth",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full border dark:border-gray-700 text-sm"
            >
              {tech}
            </span>
          ))}

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            ["95%+", "Query Accuracy"],
            ["< 1 sec", "Response Time"],
            ["Voice + Text", "Input Modes"],
            ["Role-Based", "Security"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border rounded-xl p-6 text-center dark:border-gray-800"
            >
              <h3 className="text-3xl font-bold">
                {value}
              </h3>

              <p className="mt-2 text-gray-500">
                {label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="border rounded-xl p-6 dark:border-gray-800 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            "Ask a Question",
            "Generate SQL",
            "Execute Query",
            "View Insights",
          ].map((step, index) => (
            <div
              key={step}
              className="border rounded-xl p-6 text-center dark:border-gray-800"
            >
              <div className="text-3xl font-bold mb-4">
                {index + 1}
              </div>

              <p>{step}</p>
            </div>
          ))}

        </div>

      </section>

      {/* ARCHITECTURE */}
      <section className="max-w-5xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          System Architecture
        </h2>

        <div className="border rounded-xl p-10 dark:border-gray-800 text-center space-y-4">

          <div className="font-semibold">
            Frontend (Next.js + TypeScript)
          </div>

          <div>↓</div>

          <div className="font-semibold">
            FastAPI Backend
          </div>

          <div>↓</div>

          <div className="font-semibold">
            Groq LLM Layer
          </div>

          <div>↓</div>

          <div className="font-semibold">
            PostgreSQL Database
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="rounded-2xl border dark:border-gray-800 p-12 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Explore Your Data?
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Generate SQL, analyze data, and gain insights in seconds.
          </p>

          <div className="flex justify-center gap-4 mt-8">

            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="px-6 py-3 rounded-lg border dark:border-gray-700"
            >
              Sign In
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t dark:border-gray-800 py-8 mt-10">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="font-bold text-xl">
            VoiceQuery AI
          </h3>

          <p className="mt-2 text-gray-500">
            Enterprise Voice-to-SQL Analytics Platform
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Built by Cathrine Grace
          </p>

        </div>

      </footer>

    </main>
  );
}