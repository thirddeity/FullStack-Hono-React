import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserInfoForm from "./components/user.info.form";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./components/model";
import { MathUtils } from "three";
import LoginForm from "./components/login.form";

export function ComponentExample() {
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
    <div className="border-4 border-primary/70 w-full rounded-2xl max-w-4xl p-1">
      <div className="w-full bg-background backdrop-blur-lg rounded-xl max-w-4xl opacity-98 ">
        <div className="flex md:flex-row flex-col">
          <div className="flex-1">
            <div
              className={`h-full bg-[url('https://i.pinimg.com/originals/fa/09/23/fa09230ae176183f8dea872c58961041.gif')] bg-cover bg-center rounded-l-lg`}
            />
          </div>
          <div className="flex-2 md:flex-1 p-4">
            <CardTitle className="text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
