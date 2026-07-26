import { jsPDF } from "jspdf";
import {
  FaFilePdf,
  FaFileAlt,
  FaMarkdown,
  FaPrint,
} from "react-icons/fa";

function ExportChat({ messages = [] }) {

  const createText = () => {
    return messages
      .map(
        (msg) =>
          `${msg.sender.toUpperCase()}:\n${msg.text}`
      )
      .join("\n\n---------------------------------\n\n");
  };

  const downloadFile = (content, fileName, type) => {
    const blob = new Blob([content], {
      type,
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    link.click();

    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text("TaskFlow AI Chat", 15, 20);

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(
      createText(),
      180
    );

    pdf.text(lines, 15, 35);

    pdf.save("TaskFlowAI-Chat.pdf");
  };

  const exportTXT = () => {
    downloadFile(
      createText(),
      "TaskFlowAI-Chat.txt",
      "text/plain"
    );
  };

  const exportMarkdown = () => {
    const md = messages
      .map(
        (m) =>
          `## ${m.sender}\n\n${m.text}`
      )
      .join("\n\n---\n\n");

    downloadFile(
      md,
      "TaskFlowAI-Chat.md",
      "text/markdown"
    );
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
      padding:40px;
      line-height:1.8;
      }
      h2{
      color:#2563eb;
      }
      hr{
      margin:20px 0;
      }
      </style>

      </head>

      <body>

      <h2>TaskFlow AI Conversation</h2>

      ${messages
        .map(
          (m) => `
          <h4>${m.sender}</h4>
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
    <div className="export-chat">

      <h3>Export Conversation</h3>

      <div className="export-grid">

        <button onClick={exportPDF}>
          <FaFilePdf />
          PDF
        </button>

        <button onClick={exportTXT}>
          <FaFileAlt />
          TXT
        </button>

        <button onClick={exportMarkdown}>
          <FaMarkdown />
          Markdown
        </button>

        <button onClick={printChat}>
          <FaPrint />
          Print
        </button>

      </div>

    </div>
  );
}

export default ExportChat;