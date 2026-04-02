/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  BookOpen, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Users, 
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  CreditCard,
  Truck,
  Trash2,
  Plus,
  Minus
} from "lucide-react";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  quantity: number;
}

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity,
  onCheckout 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-[150] transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-indigo-600" />
              <h3 className="text-xl font-bold text-slate-900">장바구니</h3>
              <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={32} className="text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">장바구니가 비어있습니다</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                >
                  교재 보러가기
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 flex-shrink-0">
                      <BookOpen size={24} className="text-slate-300" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-indigo-600 font-bold text-sm mb-3">{item.priceDisplay}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-slate-50 text-slate-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-bold text-slate-700 min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-slate-50 text-slate-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600 font-medium">총 결제 금액</span>
                <span className="text-2xl font-black text-indigo-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
              >
                주문하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PurchaseModal = ({ isOpen, onClose, product }: { isOpen: boolean, onClose: () => void, product: any }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
              <p className="text-slate-500">주문 내용을 확인해주세요</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
              <span className="text-slate-600">상품 금액</span>
              <span className="font-bold text-slate-900">{product.price}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-600">배송비</span>
              <span className="text-green-600 font-medium">무료 배송</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-slate-200">
              <span className="text-lg font-bold text-slate-900">최종 결제 금액</span>
              <span className="text-2xl font-black text-indigo-600">{product.price}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-indigo-600 cursor-pointer transition-colors group">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">신용/체크카드</p>
                <p className="text-xs text-slate-500">모든 카드사 결제 가능</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-indigo-600 cursor-pointer transition-colors group">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Truck size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">무통장 입금</p>
                <p className="text-xs text-slate-500">입금 확인 후 즉시 배송</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
            결제하기
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-slate-900" : "text-slate-900"}`}>
            Grammar<span className="text-indigo-600">Master</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["특징", "미리보기", "후기", "가격"].map((item) => (
            <a key={item} href={`#${item}`} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              {item}
            </a>
          ))}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            로그인
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white absolute top-full left-0 right-0 border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl"
        >
          {["특징", "미리보기", "후기", "가격"].map((item) => (
            <a key={item} href={`#${item}`} className="text-lg font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold">
            로그인
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Star size={14} fill="currentColor" />
            2024년 베스트셀러 영문법 교재
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            영문법, 이제 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              24권의 시리즈
            </span>
            로 완성하세요
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
            기초부터 기본까지, 체계적으로 설계된 총 24권의 영문법 마스터 시리즈. 
            각 레벨별 120개 유닛을 통해 영문법의 모든 것을 정복하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
              교재 구매하기
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Download size={20} />
              샘플 챕터 다운로드
            </button>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-bold text-slate-900">12,000+</span> 명의 학습자가 선택했습니다
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://picsum.photos/seed/bookcover/800/1000" 
              alt="Book Cover" 
              className="rounded-2xl w-full h-auto shadow-inner"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

const SeriesStructure = ({ onAddToCart }: { onAddToCart: (product: any) => void }) => {
  return (
    <section id="시리즈" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">체계적인 24권 시리즈 구성</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            기초 12권, 기본 12권으로 구성된 총 24권의 방대한 시리즈입니다. 
            각 권은 10개의 유닛으로 구성되어 학습 부담을 줄이고 성취감을 높였습니다.
            <br /><span className="text-indigo-600 font-semibold">원하는 권수만 개별 구매도 가능합니다.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 기초 Level */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">1</div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">영문법 기초 (Basic)</h3>
                <p className="text-indigo-600 font-medium">총 120 Units / 12권 구성</p>
              </div>
            </div>
            <p className="text-slate-600 mb-8">
              영어의 뼈대를 잡는 단계입니다. 명사, 대명사부터 기본 시제까지 
              가장 중요한 핵심 문법을 12권에 나누어 꼼꼼하게 다룹니다.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => onAddToCart({ id: `basic-${i+1}`, name: `영문법 기초 Vol.${i + 1}`, price: 12000, priceDisplay: "12,000원" })}
                  className="group relative aspect-[3/4] bg-white rounded-xl border border-indigo-200 flex flex-col items-center justify-center gap-1 hover:border-indigo-600 hover:shadow-md transition-all overflow-hidden"
                >
                  <span className="text-[10px] font-bold text-indigo-400 group-hover:text-indigo-600">Vol.{i + 1}</span>
                  <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <ShoppingCart size={12} className="text-indigo-300 group-hover:text-indigo-600" />
                  <span className="text-[8px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">담기</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 기본 Level */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-blue-50 rounded-3xl p-8 border border-blue-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">2</div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">영문법 기본 (Standard)</h3>
                <p className="text-blue-600 font-medium">총 120 Units / 12권 구성</p>
              </div>
            </div>
            <p className="text-slate-600 mb-8">
              실전 영어로 나아가는 단계입니다. 관계대명사, 가정법, 분사구문 등 
              심화 문법을 12권의 시리즈로 완벽하게 마스터합니다.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => onAddToCart({ id: `standard-${i+13}`, name: `영문법 기본 Vol.${i + 13}`, price: 12000, priceDisplay: "12,000원" })}
                  className="group relative aspect-[3/4] bg-white rounded-xl border border-blue-200 flex flex-col items-center justify-center gap-1 hover:border-blue-600 hover:shadow-md transition-all overflow-hidden"
                >
                  <span className="text-[10px] font-bold text-blue-400 group-hover:text-blue-600">Vol.{i + 13}</span>
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <ShoppingCart size={12} className="text-blue-300 group-hover:text-blue-600" />
                  <span className="text-[8px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">담기</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Users className="text-indigo-600" />,
      title: "학습자 중심 설계",
      description: "한국인 학습자가 가장 헷갈려하는 포인트만 콕 집어 설명합니다."
    },
    {
      icon: <ShieldCheck className="text-indigo-600" />,
      title: "검증된 커리큘럼",
      description: "수천 명의 오프라인 수강생을 통해 검증된 학습법을 담았습니다."
    },
    {
      icon: <MessageCircle className="text-indigo-600" />,
      title: "실전 예문 2,000개",
      description: "교과서적인 문장이 아닌, 실제 원어민이 사용하는 생생한 예문을 수록했습니다."
    },
    {
      icon: <Star className="text-indigo-600" />,
      title: "무료 동영상 강의",
      description: "교재 구매 시 전 단원 저자 직강 동영상 강의를 무료로 제공합니다."
    }
  ];

  return (
    <section id="특징" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">왜 Grammar Master인가요?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            기존의 딱딱한 문법책과는 다릅니다. 이해를 돕는 시각 자료와 실용적인 예문으로 영문법의 기초를 탄탄하게 잡아드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Preview = () => {
  return (
    <section id="미리보기" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              복잡한 시제도 <br />
              <span className="text-indigo-600">한눈에 들어오는 도표</span>로
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              글로만 된 설명은 이제 그만. 시각적인 도표와 이미지를 활용하여 
              머릿속에 영문법의 지도를 그려드립니다. 
              가장 어렵다는 완료 시제부터 가정법까지, 원리를 알면 쉽습니다.
            </p>
            <ul className="space-y-4">
              {[
                "전 단원 컬러 도해 삽입",
                "핵심 개념 요약 노트 제공",
                "단원별 실전 문제 수록",
                "휴대용 암기 카드 포함"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle size={20} className="text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img 
              src="https://picsum.photos/seed/page1/400/600" 
              alt="Page Preview 1" 
              className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://picsum.photos/seed/page2/400/600" 
              alt="Page Preview 2" 
              className="rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "김지수",
      role: "대학생",
      content: "영문법이 이렇게 재미있을 수 있다는 걸 처음 알았어요. 도표가 정말 큰 도움이 됩니다!",
      rating: 5
    },
    {
      name: "이민호",
      role: "직장인",
      content: "출퇴근 시간에 짬짬이 보기 너무 좋아요. 예문들이 실생활에서 바로 쓸 수 있는 것들이라 유용합니다.",
      rating: 5
    },
    {
      name: "박서연",
      role: "공무원 준비생",
      content: "기초가 부족해서 걱정했는데, 설명이 너무 친절해서 독학으로도 충분히 마스터할 수 있었습니다.",
      rating: 4
    }
  ];

  return (
    <section id="후기" className="py-24 bg-indigo-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">독자들의 생생한 후기</h2>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={20} fill="#fbbf24" className="text-yellow-400" />
            ))}
          </div>
          <p className="text-indigo-200">평균 평점 4.9/5.0 (1,200+ 건의 리뷰)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <p className="text-lg mb-6 italic">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xl">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-indigo-300">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onAddToCart }: { onAddToCart: (product: any) => void }) => {
  return (
    <section id="가격" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">학습 플랜 선택하기</h2>
          <p className="text-slate-600">필요한 단계부터 차근차근 시작해보세요</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Basic Level */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="inline-flex w-fit px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-4">
              Step 1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">기초(Basic) 세트</h3>
            <p className="text-slate-500 mb-6 text-sm">영문법의 뼈대를 잡는 12권 시리즈</p>
            <div className="mb-8">
              <span className="text-3xl font-extrabold text-slate-900">128,000원</span>
              <span className="text-slate-400 text-sm ml-2">정가 144,000원</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {["기초 Vol.1 ~ Vol.12 (총 12권)", "기초 전용 워크북 PDF", "모바일 단어장 제공"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                  <CheckCircle size={16} className="text-indigo-600" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onAddToCart({ id: "basic-set", name: "기초(Basic) 12권 세트", price: 128000, priceDisplay: "128,000원" })}
              className="w-full py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-all"
            >
              장바구니 담기
            </button>
          </div>

          {/* Standard Level */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="inline-flex w-fit px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-4">
              Step 2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">기본(Standard) 세트</h3>
            <p className="text-slate-500 mb-6 text-sm">실전 영어를 완성하는 12권 시리즈</p>
            <div className="mb-8">
              <span className="text-3xl font-extrabold text-slate-900">128,000원</span>
              <span className="text-slate-400 text-sm ml-2">정가 144,000원</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {["기본 Vol.13 ~ Vol.24 (총 12권)", "기본 전용 워크북 PDF", "실전 문제 풀이집"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                  <CheckCircle size={16} className="text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onAddToCart({ id: "standard-set", name: "기본(Standard) 12권 세트", price: 128000, priceDisplay: "128,000원" })}
              className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all"
            >
              장바구니 담기
            </button>
          </div>

          {/* Full Series - Most Popular */}
          <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-200 flex flex-col relative overflow-hidden transform lg:scale-105 z-10">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black px-4 py-1 uppercase tracking-widest rotate-45 translate-x-8 translate-y-4">
              Best Value
            </div>
            <h3 className="text-xl font-bold text-white mb-2">24권 풀세트 마스터</h3>
            <p className="text-indigo-100 mb-6 text-sm">기초부터 기본까지 한 번에 (24권)</p>
            <div className="mb-8 text-white">
              <span className="text-3xl font-extrabold">228,000원</span>
              <span className="text-indigo-300 text-sm ml-2">정가 288,000원</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "기초 12권 + 기본 12권 (총 24권)",
                "전 단원 저자 직강 동영상 강의",
                "프리미엄 학습 굿즈 세트",
                "1:1 학습 코칭권 (6개월)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-indigo-50 text-sm">
                  <CheckCircle size={16} className="text-yellow-400" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onAddToCart({ id: "full-set", name: "24권 풀세트 마스터", price: 228000, priceDisplay: "228,000원" })}
              className="w-full py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-all shadow-lg"
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <BookOpen size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Grammar<span className="text-indigo-600">Master</span>
            </span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">이용약관</a>
            <a href="#" className="hover:text-indigo-600">개인정보처리방침</a>
            <a href="#" className="hover:text-indigo-600">고객센터</a>
          </div>
          <p className="text-sm text-slate-400">
            © 2024 Grammar Master. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSelectedProduct({
      name: `${cartItems.length}개의 상품`,
      price: `${totalPrice.toLocaleString()}원`
    });
    setIsCartOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <SeriesStructure onAddToCart={handleAddToCart} />
        <Features />
        <Preview />
        <Testimonials />
        <Pricing onAddToCart={handleAddToCart} />
      </main>
      <Footer />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      <PurchaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
}
