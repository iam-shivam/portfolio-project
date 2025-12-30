import { useState } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ isDarkMode, toggleTheme, activeSection, scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    // { id: 'services', label: 'Services' },
    // { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textTertiary = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-900';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#1a1f2e]/95' : 'bg-white/95'} backdrop-blur-sm border-b ${borderColor} transition-colors duration-300`} style={{ width: '100vw' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code2 className="w-7 h-7 text-purple-500" />
            <span className="text-xl font-bold">Dev-Shivam</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors ${
                  activeSection === item.id ? 'text-purple-400' : `${textTertiary} hover:${textPrimary}`
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              } transition-all`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } rounded`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}