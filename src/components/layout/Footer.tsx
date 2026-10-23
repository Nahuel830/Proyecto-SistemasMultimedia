import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  configuracion,
  footerContenido,
  marca,
} from '../../data/contenido';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ola} aria-hidden="true" />
      <div className={styles.contenido}>
        <Link to="/" className={styles.marca} aria-label={marca.nombre}>
          <span className={styles.logo} aria-hidden="true">
            <PawPrint size={52} strokeWidth={2.2} />
          </span>
          <span>
            <strong>{marca.nombre}</strong>
            <small>{marca.lema}</small>
          </span>
        </Link>

        <p className={styles.cita}>
          <PawPrint size={18} aria-hidden="true" />
          <span className="manuscrito">{footerContenido.cita}</span>
          <PawPrint size={18} aria-hidden="true" />
        </p>

        <span className={styles.sello}>{footerContenido.sello}</span>
      </div>

      {configuracion.mostrarEnlacesFooter && (
        <nav className={styles.enlaces} aria-label={footerContenido.ariaEnlaces}>
          {footerContenido.enlaces.map((enlace) => (
            <Link key={enlace.etiqueta} to={enlace.destino}>
              {enlace.etiqueta}
            </Link>
          ))}
        </nav>
      )}

      <p className={styles.copyright}>{footerContenido.copyright}</p>
    </footer>
  );
}
