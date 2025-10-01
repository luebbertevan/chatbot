
export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}

