import { Button, Card, Divider, Input } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    const { target } = event;

    let name = target[0].value;
    let username = target[0].value;
    let password = target[1].value;

    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, { name, username, password });
      router.push('/');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-white-classic flex justify-center items-center">
      <Card className="p-4 min-w-[300px] min-h-[400px] flex flex-col justify-between">
        <div></div>
        <div>
          <div className="my-4">
            <p className="text-primary text-2xl font-semibold text-center">Register</p>
          </div>
          <form className="space-y-4" onSubmit={handleRegister}>
            <Input label="Name" name="name" type="text" variant="bordered" color="primary" />
            <Input label="Username" name="username" type="text" variant="bordered" color="primary" />
            <Input label="Password" name="password" type="password" variant="bordered" color="primary" />
            <div className="flex justify-end ">
              <Button color="primary" className="" type="submit" isLoading={isLoading}>
                Register
              </Button>
            </div>
          </form>
          <Divider className="my-4" />
          <div className="">
            <p className="text-center">
              Have an account ?{' '}
              <Link href={'/'} className="hover:text-primary text-opacity-75 text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
