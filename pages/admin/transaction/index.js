import AdminLayout from '@/components/templates/AdminLayout';
import { Button, Card, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { TiEye } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import ImageComponent from '@/components/atoms/ImageComponent';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import dayjs from 'dayjs';

const Transaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectTransaction, setSelectTransaction] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.get('/admin/transactions');

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchConfirm = async (id) => {
    try {
      setSelectTransaction(id);
      setConfirmLoading(true);
      await axiosInstance.post('/admin/transactions/confirm/' + id);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
      setSelectTransaction(0);
    }
  };

  const handleConfirm = (id) => {
    fetchConfirm(id);
  };

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
            {transactions.map(({ updated_at, basket, status, id }, index) => (
              <TableRow key={index + 1}>
                <TableCell>{dayjs(updated_at).format('MMM, DD YYYY HH:mm')}</TableCell>
                <TableCell>Rp. {basket?.total_price}</TableCell>
                <TableCell>{basket?.items}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell align="right">
                  <Button
                    size="sm"
                    variant="solid"
                    color="primary"
                    isDisabled={status !== 'confirmation_pending'}
                    onClick={() => handleConfirm(id)}
                    isLoading={id === selectTransaction && confirmLoading}
                  >
                    Confirm
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className="mt-4 flex justify-center">
          <Pagination total={10} initialPage={1} />
        </div> */}
      </Card>
    </AdminLayout>
  );
};

export default Transaction;
