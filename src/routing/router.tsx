import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/layout/RootLayout';
import { AyudaPage } from '../pages/AyudaPage';
import { EstadisticasPage } from '../pages/EstadisticasPage';
import { GaleriaPage } from '../pages/GaleriaPage';
import { InicioPage } from '../pages/InicioPage';
import { JuegoPage } from '../pages/JuegoPage';
import { MiHistoriaPage } from '../pages/MiHistoriaPage';
import { RecursosPage } from '../pages/RecursosPage';
import { TiposMaltratoPage } from '../pages/TiposMaltratoPage';
import { rutas } from './routes';

export const router = createBrowserRouter([
  {
    path: rutas.inicio,
    element: <RootLayout />,
    children: [
      { index: true, element: <InicioPage /> },
      { path: rutas.miHistoria.slice(1), element: <MiHistoriaPage /> },
      { path: rutas.estadisticas.slice(1), element: <EstadisticasPage /> },
      { path: rutas.tiposMaltrato.slice(1), element: <TiposMaltratoPage /> },
      { path: rutas.ayuda.slice(1), element: <AyudaPage /> },
      { path: rutas.galeria.slice(1), element: <GaleriaPage /> },
      { path: rutas.juego.slice(1), element: <JuegoPage /> },
      { path: rutas.recursos.slice(1), element: <RecursosPage /> },
      { path: '*', element: <Navigate to={rutas.inicio} replace /> },
    ],
  },
]);
