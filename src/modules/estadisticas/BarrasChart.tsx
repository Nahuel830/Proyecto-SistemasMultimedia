import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { datosPorAnimal } from '../../data/estadisticas';
import { estadisticasContenido } from '../../data/contenido';
import type { DatoAnimal } from '../../data/types';
import styles from './BarrasChart.module.css';

interface FormaBarraProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly payload?: DatoAnimal;
}

interface TickProps {
  readonly x?: number;
  readonly y?: number;
  readonly payload?: {
    readonly value?: string | number;
  };
}

function TickAnimal({ x = 0, y = 0, payload }: TickProps) {
  const valor = String(payload?.value ?? '');
  const lineas =
    valor === 'Animales de granja' ? ['Animales', 'de granja'] : [valor];

  return (
    <g transform={`translate(${x},${y})`}>
      {lineas.map((linea, indice) => (
        <text
          key={linea}
          x={0}
          y={12 + indice * 10}
          textAnchor="middle"
          fill="#50675e"
          fontSize={9.5}
          fontWeight={600}
        >
          {linea}
        </text>
      ))}
    </g>
  );
}

function FormaBarra(props: FormaBarraProps) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    payload,
  } = props;

  if (!payload) {
    return null;
  }

  const tamanoImagen = 42;
  const centro = x + width / 2;
  const clipId = `clip-barra-${payload.id}`;
  const yEtiqueta = 8;
  const yImagen = 17;

  return (
    <g>
      <text
        x={centro}
        y={yEtiqueta}
        textAnchor="middle"
        dominantBaseline="hanging"
        fill="var(--color-forest-900)"
        fontSize={10.5}
        fontWeight={800}
      >
        {payload.porcentaje}%
      </text>
      <defs>
        <clipPath id={clipId}>
          <rect
            x={centro - tamanoImagen / 2}
            y={yImagen}
            width={tamanoImagen}
            height={tamanoImagen}
            rx={7}
          />
        </clipPath>
      </defs>
      <image
        href={payload.imagen}
        x={centro - tamanoImagen / 2}
        y={yImagen}
        width={tamanoImagen}
        height={tamanoImagen}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={Math.max(0, height)}
        rx={4}
        fill={payload.color}
      />
    </g>
  );
}

export function BarrasChart() {
  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label={estadisticasContenido.ariaAnimales}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...datosPorAnimal]}
          margin={{ top: 68, right: 4, left: 4, bottom: 0 }}
          barCategoryGap="20%"
          accessibilityLayer
        >
          <XAxis
            dataKey="nombre"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={38}
            tick={<TickAnimal />}
          />
          <YAxis hide domain={[0, 40]} />
          <Tooltip
            cursor={{ fill: 'rgba(15,61,46,.045)' }}
            formatter={(value) => [`${String(value)}%`, 'Casos']}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid rgba(15,61,46,.16)',
              background: '#FBF8EF',
              fontSize: 11,
              boxShadow: '0 10px 24px rgba(15,61,46,.14)',
            }}
          />
          <Bar
            dataKey="porcentaje"
            maxBarSize={48}
            isAnimationActive={false}
            shape={(shapeProps: unknown) => (
              <FormaBarra {...(shapeProps as FormaBarraProps)} />
            )}
          />
        </BarChart>
      </ResponsiveContainer>

      <table className="solo-lectores">
        <caption>{estadisticasContenido.captionTabla}</caption>
        <thead>
          <tr>
            <th scope="col">Animal</th>
            <th scope="col">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {datosPorAnimal.map((dato) => (
            <tr key={dato.id}>
              <th scope="row">{dato.nombre}</th>
              <td>{dato.porcentaje}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
