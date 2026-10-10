import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  Heartbeat,
  SealCheck,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { BreathJourney } from "@/components/breath-journey";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { ServiceExplorer } from "@/components/service-explorer";
import {
  contactDetails,
  education,
  faqs,
  whatsappUrl,
} from "@/lib/site";

export function KinesiologyLanding() {
  const availableContactDetails = [
    contactDetails.address,
    contactDetails.email,
    contactDetails.hours,
  ].filter(Boolean);

  return (
    <>
      <Navigation whatsappUrl={whatsappUrl} />
      <main id="inicio" data-design-contract="e505c7d8">
        <span
          className="visually-hidden"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: El cuidado respiratorio se entiende como un corredor de aire continuo, no como una lista clínica. OWN-WORLD: Celeste respirable, azul marino estructural, coral activo, paneles suaves y trayectorias cinéticas. STORY: Comprender el enfoque, reconocer el servicio y solicitar un turno. FIRST VIEWPORT: Propuesta clara a la izquierda, sesión ilustrada a la derecha, CTA visible. FORM: Corredor de aire, dirección 6, seed e505c7d8. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
          }}
        />

        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Reveal>
              <h1 id="hero-title">Respirar mejor cambia tu manera de vivir.</h1>
              <p className="hero-summary">
                Atención especializada para recuperar capacidad, autonomía y
                confianza en cada etapa de tu salud respiratoria.
              </p>
              <div className="hero-actions">
                <a
                  className="button"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsappLogo size={22} weight="fill" />
                  Solicitar turno
                  <ArrowUpRight size={18} weight="bold" />
                </a>
                <a className="text-link" href="#servicios">
                  Conocer servicios
                  <ArrowDownRight size={18} weight="bold" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={0.12}>
            <div className="air-orbit air-orbit-one" aria-hidden="true" />
            <div className="air-orbit air-orbit-two" aria-hidden="true" />
            <div className="hero-image-frame">
              <Image
                src="/images/rehabilitacion-respiratoria.webp"
                alt="Ilustración de una sesión de rehabilitación respiratoria supervisada"
                fill
                sizes="(max-width: 840px) 100vw, 56vw"
                priority
              />
            </div>
            <p className="image-note">Ilustración de atención respiratoria</p>
          </Reveal>
        </section>

        <section className="continuity-section" id="enfoque">
          <div className="section-shell">
            <Reveal className="section-heading compact-heading">
              <h2>Un profesional que entiende todo el recorrido.</h2>
              <p>
                La salud respiratoria atraviesa distintos escenarios. Conocerlos
                permite acompañar el presente y anticipar el cuidado que sigue.
              </p>
            </Reveal>
            <BreathJourney />
          </div>
        </section>

        <section className="approach-section section-shell">
          <Reveal className="brand-figure">
            <div className="brand-figure-image">
              <Image
                src="/brand/adrian-ludovico-logo.jpeg"
                alt="Logo de Adrián Ludovico, corredor dentro de pulmones"
                fill
                sizes="(max-width: 760px) 88vw, 38vw"
              />
            </div>
          </Reveal>
          <Reveal className="approach-copy" delay={0.1}>
            <Heartbeat size={42} weight="duotone" aria-hidden="true" />
            <h2>La persona está en el centro del tratamiento.</h2>
            <p>
              La práctica diaria combina evaluación, evidencia científica y
              conocimiento de la trayectoria de cada enfermedad respiratoria.
            </p>
            <p>
              Cada plan busca mejorar la función, disminuir síntomas y sostener
              actividades cotidianas con responsabilidad, empatía y objetivos
              realistas.
            </p>
            <div className="credential-line">
              <SealCheck size={24} weight="fill" aria-hidden="true" />
              <span>
                Especialista en Kinesiología y Fisioterapia Cardiorrespiratoria
              </span>
            </div>
          </Reveal>
        </section>

        <section className="services-section" id="servicios">
          <div className="section-shell">
            <Reveal className="section-heading">
              <h2>Cómo cuidamos tu salud respiratoria.</h2>
              <p>
                Seis áreas de atención conectadas por un mismo criterio clínico:
                entender qué necesitás hoy y cómo sostenerlo mañana.
              </p>
            </Reveal>
            <ServiceExplorer />
          </div>
        </section>

        <section className="formation-section section-shell" id="formacion">
          <Reveal className="formation-intro">
            <h2>Formación que se mantiene en movimiento.</h2>
            <p>
              La actualización continua es parte del cuidado. Permite tomar
              decisiones más seguras y adaptar las herramientas a cada etapa.
            </p>
            <div className="profile-card">
              <div>
                <strong>Lic. Adrián Javier Ludovico</strong>
                <span>Kinesiólogo Cardiorrespiratorio</span>
              </div>
              <p>Matrícula profesional N.º 675</p>
              <p>Registro de especialista: RE N.º XVII, F 002, L1</p>
              <p>Miembro de la Asociación Argentina de Medicina Respiratoria</p>
            </div>
          </Reveal>

          <div className="education-list">
            {education.map((item, index) => (
              <Reveal key={`${item.year}-${item.title}`} delay={index * 0.05}>
                <article className="education-item">
                  <time>{item.year}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.institution}</p>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal>
              <article className="education-item education-continuous">
                <CheckCircle size={28} weight="fill" aria-hidden="true" />
                <div>
                  <h3>Capacitación permanente</h3>
                  <p>
                    Participación continua en congresos, jornadas académicas y
                    cursos de actualización en rehabilitación respiratoria.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="faq-section" id="preguntas">
          <div className="section-shell faq-layout">
            <Reveal className="faq-intro">
              <h2>Preguntas antes de empezar.</h2>
              <p>
                Una primera conversación ayuda a ordenar la consulta y definir la
                modalidad de atención adecuada.
              </p>
            </Reveal>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.04}>
                  <details>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="section-shell contact-layout">
            <Reveal>
              <h2>Tu consulta puede empezar con un mensaje.</h2>
              <p>
                Contanos qué necesitás para coordinar un turno o conocer las
                modalidades de atención disponibles.
              </p>
              <a
                className="button button-light"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsappLogo size={22} weight="fill" />
                Solicitar turno
                <ArrowUpRight size={18} weight="bold" />
              </a>
            </Reveal>

            <div className="contact-meta">
              {availableContactDetails.length > 0 ? (
                availableContactDetails.map((detail) => <p key={detail}>{detail}</p>)
              ) : (
                <p>
                  Los datos de consultorio y horarios se incorporarán cuando sean
                  confirmados.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-layout">
          <div>
            <strong>Adrián Javier Ludovico</strong>
            <span>Kinesiología y Fisioterapia Cardiorrespiratoria</span>
          </div>
          <p>Información profesional. No reemplaza una evaluación médica.</p>
        </div>
      </footer>

      <a
        className="floating-contact"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Solicitar turno por WhatsApp"
      >
        <WhatsappLogo size={27} weight="fill" />
      </a>
    </>
  );
}
