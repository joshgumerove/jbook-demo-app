import "./preview.css";
import React, { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
}

const html = `
<html>
 <head>
   <style>html {background-color: white;}</style>
 </head>
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
</html>
 `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
