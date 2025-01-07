import CopyButton from "@/components/copy-to-clipboard";
import Link from "next/link";
import { Button } from "@/components/button";
import VaulDrawer from "@/components/drawer";
import { Github, Npm } from "@/components/icons";


const Home = () => {
  return (
    <div className="max-w-5xl mx-auto py-24 px-4">
      <div className="flex flex-col items-center">
        <p className="text-black text-center font-semibold tracking-tight text-4xl mb-2">
          TelescopicText
        </p>
        <p className="text-center mb-6">
          An expandable text component for React
        </p>
        <div className="mb-16">
          <VaulDrawer />
        </div>
        <div className="mb-24 items-center flex">
          <Link href={"https://github.com/okanbilal/telescopic-text"}>
            <Button
              leftIcon={<Github color="#fff" />}
              className=" bg-black shadow-sm  shadow-slate-300 hover:shadow-slate-300 hover:shadow-lg text-white rounded-md px-1 py-2 sm:px-3 sm:py-2 border border-neutral-800 text-sm font-medium mr-4 transition-all duration-200"
            >
              See on GitHub
            </Button>
          </Link>
          <Link href={"https://www.npmjs.com/package/@telescopic-text/react"}>
            <Button
              leftIcon={<Npm color="#fff" />}
              className=" bg-slate-50 font-mono hover:shadow-lg  text-black  rounded-md px-1 py-2 sm:px-3 sm:py-2.5  shadow-slate-300 shadow text-sm font-medium transition-all duration-200"
            >
              v1.0.1
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative max-w-3xl mx-auto mb-16">
        <pre className="text-sm text-black bg-slate-50 rounded shadow-sm shadow-slate-300 py-3 px-2 relative">
          <code>npm i @telescopic-text/react</code>
        </pre>
        <CopyButton content="npm install telescopic-text-react" />
      </div>
      <div className="max-w-3xl mx-auto ">
        <p className="font-semibold text-lg mb-2">Usage</p>
        <p className=" text-black mb-4">
          Import the <code>TelescopicText</code> component and pass a nested
          structure as the <code>text</code> prop:
        </p>
      </div>
      <div className="max-w-3xl mx-auto relative">
        <pre className="text-sm  tracking-tight text-black bg-slate-50 rounded shadow-sm shadow-slate-300 p-2 overflow-x-auto whitespace-pre-wrap break-words ">
          <code>
            {`import TelescopicText from "@telescopic-text/react";
  const text = [
    {
      word: "Hello",
      expandTo: [{ word: "World!", 
      expandTo: ["Welcome to Telescopic Text."] }],
    },
  ];
<TelescopicText nodes={text} />;`}
          </code>
        </pre>
        <CopyButton
          content={`import TelescopicText from "@telescopic-text/react";
  const text = [
    {
      word: "Hello",
      expandTo: [{ word: "World!", 
      expandTo: ["Welcome to Telescopic Text."] }],
    },
  ];
<TelescopicText nodes={text} />;`}
        />
      </div>
    </div>
  );
};

export default Home;
