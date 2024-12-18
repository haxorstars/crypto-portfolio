/** @type {import('@remix-run/dev').AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    serverBuildTarget: "netlify",
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