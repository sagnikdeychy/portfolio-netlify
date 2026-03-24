const { createClient } = require("@supabase/supabase-js");

// Supabase credentials (set in Netlify environment variables)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Message saved!" }) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
  }
};