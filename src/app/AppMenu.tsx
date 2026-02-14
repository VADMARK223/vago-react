import { Menu, type MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ROUTE } from '@/shared/constants';
import {
  HomeOutlined,
  ReadOutlined,
  RobotOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
  WechatOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useAuth, useSignInRedirect } from '../features/auth/auth.ts';

interface Props {
  onItemClick?: () => void;
}

export function AppMenu({ onItemClick }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const goSignIn = useSignInRedirect();
  const { isAuthed, isAdminModerator, isLoading } = useAuth();

  const selectedKey = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith(ROUTE.BOOK)) {
      return ROUTE.BOOK;
    }
    return location.pathname;
  }, [location.pathname]);

  const items: MenuProps['items'] = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">Главная</Link> },
    { key: ROUTE.BOOK, icon: <ReadOutlined />, label: <Link to={ROUTE.BOOK}>Книга</Link> },
    { key: ROUTE.TEST, icon: <ScheduleOutlined />, label: <Link to={ROUTE.TEST}>Тест</Link> },
    {
      key: ROUTE.QUESTIONS,
      icon: <QuestionCircleOutlined />,
      label: <Link to={ROUTE.QUESTIONS}>Вопросы</Link>,
    },
    { type: 'divider' as const },
    {
      key: ROUTE.CHAT,
      icon: <WechatOutlined />,
      label: <Link to={ROUTE.CHAT}>Чат</Link>,
    },
    {
      key: ROUTE.TASKS,
      icon: <UnorderedListOutlined />,
      label: <Link to={ROUTE.TASKS}>Задачи</Link>,
    },
    {
      key: ROUTE.ADMIN,
      icon: <RobotOutlined />,
      label: <Link to={ROUTE.ADMIN}>Админка</Link>,
      disabled: isLoading || !isAuthed || !isAdminModerator,
    },
    {
      key: ROUTE.SETTINGS,
      icon: <SettingOutlined />,
      label: <Link to={ROUTE.SETTINGS}>Настройки</Link>,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (isLoading) {
      return;
    }

    if (key === ROUTE.TASKS && !isAuthed) {
      goSignIn(ROUTE.TASKS);
      return;
    }

    navigate(key);
    onItemClick?.();
  };

  return <Menu mode="inline" selectedKeys={[selectedKey]} items={items} onClick={onClick} />;
}
