import Head from "next/head";
import GitUrlForm from "../components/GitUrlForm";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ML Runner: Run ML Models from GitHub</title>
      </Head>
      <main className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center mt-8">Run ML Models from GitHub</h1>
        <GitUrlForm />
      </main>
    </div>
  );
}
