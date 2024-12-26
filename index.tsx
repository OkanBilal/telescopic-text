"use client"

import React, { useState, useEffect } from "react";

export type TelescopicItem = string | React.ReactNode | TelescopicTextNodeData;

export interface TelescopicTextNodeData {
  id?: string;
  word?: string | React.ReactNode;
  link?: string;
  linkClassName?: string;
  expandableClassName?: string;
  baseClassName?: string;
  expandTo?: TelescopicItem[];
}

interface TelescopicTextProps {
  nodes: TelescopicItem[];
  persistenceKey?: string;
  enablePersistence?: boolean;
  baseClassName?: string;
  linkClassName?: string;
  expandableClassName?: string;
}

function useTelescopicState(persistenceKey: string, enablePersistence: boolean) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [clickedKeys, setClickedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!enablePersistence || typeof window === "undefined" || !persistenceKey) return;
    try {
      const savedState = localStorage.getItem(persistenceKey);
      if (savedState) {
        const { expanded, clicked } = JSON.parse(savedState);
        setExpandedKeys(expanded || []);
        setClickedKeys(clicked || []);
      }
    } catch (error) {
      console.error("Error loading telescopic text state:", error);
      localStorage.removeItem(persistenceKey);
    }
  }, [persistenceKey, enablePersistence]);

  useEffect(() => {
    if (!enablePersistence || !persistenceKey) return;
    localStorage.setItem(
      persistenceKey,
      JSON.stringify({ expanded: expandedKeys, clicked: clickedKeys })
    );
  }, [expandedKeys, clickedKeys, persistenceKey, enablePersistence]);

  const handleExpand = (key: string) => {
    if (!clickedKeys.includes(key)) {
      setExpandedKeys((prev) => [...prev, key]);
      setClickedKeys((prev) => [...prev, key]);
    }
  };

  return { expandedKeys, clickedKeys, handleExpand };
}

const TelescopicText: React.FC<TelescopicTextProps> = ({
  nodes,
  persistenceKey = "telescopic-text",
  enablePersistence = true,
  baseClassName = "",
  linkClassName = "",
  expandableClassName = "",
}) => {
  const { expandedKeys, clickedKeys, handleExpand } = useTelescopicState(
    persistenceKey,
    enablePersistence
  );
  
  function generateNodeKey(
    parentKey: string | null,
    index: number,
    node: TelescopicTextNodeData
  ): string {
    return parentKey
      ? `${parentKey}-${node.id || index}`
      : `${node.id || index}`;
  }

  function renderItems(items: TelescopicItem[], parentKey: string | null = null) {
    return items.map((item, index) => {
      if (typeof item === "object" && !React.isValidElement(item)) {
        const data = item as TelescopicTextNodeData;
        const itemKey = generateNodeKey(parentKey, index, data);
        return renderItem(item, itemKey);
      } else {
        const itemKey = parentKey ? `${parentKey}-${index}` : `${index}`;
        return renderItem(item, itemKey);
      }
    });
  }

  function renderItem(item: TelescopicItem, key: string): JSX.Element {
    if (typeof item === "string") {
      return (
        <span key={key} className={baseClassName}>
          {item}{" "}
        </span>
      );
    }

    if (React.isValidElement(item)) {
      return (
        <span key={key} className={baseClassName}>
          {item}
        </span>
      );
    }

    if (typeof item === 'object' && !Array.isArray(item)) {
      return renderDataNode(item as TelescopicTextNodeData, key);
    }

    return (
      <span key={key} className={baseClassName}>
        {String(item)}{" "}
      </span>
    );
  }
  
  function renderDataNode(item: TelescopicTextNodeData, key: string): JSX.Element {
    const isExpanded = expandedKeys.includes(key);
    const isClicked = clickedKeys.includes(key);

    const currentClassName = item.link
      ? item.linkClassName || linkClassName
      : item.expandTo
      ? item.expandableClassName || expandableClassName
      : item.baseClassName || baseClassName;

    const content = item.word || "";

    if (item.expandTo) {
      return (
        <span key={key}>
          {!isClicked && (
            <span
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              className={currentClassName}
              onClick={() => handleExpand(key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleExpand(key);
                }
              }}
            >
              {content}{" "}
            </span>
          )}
          {isExpanded && (
            <span key={`${key}-expanded`} className={`${baseClassName} inline`}>
              {renderItems(item.expandTo, key)}
            </span>
          )}
        </span>
      );
    }

    if (item.link) {
      return (
        <a
          key={key}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={currentClassName}
        >
          {content}
        </a>
      );
    }

    return (
      <span key={key} className={baseClassName}>
        {content}
      </span>
    );
  }

  return <>{renderItems(nodes)}</>;
};

export default TelescopicText;