"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Utensils,
  X,
} from "lucide-react";
import { categories, menuItems, WHATSAPP_NUMBER, type MenuCategory } from "@/lib/menu";

type Cart = Record<string, number>;

// Cloudinary-hosted restaurant photography and brand assets.
const IMAGE_PATHS = {
  logo: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484420/IMG_7532.jpg",
  hero: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7531.jpg",
  fufu: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7531.jpg",
  banku: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484422/IMG_7517.jpg",
  okro: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484419/IMG_7513.jpg",
  riceball: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484424/IMG_7516.jpg",
  mallamStorefront: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484421/IMG_7498.jpg",
  eastLegonStorefront: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7495.jpg",
  storyInterior: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7506.jpg",
} as const;

const featuredDishes = [
  {
    name: "Fufu",
    description: "A Ghanaian favourite, served with your choice of soup.",
    image: IMAGE_PATHS.fufu,
    alt: "Fufu, a traditional Ghanaian staple",
  },
  {
    name: "Banku",
    description: "Traditional banku, ready to pair with your favourite soup.",
    image: IMAGE_PATHS.banku,
    alt: "Traditional Ghanaian banku",
  },
  {
    name: "Oiless Okro Soup",
    description: "A familiar local favourite, full of Ghanaian flavour.",
    image: IMAGE_PATHS.okro,
    alt: "Ghanaian oiless okro soup",
  },
  {
    name: "Rice Balls",
    description: "Soft rice balls, a comforting classic with Ghanaian soups.",
    image: IMAGE_PATHS.riceball,
    alt: "Ghanaian rice balls",
  },
];

const galleryImages = [
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484421/IMG_7498.jpg",
    alt: "Exterior view of Feels 94 Chopbar",
    label: "A warm welcome at the chopbar",
    type: "Storefront",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7495.jpg",
    alt: "Another exterior view of Feels 94 Chopbar",
    label: "Come on in",
    type: "Storefront",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7506.jpg",
    alt: "Interior of Feels 94 Chopbar",
    label: "A place for good memories",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7499.jpg",
    alt: "Exterior view of Feels 94 Chopbar",
    label: "A warm welcome",
    type: "Storefront",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484424/IMG_7508.jpg",
    alt: "Another view of the Feels 94 Chopbar storefront",
    label: "Find your way in",
    type: "Storefront",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484423/IMG_7500.jpg",
    alt: "Inside Feels 94 Chopbar",
    label: "The chopbar atmosphere",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484424/IMG_7504.jpg",
    alt: "Interior view of Feels 94 Chopbar",
    label: "Made for good company",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484425/IMG_7511.jpg",
    alt: "Dining space at Feels 94 Chopbar",
    label: "Come as you are",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484426/IMG_7505.jpg",
    alt: "A closer look inside Feels 94 Chopbar",
    label: "A place to gather",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484426/IMG_7512.jpg",
    alt: "Restaurant interior at Feels 94 Chopbar",
    label: "Good food, good memories",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484427/IMG_7507.jpg",
    alt: "Another look at the Feels 94 Chopbar dining area",
    label: "Your table is waiting",
    type: "Interior",
  },
  {
    src: "https://res.cloudinary.com/jbbzejqi/image/upload/v1793484425/IMG_7509.jpg",
    alt: "Inside the Feels 94 Chopbar restaurant",
    label: "The Feels 94 experience",
    type: "Interior",
  },
];

const openingHours = [
  ["Monday", "Closed"],
  ["Tuesday – Thursday", "11:30 AM – 6:00 PM"],
  ["Friday", "Closed"],
  ["Saturday", "11:30 AM – 6:00 PM"],
  ["Sunday", "10:30 AM – 7:00 PM"],
];

function money(value: number) {
  return `GHS ${value.toFixed(2)}`;
}

export default function SiteClient() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Carbohydrates");
  const [cart, setCart] = useState<Cart>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedItems = useMemo(
    () => menuItems.filter((item) => (cart[item.id] ?? 0) > 0),
    [cart],
  );
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = selectedItems.reduce(
    (total, item) => total + (item.price ?? 0) * (cart[item.id] ?? 0),
    0,
  );
  const hasUnpricedItems = selectedItems.some((item) => item.price === null);

  const visibleItems = menuItems.filter((item) => item.category === activeCategory);

  function updateQuantity(id: string, change: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + change);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  function checkout() {
    if (selectedItems.length === 0) return;

    const lines = selectedItems.map((item) => {
      const quantity = cart[item.id] ?? 0;
      const linePrice = item.price === null
        ? "price to be confirmed"
        : `${money(item.price * quantity)}${item.note ? " (starting estimate)" : ""}`;
      return `• ${quantity} × ${item.name} — ${linePrice}`;
    });

    const message = [
      "Hello Feels 94 Chopbar! I'd like to place an order:",
      "",
      ...lines,
      "",
      `Estimated subtotal for priced items: ${money(subtotal)}`,
      hasUnpricedItems
        ? "Some selected soup prices were not listed online. Please confirm those prices and the final total."
        : "Please confirm my order total.",
      "",
      "Delivery address: (I'll type my delivery address here)",
      "Please confirm availability and the delivery details. Thank you!",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  function closeMobileNav() {
    setMobileOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#111111] text-[#F7F3EA]">
      <div className="topline flex items-center justify-center gap-2 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1A1710] sm:text-[11px]">
        <span className="h-1 w-1 rounded-full bg-[#1A1710]" />
        A taste of home, served with heart
        <span className="h-1 w-1 rounded-full bg-[#1A1710]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#home" className="group flex items-center gap-3" aria-label="Feels 94 Chopbar home">
            <Image
              src={IMAGE_PATHS.logo}
              alt="Feels 94 Chopbar logo"
              width={44}
              height={44}
              priority
              className="h-11 w-11 rounded-full border border-white/10 object-contain transition-transform group-hover:rotate-[-6deg]"
            />
            <span className="leading-none">
              <span className="block text-[16px] font-extrabold tracking-[-0.04em] text-white sm:text-[18px]">
                Feels <span className="text-[#F59E0B]">94</span>
              </span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.34em] text-white/55">
                Chopbar
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            <a className="nav-link" href="#menu">Menu</a>
            <a className="nav-link" href="#story">Our Story</a>
            <a className="nav-link" href="#gallery">The Vibe</a>
            <a className="nav-link" href="#locations">Locations</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#F59E0B] hover:text-[#F59E0B]"
              aria-label="Chat with Feels 94 Chopbar on WhatsApp"
            >
              <MessageCircle size={17} />
            </a>
            <a href="#menu" className="gold-button flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em]">
              Order Now <ArrowUpRight size={15} />
            </a>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <MenuIcon size={21} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#151515] px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {[
                ["Menu", "#menu"],
                ["Our Story", "#story"],
                ["The Vibe", "#gallery"],
                ["Locations", "#locations"],
              ].map(([label, href]) => (
                <a key={label} href={href} onClick={closeMobileNav} className="rounded-xl px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-[#F59E0B]">
                  {label}
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileNav}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-5 py-3 text-sm font-bold text-[#17130B]"
              >
                <MessageCircle size={17} /> Order on WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="hero-section relative isolate flex min-h-[690px] items-center overflow-hidden sm:min-h-[760px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMAGE_PATHS.hero}')` }}
          role="img"
          aria-label="Ghanaian food prepared at Feels 94 Chopbar"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0b0a]/95 via-[#0b0b0a]/75 to-[#0b0b0a]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#111111] via-transparent to-black/20" />

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 pb-24 pt-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-28">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#F59E0B]/35 bg-black/25 px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_14px_#F59E0B]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F6C66D] sm:text-[10px]">Authentic Ghanaian flavour</span>
            </div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.36em] text-white/60 sm:text-xs">Welcome to Feels 94 Chopbar</p>
            <h1 className="max-w-3xl text-[clamp(3.6rem,9vw,7.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-white">
              The True Taste of <span className="font-serif font-medium italic tracking-[-0.075em] text-[#F59E0B]">Nostalgia.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              Authentic Ghanaian food prepared the traditional way. Come hungry, bring your people, and make yourself at home in Mallam-Gbawe.
            </p>
            <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
              <a href="#menu" className="gold-button flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.16em]">
                View Menu <ArrowDownRight size={16} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-full border border-white/35 bg-white/5 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-[#F59E0B] hover:bg-[#F59E0B]/10"
              >
                <MessageCircle size={16} /> Order on WhatsApp
              </a>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-6 text-[10px] font-semibold uppercase tracking-[0.19em] text-white/55">
              <span className="flex items-center gap-2"><MapPin size={13} className="text-[#F59E0B]" /> Accra, Ghana</span>
              <span className="flex items-center gap-2"><Utensils size={13} className="text-[#F59E0B]" /> Made the traditional way</span>
            </div>
          </div>

          <div className="relative hidden min-h-[440px] lg:block">
            <div className="absolute right-7 top-7 h-[390px] w-[330px] rotate-[5deg] rounded-[180px_180px_22px_22px] border border-[#F59E0B]/45" />
            <div className="absolute right-14 top-0 h-[390px] w-[330px] overflow-hidden rounded-[180px_180px_22px_22px] border-[7px] border-[#171717] shadow-2xl">
              <Image
                src={IMAGE_PATHS.fufu}
                alt="Fufu served as part of a traditional Ghanaian meal"
                fill
                priority
                sizes="(min-width: 1024px) 330px, 0px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F6C66D]">A feeling you know</p>
                <p className="mt-2 font-serif text-3xl italic text-white">Home, on a plate.</p>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171717]/90 p-4 shadow-xl backdrop-blur-xl">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#F59E0B] text-[#1A150A]"><Utensils size={19} /></div>
              <div>
                <p className="text-xs font-extrabold text-white">Tradition in every bite</p>
                <p className="mt-1 text-[10px] text-white/50">Good food. Good memories.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-index absolute bottom-9 right-6 hidden text-[10px] font-bold tracking-[0.32em] text-white/45 md:block">01 / 03</div>
      </section>

      {/* STORY */}
      <section id="story" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-[#F59E0B]/45 sm:-left-6 sm:-top-6" />
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.7rem] bg-[#25211A]">
              <Image
                src={IMAGE_PATHS.storyInterior}
                alt="Interior of Feels 94 Chopbar"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F6C66D]">Rooted in tradition</p>
                <p className="mt-2 font-serif text-3xl italic text-white sm:text-4xl">Since 2022.</p>
              </div>
            </div>
            <div className="absolute -bottom-7 -right-2 grid h-28 w-28 place-items-center rounded-full border-[5px] border-[#111111] bg-[#F59E0B] text-center text-[#17130B] shadow-xl sm:-right-7 sm:h-32 sm:w-32">
              <div><span className="block text-3xl font-black leading-none">94</span><span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.2em]">Since 1994*</span></div>
            </div>
          </div>

          <div className="pt-4 lg:pt-0">
            <p className="section-kicker">More than a meal</p>
            <h2 className="section-heading mt-5 max-w-2xl">A little bit of <span className="font-serif italic text-[#F59E0B]">home</span> in every serving.</h2>
            <div className="mt-8 h-px w-20 bg-[#F59E0B]" />
            <p className="mt-8 text-[15px] leading-8 text-white/65 sm:text-base sm:leading-9">
              Feels 94 Chopbar was established in late 2022 by founder Joseph Ameleke (Efo Kodjo). The “94” in our name honours the traditional ways our parents prepared and shared food back in 1994.
            </p>
            <p className="mt-5 text-[15px] leading-8 text-white/65 sm:text-base sm:leading-9">
              We have grown into a highly recognized food tourism spot in Accra, with branches in Mallam-Gbawe and East Legon. Our promise is simple: familiar Ghanaian flavours, generous hospitality, and food that brings people together.
            </p>
            <a href="#locations" className="group mt-9 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F59E0B]">
              Find your nearest chopbar <span className="grid h-8 w-8 place-items-center rounded-full border border-[#F59E0B]/45 transition group-hover:translate-x-1 group-hover:bg-[#F59E0B] group-hover:text-[#17130B]"><ArrowUpRight size={14} /></span>
            </a>
          </div>
        </div>
        <p className="mx-auto mt-16 max-w-7xl text-[9px] text-white/30">*The “94” references the tradition described in the restaurant story; the business was established in 2022.</p>
      </section>

      {/* MENU */}
      <section id="menu" className="menu-section relative bg-[#181818] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="section-kicker">Made with love, served with soul</p>
              <h2 className="section-heading mt-5">The <span className="font-serif italic text-[#F59E0B]">menu.</span></h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Build your plate, your way. Pick your favourite staples, add the extras you love, then send your order straight to us on WhatsApp.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
              <span className="h-px w-10 bg-[#F59E0B]/70" /> Choose. Add. Enjoy.
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredDishes.map((dish) => (
              <article key={dish.name} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#202020]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 380px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-lg font-extrabold text-white">{dish.name}</h3>
                </div>
                <p className="px-4 py-3 text-xs leading-5 text-white/50">{dish.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
            <div className="min-w-0">
              <div className="menu-tabs flex gap-2 overflow-x-auto border-b border-white/10 pb-3" role="tablist" aria-label="Menu categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.14em] transition sm:px-6 sm:text-[11px] ${
                      activeCategory === category
                        ? "bg-[#F59E0B] text-[#17130B] shadow-[0_8px_24px_rgba(245,158,11,0.13)]"
                        : "border border-white/10 bg-white/[0.025] text-white/55 hover:border-[#F59E0B]/50 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mb-5 mt-7 flex items-center justify-between">
                <p className="text-xs font-bold text-white/80">{activeCategory}</p>
                <p className="text-[10px] font-medium text-white/35">{visibleItems.length} items</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {visibleItems.map((item, index) => {
                  const quantity = cart[item.id] ?? 0;
                  return (
                    <article key={item.id} className="menu-item-card group flex min-h-[116px] items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#202020] p-4 transition hover:-translate-y-0.5 hover:border-[#F59E0B]/35 hover:bg-[#24221E] sm:p-5">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.05] text-[9px] font-bold text-[#F59E0B]/70">{String(index + 1).padStart(2, "0")}</span>
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-bold leading-5 text-white sm:text-[15px]">{item.name}</h3>
                          <p className="mt-2 text-[11px] font-semibold text-[#F6C66D]">{item.priceLabel}{item.unit ? <span className="font-normal text-white/40"> / {item.unit}</span> : null}</p>
                          {item.note && <p className="mt-1 text-[10px] leading-4 text-white/35">{item.note}</p>}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className={`add-button flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${quantity > 0 ? "bg-[#F59E0B] text-[#17130B]" : "border border-white/15 text-white hover:border-[#F59E0B] hover:text-[#F59E0B]"}`}
                        aria-label={`Add ${item.name} to order`}
                      >
                        {quantity > 0 ? <><Check size={12} /> {quantity}</> : <><Plus size={13} /> Add</>}
                      </button>
                    </article>
                  );
                })}
              </div>
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#F59E0B]/15 bg-[#F59E0B]/[0.055] p-4">
                <span className="mt-0.5 text-[#F59E0B]"><Utensils size={16} /></span>
                <p className="text-[11px] leading-5 text-white/55">Prices are shown as supplied. Fufu starts at GHS 15 and tilapia ranges from GHS 40–80. Soup prices not listed will be confirmed with you on WhatsApp.</p>
              </div>
            </div>

            {/* CART */}
            <aside className="cart-panel rounded-[1.7rem] border border-white/10 bg-[#111111] p-5 sm:p-6 lg:sticky lg:top-28" aria-label="Your order">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#F59E0B]">Your selection</p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-[-0.04em] text-white">Your order</h3>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]"><ShoppingBag size={18} /></span>
              </div>

              {selectedItems.length === 0 ? (
                <div className="flex min-h-[190px] flex-col items-center justify-center py-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-dashed border-white/20 text-white/30"><ShoppingBag size={21} /></span>
                  <p className="mt-4 text-sm font-bold text-white/75">Your plate is waiting.</p>
                  <p className="mt-2 max-w-[210px] text-[11px] leading-5 text-white/35">Tap “Add” on anything that catches your eye.</p>
                </div>
              ) : (
                <div className="max-h-[360px] space-y-4 overflow-y-auto py-5 pr-1">
                  {selectedItems.map((item) => {
                    const quantity = cart[item.id] ?? 0;
                    return (
                      <div key={item.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-white">{item.name}</p>
                          <p className="mt-1 text-[10px] text-white/40">{item.price === null ? "Price to confirm" : money(item.price * quantity)}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`} className="grid h-6 w-6 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"><Minus size={11} /></button>
                          <span className="w-4 text-center text-[11px] font-bold text-white">{quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`} className="grid h-6 w-6 place-items-center rounded-full bg-[#F59E0B] text-[#17130B] transition hover:bg-[#f8b63e]"><Plus size={11} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-[11px] text-white/45">
                  <span>Items</span><span>{itemCount}</span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-xs font-semibold text-white/70">Estimated subtotal</span>
                  <span className="text-2xl font-black tracking-[-0.05em] text-[#F59E0B]">{money(subtotal)}</span>
                </div>
                {hasUnpricedItems && <p className="mt-2 text-[10px] leading-4 text-[#F6C66D]/75">Excludes soups with prices to be confirmed.</p>}
                <p className="mt-5 rounded-xl bg-white/[0.045] p-3 text-[10px] leading-[1.65] text-white/45">
                  Delivery is available. The exact delivery fee will be communicated to you by the dispatch rider upon pickup.
                </p>
                <button
                  type="button"
                  onClick={checkout}
                  disabled={selectedItems.length === 0}
                  className="gold-button mt-4 flex w-full items-center justify-center gap-3 rounded-full px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.16em] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Checkout on WhatsApp <ArrowUpRight size={15} />
                </button>
                <p className="mt-3 text-center text-[9px] text-white/30">You will confirm your address and final total in WhatsApp.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-[#F59E0B]/25 bg-[radial-gradient(ellipse_at_85%_10%,rgba(245,158,11,0.14),transparent_38%),linear-gradient(115deg,#201d17,#151515_65%)] p-8 sm:p-12 lg:flex-row lg:items-center lg:p-16">
          <div className="max-w-2xl">
            <p className="section-kicker">Bring your appetite</p>
            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.065em] text-white sm:text-6xl">Your next favourite meal is <span className="font-serif italic text-[#F59E0B]">calling.</span></h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">Get in touch, place your order, and let us bring a little taste of tradition to your day.</p>
          </div>
          <a href="#menu" className="group flex shrink-0 items-center gap-4 rounded-full bg-[#F59E0B] py-2 pl-6 pr-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#17130B] transition hover:bg-[#f8b63e]">
            Order your favourites <span className="grid h-11 w-11 place-items-center rounded-full bg-[#17130B] text-[#F59E0B] transition group-hover:rotate-45"><ArrowUpRight size={17} /></span>
          </a>
        </div>
      </section>

      {/* THE VIBE / GALLERY */}
      <section id="gallery" className="relative overflow-hidden border-t border-white/[0.07] bg-[#111111] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="section-kicker">Step inside</p>
              <h2 className="section-heading mt-5">The <span className="font-serif italic text-[#F59E0B]">vibe.</span></h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                From the welcome outside to the atmosphere within, take a look around Feels 94 Chopbar. Good food is even better when shared.
              </p>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F59E0B] transition hover:gap-3 md:self-auto">
              Plan your visit <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 lg:auto-rows-[210px] lg:grid-cols-4 lg:gap-4">
            {galleryImages.map((photo, index) => (
              <figure
                key={photo.src}
                className={`group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#202020] ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-90 transition group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#F6C66D]">{photo.type}</span>
                  <span className="mt-1 block text-xs font-extrabold text-white sm:text-sm">{photo.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS & HOURS */}
      <section id="locations" className="border-t border-white/[0.07] bg-[#181818] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-kicker">Come through</p>
            <h2 className="section-heading mt-5">Two homes. <span className="font-serif italic text-[#F59E0B]">One feeling.</span></h2>
            <p className="mt-6 text-sm leading-7 text-white/55 sm:text-base">Find us in Mallam-Gbawe or East Legon. We look forward to welcoming you.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              {
                name: "Mallam-Gbawe",
                detail: "Mallam-Gbawe, Accra, Ghana",
                code: "01",
                image: IMAGE_PATHS.mallamStorefront,
                imageAlt: "Feels 94 Chopbar storefront in Mallam-Gbawe",
              },
              {
                name: "East Legon",
                detail: "East Legon, Accra, Ghana",
                code: "02",
                image: IMAGE_PATHS.eastLegonStorefront,
                imageAlt: "Feels 94 Chopbar storefront for the East Legon branch",
              },
            ].map((branch) => (
              <article key={branch.code} className="location-card relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#202020]">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={branch.image}
                    alt={branch.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-7 text-[9px] font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Branch {branch.code}</span>
                </div>
                <div className="relative p-7 sm:p-9">
                  <div className="absolute -right-7 -top-10 select-none font-black text-[170px] leading-none tracking-[-0.12em] text-white/[0.025]">{branch.code}</div>
                  <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/45">Visit this location</span>
                    <MapPin size={19} className="text-[#F59E0B]" />
                  </div>
                  <h3 className="mt-5 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">{branch.name}</h3>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/45"><MapPin size={13} /> {branch.detail}</p>
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="mb-4 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/65"><Clock3 size={13} className="text-[#F59E0B]" /> Opening hours</div>
                    <div className="space-y-3">
                      {openingHours.map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between gap-4 text-[11px]">
                          <span className="text-white/45">{day}</span>
                          <span className={hours === "Closed" ? "font-semibold text-white/35" : "font-semibold text-white/80"}>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F59E0B] transition hover:gap-3">
                    Ask about this branch <ChevronRight size={14} />
                  </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-[10px] leading-5 text-white/30">Branch cards show neighbourhood-level locations. Add verified street addresses and map links when available.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 pb-10 pt-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end">
            <div>
              <a href="#home" className="inline-flex items-center gap-3">
                <Image src={IMAGE_PATHS.logo} alt="Feels 94 Chopbar logo" width={44} height={44} className="h-11 w-11 rounded-full border border-white/10 object-contain" />
                <span><span className="block text-xl font-black tracking-[-0.05em] text-white">Feels <span className="text-[#F59E0B]">94</span></span><span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.35em] text-white/45">Chopbar</span></span>
              </a>
              <p className="mt-5 max-w-sm text-xs leading-6 text-white/40">The true taste of nostalgia. Authentic Ghanaian food, served with heart in Accra.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
              <a href="#menu" className="transition hover:text-[#F59E0B]">Menu</a>
              <a href="#story" className="transition hover:text-[#F59E0B]">Our Story</a>
              <a href="#gallery" className="transition hover:text-[#F59E0B]">The Vibe</a>
              <a href="#locations" className="transition hover:text-[#F59E0B]">Locations</a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="transition hover:text-[#F59E0B]">WhatsApp</a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[9px] font-medium uppercase tracking-[0.12em] text-white/25 sm:flex-row">
            <p>© {new Date().getFullYear()} Feels 94 Chopbar. All rights reserved.</p>
            <p>Good food. Good memories. Always.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition hover:-translate-y-1 hover:scale-105 sm:bottom-7 sm:right-7"
        aria-label="Chat with Feels 94 Chopbar on WhatsApp"
      >
        <MessageCircle size={25} fill="currentColor" strokeWidth={1.6} />
      </a>

      {itemCount > 0 && (
        <a href="#menu" className="mobile-cart-indicator fixed bottom-5 left-5 z-40 flex items-center gap-3 rounded-full border border-[#F59E0B]/50 bg-[#151515]/95 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-xl backdrop-blur md:hidden">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F59E0B] text-[#17130B]">{itemCount}</span>
          View order <span className="text-[#F59E0B]">{money(subtotal)}</span>
        </a>
      )}
    </main>
  );
}
