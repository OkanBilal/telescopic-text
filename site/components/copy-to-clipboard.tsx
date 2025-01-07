"use client";
import { useState } from "react";
import { Copy } from "./icons";

interface CopyButtonProps {
  content: string; // The content to copy
}

const CopyButton = ({ content }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="absolute top-2 right-2">
      {copied && (
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-2 font-medium rounded transition-opacity duration-300 ${
            copied ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          Copied!
        </div>
      )}
      <button
        onClick={handleCopy}
        className=" px-2 py-1 text-sm  focus:outline-none"
      >
        <Copy />
      </button>
    </div>
  );
};

export default CopyButton;
