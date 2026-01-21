import { useState } from "react";
import ShiftMenu from "./ShiftMenu";

import { ShiftType } from "../shiftTypes";

interface DayDropDownMenuProps {
  value: Date;
  children: React.ReactNode;

  // aqui verefikar se e do tipo date ou string
  onSelectShift: (date: Date, shift: ShiftType) => void;
}

export default function DayDropDownMenu({
  value,
  children,
  onSelectShift,
}: DayDropDownMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {children}

      {showMenu && (
        <ShiftMenu
          date={value}
          onSelect={onSelectShift}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
