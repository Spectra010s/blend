'use client';
import { Button } from '@/components/ui/button';

export default function Offline() {
  return (
    <main className=" min-h-screen flex flex-col justify-center items-center gap-4 ">
        <h1>You are currently offline</h1>
        <p>Please check your internet connection and try again.</p>
        <Button variant="default" onClick={() => window.location.reload()}>
          Retry
        </Button>

    </main>
  );
}
