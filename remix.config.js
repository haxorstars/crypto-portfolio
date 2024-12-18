/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverBuildTarget: "vercel",
  server: "./api/index.js",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  browserNodeBuiltinsPolyfill: { 
    modules: { 
      events: true,
      buffer: true,
      util: true,
      process: true,
      stream: true
    } 
  }
};
