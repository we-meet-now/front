export type PartyMotif =
  | 'balloons'
  | 'discoball'
  | 'cake'
  | 'gift'
  | 'fireworks'
  | 'hearts'
  | 'confetti';

export type PartyPreset = {
  id: string;
  label: string;
  gradient: [string, string, string];
  motif: PartyMotif;
  accents: [string, string, string];
};

export const PARTY_PRESETS: PartyPreset[] = [
  {
    id: 'p1',
    label: '핑크 풍선',
    gradient: ['#FF8FB1', '#C084FC', '#6C63FF'],
    motif: 'balloons',
    accents: ['#FF6B9D', '#FFD166', '#4ECDC4'],
  },
  {
    id: 'p2',
    label: '선셋 풍선',
    gradient: ['#FFB347', '#FF6B6B', '#FF3E6C'],
    motif: 'balloons',
    accents: ['#FFD166', '#FFFFFF', '#FF8C42'],
  },
  {
    id: 'p3',
    label: '민트 풍선',
    gradient: ['#43E5D6', '#3AB4F2', '#5B7FFF'],
    motif: 'balloons',
    accents: ['#FFFFFF', '#FFD166', '#43E5D6'],
  },
  {
    id: 'p4',
    label: '디스코 나이트',
    gradient: ['#3A3A5C', '#6C63FF', '#C084FC'],
    motif: 'discoball',
    accents: ['#FFFFFF', '#FFD166', '#FF6B9D'],
  },
  {
    id: 'p5',
    label: '버스데이 케이크',
    gradient: ['#FFD3B0', '#FF9E9E', '#FF6F91'],
    motif: 'cake',
    accents: ['#FFFFFF', '#FFD166', '#FF6B9D'],
  },
  {
    id: 'p6',
    label: '깜짝 선물',
    gradient: ['#8EC5FC', '#6C63FF', '#A78BFA'],
    motif: 'gift',
    accents: ['#FFD166', '#FF6B9D', '#FFFFFF'],
  },
  {
    id: 'p7',
    label: '불꽃놀이',
    gradient: ['#1B1442', '#3A2E7A', '#6C4FE0'],
    motif: 'fireworks',
    accents: ['#FFD166', '#FF6B9D', '#4ECDC4'],
  },
  {
    id: 'p8',
    label: '러블리 하트',
    gradient: ['#FF9EC4', '#FF6B9D', '#E0426B'],
    motif: 'hearts',
    accents: ['#FFFFFF', '#FFD166', '#FF9EC4'],
  },
  {
    id: 'p9',
    label: '컨페티 팡파레',
    gradient: ['#FFE29A', '#FF9A8B', '#FF6B9D'],
    motif: 'confetti',
    accents: ['#4ECDC4', '#6C63FF', '#FFFFFF'],
  },
];

const Garland = ({ colors }: { colors: [string, string, string] }) => (
  <>
    <path d="M14 22 Q140 60 266 22" stroke="rgba(255,255,255,0.55)" strokeWidth="2" fill="none" />
    {[40, 82, 124, 156, 198, 240].map((x, i) => {
      const y = 22 + Math.sin(((x - 14) / 252) * Math.PI) * 38;
      const c = colors[i % colors.length];
      return (
        <path key={x} d={`M${x} ${y} l-9 0 l4.5 13 z`} fill={c} transform={`rotate(4 ${x} ${y})`} />
      );
    })}
  </>
);

const Confetti = ({ colors }: { colors: [string, string, string] }) => (
  <>
    <circle cx="30" cy="70" r="4" fill={colors[1]} />
    <circle cx="252" cy="58" r="3.5" fill={colors[2]} />
    <circle cx="222" cy="96" r="3" fill={colors[0]} />
    <rect
      x="16"
      y="102"
      width="7"
      height="7"
      rx="1.5"
      fill={colors[0]}
      transform="rotate(18 19 105)"
    />
    <rect
      x="256"
      y="118"
      width="6"
      height="6"
      rx="1.5"
      fill={colors[1]}
      transform="rotate(-12 259 121)"
    />
    <path d="M118 30 l4 8 l-8 0 z" fill={colors[2]} opacity="0.9" />
    <path d="M198 44 l4 8 l-8 0 z" fill={colors[0]} opacity="0.9" />
  </>
);

const BalloonsMotif = ({ colors }: { colors: [string, string, string] }) => (
  <>
    <line x1="76" y1="98" x2="70" y2="150" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <ellipse cx="76" cy="80" rx="20" ry="24" fill={colors[0]} />
    <ellipse cx="69" cy="70" rx="6" ry="8" fill="#FFFFFF" opacity="0.25" />

    <line x1="140" y1="108" x2="146" y2="156" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <ellipse cx="140" cy="88" rx="23" ry="27" fill={colors[1]} />
    <ellipse cx="132" cy="76" rx="7" ry="9" fill="#FFFFFF" opacity="0.3" />

    <line x1="200" y1="100" x2="206" y2="150" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <ellipse cx="200" cy="82" rx="19" ry="23" fill={colors[2]} />
    <ellipse cx="193" cy="72" rx="6" ry="7.5" fill="#FFFFFF" opacity="0.28" />
  </>
);

const DiscoballMotif = ({ colors }: { colors: [string, string, string] }) => (
  <>
    <line x1="140" y1="18" x2="140" y2="52" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <circle cx="140" cy="76" r="26" fill="#E8ECF3" />
    {[-16, -6, 4, 14].map((dy) => (
      <line key={dy} x1="114" y1={76 + dy} x2="166" y2={76 + dy} stroke="#B9C2D0" strokeWidth="1" />
    ))}
    {[-14, -4, 6, 16].map((dx) => (
      <line
        key={dx}
        x1={140 + dx}
        y1="50"
        x2={140 + dx * 1.3}
        y2="102"
        stroke="#B9C2D0"
        strokeWidth="1"
      />
    ))}
    <path d="M100 40 l5 10 l-10 0z" fill={colors[1]} />
    <path d="M186 100 l5 10 l-10 0z" fill={colors[2]} />
    <circle cx="70" cy="110" r="3" fill={colors[0]} />
    <circle cx="212" cy="60" r="3" fill={colors[0]} />
  </>
);

const CakeMotif = ({ colors }: { colors: [string, string, string] }) => (
  <>
    <line
      x1="140"
      y1="60"
      x2="140"
      y2="70"
      stroke={colors[1]}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M140 46 C136 52 136 58 140 60 C144 58 144 52 140 46Z" fill={colors[1]} />
    <rect x="106" y="72" width="68" height="26" rx="6" fill="#FFFFFF" />
    <rect x="94" y="98" width="92" height="34" rx="8" fill="#FFFFFF" />
    {[112, 140, 168].map((cx) => (
      <circle key={cx} cx={cx} cy="86" r="3" fill={colors[0]} />
    ))}
    {[104, 130, 156, 176].map((cx) => (
      <circle key={cx} cx={cx} cy="115" r="3.5" fill={colors[2]} />
    ))}
    <rect x="94" y="126" width="92" height="6" rx="3" fill={colors[0]} opacity="0.5" />
  </>
);

const GiftMotif = ({ colors }: { colors: [string, string, string] }) => (
  <>
    <rect x="104" y="80" width="72" height="54" rx="6" fill="#FFFFFF" />
    <rect x="104" y="80" width="72" height="16" fill={colors[0]} />
    <rect x="134" y="80" width="12" height="54" fill={colors[0]} />
    <path
      d="M140 80 C124 80 122 62 136 62 C140 62 140 74 140 80"
      fill="none"
      stroke={colors[1]}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M140 80 C156 80 158 62 144 62 C140 62 140 74 140 80"
      fill="none"
      stroke={colors[1]}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="70" cy="70" r="3" fill={colors[2]} />
    <circle cx="210" cy="60" r="3.5" fill={colors[2]} />
    <circle cx="198" cy="112" r="3" fill={colors[1]} />
  </>
);

const FireworksMotif = ({ colors }: { colors: [string, string, string] }) => {
  const burst = (cx: number, cy: number, r: number, color: string) => (
    <g key={`${cx}-${cy}`}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x2 = cx + Math.cos(angle) * r;
        const y2 = cy + Math.sin(angle) * r;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="3" fill={color} />
    </g>
  );
  return (
    <>
      {burst(84, 62, 20, colors[0])}
      {burst(190, 48, 16, colors[1])}
      {burst(150, 106, 14, colors[2])}
    </>
  );
};

const HeartsMotif = ({ colors }: { colors: [string, string, string] }) => {
  const heart = (cx: number, cy: number, s: number, color: string, opacity = 1) => (
    <path
      key={`${cx}-${cy}`}
      d={`M${cx} ${cy + s * 0.7} C${cx - s * 1.3} ${cy - s * 0.4} ${cx - s * 0.4} ${cy - s * 1.3} ${cx} ${cy - s * 0.4} C${cx + s * 0.4} ${cy - s * 1.3} ${cx + s * 1.3} ${cy - s * 0.4} ${cx} ${cy + s * 0.7}Z`}
      fill={color}
      opacity={opacity}
    />
  );
  return (
    <>
      {heart(140, 90, 26, colors[0])}
      {heart(78, 66, 14, colors[1], 0.9)}
      {heart(206, 74, 16, colors[2], 0.9)}
      {heart(196, 118, 10, colors[1], 0.8)}
      {heart(66, 112, 11, colors[0], 0.8)}
    </>
  );
};

const ConfettiBurstMotif = ({ colors }: { colors: [string, string, string] }) => {
  const palette = [...colors, '#FFFFFF'];
  const pieces = [
    [70, 60],
    [96, 90],
    [120, 54],
    [150, 96],
    [178, 66],
    [204, 98],
    [58, 108],
    [230, 74],
    [190, 122],
    [130, 118],
    [110, 76],
    [162, 44],
    [216, 108],
    [88, 130],
    [242, 92],
  ];
  return (
    <>
      {pieces.map(([x, y], i) =>
        i % 3 === 0 ? (
          <circle key={i} cx={x} cy={y} r="3.5" fill={palette[i % palette.length]} />
        ) : i % 3 === 1 ? (
          <rect
            key={i}
            x={x}
            y={y}
            width="6"
            height="6"
            rx="1.5"
            fill={palette[i % palette.length]}
            transform={`rotate(${(i * 37) % 360} ${x + 3} ${y + 3})`}
          />
        ) : (
          <path
            key={i}
            d={`M${x} ${y} l4 8 l-8 0 z`}
            fill={palette[i % palette.length]}
            opacity="0.9"
          />
        ),
      )}
    </>
  );
};

export const PartyIllust = ({ preset }: { preset: PartyPreset }) => (
  <svg
    viewBox="0 0 280 168"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', display: 'block' }}
  >
    <defs>
      <linearGradient id={`bg-${preset.id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={preset.gradient[0]} />
        <stop offset="55%" stopColor={preset.gradient[1]} />
        <stop offset="100%" stopColor={preset.gradient[2]} />
      </linearGradient>
    </defs>
    <rect width="280" height="168" fill={`url(#bg-${preset.id})`} />

    {preset.motif !== 'confetti' && <Garland colors={preset.accents} />}
    {preset.motif !== 'fireworks' && <Confetti colors={preset.accents} />}

    {preset.motif === 'balloons' && <BalloonsMotif colors={preset.accents} />}
    {preset.motif === 'discoball' && <DiscoballMotif colors={preset.accents} />}
    {preset.motif === 'cake' && <CakeMotif colors={preset.accents} />}
    {preset.motif === 'gift' && <GiftMotif colors={preset.accents} />}
    {preset.motif === 'fireworks' && <FireworksMotif colors={preset.accents} />}
    {preset.motif === 'hearts' && <HeartsMotif colors={preset.accents} />}
    {preset.motif === 'confetti' && <ConfettiBurstMotif colors={preset.accents} />}
  </svg>
);
