"use client";

import { useState } from "react";
interface MenuData {
[key: string]: {
 id: string;
 label: string;
 intro: string;
 items: { name: string; desc: string; price: string }[];
 }
}

const menu: MenuData = menuData as unknown as MenuData;
  [key: string]: {
    id: string;
    label: string;
    intro: string;
    items: { name: string; desc: string; price: string }[];
  }
}

const menu = menuData as MenuData;
import FadeUp from "@/components/FadeUp";

function MenuSection({ title, items }: { title: string; items: any[] }) {
  return (
    <section className="py-6">
      <h2 className="text-knife-gold font-display text-2xl mb-4">
        {title}
      </h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between py-1">
            <span className="text-knife-cream font-body">{item.name}</span>
            <span className="text-knife-cream font-body">${item.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("Steaks");

  const tabs = Object.keys(menuData);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center pb-8">
        <h1 className="text-knife-cream font-display text-6xl">
          Menu
        </h1>
        <p className="text-knife-gold font-body text-lg mt-2">
          Discover our variety of dishes
        </p>
      </div>
      <FadeUp className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`$button-knife-gold hover:bg-knife-gold text-lg px-3 py-1 rounded`}
          >
            {tab}
          </button>
        ))}
      </FadeUp>
      <FadeUp>
        {tabs.map((tab) =>
          activeTab === tab ? (
            <MenuSection key={tab} title={tab} items={menuData[tab]} />
          ) : null
        )}
      </FadeUp>
    </div>
  );
}
