import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't render breadcrumb on root path
  if (location.pathname === '/') {
    return null;
  }
  if (location.pathname === '/checkout') {
    return null;
  }

  const getBreadcrumbName = (path: string) => {
    switch (path) {
      case 'product':
        return 'Products';
      case 'category':
        return 'Categories';
      default:
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    }
  };

  const generateBreadcrumbs = () => {
    let breadcrumbs = [];
    let currentPath = '';

    // Always add Home
    breadcrumbs.push({
      name: 'Home',
      path: '/',
      isLast: pathnames.length === 0
    });

    // Add intermediate paths
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      breadcrumbs.push({
        name: getBreadcrumbName(name),
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex px-12 py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
            <Link
              to={breadcrumb.path}
              className={`${index > 0 ? 'ml-2' : ''} ${
                breadcrumb.isLast
                  ? 'text-[#468847] font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-current={breadcrumb.isLast ? 'page' : undefined}
            >
              {breadcrumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}