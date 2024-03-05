import ImageComponent from '@/components/atoms/ImageComponent';
import ClientLayout from '@/components/templates/ClientLayout';
import { Button, Card, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';

const Basket = () => {
  const router = useRouter();
  const handleCheckout = () => {
    router.push('/order/ksj');
  };
  return (
    <ClientLayout className={' flex flex-col '}>
      <div className="grow">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Card className="p-2 md:p-4 grid grid-cols-6 gap-4">
              <div className="col-span-2 lg:col-span-2">
                <div className="w-full aspect-video relative overflow-hidden rounded-md bg-black">
                  <ImageComponent src="/images/dummy-product.jpg" fill className="w-full aspect-video object-contain" />
                </div>
              </div>
              <div className="col-span-4 lg:col-span-4 space-y-2">
                <div className="space-y-1">
                  <p className="text-sm">Printer rusak</p>
                  <p className="text-sm">Rp. 62.000</p>
                  <p className="text-xs text-gray-600">@32.000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm">Qty:</p>
                  <div className="flex items-center gap-2">
                    <Button isIconOnly variant="solid" color="primary">
                      <LuMinus />
                    </Button>
                    <Input value={1} type="number" variant="bordered" color="primary" className="w-20" onChange={(e) => setQty(e.target.value)} />
                    <Button isIconOnly variant="solid" color="primary">
                      <IoMdAdd />
                    </Button>
                  </div>
                  <Button className="" color="danger">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Card className="min-h-[50px]  border-gray-400 space-y-1 py-2 p-2 md:p-4 mt-4">
        <p>Total : Rp. 500.000</p>
        <Button className="w-full" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Card>
    </ClientLayout>
  );
};

export default Basket;
