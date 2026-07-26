import { useState } from "react";
import {
  FaCopy,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { CopyToClipboard } from "react-copy-to-clipboard";

import toast from "react-hot-toast";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({
  language = "javascript",
  code = "",
}) {
  const [expanded, setExpanded] = useState(false);

  const lines = code.split("\n");

  const isLong = lines.length > 18;

  const displayedCode =
    expanded
      ? code
      : lines.slice(0, 18).join("\n");

  const downloadCode = () => {
    const blob = new Blob([code], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `code.${language}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Code Downloaded");
  };

  return (
    <div className="code-wrapper">

      {/* Header */}

      <div className="code-header">

        <span className="language-tag">
          {language.toUpperCase()}
        </span>

        <div className="code-actions">

          <CopyToClipboard
            text={code}
            onCopy={() =>
              toast.success("Copied")
            }
          >
            <button>
              <FaCopy />
              Copy
            </button>
          </CopyToClipboard>

          <button
            onClick={downloadCode}
          >
            <FaDownload />
            Download
          </button>

        </div>

      </div>

      {/* Code */}

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
      >
        {displayedCode}
      </SyntaxHighlighter>

      {isLong && (
        <button
          className="expand-btn"
          onClick={() =>
            setExpanded(!expanded)
          }
        >
          {expanded ? (
            <>
              <FaChevronUp />
              Show Less
            </>
          ) : (
            <>
              <FaChevronDown />
              Show More
            </>
          )}
        </button>
      )}

    </div>
  );
}

export default CodeBlock;