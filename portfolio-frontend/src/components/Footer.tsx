interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textTertiary = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <footer className={`py-8 px-4 sm:px-6 border-t ${borderColor}`}>
      <div className="w-full mx-auto text-center" style={{ maxWidth: '72rem' }}>
        <p className={textTertiary}>
          © 2025 Dev-Shivam. Built with React & Node.js
        </p>
      </div>
    </footer>
  );
}