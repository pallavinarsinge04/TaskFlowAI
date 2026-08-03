import { useState } from "react";

import {
  FaRobot,
  FaUserCircle,
  FaCopy,
  FaCheck
} from "react-icons/fa";
import MessageActions from "./MessageActions";
import ReactMarkdown from "react-markdown";
import StreamingText from "./../../components/StreamingText";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageBubble({
  role,
  content
}) {

  const [copied, setCopied] = useState(false);

  const copyText = async () => {

    try {

      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      className={`message ${role}`}
    >

      <div className="avatar">

        {role === "assistant"
          ? <FaRobot />
          : <FaUserCircle />
        }

      </div>

      <div className="bubble">

        <ReactMarkdown

          components={{

            code({

              inline,
              className,
              children,

              ...props

            }) {

              const match =
                /language-(\w+)/.exec(
                  className || ""
                );

              return !inline && match ? (

                <SyntaxHighlighter

                  style={oneDark}

                  language={match[1]}

                  PreTag="div"

                  {...props}

                >

                  {String(children).replace(/\n$/, "")}

                </SyntaxHighlighter>

              ) : (

                <code
                  className={className}
                  {...props}
                >

                  {children}

                </code>

              );

            }

          }}

        >

          {content}

        </ReactMarkdown>

        <div className="message-footer">

          <span>

            {new Date().toLocaleTimeString([], {

              hour: "2-digit",

              minute: "2-digit"

            })}

          </span>

          <button

            className="copy-btn"

            onClick={copyText}

          >

            {copied
              ? <FaCheck />
              : <FaCopy />
            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default MessageBubble;