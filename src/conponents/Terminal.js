import React from "react";
import Typewriter from "typewriter-effect";

const TerminalControl = () => {
  return (
    <div className="w-full max-w-3xl mx-auto overflow-hidden bg-gray-800 rounded">
      {/* terminal header */}
      <div className="relative px-5 py-4 bg-gray-900">
        <span className="flex space-x-2">
          <span className="block w-3 h-3 bg-green-500 rounded-full" />
          <span className="block w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="block w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span className="absolute font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          bash ~ <span className="text-green-500">braswelljr</span>
        </span>
      </div>

      {/* terminal body */}
      <div className="px-5 py-4 min-h-[22.5rem] text-white">
        <div className="grid grid-cols-[0.2fr,9.8fr] auto-rows-auto space-x-3">
          <span className="col-span-1 text-green-500">$</span>
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString(`<span class="col-start-2 col-end-11 w-full">glab list issues</span>`)
                .pasteString(
                  `<div class="col-start-2 col-end-11 w-full">Showing issues 1 of 1 on glab</div>`
                )
                .pasteString(
                  `<div class="col-start-2 col-end-11 w-full flex space-x-3 text-sm"><span class="text-green-500">#21</span><span>Update Documentation</span><span class="text-blue-300">[enhancement]</span><span class="text-gray-300 text-opacity-60">30 minutes ago</span></div>`
                )
                .pauseFor(5000)
                .start(100);
            }}
            options={{ loop: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalControl;
