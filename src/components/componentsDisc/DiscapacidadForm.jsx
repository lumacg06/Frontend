import React, { useState, useEffect } from "react";
import axios from "axios";

const DiscapacidadForm = ({ discapacidad, onSave }) => {
  const [discapacidadValue, setDiscapacidadValue] = useState("");
  useEffect(() => {
    if (discapacidad) {
      setDiscapacidadValue(discapacidad.categoria || "");
    }
  }, [discapacidad]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDiscapacidad = {
      categoria: discapacidadValue,
      ...(discapacidad?.id && { id: discapacidad.id }),
    };

    try {
      let response;

      if (discapacidad?.id) {
        response = await axios.put(
          `http://localhost:8080/api/discapacidades/${discapacidad.id}`,
          newDiscapacidad
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/discapacidades",
          newDiscapacidad
        );
      }

      onSave(response.data);
      setDiscapacidadValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="discapacidad-form-container" onSubmit={handleSubmit}>
      <label className="discapacidad-form-label">
        {discapacidad?.id ? "Editar" : "Nueva"} categoría:
        <input
          className="discapacidad-form-input"
          type="text"
          value={discapacidadValue}
          onChange={(e) => setDiscapacidadValue(e.target.value)}
          maxLength={255}
          required
        />
      </label>
      <button
        className="discapacidad-submit-button"
        type="submit"
        disabled={!discapacidadValue.trim()}
      >
        {discapacidad?.id ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default DiscapacidadForm;
