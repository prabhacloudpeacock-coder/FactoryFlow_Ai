import { useEffect } from 'react';
import { toast } from 'sonner';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export default function SecurityProvider({ children }: SecurityProviderProps) {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.error('Context menu is disabled for security reasons.');
    };

    // Disable common developer tools keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
        toast.error('Developer tools access is restricted.');
        return;
      }

      // Prevent Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        toast.error('Developer tools access is restricted.');
        return;
      }

      // Prevent Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        toast.error('Developer tools access is restricted.');
        return;
      }

      // Prevent Ctrl+U (Windows/Linux) or Cmd+Option+U (Mac) - View Source
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        toast.error('Viewing source code is restricted.');
        return;
      }

      // Prevent Ctrl+S (Windows/Linux) or Cmd+S (Mac) - Save Page
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        toast.error('Saving page is restricted.');
        return;
      }
    };

    // Disable drag and drop of images/text to prevent easy copying
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return <>{children}</>;
}
