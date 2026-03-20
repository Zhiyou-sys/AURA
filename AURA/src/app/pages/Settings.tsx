import { useState } from "react";
import { User, Bell, Shield, LogOut, ChevronRight, Moon, Sun, Globe } from "lucide-react";
import { clsx } from "clsx";

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("zh");

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-[#2A2A2A] mb-8">账户设置</h1>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
            <h2 className="text-lg font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#87A96B]" />
              个人资料
            </h2>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#87A96B] text-2xl font-serif">
                李
              </div>
              <div>
                <button className="px-4 py-2 bg-[#F5F0E8] text-[#2A2A2A] text-sm rounded-full font-medium hover:bg-[#E8E2D9] transition-colors mb-2">
                  更换头像
                </button>
                <p className="text-xs text-[#5A5A5A]">支持 JPG, PNG 格式，最大 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#5A5A5A] mb-1.5">昵称</label>
                <input 
                  type="text" 
                  defaultValue="李女士"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-[#5A5A5A] mb-1.5">手机号码</label>
                <input 
                  type="tel" 
                  defaultValue="138 **** 8888"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-[#5A5A5A] mb-1.5">电子邮箱</label>
                <input 
                  type="email" 
                  defaultValue="li@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all"
                />
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
            <h2 className="text-lg font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#E8A86C]" />
              偏好与通知
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#E8E2D9] last:border-0">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#5A5A5A]" />
                  <div>
                    <p className="font-medium text-[#2A2A2A]">语言 / Language</p>
                    <p className="text-sm text-[#5A5A5A]">切换应用的显示语言</p>
                  </div>
                </div>
                <div className="flex items-center bg-[#FAF9F6] rounded-lg p-1 border border-[#E8E2D9]">
                  <button 
                    onClick={() => setLanguage('zh')}
                    className={clsx(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      language === 'zh' ? "bg-white text-[#87A96B] shadow-sm" : "text-[#5A5A5A] hover:text-[#2A2A2A]"
                    )}
                  >
                    中文
                  </button>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={clsx(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      language === 'en' ? "bg-white text-[#87A96B] shadow-sm" : "text-[#5A5A5A] hover:text-[#2A2A2A]"
                    )}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[#E8E2D9] last:border-0">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-[#5A5A5A]" />
                  <div>
                    <p className="font-medium text-[#2A2A2A]">深色模式</p>
                    <p className="text-sm text-[#5A5A5A]">切换应用的主题外观</p>
                  </div>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={clsx(
                    "w-12 h-6 rounded-full transition-colors relative",
                    darkMode ? "bg-[#2A2A2A]" : "bg-[#D1CCC5]"
                  )}
                >
                  <div className={clsx(
                    "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm",
                    darkMode ? "translate-x-6" : "translate-x-0.5"
                  )} />
                </button>
              </div>
            </div>
          </section>

          {/* Security & About */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
            <h2 className="text-lg font-medium text-[#2A2A2A] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#5A5A5A]" />
              账户与安全
            </h2>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span className="text-[#2A2A2A]">修改密码</span>
                <ChevronRight className="w-4 h-4 text-[#8C867D]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span className="text-[#2A2A2A]">隐私政策</span>
                <ChevronRight className="w-4 h-4 text-[#8C867D]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors text-[#B35C44]">
                <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> 退出登录</span>
              </button>
            </div>
          </section>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="px-8 py-3 bg-[#2A2A2A] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-black transition-all">
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
