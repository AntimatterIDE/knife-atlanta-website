"use client";

import { useState } from "react";

interface Item {
  name: string;
  desc: string;
  price: string;
}

interface MenuSection {
  id: string;
  label: string;
  intro: string;
  items: Item[];
}

interface MenuData {
  [key: string]: MenuSection;
}

const menuData: MenuData = {
  // Sample data structure
  steaks: {
    id: "steaks",
    label: "Steaks",
    intro: "Finest cuts of meat",
    items: [
      { name: "Ribeye", desc: "Juicy and tender", price: "$45" }
    ]
  }
  // Additional menu sections can be included here
};

interface MenuProps {
  activeTab: string;
  tabs: string[];
}

const Menu: React.FC<MenuProps> = ({ activeTab, tabs }) => {
  return (
    <div className="menu">
      {/* Render menu sections based on active tab */}
      {tabs.map((tab) =>
        activeTab === tab ? (
          <div key={tab}>
            <h2>{menuData[tab].label}</h2>
            <p>{menuData[tab].intro}</p>
            <ul>
              {menuData[tab].items.map(item => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <span>{item.desc}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Menu;