import Image from 'next/image';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const loginHeroImage = PlaceHolderImages.find(
    (image) => image.id === 'login-hero'
  );

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
             <div className="flex items-center justify-center gap-2 mb-4">
               <Building2 className="h-8 w-8 text-primary" />
               <h1 className="text-3xl font-bold font-headline">Hotel Imperial</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginHeroImage && (
          <Image
            src={loginHeroImage.imageUrl}
            alt={loginHeroImage.description}
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            data-ai-hint={loginHeroImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
