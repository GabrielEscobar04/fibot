import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Benvingut/da a FIBot</h1>
                <p className="text-balance text-muted-foreground">
                  Inicia sessió per obtenir respostes sobre la FIB
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correu electrònic</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contrasenya</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Has oblidat la contrasenya?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Inicia sessió
              </Button>
              <div className="text-center text-sm">
                No tens compte?{" "}
                <a href="#" className="underline underline-offset-4">
                  Registra&apos;t
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/fib-classroom.jpg"
              width="1000"
              height="1000"
              alt="Aula del Campus Nord FIB"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        En iniciar sessió, acceptes els nostres{" "}
        <a href="#">Termes del servei</a> i la{" "}
        <a href="#">Política de privadesa</a>.
      </div>
    </div>
  );
}
