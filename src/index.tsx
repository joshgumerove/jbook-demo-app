import * as esbuild from "esbuild-wasm";
import React, { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
 <html>
  <head>
    <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data)
        } catch(err){
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red; text-align: center;"><h4>Runtime Error</h4>' + err + '</div>'
          throw err;
        }
      }, false)
    </script>
    </body>
  </head>
 </html>
  `;

  return (
    <div>
      <CodeEditor initialValue="const a = 1" onChange={(value) => setInput(value)}/>
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        srcDoc={html}
        title="preview"
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
