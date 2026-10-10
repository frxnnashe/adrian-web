"use client";

import {
  DeviceMobileCamera,
  FirstAid,
  Heartbeat,
  PersonSimpleRun,
  ShieldCheck,
  Wind,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { services, type ServiceIcon } from "@/lib/site";

const serviceIcons = {
  rehabilitation: PersonSimpleRun,
  airway: Wind,
  neuromuscular: Heartbeat,
  ventilation: ShieldCheck,
  surgery: FirstAid,
  telehealth: DeviceMobileCamera,
} satisfies Record<ServiceIcon, typeof Wind>;

export function ServiceExplorer() {
  const [selectedId, setSelectedId] = useState(services[0].id);
  const selected =
    services.find((service) => service.id === selectedId) ?? services[0];
  const SelectedIcon = serviceIcons[selected.icon];

  return (
    <div className="service-explorer">
      <div className="service-selectors" aria-label="Especialidades disponibles">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          const active = service.id === selected.id;

          return (
            <button
              key={service.id}
              type="button"
              data-testid="service-selector"
              className="service-selector"
              data-active={active}
              aria-pressed={active}
              aria-label={`${service.shortTitle}: ${service.title}`}
              onClick={() => setSelectedId(service.id)}
            >
              <span className="service-icon" aria-hidden="true">
                <Icon size={23} weight={active ? "fill" : "regular"} />
              </span>
              <span>{service.shortTitle}</span>
            </button>
          );
        })}
      </div>

      <div className="service-detail" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <SelectedIcon className="detail-icon" size={54} weight="duotone" />
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <ul>
              {selected.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
