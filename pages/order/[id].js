import ClientLayout from '@/components/templates/ClientLayout';
import { BreadcrumbItem, Breadcrumbs, Button, Card, Divider } from '@nextui-org/react';
import Link from 'next/link';

const OrderDetail = () => {
  return (
    <ClientLayout className={'space-y-4'}>
      <div>
        <Breadcrumbs variant="solid" color="primary">
          <BreadcrumbItem>
            <Link className="" href={'/order'}>
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Card className="p-4">
        <Divider className="my-4" />
        <div>
          <p className="font-semibold mb-4">Detail :</p>
          <div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="my-2">
                <p>Prineter rusak</p>
                <p className="text-primary font-semibold">Rp. 5.000</p>
                <p>@5.000 x 12</p>
                <Divider />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="my-4">
            <p className="text-lg">Items : 10</p>
            <p className="text-xl text-primary">Price : Rp. 10.000</p>
          </div>
          <Button className="w-full" color="primary">
            Pay
          </Button>
        </div>
      </Card>
    </ClientLayout>
  );
};

export default OrderDetail;
