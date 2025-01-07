"use client";

import { Drawer } from "vaul";
import React from "react";
import TelescopicText from "@telescopic-text/react";
import { text } from "@/data/text";

export default function VaulDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden bg-white hover:shadow-lg text-black  rounded-md px-1 py-2 sm:px-3 sm:py-2  shadow-slate-300 shadow-sm text-sm font-medium transition-all duration-200">
        See Example
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[520px] fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-4">
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8 "
              />
              <Drawer.Title className="font-semibold text-gray-900 pb-2">
                Telescopic Text
              </Drawer.Title>
              <TelescopicText baseClassName="fade-in font-serif text-lg ease-in transition-all duration-300 " expandableClassName="font-serif text-lg bg-slate-200 hover:bg-slate-300 rounded-sm py-0.5 transition-colors duration-300 mr-1 ease-in" nodes={text} 
              
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
