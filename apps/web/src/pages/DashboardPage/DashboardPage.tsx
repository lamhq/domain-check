import { Title } from '../../common/templates/MainLayout';
import DomainForm from '../../domain/organisms/DomainForm';
import DomainList from '../../domain/organisms/DomainList';

export default function DashboardPage() {
  return (
    <>
      <Title>Dashboard</Title>
      <DomainForm />
      <DomainList />
    </>
  );
}
