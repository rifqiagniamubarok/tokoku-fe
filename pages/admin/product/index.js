import AdminLayout from '@/components/templates/AdminLayout';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react';
import { TiEye } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import ImageComponent from '@/components/atoms/ImageComponent';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

const Product = () => {
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
  const { isOpen: isOpenAddStock, onOpen: onOpenAddStock, onClose: onCloseAddStock, onOpenChange: onOpenChangeAddStock } = useDisclosure();
  const { isOpen: isOpenReduceStock, onOpen: onOpenReduceStock, onClose: onClosnReduceStock, onOpenChange: onOpenChangnReduceStock } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState({ id: 0, value: 0 });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.get('/admin/products');

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

  const fetchAddData = async (payload) => {
    try {
      setUploadIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.post('/admin/products', payload);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setUploadIsLoading(false);
      onCloseAdd();
    }
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const { target } = event;

    let name = target[0].value;
    let cost_price = target[1].value;
    let selling_price = target[2].value;
    let stock = target[3].value;

    fetchAddData({ name, cost_price, selling_price, stock, is_disable: false });
  };

  const fetchToggleDisable = async (id) => {
    try {
      setUploadIsLoading(true);
      await axiosInstance.post('/admin/products/toggle-disable/' + id);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setUploadIsLoading(false);
      onCloseAdd();
    }
  };

  const handleToogleDisable = (id) => {
    fetchToggleDisable(id);
  };

  const fetchAddStock = async (id, payload) => {
    try {
      setUploadIsLoading(true);
      await axiosInstance.post('/admin/products/stock/' + id, payload);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setUploadIsLoading(false);
      setSelectProduct({ id: 0, value: 0 });
      onCloseAddStock();
    }
  };

  const handleAddStock = (event) => {
    event.preventDefault();
    const { target } = event;

    let product_id = selectProduct.id;
    let new_stock = Number(selectProduct.value);

    fetchAddStock(product_id, { new_stock });
  };

  const fetchReduceStock = async (id, payload) => {
    try {
      setUploadIsLoading(true);
      await axiosInstance.post('/admin/products/stock/reduce/' + id, payload);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setUploadIsLoading(false);
      setSelectProduct({ id: 0, value: 0 });
      onClosnReduceStock();
    }
  };

  const handleReduceStock = (event) => {
    event.preventDefault();
    const { target } = event;

    let product_id = selectProduct.id;
    let new_stock = Number(selectProduct.value);

    fetchReduceStock(product_id, { new_stock });
  };

  return (
    <AdminLayout title={'Product'}>
      <Card className="p-4">
        <div className="flex gap-2 items-center">
          <Input label="Search" variant="bordered" color="primary" size="sm" className="w-1/3" />
          <Button color="primary" onClick={onOpenAdd}>
            Add new
          </Button>
          <Button color="primary" onClick={onOpenAddStock}>
            Add Stock
          </Button>
          <Button color="danger" onClick={onOpenReduceStock}>
            Reduce Stock
          </Button>
        </div>
        <>
          <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd}>
            <ModalContent>
              {(onClose) => (
                <form onSubmit={handleAddProduct}>
                  <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Input name="name" label="name" type="text" variant="bordered" color="primary" required />
                      <Input name="cost_price" label="cost_price" type="number" variant="bordered" color="primary" required />
                      <Input name="selling_price" label="selling_price" type="number" variant="bordered" color="primary" required />
                      <Input name="stock" label="stock" type="number" variant="bordered" color="primary" required />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" isLoading={uploadIsLoading}>
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenAddStock} onOpenChange={onOpenChangeAddStock}>
            <ModalContent>
              {(onClose) => (
                <form onSubmit={handleAddStock}>
                  <ModalHeader className="flex flex-col gap-1">Add Stock</ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Autocomplete
                        label="Select product"
                        name="product_id"
                        variant="bordered"
                        color="primary"
                        selectedKey={selectProduct.id}
                        onSelectionChange={(key) => {
                          setSelectProduct({ ...selectProduct, id: key });
                        }}
                        required
                      >
                        {products.map((product) => (
                          <AutocompleteItem key={product.id} value={product.id}>
                            {product.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>

                      <Input
                        name="new_stock"
                        label="New stock"
                        type="number"
                        variant="bordered"
                        color="primary"
                        value={selectProduct.value}
                        onChange={({ target: { value } }) => setSelectProduct({ ...selectProduct, value })}
                        required
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" isLoading={uploadIsLoading}>
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenReduceStock} onOpenChange={onOpenChangnReduceStock}>
            <ModalContent>
              {(onClose) => (
                <form onSubmit={handleReduceStock}>
                  <ModalHeader className="flex flex-col gap-1">Reduce Stock</ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
                      <Autocomplete
                        label="Select product"
                        name="product_id"
                        variant="bordered"
                        color="primary"
                        selectedKey={selectProduct.id}
                        onSelectionChange={(key) => {
                          setSelectProduct({ ...selectProduct, id: key });
                        }}
                        required
                      >
                        {products.map((product) => (
                          <AutocompleteItem key={product.id} value={product.id}>
                            {product.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>

                      <Input
                        name="new_stock"
                        label="Reduce stock"
                        type="number"
                        variant="bordered"
                        color="primary"
                        value={selectProduct.value}
                        onChange={({ target: { value } }) => setSelectProduct({ ...selectProduct, value })}
                        required
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" isLoading={uploadIsLoading}>
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalContent>
          </Modal>
        </>
        <Table aria-label="Example static collection table" removeWrapper className="mt-4">
          <TableHeader>
            <TableColumn>Img</TableColumn>
            <TableColumn>Product</TableColumn>
            <TableColumn>Cost Price</TableColumn>
            <TableColumn>Selling Price</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {products.map(({ name, cost_price, selling_price, stock, is_disable, id }, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  <div className="h-full aspect-video relative overflow-hidden rounded-md bg-black">
                    <ImageComponent src="" fill className="w-full aspect-video object-contain" />
                  </div>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>Rp. {cost_price}</TableCell>
                <TableCell>Rp. {selling_price}</TableCell>
                <TableCell>{stock}</TableCell>
                <TableCell>{!is_disable ? 'active' : 'disabled'} </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleToogleDisable(id)} color={is_disable ? 'primary' : 'danger'}>
                    {is_disable ? 'activate' : 'disable'}
                  </Button>
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
        {/* <div className="mt-4 flex justify-center">
          <Pagination total={10} initialPage={1} />
        </div> */}
      </Card>
    </AdminLayout>
  );
};

export default Product;
