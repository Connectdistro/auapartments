import { NavLink } from 'react-router-dom';

const TABS = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <path d="M4 11.5 12 4l8 7.5M6 10v9h5v-5h2v5h5v-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    ),
  },
  {
    to: '/apartments',
    label: 'Stays',
    icon: (
      <path
        d="M4 21V9l8-5 8 5v12h-5v-6H9v6H4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    to: '/saved',
    label: 'Saved',
    icon: (
      <path
        d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5 5.5 5c2 0 3.4 1.1 4.5 2.6C11.1 6.1 12.5 5 14.5 5 18 5 19.6 8.6 22 11.9 19.5 16.4 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    ),
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: (
      <path
        d="M4 6h16v12H4z M4 6l8 7 8-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
];

export default function MobileActionBar() {
  return (
    <nav className="ios-tab-bar" aria-label="Primary">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => `ios-tab${isActive ? ' is-active' : ''}`}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            {tab.icon}
          </svg>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
