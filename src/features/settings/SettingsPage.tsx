import { theme } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useAppUi } from '../../shared/ui/useAppUi.ts';
import { useMe } from '../auth/auth.ts';

export function SettingsPage() {
  const { isPhone, isTablet, isDesktop } = useAppUi();
  const { data: me } = useMe();
  const { token } = theme.useToken();
  let roleName = 'UNKNOWN';

  const yesRender = () => <CheckCircleTwoTone twoToneColor={token.colorSuccess} />;
  const noRender = () => <CloseCircleTwoTone twoToneColor={token.colorError} />;

  function assertNever(x: never): never {
    throw new Error(`Unhandled case: ${String(x)}`);
  }

  if (!me) return null;
  if (!me.role) return null;

  switch (me.role) {
    case 'admin':
      roleName = 'Админ';
      break;
    case 'moderator':
      roleName = 'Модер';
      break;
    case 'user':
      roleName = 'Юзер';
      break;
    default:
      assertNever(me.role);
  }

  return (
    <>
      <h2>Пользователь</h2>
      <p>Username: {me?.username}</p>
      <p>Role: {roleName}</p>
      <hr />
      <h2>Режим пользовательского интерфейса</h2>
      <p>Is phone: {isPhone ? yesRender() : noRender()}</p>
      <p>Is tablet: {isTablet ? yesRender() : noRender()}</p>
      <p>Is desktop: {isDesktop ? yesRender() : noRender()}</p>
    </>
  );
}
