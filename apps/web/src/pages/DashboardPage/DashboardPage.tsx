import { Title } from '../../common/templates/MainLayout';
import DomainForm from '../../domain/organisms/DomainForm';
import DomainList from '../../domain/organisms/DomainList';
import { requireAuth } from '../../utils';

function DashboardPage() {
  return (
    <>
      <Title>Dashboard</Title>
      <DomainForm />
      <DomainList />
    </>
  );
}

export default requireAuth(DashboardPage);
