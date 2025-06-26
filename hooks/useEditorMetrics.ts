import { useLayoutEffect, useState } from "react";

/**
 * Reads the *real* line-height and paddings from Ace / Monaco so the
 * overlay stays perfectly aligned even when the user changes font size,
 * zoom level, or theme.
 */
export function useEditorMetrics(editorEl?: HTMLElement | null) {
  const [metrics, setMetrics] = useState({
    lineHeight: 18,
    topPad: 0,
    leftPad: 0,
  });

  useLayoutEffect(() => {
    if (!editorEl) return;

    const line = editorEl.querySelector(".ace_line") as HTMLElement | null;
    const content = editorEl.querySelector(".ace_content") as HTMLElement | null;

    if (line && content) {
      setMetrics({
        lineHeight: line.getBoundingClientRect().height,
        topPad: parseFloat(getComputedStyle(content).paddingTop),
        leftPad: parseFloat(getComputedStyle(content).paddingLeft),
      });
    }
  }, [editorEl]);

  return metrics;
}
