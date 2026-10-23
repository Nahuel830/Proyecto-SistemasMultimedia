import clsx from 'clsx';
import { Menu, PawPrint, Search, X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  accesibilidad,
  buscador,
  indiceBusqueda,
  marca,
  navegacion,
} from '../../data/contenido';
import { normalizarTexto } from '../../utils/formato';
import { iconosNavegacion } from '../iconos';
import styles from './Navbar.module.css';

function Buscador() {
  const [consulta, setConsulta] = useState('');
  const [abierto, setAbierto] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const resultadosId = useId();

  const resultados = useMemo(() => {
    const termino = normalizarTexto(consulta.trim());
    if (termino.length < 2) {
      return [];
    }

    return indiceBusqueda
      .filter((item) => {
        const texto = normalizarTexto(
          `${item.etiqueta} ${item.descripcion} ${item.claves.join(' ')}`,
        );
        return texto.includes(termino);
      })
      .slice(0, 5);
  }, [consulta]);

  const irA = (destino: string) => {
    setConsulta('');
    setAbierto(false);
    navigate(destino);
  };

  const enviar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const primero = resultados[0];
    if (primero) {
      irA(primero.destino);
    }
  };

  useEffect(() => {
    const handleClickFuera = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setAbierto(false);
      }
    };

    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.buscadorWrap}
      onFocus={() => setAbierto(true)}
    >
      <form className={styles.buscador} role="search" onSubmit={enviar}>
        <Search size={16} aria-hidden="true" className={styles.lupa} />
        <label htmlFor="buscador-revista" className="solo-lectores">
          {buscador.etiqueta}
        </label>
        <input
          id="buscador-revista"
          type="search"
          value={consulta}
          onChange={(event) => {
            setConsulta(event.target.value);
            setAbierto(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setAbierto(false);
            }
          }}
          placeholder={buscador.placeholder}
          aria-label={buscador.ariaLabel}
          aria-expanded={abierto && consulta.trim().length > 1}
          aria-controls={resultadosId}
          autoComplete="off"
        />
        {consulta.length > 0 && (
          <button
            type="button"
            className={styles.limpiar}
            aria-label={buscador.limpiar}
            onClick={() => {
              setConsulta('');
              setAbierto(false);
            }}
          >
            <X size={13} aria-hidden="true" />
          </button>
        )}
      </form>

      {abierto && consulta.trim().length > 1 && (
        <div className={styles.panelResultados} id={resultadosId}>
          {resultados.length > 0 ? (
            <ul aria-label={buscador.ariaResultados}>
              {resultados.map((resultado) => (
                <li key={resultado.destino}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => irA(resultado.destino)}
                  >
                    <span>{resultado.etiqueta}</span>
                    <small>{resultado.descripcion}</small>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.sinResultados}>{buscador.vacio}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const esInicio = location.pathname === '/';

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuAbierto) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuAbierto(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuAbierto]);

  return (
    <header className={styles.header}>
      <div className={styles.barra}>
        <Link to="/#inicio" className={styles.marca} aria-label={accesibilidad.inicio}>
          <span className={styles.logo} aria-hidden="true">
            <PawPrint size={31} strokeWidth={2.4} />
          </span>
          <span className={styles.marcaTexto}>
            <strong>{marca.nombre}</strong>
            <small>{marca.lema}</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={accesibilidad.navegacionPrincipal}>
          {navegacion.map((enlace) => {
            const Icono = iconosNavegacion[enlace.icono];
            const activo = esInicio && enlace.id === 'inicio';
            return (
              <Link
                key={enlace.id}
                to={enlace.destino}
                className={clsx(styles.enlace, activo && styles.activo)}
                aria-current={activo ? 'page' : undefined}
              >
                <Icono size={15} strokeWidth={2.2} aria-hidden="true" />
                <span>{enlace.etiqueta}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.acciones}>
          <Buscador />
          <button
            type="button"
            className={styles.menuBoton}
            aria-label={menuAbierto ? accesibilidad.cerrarMenu : accesibilidad.abrirMenu}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto((valor) => !valor)}
          >
            {menuAbierto ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        className={clsx(styles.menuMovil, menuAbierto && styles.menuAbierto)}
        hidden={!menuAbierto}
      >
        <nav aria-label={accesibilidad.navegacionMovil}>
          {navegacion.map((enlace) => {
            const Icono = iconosNavegacion[enlace.icono];
            const activo = esInicio && enlace.id === 'inicio';
            return (
              <Link
                key={enlace.id}
                to={enlace.destino}
                className={clsx(styles.enlaceMovil, activo && styles.activoMovil)}
              >
                <Icono size={18} aria-hidden="true" />
                <span>{enlace.etiqueta}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
