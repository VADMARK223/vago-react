type Props = {
  x: number;
  y: number;
  midi: number;
  isFilled?: boolean;

  staffStep: number;
  staffTop: number;
  staffBottomLineY: number;
  lineGap: number;
};

export const NoteGlyph = ({
  x,
  y,
  isFilled = true,
  staffStep,
  staffBottomLineY,
  lineGap,
}: Props) => {
  const headW = 12;
  const headH = 8;

  // middle line (B4) = step 4
  const stemDown = staffStep >= 4;

  const stemLen = 32;

  // штиль: вверх — справа; вниз — слева
  const stemX = stemDown ? x - headW * 0.45 : x + headW * 0.45;
  const stemY1 = y;
  const stemY2 = stemDown ? y + stemLen : y - stemLen;

  const headFill = isFilled ? '#111' : '#fff';
  const headStroke = '#111';
  const rotate = -18;

  const halfGap = lineGap / 2;

  // Добавочные линии
  const ledgerYs: number[] = [];
  if (staffStep < 0) {
    for (let s = -2; s >= staffStep; s -= 2) {
      ledgerYs.push(staffBottomLineY - s * halfGap);
    }
  } else if (staffStep > 8) {
    for (let s = 10; s <= staffStep; s += 2) {
      ledgerYs.push(staffBottomLineY - s * halfGap);
    }
  }

  const ledgerW = 18; // длина добавочной линии (чуть шире головки)

  return (
    <g>
      {/* добавочные линии */}
      {ledgerYs.map((ly, i) => (
        <line
          key={i}
          x1={x - ledgerW / 2}
          y1={ly}
          x2={x + ledgerW / 2}
          y2={ly}
          stroke="#111"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      ))}

      {/* головка */}
      <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
        <ellipse
          cx={0}
          cy={0}
          rx={headW / 2}
          ry={headH / 2}
          fill={headFill}
          stroke={headStroke}
          strokeWidth={2}
        />
      </g>

      {/* штиль */}
      <line
        x1={stemX}
        y1={stemY1}
        x2={stemX}
        y2={stemY2}
        stroke="#111"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
};
