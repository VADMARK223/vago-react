type Props = {
  x: number;
  y: number;
  midi: number;
  isFilled?: boolean;
};

export const NoteGlyphOld = ({ x, y, midi, isFilled = true }: Props) => {
  const headW = 12;
  const headH = 8;

  // правило направления
  const stemDown = midi >= 60;

  const stemLen = 30;
  const stemX = stemDown ? x + headW * 0.45 : x - headW * 0.45;
  const stemY1 = y;
  const stemY2 = stemDown ? y + stemLen : y - stemLen;

  const headFill = isFilled ? '#111' : '#fff';
  const headStroke = '#111';

  // лёгкий наклон кружка
  const rotate = -18;

  return (
    <g>
      {/* кружочек */}
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

      {/* палочка */}
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
