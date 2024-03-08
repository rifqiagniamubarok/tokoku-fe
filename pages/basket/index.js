import ImageComponent from '@/components/atoms/ImageComponent';
import ClientLayout from '@/components/templates/ClientLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';

const Basket = () => {
  const router = useRouter();
  const [basket, setBasket] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.get('/baskets');
      console.log({ data });
      setBasket(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCheckOut = async () => {
    try {
      setUploadIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.post('/transactions/checkout');
      router.push('/order');
    } catch (error) {
      console.error(error);
    } finally {
      setUploadIsLoading(false);
    }
  };

  const handleCheckout = () => {
    fetchCheckOut();
  };
  return (
    <ClientLayout className={' flex flex-col '}>
      <div className="grow">
        <div className="space-y-4">
          {!isLoading &&
            basket?.basket_items?.map(({ price_per_item, total_price, qty, product }, index) => (
              <Card className="p-2 md:p-4 grid grid-cols-6 gap-4">
                <div className="col-span-2 lg:col-span-2">
                  <div className="w-full aspect-video relative overflow-hidden rounded-md bg-black">
                    <ImageComponent src="" fill className="w-full aspect-video object-contain" />
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-4 space-y-2">
                  <div className="space-y-1">
                    <p className="text-sm">{product?.name}</p>
                    <p className="text-sm">Rp. {total_price}</p>
                    <p className="text-xs text-gray-600">@{price_per_item}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Qty:</p>
                    <div className="flex items-center gap-2">
                      <Button isIconOnly variant="solid" color="primary">
                        <LuMinus />
                      </Button>
                      <Input value={qty} type="number" variant="bordered" color="primary" className="w-20" onChange={(e) => setQty(e.target.value)} />
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
        <p>Total : Rp. {basket?.total_price}</p>
        <Button className="w-full" color="primary" onClick={handleCheckout} isLoading={uploadIsLoading}>
          Checkout
        </Button>
      </Card>
    </ClientLayout>
  );
};

export default Basket;
