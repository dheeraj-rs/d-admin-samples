import Layout from '../../layout/layout';

export const metadata = {
  title: 'uicode',
  description:
    'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: 'device-width' },
  openGraph: {
    type: 'website',
    title: 'Uicode',
    url: '',
    description:
      'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    ttl: 604800,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AppLayout({ children }) {
  return <Layout>{children}</Layout>;
}
