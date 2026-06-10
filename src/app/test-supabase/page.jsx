import { supabase } from "@/shared/lib/supabaseClient";

export default async function TestSupabasePage() {
  const { data, error } = await supabase.from("species").select("*");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>

      {error && (
        <p className="text-red-400">Error: {error.message}</p>
      )}

      {!data || data.length === 0 ? (
        <p>No species found. Add one in Supabase!</p>
      ) : (
        <ul className="space-y-2">
          {data.map((plant) => (
            <li
              key={plant.id}
              className="p-3 bg-slate-800 rounded-lg"
            >
              <p className="font-semibold">{plant.common_name}</p>
              <p className="text-slate-300 text-sm">
                {plant.scientific_name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
