import { Link } from '@inertiajs/react';

export default function TextInput({
  children,
  className,
  onClick,
  type = 'button',
  title,
}) {
  return (
    <>
      {type == 'button' && (
        <button
          title={title}
          type="button"
          onClick={onClick}
          className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}>
          {children}
        </button>
      )}

      {type == 'link' && (
        <Link
          title={title}
          href={onClick}
          className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        >
          {children}
        </Link>
      )}
    </>
  );
}