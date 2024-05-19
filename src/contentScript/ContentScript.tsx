import React, { useEffect, useRef, useState } from "react";

import { useGoogleTranslatorMutation } from "@/src/mutation/useGoogleTranslatorMutation";
import { useCustomTranslatorMutation } from "@/src/mutation/useCustomTranslatorMutation";

import { TranslatePanel } from "./component/TranslatePanel";
import { CloseButtonIcon } from "./component/CloseButtonIcon";
import { TranslateButtonIcon } from "./component/TranslateButtonIcon";
import { getSelectedPosition } from "./getSelectedPosition";
import { getSelectedText } from "./getSelectedText";

export function ContentScript() {
  const [showIcon, setShowIcon] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [panelDragging, setPanelDragging] = useState(false);
  const [panelDisplayInfo, setPanelDisplayInfo] = useState<{
    left: number;
    top: number;
    isFixed: boolean;
  }>({
    left: 0,
    top: 0,
    isFixed: false,
  });
  const [iconDisplayInfo, setIconDisplayInfo] = useState<{
    left: number;
    top: number;
  }>({
    left: 0,
    top: 0,
  });
  const [sourceText, setSourceText] = useState();
  const googleTranslatorMutation = useGoogleTranslatorMutation();
  const customTranslatorMutation = useCustomTranslatorMutation();
  const panelRef = useRef(null);

  const closeContentScript = () => {
    setShowPanel(false);
    setPanelDisplayInfo({
      top: 0,
      left: 0,
      isFixed: false,
    });
    setShowIcon(false);
    setIconDisplayInfo({
      top: 0,
      left: 0,
    });
  };

  useEffect(() => {
    const messageHandler = () => {
      const position = getSelectedPosition();
      setShowPanel(true);
      setShowIcon(false);
      setSourceText(getSelectedText());
      if (!panelDisplayInfo.isFixed) {
        // https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling
        setPanelDisplayInfo({
          top: position.y + window.scrollY,
          left: position.x + window.scrollX,
          isFixed: false,
        });
      }
    };
    const handleMouseUp = (e) => {
      const isLeftClick = e.button === 0;
      if (!isLeftClick) return;

      const isInPasswordField =
        e.target.tagName === "INPUT" && e.target.type === "password";
      if (isInPasswordField) return;

      const inCodeElement =
        e.target.tagName === "CODE" ||
        (!!e.target.closest && !!e.target.closest("code"));
      if (inCodeElement) return;

      const isInThisElement =
        document.querySelector("#kan__translator__extension__root") &&
        document
          .querySelector("#kan__translator__extension__root")
          .contains(e.target);
      if (isInThisElement) return;

      const selectedText = getSelectedText();
      if (selectedText.length === 0) {
        if (showIcon || showPanel) {
          // when user click outside the popup, close popup/icon
          if (!panelDisplayInfo.isFixed) {
            setShowPanel(false);
            setPanelDisplayInfo({
              top: 0,
              left: 0,
              isFixed: false,
            });
          }
          setShowIcon(false);
          setIconDisplayInfo({
            top: 0,
            left: 0,
          });
        }
        return;
      }

      const selectedPosition = getSelectedPosition();
      setIconDisplayInfo({
        top: selectedPosition.y + window.scrollY,
        left: selectedPosition.x + window.scrollX,
      });
      setShowIcon(true);
      if (!panelDisplayInfo.isFixed) {
        setShowPanel(false);
        setPanelDisplayInfo({
          top: selectedPosition.y + window.scrollY,
          left: selectedPosition.x + window.scrollX,
          isFixed: false,
        });
      }
    };
    const handleKeyDown = (e) => {
      // close popup/icon
      if (e.key === "Escape" && (showIcon || showPanel)) {
        closeContentScript();
      } else if (e.key === " " || e.code == "Space" || e.keyCode == 32) {
        const selectedText = getSelectedText();
        if (!selectedText) return;

        const selectedPosition = getSelectedPosition();
        // quick translate
        e.preventDefault();
        setSourceText(getSelectedText());
        setShowIcon(false);
        setIconDisplayInfo({
          top: 0,
          left: 0,
        });
        setShowPanel(true);
        if (!panelDisplayInfo.isFixed) {
          setPanelDisplayInfo({
            top: selectedPosition.y + window.scrollY,
            left: selectedPosition.x + window.scrollX,
            isFixed: false,
          });
        }
      }
    };

    // Receive clicks on context menu option
    chrome.runtime.onMessage.addListener(messageHandler);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      chrome.runtime.onMessage.removeListener(messageHandler);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showIcon, showPanel, panelDisplayInfo.isFixed]);

  const handleDragStart = (e) => {
    e.preventDefault();
    const rect = panelRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      setPanelDragging(true);
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      setPanelDisplayInfo({
        left: newX,
        top: newY,
        isFixed: true,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setPanelDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const draggingClassName = panelDragging
    ? "border-solid border-2 border-orange-500 cursor-grabbing"
    : "";

  return (
    (showIcon || showPanel) && (
      <div id="content-script">
        {showPanel && (
          <div
            id="content-script-panel"
            className={`flex flex-col bg-orange-100 rounded-md z-50 ${draggingClassName}`}
            ref={panelRef}
            onMouseDown={(e) => handleDragStart(e)}
            style={{
              width: "400px",
              position: panelDisplayInfo.isFixed ? "fixed" : "absolute",
              left: panelDisplayInfo.left,
              top: panelDisplayInfo.top,
            }}
          >
            <div className="flex justify-end">
              <div className="my-2 mr-2">
                <CloseButtonIcon onClick={() => closeContentScript()} />
              </div>
            </div>
            {sourceText && <TranslatePanel sourceText={sourceText} />}
          </div>
        )}
        {showIcon && (
          <div
            id="content-script-icon"
            className="z-50"
            style={{
              position: "absolute",
              left: iconDisplayInfo.left,
              top: iconDisplayInfo.top,
            }}
          >
            <TranslateButtonIcon
              onClick={async () => {
                setShowIcon(false);
                setSourceText(getSelectedText());
                setIconDisplayInfo({
                  top: 0,
                  left: 0,
                });
                setShowPanel(true);
                await Promise.all([
                  customTranslatorMutation.mutateAsync({
                    sourceText,
                  }),
                  googleTranslatorMutation.mutateAsync({
                    sourceText,
                  }),
                ]);
              }}
            />
          </div>
        )}
      </div>
    )
  );
}
