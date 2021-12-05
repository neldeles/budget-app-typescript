export type CheckboxProps = {
  id: string;
  name: string;
  /** Label displayed to the right of checkbox */
  label: string;
  checked?: boolean;
  /** Event handler for Checkbox */
  onChange?: () => void;
};

export function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
        id={id}
        name={name}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={name} className="block ml-2 text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}
