import React from "react";

interface InputSpec {
  name: string;
  type: "image" | "text" | "csv";
  label?: string;
}

interface FormBuilderProps {
  inputSpec: InputSpec[];
  onInput: (data: Record<string, any>) => void;
}

export default function FormBuilder({ inputSpec, onInput }: FormBuilderProps) {
  const [form, setForm] = React.useState<Record<string, any>>({});

  function handleChange(name: string, value: any) {
    setForm(f => {
      const updated = { ...f, [name]: value };
      onInput(updated);
      return updated;
    });
  }

  return (
    <form className="space-y-4">
      {inputSpec.map(input => (
        <div key={input.name}>
          {input.type === "image" && (
            <input type="file" accept="image/*" onChange={e => e.target.files && handleChange(input.name, e.target.files[0])} />
          )}
          {input.type === "text" && (
            <input type="text" placeholder={input.label || input.name} onChange={e => handleChange(input.name, e.target.value)} className="border rounded px-3 py-2 w-full" />
          )}
          {input.type === "csv" && (
            <input type="file" accept=".csv" onChange={e => e.target.files && handleChange(input.name, e.target.files[0])} />
          )}
        </div>
      ))}
    </form>
  );
}
