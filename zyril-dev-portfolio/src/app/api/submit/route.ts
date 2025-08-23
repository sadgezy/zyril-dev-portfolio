export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("✅ Received request body:", body);

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyqEB_gBq_lba9U4PQPqTdig2nXqnbQqHS05bZB99MO1qhDQXOHu8UOOLIjPswI08DLYA/exec";
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");
    const rawText = await response.text();

    console.log("📥 Raw response text:", rawText);
    console.log("📥 Response Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid response type",
          debug: rawText,
        }),
        { status: 500 },
      );
    }

    const data = JSON.parse(rawText);
    console.log("✅ JSON response parsed:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("❌ Error in /api/submit:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
