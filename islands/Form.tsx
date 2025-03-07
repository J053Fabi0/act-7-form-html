import { useSignal } from "@preact/signals";
import { JSX } from "preact/src/index.d.ts";

interface InputLayout {
  type: string;
  name: string;
  label: string;
  pattern?: string;
}

const personalDataInputs: InputLayout[] = [
  {
    type: "text",
    label: "Nombre",
    name: "name",
  },
  {
    label: "Número de teléfono",
    name: "phone",
    type: "tel",
    pattern: "[2-9][0-9]{2}-[0-9]{3}-[0-9]{4}",
  },
  {
    label: "Dirección de correo electrónico",
    name: "email",
    type: "email",
  },
  {
    label: "Fecha de nacimiento",
    name: "birthdate",
    type: "date",
  },
];

const selectorOptions = [
  "Revisión física anual",
  "Síntomas de resfriado o gripe",
  "Prueba de sangre",
  "Postoperatorio",
  "Otro caso",
];

export default function Form() {
  const selection = useSignal(selectorOptions[0]);
  const handleSelector = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) =>
    void (selection.value = e.currentTarget.value);

  return (
    <form className="flex flex-col justify-center">
      <fieldset className="border-2 border-gray-300 p-4 rounded-md mb-4">
        <legend className="text-lg font-semibold">Datos personales</legend>
        {personalDataInputs.map((d) => (
          <label className="block mb-4">
            {d.label}
            <input
              required
              type={d.type}
              name={d.name}
              pattern={d.pattern}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        ))}
      </fieldset>

      <fieldset className="border-2 border-gray-300 p-4 rounded-md">
        <legend className="text-lg font-semibold">Solicitud de cita</legend>

        <label className="block mb-4">
          ¿Cuál es el motivo de su visita?
          <select
            required
            onChange={handleSelector}
            defaultValue={selectorOptions[0]}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
          >
            {selectorOptions.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        {selection.value === selectorOptions.at(-1) ? (
          <label className="block mb-4">
            Escriba el motivo
            <input
              required
              type="text"
              name="othermotive"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        ) : null}

        <label className="block mb-4">
          Nivel de dolor actual
          <input
            type="range"
            name="painlevel"
            min="0"
            max="10"
            step="0.5"
            defaultValue="5"
            className="mt-1 block w-full"
          />
          <span className="text-sm">0 no hay dolor, 10 es el peor dolor imaginable</span>
        </label>

        <label className="block mb-4">
          Fecha preferida
          <input
            required
            type="date"
            name="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block mb-4">
          Hora preferida
          <input
            required
            type="time"
            name="time"
            min="08:00"
            max="18:00"
            step="3600"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </fieldset>

      <div className="flex justify-center">
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Enviar
        </button>
      </div>
    </form>
  );
}
