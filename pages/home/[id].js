import ImageComponent from '@/components/atoms/ImageComponent';
import ClientLayout from '@/components/templates/ClientLayout';
import axiosInstance from '@/utils/axiosInstance';
import { BreadcrumbItem, Breadcrumbs, Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';

const ProductDetail = () => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);
  const [product, setProduct] = useState({});

  const handleAddQty = () => {
    setQty(Number(qty) + 1);
  };

  const handleDecreaseQty = () => {
    if (qty > 1) setQty(Number(qty) - 1);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { id } = router.query;
      const {
        data: { data },
      } = await axiosInstance.get('/products/' + id);

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inputToBasket = async (qty) => {
    try {
      setUploadIsLoading(true);
      const { id } = router.query;
      const {
        data: { data },
      } = await axiosInstance.post('/baskets/input/' + id, { qty });
      router.push('/basket');
    } catch (error) {
      console.error(error);
    } finally {
      setUploadIsLoading(false);
    }
  };

  const handleAddBasket = () => {
    inputToBasket(qty);
  };

  return (
    <ClientLayout className={'space-y-4'}>
      <div>
        <Breadcrumbs variant="solid" color="primary">
          <BreadcrumbItem>
            <Link className="" href={'/home'}>
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-3 md:gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[200px] md:h-[500px] w-full relative overflow-hidden bg-black rounded-md">
          <ImageComponent src="/images/dummy-product.jpg" fill className="w-full aspect-video object-contain" />
        </div>
        <div className="md:col-span-3 lg:col-span-2 h-full flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xl">{product?.name}</p>
            <p className="text-2xl text-primary font-semibold">Rp. {product?.selling_price}</p>
            <p className="text-xl text-gray-500">Stock : {product?.stock}</p>
            <p>
              is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged.
            </p>
          </div>
          <div className="space-y-2 pb-5 md:pb-0">
            <div className="flex items-center gap-2">
              <p className="text-2xl">Qty:</p>
              <Button isIconOnly variant="solid" color="primary" onClick={handleDecreaseQty}>
                <LuMinus />
              </Button>
              <Input value={qty} type="number" variant="bordered" color="primary" className="w-20" onChange={(e) => setQty(e.target.value)} />
              <Button isIconOnly variant="solid" color="primary" onClick={handleAddQty}>
                <IoMdAdd />
              </Button>
            </div>
            <Button className="w-full" color="primary" onClick={handleAddBasket}>
              Add to basket
            </Button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ProductDetail;
