import ImageComponent from '@/components/atoms/ImageComponent';
import ClientLayout from '@/components/templates/ClientLayout';
import axiosInstance from '@/utils/axiosInstance';
import { Button, Card, Input, Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.get('/products');
      // console.log({ data });
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <ClientLayout className="space-y-4">
      <div>
        <form onSubmit={handleSearch}>
          <Input
            label="Search"
            variant="bordered"
            color="primary"
            name="search"
            endContent={
              <button className="h-full flex items-center" type="submit">
                <FaSearch className="text-primary text-2xl cursor-pointer" />
              </button>
            }
          />
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map(({ id, name, price }, index) => (
          <Link href={'/home/' + id}>
            <Card className="" key={id}>
              <div className="w-full aspect-video relative overflow-hidden bg-black">
                <ImageComponent src="" fill className="w-full aspect-video object-contain" />
              </div>
              <div className="p-4">
                <Skeleton className="mb-1 rounded-md" isLoaded={!isLoading}>
                  <p className="text-xs md:text-sm lg:text-base">{name}</p>
                </Skeleton>
                <Skeleton className="rounded-md" isLoaded={!isLoading}>
                  <p className="text-sm md:text-base lg:text-lg font-semibold text-primary">Rp. {price}</p>
                </Skeleton>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {/* <div className="text-center">
        <Button className="" color="primary">
          Load more
        </Button>
      </div> */}
    </ClientLayout>
  );
};

export default Home;
