import { Button, Card, Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleLogin = (event) => {
    event.preventDefault();
    router.push('/home');
  };
  return (
    <div className="h-screen w-screen bg-white-classic flex justify-center items-center">
      <Card className="p-4 min-w-[300px] min-h-[400px] flex flex-col justify-between">
        <div></div>
        <div>
          <div className="my-4">
            <p className="text-primary text-2xl font-semibold text-center">Login</p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input label="username" name="Username" variant="bordered" color="primary" />
            <Input label="username" name="Password" variant="bordered" color="primary" />
            <div className="flex justify-end ">
              <Button color="primary" className="" type="submit">
                Login
              </Button>
            </div>
          </form>
          <Divider className="my-4" />
          <div className="">
            <p className="text-center">
              Don't have an account ?{' '}
              <Link href={'/register'} className="hover:text-primary text-opacity-75 text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
