"use client";
import { useState } from 'react';

export default function Editor({ value, onChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 
    dark:border-gray-700 rounded-lg">
      <div className="border-b border-gray-200 dark:border-gray-700 p-2 
      flex gap-2">
        <button
          type="button"
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          onClick={() => document.execCommand('bold')}
        >
          B
        </button>
        <button
          type="button"
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded italic"
          onClick={() => document.execCommand('italic')}
        >
          I
        </button>
        <button
          type="button"
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded underline"
          onClick={() => document.execCommand('underline')}
        >
          U
        </button>
      </div>
      
      <div
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none"
        onInput={(e) => onChange?.(e.target.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    </div>
  );
}