import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Calendar as CalendarIcon, Leaf, CheckCircle2, ChevronRight, AlertCircle, Edit3 } from "lucide-react";
import { clsx } from "clsx";

export function Booking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [durationMode, setDurationMode] = useState<number | "custom">(3);
  const [customDuration, setCustomDuration] = useState("");

  const handleBooking = () => {
    if (!agreed) return;
    // Simulate booking process
    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-[#2A2A2A] mb-10 flex items-center gap-3">
          <Leaf className="w-8 h-8 text-[#87A96B]" strokeWidth={1.5} />
          确认认领
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custom Date Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 className="text-xl font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#E8A86C]" />
                自定义认领日期
              </h2>
              
              <div className="mb-6 relative">
                <input
                  type="text"
                  placeholder="例如：2026年5月1日 或 随时可以开始"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A] placeholder-[#A09C96]"
                />
                <Edit3 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A09C96]" />
              </div>

              <div className="bg-[#F5F0E8]/50 rounded-xl p-4 text-sm text-[#5A5A5A] flex gap-3">
                <AlertCircle className="w-5 h-5 text-[#E8A86C] shrink-0" />
                <p>
                  当前季节适合种植：<strong className="text-[#2A2A2A]">生菜、菠菜、小白菜、西红柿</strong>。由于试营业免除所有费用，您可以在此灵活沟通意向日期。
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 className="text-xl font-medium text-[#2A2A2A] mb-6">认领周期</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                {[3, 6, 12, "custom"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDurationMode(mode as number | "custom")}
                    className={clsx(
                      "flex-1 min-w-[80px] py-3 rounded-full text-sm font-medium border-2 transition-all",
                      durationMode === mode
                        ? "border-[#B35C44] bg-[#B35C44] text-white"
                        : "border-[#E8E2D9] text-[#5A5A5A] hover:border-[#B35C44]/50"
                    )}
                  >
                    {mode === 3 ? "一季度" : mode === 6 ? "半年" : mode === 12 ? "一年" : "自定义"}
                  </button>
                ))}
              </div>
              
              {durationMode === "custom" && (
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="请输入自定义认领周期（如：2个月、试种几周等）"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    className="w-full pl-4 pr-10 py-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A] placeholder-[#A09C96]"
                  />
                  <Edit3 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A09C96]" />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9] sticky top-24">
              <h3 className="text-lg font-serif text-[#2A2A2A] mb-6">订单明细</h3>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>地块编号</span>
                  <span className="font-medium text-[#2A2A2A]">绿漪 {id?.toUpperCase() || 'A01'}</span>
                </div>
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>认领时间</span>
                  <span className="font-medium text-[#2A2A2A] text-right">
                    {customDate || "待沟通"} 
                    <br />
                    <span className="text-xs text-[#87A96B]">
                      ({durationMode === "custom" ? (customDuration || "自定义时长") : `${durationMode}个月`})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#5A5A5A]">
                  <span>试营业费用</span>
                  <span className="font-medium text-[#87A96B] bg-[#87A96B]/10 px-2 py-0.5 rounded text-xs">全免</span>
                </div>
              </div>

              <div className="border-t border-[#E8E2D9] pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-[#2A2A2A] font-medium">总计</span>
                  <span className="text-2xl font-semibold text-[#87A96B]">免费体验</span>
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                <div className={clsx(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                  agreed ? "bg-[#87A96B] border-[#87A96B]" : "border-[#D1CCC5] group-hover:border-[#87A96B]"
                )}>
                  {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-xs text-[#5A5A5A] leading-relaxed">
                  我已阅读并同意
                  <a href="#" className="text-[#87A96B] hover:underline mx-1">《绿漪共享菜园认领协议》</a>
                  ，承诺不使用化学农药，共同维护有机土壤环境。
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
              </label>

              <button
                onClick={handleBooking}
                disabled={!agreed}
                className={clsx(
                  "w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all",
                  agreed
                    ? "bg-[#2A2A2A] text-white hover:bg-black shadow-md hover:shadow-lg"
                    : "bg-[#E8E2D9] text-[#8C867D] cursor-not-allowed"
                )}
              >
                确认预约 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}