import withNextIntl from 'next-intl/plugin';
import { NextConfig } from 'next';

const config: NextConfig = {};

export default withNextIntl('./src/lib/i18n.ts')(config);
