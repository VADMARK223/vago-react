import { theme } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useAppUi } from '../../shared/ui/useAppUi.ts';

export function SettingsPage() {
  const { isPhone, isTablet, isDesktop } = useAppUi();
  const { token } = theme.useToken();

  const yesRender = () => <CheckCircleTwoTone twoToneColor={token.colorSuccess} />;

  const noRender = () => <CloseCircleTwoTone twoToneColor={token.colorError} />;

  return (
    <>
      <h1>Modes</h1>
      <p>Is phone: {isPhone ? yesRender() : noRender()}</p>
      <p>Is tablet: {isTablet ? yesRender() : noRender()}</p>
      <p>Is desktop: {isDesktop ? yesRender() : noRender()}</p>
    </>
  );
}
