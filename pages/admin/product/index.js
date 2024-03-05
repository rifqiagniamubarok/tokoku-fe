import AdminLayout from '@/components/templates/AdminLayout';
import { Button, Card, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { TiEye } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import ImageComponent from '@/components/atoms/ImageComponent';

const Product = () => {
  return (
    <AdminLayout title={'Product'}>
      <Card className="p-4">
        <div className="flex gap-2 items-center">
          <Input label="Search" variant="bordered" color="primary" size="sm" className="w-1/3" />
          <Button color="primary">Add new</Button>
          <Button color="primary">Add Stock</Button>
          <Button color="danger">Reduce Stock</Button>
        </div>
        <Table aria-label="Example static collection table" removeWrapper className="mt-4">
          <TableHeader>
            <TableColumn>Img</TableColumn>
            <TableColumn>Product</TableColumn>
            <TableColumn>Cost Price</TableColumn>
            <TableColumn>Selling Price</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {[...Array(8)].map((_, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  <div className="h-full aspect-video relative overflow-hidden rounded-md bg-black">
                    <ImageComponent src="/images/dummy-product.jpg" fill className="w-full aspect-video object-contain" />
                  </div>
                </TableCell>
                <TableCell>Product {index}</TableCell>
                <TableCell>Rp. 40.000</TableCell>
                <TableCell>Rp. 50.000</TableCell>
                <TableCell>5000</TableCell>
                <TableCell align="right">
                  <Button isIconOnly size="sm" variant="faded" color="primary">
                    <TiEye />
                  </Button>
                  <Button isIconOnly size="sm" variant="faded" color="warning">
                    <MdEdit />
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

export default Product;
