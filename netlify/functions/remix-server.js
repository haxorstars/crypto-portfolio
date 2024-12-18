const { createRequestHandler } = require('@remix-run/netlify');

exports.handler = async (event, context) => {
  const request = event;
  const { createRequestHandler } = require('@remix-run/netlify');

  try {
    return await createRequestHandler({
      getLoadContext() {
        // Return any additional context for your app here
      },
    })(request, context);
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error: ${err.message}`,
    };
  }
};
