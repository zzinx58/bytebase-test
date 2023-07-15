import { ReactNode, useState, useRef, useEffect } from "react";
import "./App.css";
import { Divider, Button } from "@arco-design/web-react";
import styled from "styled-components";
import qs from "qs";

interface IconifyIconProps {
  iconName_withItsPrefix: string;
  iconSize_class: string;
}

interface PublicLoginItemProps {
  componentClass?: string;
  componentInnerText: string;
  iconContainerSize_class: string;
  iconComponent?: ReactNode;
  targetLink: string;
}

const iconNameWillBeUse = {
  Google: "i-devicon-google",
  Github: "i-devicon-github",
  Microsoft: "i-logos-microsoft-icon",
};

const iconifyIcon = (componentProps: IconifyIconProps) => {
  return (
    <div
      className={`
        ${componentProps.iconName_withItsPrefix}
        ${componentProps.iconSize_class}
      `}
    />
  );
};

const PublicLoginItem = (componentProps: PublicLoginItemProps) => {
  return (
    <div
      className={`w-full flex ${componentProps.componentClass}`}
      onClick={() => window.location.replace(componentProps.targetLink)}
    >
      <div
        className={`
          ${componentProps.iconContainerSize_class}
          flex items-center justify-center
        `}
      >
        {componentProps.iconComponent}
      </div>
      <div className="flex items-center text-center">
        {componentProps.componentInnerText}
      </div>
    </div>
  );
};

const FormHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <img src="/logo.svg" className="w-244px" />
      <h1 className="mt-24px mb-16px h-36px text-center">欢迎</h1>
      <p>登录 Bytebase 以继续使用 bytebase hub。</p>
    </div>
  );
};

function App() {
  const [loginForm, setLoginForm] = useState({ email: "" });
  const inputDOMRef = useRef<HTMLInputElement | null>(null);
  const invalidTextSpanDOMRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    inputDOMRef.current?.addEventListener("input", () => {
      if (invalidTextSpanDOMRef.current && inputDOMRef.current) {
        if (inputDOMRef.current?.validity.valid) {
          invalidTextSpanDOMRef.current.style.display = "none";
        } else {
          invalidTextSpanDOMRef.current.style.display = "block";
        }
      }
    });
  }, []);
  const githubOauthClientId = import.meta.env.VITE_GITHUB_CLIENTID;
  const githubOauthSecretKey = import.meta.env.VITE_GITHUB_SECRETKEY;
  const public3PartyLoginLinkURL: { [key: string]: string } = {
    Google: "https://www.baidu.com",
    Github: `https://github.com/login/oauth/authorize?client_id=${githubOauthClientId}`,
    Microsoft: "",
  };
  const public3PartyCallbackLink = {
    Google: "",
    Github: `https://github.com/login/oauth/access_token`,
    Microsoft: "",
  };
  const githubCallbackConfig = {
    client_id: githubOauthClientId,
    client_secret: githubOauthSecretKey,
  };

  return (
    <>
      <main
        className="w-screen h-screen bg-center bg-cover
        grid grid-cols-2 content-center justify-items-center
        "
        style={{ backgroundImage: "url('login-bg.webp')" }}
      >
        <div></div>
        <div>
          <section
            className="w-[320px] flex flex-col space-y-8px p-40px bg-white rounded-8px
            
            "
          >
            <FormHeader />
            {Object.entries(iconNameWillBeUse).map(([key, value]) => (
              <PublicLoginItem
                componentClass="border-solid border-[#C9CACE] border-1px rounded-4px 
              hover:(bg-#E8E8E8 cursor-pointer)"
                componentInnerText={`继续使用 ${key}`}
                iconContainerSize_class={`w-50px h-50px`}
                // iconComponent={
                //   <iconifyIcon />
                // }
                iconComponent={iconifyIcon({
                  iconName_withItsPrefix: value,
                  iconSize_class: `text-2xl`,
                })}
                key={value}
                targetLink={public3PartyLoginLinkURL[`${key}`]}
              />
            ))}
            <Divider orientation="center">或</Divider>
            <div>
              <div>
                <input
                  type="email"
                  ref={inputDOMRef}
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm({ email: event.target.value })
                  }
                  className={`
                block w-[calc(100%-32px)] h-50px px-16px 
                invalid:(border-red)
                required:invalid:(border-red)
                hover:valid:(border-#635DFF border-rounded-4px)
                focus:(border-#635DFF border-rounded-4px)
                border-([#C9CACE] 1px solid rounded-4px)
                `}
                  // focus:(border:(#635DFF rounded-4px)),didn't work.
                  text="16px"
                  placeholder="电子邮箱地址"
                />
                <span
                  className="text-red p-2px hidden after:content-['。...'] absolute"
                  ref={invalidTextSpanDOMRef}
                >
                  请输入格式正确的邮箱地址。
                </span>
              </div>
              <button
                className="mt-24px w-full h-50px border-transparent rounded-4px
              hover:(cursor-pointer bg-opacity-90)
              "
                border="transparent"
                bg="#4E44E2"
                text="16px white"
              >
                继续
              </button>
            </div>
            <div>
              <p>
                没有账户？
                <a
                  href="https://auth0.com/?utm_source=lock&utm_campaign=badge&utm_medium=widget"
                  className="text-#635dff p-4px text-14px underline-transparent font-bold"
                >
                  注册
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default App;
