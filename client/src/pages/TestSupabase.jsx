import { useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

function TestSupabase() {

  useEffect(() => {

    async function loadUsers() {

      const { data, error } = await supabase
        .from("users")
        .select("*");

      console.log("Users:", data);
      console.log("Error:", error);

    }

    loadUsers();

  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Supabase Test</h1>
      <p>Open the browser console (F12 → Console).</p>
    </div>
  );
}

export default TestSupabase;