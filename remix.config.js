/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  publicPath: "/crypto-portfolio/build/",
  assetsBuildDirectory: "public/build",
  baseUrl: "/crypto-portfolio",
  future: {
    v2_dev: true,
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