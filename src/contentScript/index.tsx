import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ContentScript } from "./ContentScript";
import tawilwindCss from "../assets/tailwind.css?inline";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentScript />
    </QueryClientProvider>
  );
}

async function init() {
  const appContainerRoot = document.createElement("div");
  appContainerRoot.id = "kan__translator__extension__root";
  document.body.appendChild(appContainerRoot);

  // Create the shadow root
  const shadowRoot = appContainerRoot.attachShadow({ mode: "open" });

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`${tawilwindCss}`);
  shadowRoot.adoptedStyleSheets.push(sheet);

  const appContainer = document.createElement("div");
  appContainer.id = "kan__translator__extension__shadow";
  shadowRoot.appendChild(appContainer);

  const root = createRoot(appContainer);
  root.render(<App />);
}

window.onload = (_event) => {
  console.log("Page is fully loaded");
  init();
};
