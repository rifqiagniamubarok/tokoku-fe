import AdminLayout from '@/components/templates/AdminLayout';
import { Button, Card, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { TiEye } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import ImageComponent from '@/components/atoms/ImageComponent';

const Transaction = () => {
  return (
    <AdminLayout title={'Transaction'}>
      {' '}
      <Card className="p-4">
        <div className="flex gap-2 items-center">
          <Input label="Search" variant="bordered" color="primary" size="sm" className="w-1/3" />
        </div>
        <Table aria-label="Example static collection table" removeWrapper className="mt-4">
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Item</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {[...Array(8)].map((_, index) => (
              <TableRow key={index + 1}>
                <TableCell>Product {index}</TableCell>
                <TableCell>Rp. 40.000</TableCell>
                <TableCell>30</TableCell>
                <TableCell>Confirm_Pending</TableCell>
                <TableCell align="right">
                  <Button size="sm" variant="solid" color="primary">
                    Confirm
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Pagination total={10} initialPage={1} />
        </div>
      </Card>
    </AdminLayout>
  );
};

export default Transaction;
