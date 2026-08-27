type ShutterButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label: string;
};

export function ShutterButton({ onClick, disabled, label }: ShutterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group grid justify-items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={label}
    >
      <span className="tactile grid h-20 w-20 place-items-center rounded-full border-2 border-[#171717] bg-[#fdfcf7]">
        <span className="h-12 w-12 rounded-full bg-[#b45b42] shadow-inner group-hover:bg-[#a24b35]" />
      </span>
      <span className="text-sm lowercase text-[#171717]">{label}</span>
    </button>
  );
}
