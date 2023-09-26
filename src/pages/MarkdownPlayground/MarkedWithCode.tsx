import { useEffect, useState } from "react";
// import marked from "marked";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import ClipboardJS from "clipboard";

const escapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeForHTML(input) {
  return input.replace(/([&<>'"])/g, (char) => escapeMap[char]);
}

function Marked() {
  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-btn", {
      // text: function (trigger) {
      //   return trigger.parentNode.querySelector('code');
      // },
      target: function (trigger: Element) {
        return trigger.parentNode.querySelector("code");
      },
      onCopy: function (e) {
        e.trigger.setSelectionRange(0, 0);
      },
    });
    clipboard.on("success", (e) => {
      e.trigger.innerHTML = "Copied✅";
      setTimeout(() => {
        e.trigger.innerHTML = "Copy";
      }, 2000);
      e.clearSelection();
    });
  }, []);

  const [text, setText] = useState("");

  const renderer = new marked.Renderer();
  renderer.code = (code, language) => {
    // Check whether the given language is valid for highlight.js.
    const validLang = !!(language && hljs.getLanguage(language));

    // Highlight only if the language is valid.
    // highlight.js escapes HTML in the code, but we need to escape by ourselves
    // when we don't use it.
    const highlighted = validLang
      ? hljs.highlight(language, code).value
      : escapeForHTML(code);
    // Render the highlighted code with `hljs` class.

    const copyButton =
      '<button class="copy-btn rounded px-2 py-1 bg-slate-500 hover:bg-slate-600 absolute top-1 right-1"> Copy</button>';

    return `<pre class="relative"> ${copyButton} <code class="hljs ${language}">${highlighted}</code></pre>`;
  };

  // vue
  // renderer.code = function (code, language) {
  //   const highlightedCode = language
  //     ? hljs.highlight(language, code).value
  //     : code;
  //   // : hljs.highlightAuto(code).value;
  //   const copyButton =
  //     '<button class="copy-btn bg-teal-300 hover:bg-purple-300 absolute top-0 right-1">Copy</button>';
  //   // const codeBlock = `  <pre><code class="hljs ${language}"> <div class="copy">${copyButton}</div> ${highlightedCode}</code></pre>`;
  //   const codeBlock = `
  //            <pre class="relative">  ${copyButton} <code class="hljs ${language}"> ${highlightedCode}</code></pre>
  //            </div>`;
  //   return codeBlock;
  // };
  marked.setOptions({
    renderer,
  });

  const html = marked(text);
  // let html_docs = marked(text);

  return (
    <div className="grid h-screen w-screen grid-cols-2 bg-slate-200">
      <div className="  overflow-auto bg-slate-300">
        <textarea
          className="h-full w-full border-none p-4 "
          placeholder="Input here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div
        className="prose max-w-none overflow-auto bg-teal-50 px-2  py-4 prose-code:h-full prose-pre:m-0 prose-pre:p-0  "
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

export default Marked;
