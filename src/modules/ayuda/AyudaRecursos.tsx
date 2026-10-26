import clsx from 'clsx';
import { Info, MessageCircle, Phone } from 'lucide-react';
import { FuenteDato } from '../../components/primitives/FuenteDato';
import { iconosRecursos, iconosSociales } from '../../components/iconos';
import {
  institucionesCompetencia,
  lineasAtencion,
  protocoloDenuncia,
  recursosPagina,
  redesSociales,
  refugios,
  seccionesRecursos,
} from '../../data/recursos';
import styles from './AyudaRecursos.module.css';

interface AyudaRecursosProps {
  readonly mostrarGuias?: boolean;
}

export function AyudaRecursos({
  mostrarGuias = true,
}: AyudaRecursosProps) {
  return (
    <section
      id="recursos"
      className={`${styles.recursos} animar-entrada`}
      aria-label={recursosPagina.ariaSecciones}
    >
      <p className={styles.aviso}>
        <Info size={18} aria-hidden="true" />
        <span>{recursosPagina.aviso}</span>
      </p>

      <div className={styles.grid}>
        <article
          className={styles.seccion}
          aria-labelledby="recursos-protocolo"
        >
          <header className={styles.cabecera}>
            <span className={styles.icono} aria-hidden="true">
              <Phone size={22} />
            </span>
            <div>
              <h2 id="recursos-protocolo">{recursosPagina.protocoloTitulo}</h2>
              <p>{recursosPagina.protocoloIntro}</p>
            </div>
          </header>

          <ol className={styles.pasos}>
            {protocoloDenuncia.map((paso, indice) => (
              <li key={paso.id} className={styles.paso}>
                <span className={styles.numero} aria-hidden="true">
                  {indice + 1}
                </span>
                <div className={styles.pasoTexto}>
                  <h3>{paso.titulo}</h3>
                  <p>{paso.texto}</p>
                  <FuenteDato
                    fuente={paso.fuente}
                    verificado={paso.verificado}
                    compacto
                  />
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className={styles.seccion} aria-labelledby="recursos-lineas">
          <header className={styles.cabecera}>
            <span className={styles.icono} aria-hidden="true">
              <MessageCircle size={22} />
            </span>
            <div>
              <h2 id="recursos-lineas">{recursosPagina.lineasTitulo}</h2>
              <p>{recursosPagina.lineasIntro}</p>
            </div>
          </header>

          <ul className={styles.lineas}>
            {lineasAtencion.map((linea) => (
              <li key={linea.id} className={styles.linea}>
                <div className={styles.lineaTexto}>
                  <h3>{linea.nombre}</h3>
                  <p>{linea.descripcion}</p>
                  <div className={styles.accionesLinea}>
                    <a href={linea.tel} className={styles.telefono}>
                      <Phone size={15} aria-hidden="true" />
                      <span>{linea.telefono}</span>
                    </a>
                    {linea.whatsapp && (
                      <a
                        href={linea.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappLinea}
                        aria-label={`${recursosPagina.whatsapp}: ${linea.telefono}`}
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                        <span>{recursosPagina.whatsapp}</span>
                      </a>
                    )}
                  </div>
                </div>
                <FuenteDato
                  fuente={linea.fuente}
                  verificado={linea.verificado}
                  compacto
                />
              </li>
            ))}
          </ul>
        </article>

        <article
          className={clsx(styles.seccion, styles.ancha)}
          aria-labelledby="recursos-instituciones"
        >
          <header className={styles.cabecera}>
            <div>
              <h2 id="recursos-instituciones">
                {recursosPagina.institucionesTitulo}
              </h2>
              <p>{recursosPagina.institucionesIntro}</p>
            </div>
          </header>

          <div className={styles.tablaWrap}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th scope="col">{recursosPagina.institucionHeader}</th>
                  <th scope="col">{recursosPagina.competenciaHeader}</th>
                  <th scope="col">{recursosPagina.cuandoHeader}</th>
                </tr>
              </thead>
              <tbody>
                {institucionesCompetencia.map((institucion) => (
                  <tr key={institucion.id}>
                    <th scope="row">
                      <span>{institucion.institucion}</span>
                      <FuenteDato
                        fuente={institucion.fuente}
                        verificado={institucion.verificado}
                        compacto
                      />
                    </th>
                    <td>{institucion.competencia}</td>
                    <td>{institucion.cuando}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article
          className={clsx(styles.seccion, styles.ancha)}
          aria-labelledby="recursos-refugios"
        >
          <header className={styles.cabecera}>
            <div>
              <h2 id="recursos-refugios">{recursosPagina.refugiosTitulo}</h2>
              <p>{recursosPagina.refugiosIntro}</p>
            </div>
          </header>

          <ul className={styles.refugios}>
            {refugios.map((refugio) => (
              <li key={refugio.id} className={styles.refugio}>
                <p className={styles.departamento}>
                  {refugio.departamento}
                </p>
                <h3>{refugio.nombre}</h3>
                <p>{refugio.descripcion}</p>

                {refugio.telefonos.length > 0 && (
                  <ul className={styles.telefonosRefugio}>
                    {refugio.telefonos.map((telefono) => (
                      <li key={telefono.tel}>
                        <a href={telefono.tel} className={styles.telefono}>
                          <Phone size={14} aria-hidden="true" />
                          <span>
                            <span className={styles.telefonoEtiqueta}>
                              {telefono.etiqueta}:
                            </span>{' '}
                            {telefono.numero}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {refugio.coordinacion && (
                  <p className={styles.coordinacion}>
                    <strong>{recursosPagina.coordinacion}:</strong>{' '}
                    {refugio.coordinacion}
                  </p>
                )}

                <FuenteDato
                  fuente={refugio.fuente}
                  verificado={refugio.verificado}
                  compacto
                />
              </li>
            ))}
          </ul>
        </article>

        {mostrarGuias && (
          <article
            className={clsx(styles.seccion, styles.ancha)}
            aria-labelledby="recursos-guias"
          >
            <header className={styles.cabecera}>
              <div>
                <h2 id="recursos-guias">{recursosPagina.guiasTitulo}</h2>
                <p>{recursosPagina.guiasIntro}</p>
              </div>
            </header>

            <div className={styles.guias}>
              {seccionesRecursos.map((seccion) => {
                const Icono = iconosRecursos[seccion.icono];

                return (
                  <section
                    key={seccion.id}
                    className={styles.guia}
                    aria-labelledby={`recursos-${seccion.id}`}
                  >
                    <header className={styles.cabecera}>
                      <span className={styles.icono} aria-hidden="true">
                        <Icono size={20} />
                      </span>
                      <div>
                        <h3 id={`recursos-${seccion.id}`}>
                          {seccion.titulo}
                        </h3>
                        <p>{seccion.intro}</p>
                      </div>
                    </header>

                    <ul
                      className={styles.items}
                      aria-label={`${seccion.titulo}: ${recursosPagina.ariaLista}`}
                    >
                      {seccion.items.map((item) => (
                        <li key={item.id} className={styles.item}>
                          <h4>{item.titulo}</h4>
                          <p>{item.texto}</p>
                          <FuenteDato
                            fuente={item.fuente}
                            verificado={item.verificado}
                            compacto
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </article>
        )}
      </div>

      <div
        id="compartir"
        className={styles.compartir}
        aria-labelledby="titulo-compartir"
      >
        <h2 id="titulo-compartir">{recursosPagina.compartirTitulo}</h2>
        <p>{recursosPagina.compartirTexto}</p>

        <ul className={styles.redes} aria-label={recursosPagina.ariaRedes}>
          {redesSociales.map((red) => {
            const Icono = iconosSociales[red.icono];

            return (
              <li key={red.id}>
                <a
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(styles.red, styles[red.id])}
                  aria-label={`${recursosPagina.compartirTitulo} en ${red.nombre}`}
                  title={red.fuente}
                >
                  <Icono size={19} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className={`${styles.nota} manuscrito`}>{recursosPagina.nota}</p>
      </div>
    </section>
  );
}
