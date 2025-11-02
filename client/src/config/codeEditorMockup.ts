/**
 * Code editor mockup configuration for the Hero section
 * Contains HTML code lines with syntax highlighting
 */

export interface CodeLine {
  indent: number;
  color: string;
  text: string;
}

export const codeEditorMockup: CodeLine[] = [
  { indent: 0, color: "text-blue-400", text: "<!DOCTYPE html>" },
  { indent: 0, color: "text-blue-400", text: "<html>" },
  { indent: 1, color: "text-blue-400", text: "<head>" },
  { indent: 2, color: "text-yellow-400", text: '<meta charset="UTF-8">' },
  { indent: 2, color: "text-yellow-400", text: '<title>Smart Klix</title>' },
  { indent: 1, color: "text-blue-400", text: "</head>" },
  { indent: 1, color: "text-blue-400", text: "<body>" },
  { indent: 2, color: "text-yellow-400", text: '<h1>Launch. Grow.</h1>' },
  { indent: 2, color: "text-white/80", text: '<p>AI-powered solutions</p>' },
  { indent: 1, color: "text-blue-400", text: "</body>" },
  { indent: 0, color: "text-blue-400", text: "</html>" },
];

export const editorConfig = {
  backgroundColor: "#0A1628",
  fileName: "index.html",
  windowControls: {
    close: "bg-red-500",
    minimize: "bg-yellow-500",
    maximize: "bg-green-500",
  },
} as const;
