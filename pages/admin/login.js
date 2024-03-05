import { Button, Card, Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const router = useRouter();
  const handleLogin = (event) => {
    event.preventDefault();
    router.push('/admin/dashboard');
  };
  return (
    <div className="h-screen w-screen bg-white-classic flex justify-center items-center">
      <Card className="p-4 min-w-[300px] min-h-[400px] flex flex-col justify-between">
        <div></div>
        <div>
          <div className="my-4">
            <p className="text-primary text-2xl font-semibold text-center">Login as admin</p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input label="Username" name="username" variant="bordered" color="primary" />
            <Input label="Password" name="password" type="password" variant="bordered" color="primary" />
            <div className="flex justify-end">
              <Button color="primary" className="" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
