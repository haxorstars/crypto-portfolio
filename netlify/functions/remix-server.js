const { createRequestHandler } = require('@remix-run/netlify');

exports.handler = async (event, context) => {
  const request = event;
  console.log("Handling request:", request); // Log permintaan yang diterima
  
  try {
    const handler = createRequestHandler({
      getLoadContext() {
        // Konteks tambahan jika diperlukan
      },
    });
    
    return await handler(request, context);
  } catch (err) {
    console.error("Handler error:", err);  // Log error untuk debugging
    return {
      statusCode: 500,
      body: `Error: ${err.message}`,
    };
  }
};
