import React, { CSSProperties, useCallback, useEffect, useState } from "react";

import { useGoogleTranslatorMutation } from "@/src/mutation/useGoogleTranslatorMutation";
import { useCustomTranslatorMutation } from "@/src/mutation/useCustomTranslatorMutation";

import { TranslatePanel } from "./component/TranslatePanel";
import { TranslateButtonIcon } from "./component/TranslateButtonIcon";
import { getSelectedPosition } from "./getSelectedPosition";
import { getSelectedText } from "./getSelectedText";

export function ContentScript() {
  const [showType, setShowType] = useState<null | "icon" | "panel">(null);
  const [displayInfo, setDisplayInfo] = useState<{
    left: number;
    top: number;
  }>(null);
  const [sourceText, setSourceText] = useState();
  const googleTranslatorMutation = useGoogleTranslatorMutation();
  const customTranslatorMutation = useCustomTranslatorMutation();

  useEffect(() => {
    const messageHandler = () => {
      const position = getSelectedPosition();
      setShowType("panel");
      // https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling
      setDisplayInfo({
        top: position.y + window.scrollY,
        left: position.x + window.scrollX,
      });
      setSourceText(getSelectedText());
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
        if (showType) {
          // when user click outside the popup, close popup/icon
          setShowType(null);
          setDisplayInfo({
            top: 0,
            left: 0,
          });
        }
        return;
      }

      const selectedPosition = getSelectedPosition();
      setSourceText(getSelectedText());
      setDisplayInfo({
        top: selectedPosition.y + window.scrollY,
        left: selectedPosition.x + window.scrollX,
      });
      setShowType("icon");
    };
    const handleKeyDown = (e) => {
      // close popup/icon
      if (e.key === "Escape" && showType) {
        setShowType(null);
        setDisplayInfo({
          top: 0,
          left: 0,
        });
      } else if (e.key === " " || e.code == "Space" || e.keyCode == 32) {
        const selectedText = getSelectedText();
        if (!selectedText) return;

        const selectedPosition = getSelectedPosition();
        // quick translate
        e.preventDefault();
        setSourceText(getSelectedText());
        setDisplayInfo({
          top: selectedPosition.y + window.scrollY,
          left: selectedPosition.x + window.scrollX,
        });
        setShowType("panel");
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
  }, [showType]);

  const styleObject: CSSProperties = {
    position: "absolute",
    // transform: "translate(-50%, -50%)",
    ...(displayInfo && {
      left: displayInfo.left,
      top: displayInfo.top,
    }),
  };

  return (
    showType && (
      <div
        id="content-script"
        className="flex items-center justify-center z-50"
        style={styleObject}
      >
        {showType === "panel" ? (
          <div
            className="flex flex-col bg-orange-100 rounded-md"
            style={{ width: "400px" }}
          >
            {sourceText && <TranslatePanel sourceText={sourceText} />}
          </div>
        ) : (
          <div>
            <TranslateButtonIcon
              onClick={async () => {
                setShowType("panel");
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
