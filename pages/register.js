import { Button, Card, Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const handleLoginRegister = (event) => {
    event.preventDefault();
    router.push('/login');
  };
  return (
    <div className="h-screen w-screen bg-white-classic flex justify-center items-center">
      <Card className="p-4 min-w-[300px] min-h-[400px] flex flex-col justify-between">
        <div></div>
        <div>
          <div className="my-4">
            <p className="text-primary text-2xl font-semibold text-center">Register</p>
          </div>
          <form className="space-y-4" onSubmit={handleLoginRegister}>
            <Input label="Name" name="name" variant="bordered" color="primary" />
            <Input label="Username" name="username" variant="bordered" color="primary" />
            <Input label="Password" name="password" variant="bordered" color="primary" />
            <div className="flex justify-end ">
              <Button color="primary" className="" type="submit">
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
