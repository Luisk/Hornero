"use client";

import { useCakeBuilder } from "@/components/cake-builder/CakeBuilderContext";

/** Points at the step's options after a blocked "Continuar". */
export function SelectionHint() {
  const { showSelectionHint, selectionHintAttempt } = useCakeBuilder();

  return (
    // Live region stays mounted so screen readers announce each attempt.
    <div className="selection-hint-anchor" role="status" aria-live="polite">
      {showSelectionHint ? (
        <p key={selectionHintAttempt} className="selection-hint">
          Elige una opción para continuar.
        </p>
      ) : null}
    </div>
  );
}
