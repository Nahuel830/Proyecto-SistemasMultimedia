import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import type { DatoMaltrato } from '../../data/types';
import styles from './DonaChart.module.css';

const RADIAN = Math.PI / 180;

function crearEtiqueta(datos: readonly DatoMaltrato[]) {
  return function etiquetaPorcentaje(props: PieLabelRenderProps) {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    } = props;

    if (
      typeof cx !== 'number' ||
      typeof cy !== 'number' ||
      typeof midAngle !== 'number' ||
      typeof innerRadius !== 'number' ||
      typeof outerRadius !== 'number' ||
      typeof percent !== 'number'
    ) {
      return null;
    }

    const valor = Math.round(percent * 100);
    if (valor < 4) {
      return null;
    }

    const radio = innerRadius + (outerRadius - innerRadius) * 0.62;
    const x = cx + radio * Math.cos(-midAngle * RADIAN);
    const y = cy + radio * Math.sin(-midAngle * RADIAN);
    const color = datos[Number(index ?? 0)]?.color ?? '#0F3D2E';

    return (
      <text
        x={x}
        y={y}
        fill={color === '#0F3D2E' ? '#F4EFE0' : '#FFFFFF'}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={800}
      >
        {valor}%
      </text>
    );
  };
}

interface DonaChartProps {
  readonly datos: readonly DatoMaltrato[];
  readonly ariaLabel: string;
}

export function DonaChart({ datos, ariaLabel }: DonaChartProps) {
  const etiquetaPorcentaje = crearEtiqueta(datos);

  return (
    <div className={styles.wrap} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[...datos]}
            dataKey="porcentaje"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            innerRadius="57%"
            outerRadius="88%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={1.5}
            stroke="none"
            label={etiquetaPorcentaje}
            labelLine={false}
            isAnimationActive={false}
          >
            {datos.map((dato) => (
              <Cell key={dato.id} fill={dato.color} />
            ))}
          </Pie>
          <Tooltip
            cursor={false}
            formatter={(value, name) => [`${String(value)}%`, String(name)]}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid rgba(15,61,46,.16)',
              background: '#FBF8EF',
              fontSize: 12,
              boxShadow: '0 10px 24px rgba(15,61,46,.14)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
