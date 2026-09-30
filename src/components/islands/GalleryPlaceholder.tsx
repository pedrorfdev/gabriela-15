import { IconCamera } from '@tabler/icons-react';

const GRADIENTS = [
  'from-[#E3B9C8] to-[#D8C08A]',
  'from-[#D8C08A] to-[#A3AE8C]',
  'from-[#D9A3B8] to-[#E3B9C8]',
  'from-[#A3AE8C] to-[#D9A3B8]',
  'from-[#E3B9C8] to-[#A3AE8C]',
  'from-[#D8C08A] to-[#D9A3B8]',
];

export default function GalleryPlaceholder() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {GRADIENTS.map((gradient, index) => (
        <div
          key={index}
          className={`flex aspect-square items-center justify-center bg-linear-to-br ${gradient}`}
        >
          <IconCamera size={28} className="text-white/85" />
        </div>
      ))}
    </div>
  );
}