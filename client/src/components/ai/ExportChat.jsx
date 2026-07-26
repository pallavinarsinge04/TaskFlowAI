import { jsPDF } from "jspdf";
import {
  FaFilePdf,
  FaFileAlt,
  FaMarkdown,
  FaPrint,
  FaDownload,
} from "react-icons/fa";

function ExportChat({ messages = [] }) {
  const buildText = () => {
    return messages
      .map(
        (msg) =>
          `${msg.sender.toUpperCase()}:\n${msg.text}\n`
      )
      .join("\n---------------------------------\n\n");
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
  };

  const exportTXT = () => {
    downloadFile(
      buildText(),
      "TaskFlowAI-Chat.txt",
      "text/plain"
    );
  };

  const exportMarkdown = () => {
    const md = messages
      .map(
        (msg) =>
          `## ${msg.sender}\n\n${msg.text}\n`
      )
      .join("\n---\n");

    downloadFile(
      md,
      "TaskFlowAI-Chat.md",
      "text/markdown"
    );
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("TaskFlow AI Chat", 15, 15);

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(
      buildText(),
      180
    );

    pdf.text(lines, 15, 30);

    pdf.save("TaskFlowAI-Chat.pdf");
  };

  const printChat = () => {
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
      <head>
      <title>TaskFlow AI Chat</title>
      <style>
      body{
      font-family:Arial;
      padding:30px;
      line-height:1.8;
      }
      h1{
      color:#2563eb;
      }
      hr{
      margin:20px 0;
      }
      </style>
      </head>
      <body>

      <h1>TaskFlow AI Conversation</h1>

      ${messages
        .map(
          (m) => `
        <h3>${m.sender}</h3>
        <p>${m.text}</p>
        <hr/>
      `
        )
        .join("")}

      </body>
      </html>
    `);

    win.document.close();

    win.focus();

    win.print();
  };

  return (
    <div className="export-card">

      <h3>
        <FaDownload />
        Export Conversation
      </h3>

      <div className="export-buttons">

        <button
          onClick={exportPDF}
        >
          <FaFilePdf />
          PDF
        </button>

        <button
          onClick={exportTXT}
        >
          <FaFileAlt />
          TXT
        </button>

        <button
          onClick={exportMarkdown}
        >
          <FaMarkdown />
          Markdown
        </button>

        <button
          onClick={printChat}
        >
          <FaPrint />
          Print
        </button>

      </div>

    </div>
  );
}

export default ExportChat;