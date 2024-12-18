const { createRequestHandler } = require('@remix-run/netlify');

exports.handler = async (event, context) => {
  const loadContext = getLoadContext(event);

  return createRequestHandler({
    getLoadContext: () => loadContext,
  })(event, context);
};

function getLoadContext(event) {
  const headers = event.headers || {};
  const userAgent = headers['user-agent'] || 'unknown';

  return {
    userAgent,
  };
}