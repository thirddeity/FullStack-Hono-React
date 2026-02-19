import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserInfoForm from "./components/user.info.form";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./components/model";
import { MathUtils } from "three";
import LoginForm from "./components/login.form";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoonIcon, Sun02Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "@/components/theme-provider";

export function ComponentExample() {
  const [isDark, setDark] = useState<"dark" | "light">("dark");
  const { setTheme } = useTheme();
  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ far: 200000 }}>
          <Suspense fallback={null}>
            <ambientLight />
            <Model
              position={[0, 0, 0]}
              scale={0.005}
              rotation={[MathUtils.degToRad(10), MathUtils.degToRad(0), MathUtils.degToRad(10)]}
            />
            <OrbitControls autoRotate autoRotateSpeed={1.6} enableRotate={false} enableZoom={false} />
            <Environment
              files="https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg"
              background
              blur={2}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="fixed right-2 z-20 flex flex-row justify-end p-2">
        <Button
          variant={"outline"}
          size={"icon-lg"}
          onClick={() => {
            setTheme(isDark === "dark" ? "light" : "dark");
            setDark(isDark === "dark" ? "light" : "dark");
          }}
        >
          {isDark === "dark" ? <HugeiconsIcon icon={MoonIcon} /> : <HugeiconsIcon icon={Sun02Icon} />}
        </Button>
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <CardContainer />
      </div>
    </div>
  );
}

function CardContainer() {
  const [tab, setTab] = useState(1);
  return <>{tab === 1 ? LoginCard(setTab) : UserInfoCard(setTab)}</>;
}

function UserInfoCard(setTab: (v: number) => void) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <UserInfoForm setTab={setTab} />
      </CardContent>
    </Card>
  );
}

function LoginCard(setTab: (v: number) => void) {
  return (
    <div className="border-4 border-primary/70 w-full rounded-2xl md:max-w-lg p-1">
      <div className="w-full bg-background backdrop-blur-lg rounded-xl md:max-w-lg opacity-98 ">
        <div className="flex-col">
          <div className="p-4">
            <CardTitle className="font-bold text-2xl text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
              User Login
            </CardTitle>
            <div className="mt-6">
              <LoginForm setTab={setTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
