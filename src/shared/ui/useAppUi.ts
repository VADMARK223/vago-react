import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export function useAppUi() {
  const screens = useBreakpoint();

  const isPhone = !screens.md; // < 768
  const isTablet = !!screens.md && !screens.lg; // 768–991
  const isDesktop = !!screens.lg; // >= 992

  return {
    isPhone,
    isTablet,
    isDesktop,
  };
}
