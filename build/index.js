var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));

// empty-module:~/utils/web3.client
var require_web3 = __commonJS({
  "empty-module:~/utils/web3.client"(exports, module) {
    module.exports = {};
  }
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/styles/tailwind.css
var tailwind_default = "/crypto-portfolio/build/_assets/tailwind-MBRQQ4NF.css";

// app/root.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(Outlet, {}),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader
});
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// app/components/Web3Provider.tsx
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { jsx as jsx3 } from "react/jsx-runtime";
function getLibrary(provider) {
  let library = new Web3Provider(provider);
  return library.pollingInterval = 12e3, library;
}
function Web3ProviderWrapper({ children }) {
  return /* @__PURE__ */ jsx3(Web3ReactProvider, { getLibrary, children });
}

// app/components/WalletConnect.tsx
var import_web3 = __toESM(require_web3(), 1);
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function WalletConnect() {
  let { active, account, activate, deactivate, library } = useWeb3React(), [balance, setBalance] = useState(""), [portfolioValue, setPortfolioValue] = useState(0);
  useEffect(() => {
    async function getBalance() {
      if (library && account)
        try {
          let balance2 = await library.getBalance(account), ethBalance = ethers.utils.formatEther(balance2);
          setBalance(ethBalance), setPortfolioValue(parseFloat(ethBalance) * 2e3);
        } catch (err) {
          console.error("Error fetching balance:", err), setBalance("0"), setPortfolioValue(0);
        }
    }
    getBalance();
  }, [library, account]);
  async function connect() {
    try {
      console.log("Attempting to connect..."), await activate(import_web3.injected), console.log("Connection successful");
    } catch (error) {
      console.error("Error connecting:", error);
    }
  }
  async function disconnect() {
    try {
      deactivate(), setBalance(""), setPortfolioValue(0);
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  }
  return /* @__PURE__ */ jsx4("div", { className: "bg-white rounded-lg shadow p-6 mb-8", children: active ? /* @__PURE__ */ jsxs2("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx4("p", { className: "text-sm text-gray-600", children: "Connected Wallet" }),
        /* @__PURE__ */ jsxs2("p", { className: "font-mono text-sm", children: [
          account?.slice(0, 6),
          "...",
          account?.slice(-4)
        ] })
      ] }),
      /* @__PURE__ */ jsx4(
        "button",
        {
          onClick: disconnect,
          className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600",
          children: "Disconnect"
        }
      )
    ] }),
    balance && /* @__PURE__ */ jsxs2("div", { className: "border-t pt-3", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx4("p", { className: "text-gray-600", children: "ETH Balance:" }),
        /* @__PURE__ */ jsxs2("p", { className: "font-semibold", children: [
          parseFloat(balance).toFixed(4),
          " ETH"
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-center mt-2", children: [
        /* @__PURE__ */ jsx4("p", { className: "text-gray-600", children: "Portfolio Value:" }),
        /* @__PURE__ */ jsxs2("p", { className: "font-semibold", children: [
          "$",
          portfolioValue.toLocaleString()
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs2("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx4("h3", { className: "text-lg font-medium mb-4", children: "Connect Your Wallet" }),
    /* @__PURE__ */ jsx4(
      "button",
      {
        onClick: connect,
        className: "bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600",
        children: "Connect"
      }
    )
  ] }) });
}

// app/routes/_index.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var loader = async () => {
  try {
    let prices = await (await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    )).json(), trending = await (await fetch(
      "https://api.coingecko.com/api/v3/search/trending"
    )).json();
    return json({
      prices,
      trending,
      error: null
    });
  } catch {
    return json({
      prices: {
        bitcoin: { usd: 0 },
        ethereum: { usd: 0 }
      },
      trending: { coins: [] },
      error: "Failed to fetch data"
    });
  }
};
function Index() {
  let { prices, trending, error } = useLoaderData();
  return /* @__PURE__ */ jsx5("div", { className: "min-h-screen bg-gray-100", children: /* @__PURE__ */ jsxs3("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-lg shadow-lg p-6 mb-8", children: [
      /* @__PURE__ */ jsx5("h1", { className: "text-3xl font-bold text-gray-900", children: "Crypto Portfolio Tracker" }),
      /* @__PURE__ */ jsx5("p", { className: "mt-2 text-gray-600", children: "Track your crypto assets and market prices in real-time" })
    ] }),
    /* @__PURE__ */ jsx5(Web3ProviderWrapper, { children: /* @__PURE__ */ jsx5(WalletConnect, {}) }),
    error && /* @__PURE__ */ jsx5("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6", children: error }),
    /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsx5("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx5("div", { className: "p-6", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx5(
          "img",
          {
            src: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
            alt: "Bitcoin",
            className: "w-8 h-8 mr-3"
          }
        ),
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsx5("h2", { className: "text-xl font-semibold text-gray-900", children: "Bitcoin (BTC)" }),
          /* @__PURE__ */ jsxs3("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: [
            "$",
            prices.bitcoin.usd.toLocaleString()
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx5("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx5("div", { className: "p-6", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx5(
          "img",
          {
            src: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
            alt: "Ethereum",
            className: "w-8 h-8 mr-3"
          }
        ),
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsx5("h2", { className: "text-xl font-semibold text-gray-900", children: "Ethereum (ETH)" }),
          /* @__PURE__ */ jsxs3("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: [
            "$",
            prices.ethereum.usd.toLocaleString()
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [
      /* @__PURE__ */ jsx5("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Trending Coins" }),
      /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: trending.coins?.map((coin) => /* @__PURE__ */ jsxs3("div", { className: "border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx5(
            "img",
            {
              src: coin.item.small,
              alt: coin.item.name,
              className: "w-8 h-8"
            }
          ),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx5("h3", { className: "font-medium text-gray-900", children: coin.item.name }),
            /* @__PURE__ */ jsx5("p", { className: "text-sm text-gray-500", children: coin.item.symbol })
          ] })
        ] }),
        /* @__PURE__ */ jsx5("div", { className: "mt-2", children: /* @__PURE__ */ jsxs3("p", { className: "text-sm text-gray-600", children: [
          "Rank #",
          coin.item.market_cap_rank
        ] }) })
      ] }, coin.item.id)) })
    ] })
  ] }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/crypto-portfolio/build/entry.client-KSK3WKQZ.js", imports: ["/crypto-portfolio/build/_shared/chunk-372FNWUZ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/crypto-portfolio/build/root-Z75GKA43.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/crypto-portfolio/build/routes/_index-BXVNBVPX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "8d570786", hmr: void 0, url: "/crypto-portfolio/build/manifest-8D570786.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/crypto-portfolio/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
