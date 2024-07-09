import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Input } from "./components/ui/input";
import { sha256 } from "js-sha256";

function App() {
  return (
    <div className="flex  mx-auto h-screen w-screen justify-center items-center p-6 space-x-20">
      <Textarea className="border-2 border-black text-2xl min-h-96 w-1/3 focus-visible:ring-0 mx-auto" />
      <div className="w-full shadow-lg">
        <Base64 />
        <Sha256 />
      </div>
    </div>
  );
}

export default App;

const Base64 = () => {
  const refIn = useRef<HTMLTextAreaElement>(null);
  const refTo = useRef<HTMLTextAreaElement>(null);

  const handleTo = (str: string) => {
    const base = window.btoa(str);
    if (refTo.current) {
      refTo.current.value = base;
    }
  };

  const handleBack = (str: string) => {
    if (refIn.current) {
      refIn.current.value = window.atob(str);
    }
  };

  return (
    <>
      <div className=" p-5 shadow-xl">
        <h1 className="text-4xl font-semibold text-center">Base64编码 </h1>
        <div className="flex mt-10 space-x-40 mx-5 justify-center">
          <Textarea
            ref={refIn}
            className=" border-2 text-red-500 border-black text-2xl w-1/3 min-h-96 focus-visible:ring-0"
          />
          <div className="flex flex-col justify-around">
            <Button
              variant={"destructive"}
              className="text-2xl"
              onClick={() => {
                if (refIn.current) {
                  handleTo(refIn.current.value);
                }
              }}
            >
              编码 <ArrowRight />
            </Button>
            <Button
              variant={"destructive"}
              className="text-2xl"
              onClick={() => {
                if (refTo.current) {
                  handleBack(refTo.current.value);
                }
              }}
            >
              <ArrowLeft /> 解码
            </Button>
          </div>
          <Textarea
            ref={refTo}
            className=" border-2 text-red-500 border-black text-2xl min-h-96 w-1/3 focus-visible:ring-0"
          />
        </div>
      </div>
    </>
  );
};

const Sha256 = () => {
  const refIn = useRef<HTMLTextAreaElement>(null);
  const refTo = useRef<HTMLTextAreaElement>(null);
  const ref3 = useRef<HTMLTextAreaElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const handleTo = (str: string) => {
    const key = refInput.current?.value || "";

    const hash = sha256.hmac(key, str);

    if (refTo.current) {
      refTo.current.value = hash;
    }
  };

  return (
    <>
      <div className="p-5 ">
        <h1 className="text-4xl font-semibold text-center">Sha256哈希算法 </h1>
        <div className="flex mt-10  mx-5 space-x-24 justify-center">
          <Textarea
            ref={refIn}
            className=" border-2 text-red-500 border-black text-2xl min-h-96 w-1/3 focus-visible:ring-0"
          />
          <div className="flex flex-col justify-around">
            <div>
              <label className="font-semibold text-lg">密码</label>
              <Input
                ref={refInput}
                className="border-2 border-black focus-visible:ring-0"
              />
            </div>
            <Button
              variant={"destructive"}
              className="text-2xl"
              onClick={() => {
                if (refIn.current) {
                  handleTo(refIn.current.value);
                }
              }}
            >
              加密 <ArrowRight />
            </Button>
            <Button variant={"destructive"} className="text-2xl" disabled>
              <ArrowLeft /> 单向，不可解密
            </Button>
          </div>
          <Textarea
            ref={refTo}
            className=" border-2 text-red-500 border-black text-2xl min-h-96 w-1/3 focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="flex items-center justify-center space-x-20 mr-14 mb-10">
        <Button
          onClick={() => {
            const v1 = refTo.current?.value || "";
            const v2 = ref3.current?.value || "";

            if (v1.trim() === v2.trim()) {
              alert("相同");
            } else {
              alert("不相同");
            }
          }}
        >
          比较
        </Button>
        <Textarea
          ref={ref3}
          className="border-2 border-black text-2xl min-h-20 w-1/2 focus-visible:ring-0"
        />
      </div>
    </>
  );
};
