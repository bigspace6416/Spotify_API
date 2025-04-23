import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="flex bg-amber-50 pt-[150px] fixed h-screen">
    <div className=" w-1/6  text-amber-950">
      <Link
        href="/Artist/Aly_fila"
        className="text-2xl font-bold p-4 hover:bg-gray-200 block"
      >
        <p>Custom Aly_fila</p>
      </Link>
      <Link
        href="/Artist/ASOT"
        className="text-2xl font-bold p-4 hover:bg-gray-200 block z-0"
      >
        <p>Custom ASOT</p>
      </Link>

      <Link
        href="/Artist/Interplay"
        className="text-2xl font-bold p-4 hover:bg-gray-200 block"
      >
        <p>Custom Interplay</p>
      </Link>
    </div>
    </div>
  );
};
export default Sidebar;
