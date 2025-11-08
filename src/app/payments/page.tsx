import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PaymentsTable } from '@/components/payments/payments-table';
import { mockPayments } from '@/lib/data';

export default function PaymentsPage() {
  return (
    <DashboardLayout pageTitle="Payments Management">
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            A complete record of all payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentsTable data={mockPayments} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
