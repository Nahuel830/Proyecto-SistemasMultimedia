import { Outlet } from 'react-router-dom';
import { accesibilidad } from '../../data/contenido';
import { Footer } from './Footer';
import { HashScroll } from './HashScroll';
import { Navbar } from './Navbar';

export function RootLayout() {
  return (
    <>
      <a className="saltar-contenido" href="#contenido-principal">
        {accesibilidad.saltar}
      </a>
      <HashScroll />
      <Navbar />
      <main id="contenido-principal" aria-label={accesibilidad.contenidoPrincipal}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
