/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle,
  Star,
  Sparkles,
  Cloud,
  Cat,
  Dog,
  Heart
} from "lucide-react";

const Button = ({ children, className = "", onClick, href }: { children: ReactNode; className?: string; onClick?: () => void; href?: string }) => {
  const handleClick = (e: React.MouseEvent) => {
    // Evita que o evento borbulhe para scripts que podem tentar serializar o elemento
    e.stopPropagation();
    
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      data-utmify-checkout="true"
    >
      <div
        className={`w-full py-4 px-8 rounded-2xl font-display font-bold text-lg md:text-xl transition-all duration-200 uppercase tracking-wide cartoon-border glossy-button flex items-center justify-center gap-2 ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

const Section = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`py-16 md:py-24 px-4 md:px-8 lg:px-16 ${className}`}>
    <div className="max-w-5xl mx-auto">
      {children}
    </div>
  </section>
);

const BonusCard = ({ title, description, oldPrice, index, icon, imageUrl }: { title: string; description: string; oldPrice: string; index: number; icon: string; imageUrl?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white p-6 md:p-8 rounded-[2rem] cartoon-border shadow-[6px_6px_0_0_rgba(45,45,45,1)] mb-8 relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-stretch h-full"
  >
    {imageUrl && (
      <div className="w-full md:w-56 h-56 md:h-auto flex-shrink-0 rounded-2xl overflow-hidden cartoon-border shadow-sm">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    )}
    <div className="flex-1 flex flex-col justify-center">
      <div className="absolute -top-1 -right-1 bg-bubblegum text-white px-4 py-1.5 rounded-bl-2xl cartoon-border text-xs font-display font-bold uppercase rotate-2 z-10">
        Presente! 🎁
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl md:text-4xl filter drop-shadow-sm">{icon}</span>
        <h4 className="text-xl md:text-2xl font-display font-black text-cartoon-black leading-tight">
          {title}
        </h4>
      </div>
      <p className="text-stone-600 mb-6 font-medium text-base md:text-lg leading-relaxed">{description}</p>
      <div className="mt-auto flex items-center gap-4 bg-baby-blue/10 p-4 rounded-xl border-2 border-dashed border-baby-blue/40">
        <span className="text-stone-400 line-through text-sm font-bold">De {oldPrice}</span>
        <span className="text-bubblegum font-display font-black text-xl md:text-2xl">GRÁTIS!</span>
      </div>
    </div>
    <Sparkles className="absolute bottom-4 right-4 text-egg-yolk w-6 h-6 opacity-30" />
  </motion.div>
);

export default function App() {
  const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v5/s2nT2NQ3GnVYMQU1IW97";
  const [checkoutUrlWithParams, setCheckoutUrlWithParams] = React.useState(CHECKOUT_URL);

  React.useEffect(() => {
    // Captura os parâmetros da URL atual e anexa ao link de checkout
    const params = window.location.search;
    if (params) {
      const separator = CHECKOUT_URL.includes('?') ? '&' : '?';
      // Remove o leading '?' se existir para evitar duplicação
      const cleanParams = params.startsWith('?') ? params.substring(1) : params;
      setCheckoutUrlWithParams(`${CHECKOUT_URL}${separator}${cleanParams}`);
    }
  }, []);

  const handleCheckout = () => {
    // Tenta disparar o evento de InitiateCheckout manualmente para o UTMify e outros pixels
    try {
      // UTMify padrão
      if (typeof (window as any).utmify === 'function') {
        (window as any).utmify('track', 'InitiateCheckout');
      }
      // Alternativa UTMify
      if ((window as any).pixel && typeof (window as any).pixel.track === 'function') {
        (window as any).pixel.track('InitiateCheckout');
      }
      // Facebook Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout');
      }
    } catch (e) {
      console.error("Erro ao rastrear InitiateCheckout:", e);
    }

    // Pequeno delay para garantir que o pixel tenha tempo de processar antes do redirecionamento
    setTimeout(() => {
      window.location.href = checkoutUrlWithParams;
    }, 200);
  };

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-cartoon-black font-sans selection:bg-bubblegum/30 overflow-x-hidden">
      {/* Hero Section */}
      <header className="pt-[22rem] md:pt-48 pb-32 px-6 text-center md:text-left bg-[url('https://i.postimg.cc/7LJRB93f/Design-sem-nome-(19).png')] md:bg-[url('https://i.postimg.cc/tRxhYPBF/Design-sem-nome-(16).png')] bg-[length:100%_auto] bg-no-repeat md:bg-cover bg-top md:bg-center relative overflow-hidden border-b-8 border-baby-blue/20">
        <div className="absolute top-10 left-10 text-baby-blue/20 animate-bounce duration-[3000ms]">
          <Cloud size={120} fill="currentColor" />
        </div>
        <div className="absolute top-40 right-20 text-bubblegum/10 animate-pulse">
          <Heart size={80} fill="currentColor" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto md:mr-auto md:ml-12 lg:ml-24 relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-egg-yolk text-cartoon-black text-sm font-display font-black mb-10 uppercase tracking-widest cartoon-border shadow-[4px_4px_0_0_rgba(45,45,45,1)]">
            <Star className="w-5 h-5 fill-cartoon-black" /> Bichinhoslucrativos.ai
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.15] text-cartoon-black mb-8 tracking-tight">
            ✨ Bichinhoslucrativos.ai: Transforme Linhas em Notas de <span className="text-bubblegum [text-shadow:_3px_3px_0_#2D2D2D]">R$ 100</span> com Gatinhos e Cachorrinhos de Crochê
          </h1>
          
          <p className="text-base md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto md:ml-0 leading-relaxed font-medium italic">
            Fature de R$ 2 a R$ 5 mil por mês criando animais de crochê que são verdadeiras joias de luxo. Domine a estratégia definitiva para ter sua liberdade financeira com a agulha, sem depender de ninguém.
          </p>

          <div className="max-w-md mx-auto md:ml-0 relative">
            <div className="absolute -top-12 -right-12 animate-spin-slow hidden md:block">
              <Sparkles className="text-egg-yolk w-16 h-16" />
            </div>
            <Button 
              onClick={scrollToPricing}
              className="bg-brand-green hover:bg-brand-green-dark text-white text-2xl py-6"
            >
              Quero meu acesso agora! ✨
            </Button>
            <p className="mt-6 text-sm text-stone-400 font-bold flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-baby-blue" /> Pagamento Seguro & Acesso Imediato
            </p>
          </div>
        </motion.div>
      </header>

      {/* Deliverables Section */}
      <Section className="bg-white rounded-t-[4rem] md:rounded-t-[6rem] -mt-12 relative z-20 border-t-8 border-bubblegum/10">
        <h2 className="text-3xl md:text-5xl font-display font-black text-center mb-16 leading-tight">
          O que você vai <span className="text-baby-blue underline decoration-4 md:decoration-8 decoration-egg-yolk/50 underline-offset-4 md:underline-offset-8">RECEBER</span>:
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {[
            { icon: "📈", title: "O Mapa do Lucro", desc: "Passo a passo para sair do zero e chegar a encomendas de R$ 150 a R$ 200 cada.", color: "bg-baby-blue" },
            { icon: "🎥", title: "Videoaulas Próximas", desc: "Veja cada laçada e detalhe para criar bichinhos perfeitos, sem erro.", color: "bg-bubblegum" },
            { icon: "🧠", title: "Acabamento de Grife", desc: "Técnica para deixar pontos fechadinhos e firmes (fim do enchimento aparecendo).", color: "bg-egg-yolk" },
            { icon: "📲", title: "Ateliê no Celular", desc: "Acesse todas as aulas e modelos direto do seu sofá ou de onde quiser.", color: "bg-baby-blue" },
            { icon: "🧶", title: "Manual de Materiais", desc: "Saiba exatamente qual linha comprar para gastar pouco e entregar luxo.", color: "bg-bubblegum" },
            { icon: "🧵", title: "Montagem Rápida", desc: "Segredo para costurar orelhinhas e patinhas na metade do tempo.", color: "bg-egg-yolk" },
            { icon: "💬", title: "Comunidade VIP", desc: "Grupo exclusivo para trocar dicas de vendas e modelos que mais bombam.", color: "bg-baby-blue" },
            { icon: "♾️", title: "Acesso Vitalício", desc: "As aulas são suas para sempre. Assista quando e onde quiser.", color: "bg-bubblegum" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-[2rem] cartoon-border bg-white shadow-[4px_4px_0_0_rgba(45,45,45,1)] hover:translate-y-[-4px] transition-transform h-full"
            >
              <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 ${item.color} rounded-2xl cartoon-border flex items-center justify-center text-3xl md:text-4xl shadow-inner mx-auto md:mx-0`}>
                {item.icon}
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-display font-black text-deep-black text-xl md:text-2xl mb-2">{item.title}</h3>
                <p className="text-stone-600 text-base md:text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button 
            onClick={scrollToPricing}
            className="bg-brand-green hover:bg-brand-green-dark text-white max-w-md mx-auto"
          >
            Quero todo conteúdo 🧶
          </Button>
        </div>
      </Section>

      {/* Bonuses Section */}
      <Section className="bg-bubblegum/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
          <Sparkles size={200} />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4 text-bubblegum [text-shadow:_2px_2px_0_#2D2D2D]">
            BÔNUS MÁGICOS! ✨
          </h2>
          <p className="text-cartoon-black uppercase tracking-[0.2em] text-sm md:text-base font-black opacity-60">Presentes especiais para você</p>
        </div>

        <div className="grid gap-6">
          <BonusCard 
            index={0}
            icon="🦁"
            title="BÔNUS 1: A ARCA DE NOÉ"
            description="50 moldes prontos de cachorrinhos, gatinhos e outros animais que são recorde de pedidos no Brasil."
            oldPrice="R$ 147,00"
            imageUrl="https://i.postimg.cc/9X4HSnSN/ff88c8f3cdd35037365df7eb051a6c03.jpg"
          />
          <BonusCard 
            index={1}
            icon="💬"
            title="BÔNUS 2: SCRIPT DE VENDAS"
            description="A frase exata para enviar quando a cliente perguntar o preço, garantindo que ela pague sem chorar desconto."
            oldPrice="R$ 67,00"
            imageUrl="https://i.postimg.cc/65dgxJhc/2b1f9cdd2ff42de7a1090d82595875e7.jpg"
          />
          <BonusCard 
            index={2}
            icon="🚚"
            title="BÔNUS 3: LISTA VIP"
            description="Onde comprar fios e enchimento pela metade do preço que você paga no armarinho da sua rua."
            oldPrice="R$ 47,00"
            imageUrl="https://i.postimg.cc/QxrYbYrg/69c41e8fa3a470cb7185722352b2bc60.jpg"
          />
        </div>

        <div className="mt-16 text-center">
          <Button 
            onClick={scrollToPricing}
            className="bg-brand-green hover:bg-brand-green-dark text-white max-w-md mx-auto"
          >
            Quero os bônus agora! 🎁
          </Button>
        </div>
      </Section>

      {/* Techniques Section */}
      <Section className="bg-white">
        <h2 className="text-3xl md:text-5xl font-display font-black text-center mb-16 leading-tight">
          Técnicas de <span className="text-bubblegum">ALTO PADRÃO</span>:
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {[
            { title: "Gatinhos de Crochê Irresistíveis", desc: "Modelos que as mães mais pedem para decoração de quarto.", icon: <Cat className="w-8 h-8 text-bubblegum" />, image: "https://i.postimg.cc/cCgLD4yH/15fddeb7084f40028e0089b2ab57e770.jpg" },
            { title: "Cachorrinhos Passo a Passo", desc: "Aprenda as raças mais queridas e fature alto com personalização.", icon: <Dog className="w-8 h-8 text-baby-blue" />, image: "https://i.postimg.cc/pXBLqS3z/f81ec73efecb1fd57c5b715fc1338064.jpg" },
            { title: "Troca de Cores Perfeitas", desc: "O segredo para acabamento profissional sem emendas feias.", icon: <Sparkles className="w-8 h-8 text-egg-yolk" />, image: "https://i.postimg.cc/Hs3TQy79/2da36ab8c6797c28c2fe51d329245317.jpg" },
            { title: "Máquina de Encomendas", desc: "Como usar fotos para fazer o celular não parar de apitar com pedidos.", icon: <Heart className="w-8 h-8 text-bubblegum" />, image: "https://i.postimg.cc/jd3GxQ7F/image.png" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-6 p-6 md:p-8 bg-white cartoon-border rounded-[2rem] shadow-[4px_4px_0_0_rgba(45,45,45,1)] hover:bg-baby-blue/5 transition-colors h-full">
              <div className={`w-full rounded-xl overflow-hidden cartoon-border shadow-sm ${item.title === "Máquina de Encomendas" ? "h-auto" : "aspect-square"}`}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={`w-full h-full ${item.title === "Máquina de Encomendas" ? "object-contain" : "object-cover"}`} 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-stone-50 rounded-lg cartoon-border flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-black text-xl text-cartoon-black">{item.title}</h3>
                </div>
                <p className="text-stone-600 text-base md:text-lg font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button 
            onClick={scrollToPricing}
            className="bg-brand-green hover:bg-brand-green-dark text-white max-w-md mx-auto"
          >
            Quero aprender tudo! 🚀
          </Button>
        </div>
      </Section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-baby-blue/20">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-10 -left-10 animate-bounce">
            <Cloud size={100} className="text-white fill-white drop-shadow-lg" />
          </div>
          
          <div className="bg-white rounded-[4rem] p-12 md:p-20 cartoon-border shadow-[12px_12px_0_0_rgba(45,45,45,1)] text-center relative z-10">
            <div className="inline-block px-8 py-2 rounded-full bg-bubblegum text-white font-display font-black text-sm uppercase tracking-widest mb-10 cartoon-border rotate-[-2deg]">
              Oferta Especial!
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-black mb-8 tracking-tight text-cartoon-black">
              Invista em <span className="text-bubblegum underline decoration-4 md:decoration-8 decoration-egg-yolk underline-offset-4">Você</span>
            </h2>
            
            <div className="space-y-4 mb-12 text-stone-500 font-bold text-lg md:text-xl max-w-sm mx-auto">
              <div className="flex justify-between items-center border-b-2 border-dashed border-stone-100 pb-2">
                <span>Acesso Vitalício</span>
                <span className="line-through opacity-40">R$ 197</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-dashed border-stone-100 pb-2">
                <span>Bônus de Elite</span>
                <span className="line-through opacity-40">R$ 261</span>
              </div>
            </div>

            <div className="mb-12 relative">
              <div className="speech-bubble inline-block p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <span className="text-2xl md:text-4xl font-display font-black text-cartoon-black/40">R$</span>
                  <span className="text-6xl md:text-9xl font-display font-black text-red-600 [text-shadow:_3px_3px_0_#FFF]">23,40</span>
                </div>
                <p className="text-cartoon-black font-black mt-4 text-base md:text-lg line-through opacity-60">DE R$ 458,00</p>
              </div>
            </div>

            <Button 
              onClick={handleCheckout}
              className="bg-brand-green hover:bg-brand-green-dark text-white text-2xl md:text-3xl py-6 md:py-8 shadow-[0_10px_20px_rgba(49,189,102,0.3)]"
            >
              QUERO MINHA VAGA! 🐾
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <Section>
        <div className="bg-egg-yolk p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] cartoon-border shadow-[8px_8px_0_0_rgba(45,45,45,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-45">
            <ShieldCheck size={200} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-black mb-12 flex items-center justify-center md:justify-start gap-4 text-cartoon-black">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl cartoon-border flex items-center justify-center shadow-md">
                <ShieldCheck className="text-bubblegum w-8 h-8 md:w-10 md:h-10" />
              </div>
              Garantia Blindada
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div className="p-6 md:p-8 rounded-[2rem] bg-white cartoon-border shadow-sm flex flex-col h-full">
                <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-bubblegum">7 Dias: PIX na Conta</h3>
                <p className="text-stone-600 leading-relaxed text-base md:text-lg font-medium">
                  Se você não gostar das aulas ou dos moldes, escreve “quero meu reembolso agora” e o valor cai no seu pix em 24h. Sem perguntas.
                </p>
              </div>
              <div className="p-6 md:p-8 rounded-[2rem] bg-white cartoon-border shadow-sm flex flex-col h-full">
                <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-baby-blue">30 Dias: Lucro ou Eu Pago</h3>
                <p className="text-stone-600 leading-relaxed text-base md:text-lg font-medium">
                  Se em 30 dias você seguir o método e seu faturamento não dobrar, nós enviamos o dobro do valor de volta. Ou você lucra, ou eu te pago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="text-center pb-32">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 leading-tight">
          Sua jornada <span className="text-bubblegum">mágica</span> começa agora!
        </h2>
        <p className="text-stone-600 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-medium italic">
          "O artesanato nunca foi tão fofo e lucrativo. Hoje você encontrou o caminho para transformar amor em renda."
        </p>
        
        <div className="max-w-md mx-auto space-y-6">
          <Button 
            onClick={scrollToPricing}
            className="bg-brand-green hover:bg-brand-green-dark text-white text-2xl md:text-3xl py-6 md:py-8"
          >
            Dar o Primeiro Ponto! 🧶
          </Button>
          <div 
            role="button"
            tabIndex={0}
            className="flex items-center justify-center gap-3 w-full py-4 text-stone-500 font-display font-black text-lg md:text-xl hover:text-bubblegum transition-colors group cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-bounce" />
            Suporte no WhatsApp
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white py-24 px-6 text-center border-t-8 border-baby-blue/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-14 h-14 bg-bubblegum rounded-2xl cartoon-border flex items-center justify-center text-white font-display font-black text-3xl shadow-lg rotate-3">B</div>
            <span className="font-display font-black text-3xl text-cartoon-black tracking-tight">Bichinhos <span className="text-bubblegum">Lucrativos</span></span>
          </div>
          <p className="text-stone-400 text-lg font-bold mb-8">
            © 2026 Bichinhos Lucrativos - O Método Mais Fofo do Brasil. 🐾
          </p>
          <div className="flex justify-center gap-10 text-sm text-stone-400 uppercase tracking-widest font-black">
            <a href="#" className="hover:text-bubblegum transition-colors">Termos</a>
            <a href="#" className="hover:text-bubblegum transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
