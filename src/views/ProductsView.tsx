import React, { useState, useMemo, useEffect } from 'react';
import { Search, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ProductDetailModal, ProductItem } from '../components/ProductDetailModal';
import rawProducts from '../data/products.json';

const products = rawProducts as ProductItem[];

export const ProductsView: React.FC = () => {
  const { t } = useLanguage();
  const { addItem, items: cartItems } = useCart();

  // URL state synchronization
  const getInitialParam = (key: string, fallback: string) => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const [searchQuery, setSearchQuery] = useState(() => getInitialParam('q', ''));
  const [selectedPet, setSelectedPet] = useState(() => getInitialParam('pet', 'all'));
  const [selectedCategory, setSelectedCategory] = useState(() => getInitialParam('cat', 'all'));
  const [selectedStage, setSelectedStage] = useState(() => getInitialParam('stage', 'all'));
  const [selectedBrand, setSelectedBrand] = useState(() => getInitialParam('brand', 'all'));
  const [inStockOnly, setInStockOnly] = useState(() => getInitialParam('stock', 'false') === 'true');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  // Sync to URL
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (searchQuery) params.set('q', searchQuery); else params.delete('q');
      if (selectedPet !== 'all') params.set('pet', selectedPet); else params.delete('pet');
      if (selectedCategory !== 'all') params.set('cat', selectedCategory); else params.delete('cat');
      if (selectedStage !== 'all') params.set('stage', selectedStage); else params.delete('stage');
      if (selectedBrand !== 'all') params.set('brand', selectedBrand); else params.delete('brand');
      if (inStockOnly) params.set('stock', 'true'); else params.delete('stock');

      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    } catch {
      // Ignore
    }
  }, [searchQuery, selectedPet, selectedCategory, selectedStage, selectedBrand, inStockOnly]);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return ['all', ...list];
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedPet !== 'all' && p.petType !== selectedPet) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedStage !== 'all' && p.lifeStage !== selectedStage) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (inStockOnly && !p.inStock) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesTag) return false;
      }
      return true;
    });
  }, [selectedPet, selectedCategory, selectedStage, selectedBrand, inStockOnly, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPet('all');
    setSelectedCategory('all');
    setSelectedStage('all');
    setSelectedBrand('all');
    setInStockOnly(false);
  };

  const isFilterActive =
    searchQuery ||
    selectedPet !== 'all' ||
    selectedCategory !== 'all' ||
    selectedStage !== 'all' ||
    selectedBrand !== 'all' ||
    inStockOnly;

  return (
    <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
                Thanesar Store Inventory
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.products.title}
              </h1>
            </div>
            
            {/* Prices updated date tag */}
            <div className="text-xs font-semibold text-[#5E696E] dark:text-[#A2ADB3] bg-white dark:bg-[#1D2326] px-3 py-1.5 rounded-lg border border-[#14181A]/10 dark:border-[#F6EFE4]/10 self-start sm:self-auto">
              <span>{t.products.pricesUpdated} </span>
              <span className="text-[#14181A] dark:text-white font-bold">{siteConfig.pricesUpdatedOn}</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] max-w-3xl">
            {t.products.subtitle}
          </p>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-20 bg-white/95 dark:bg-[#1D2326]/95 backdrop-blur-md p-4 rounded-2xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-xs space-y-3">
          
          {/* Top Row: Search & In Stock toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E696E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.products.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F6EFE4]/60 dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5E696E] hover:text-[#14181A] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* In-Stock Toggle & Reset */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#14181A] dark:text-[#F6EFE4] cursor-pointer select-none min-h-[44px]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-[#B5533C] focus:ring-[#B5533C] accent-[#B5533C]"
                />
                <span>{t.products.inStockOnly}</span>
              </label>

              {isFilterActive && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-[#B5533C] hover:underline font-bold py-1 px-2 cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.products.resetFilters}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills / Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
            {/* Pet Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E696E] dark:text-[#A2ADB3] mb-1">
                {t.products.petFilter}
              </label>
              <select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                className="w-full text-xs py-2 px-2.5 rounded-lg bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C] cursor-pointer"
              >
                <option value="all">{t.products.all}</option>
                <option value="dog">Dog / Puppy</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E696E] dark:text-[#A2ADB3] mb-1">
                {t.products.categoryFilter}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs py-2 px-2.5 rounded-lg bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C] cursor-pointer"
              >
                <option value="all">{t.products.all}</option>
                <option value="food">Food & Nutrition</option>
                <option value="treats">Treats & Chews</option>
                <option value="accessories">Accessories & Harnesses</option>
                <option value="grooming">Grooming & Shampoo</option>
                <option value="health">Health & Bone Care</option>
              </select>
            </div>

            {/* Life Stage Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E696E] dark:text-[#A2ADB3] mb-1">
                {t.products.stageFilter}
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full text-xs py-2 px-2.5 rounded-lg bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C] cursor-pointer"
              >
                <option value="all">{t.products.all}</option>
                <option value="puppy">Puppy</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            {/* Brand Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E696E] dark:text-[#A2ADB3] mb-1">
                {t.products.brandFilter}
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs py-2 px-2.5 rounded-lg bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C] cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'all' ? t.products.all : b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-[#1D2326] rounded-2xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 p-8">
            <ShoppingBag className="w-12 h-12 mx-auto text-[#5E696E]/40 mb-3" />
            <h3 className="font-heading text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
              {t.products.noResults}
            </h3>
            <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] mt-1">
              {t.products.tryResetting}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-[#B5533C] text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              {t.products.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const inCart = cartItems.some((ci) => ci.slug === p.slug);
              return (
                <div
                  key={p.slug}
                  className="group bg-white dark:bg-[#1D2326] rounded-2xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Image Slot */}
                    <div
                      onClick={() => setActiveModalProduct(p)}
                      className="relative aspect-4/3 overflow-hidden bg-[#F6EFE4] dark:bg-[#14181A] cursor-pointer"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      {/* Stock badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/90 dark:bg-[#14181A]/90 backdrop-blur-xs text-[#1F3A2E] dark:text-emerald-400">
                          {p.inStock ? 'In Stock' : 'Pre-Order'}
                        </span>
                      </div>
                      
                      {/* Quick view icon trigger */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white p-1.5 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] flex items-center gap-1.5">
                        <span className="font-semibold text-[#B5533C]">{p.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.packSize}</span>
                      </div>

                      <h3
                        onClick={() => setActiveModalProduct(p)}
                        className="font-heading text-base font-bold text-[#14181A] dark:text-[#F6EFE4] group-hover:text-[#B5533C] transition-colors cursor-pointer line-clamp-2"
                      >
                        {p.name}
                      </h3>

                      <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <div className="text-sm font-bold text-[#14181A] dark:text-[#F6EFE4]">
                          {p.price !== null ? (
                            <span>₹{p.price}</span>
                          ) : (
                            <span className="text-xs font-semibold text-[#1F3A2E] dark:text-emerald-400">
                              {t.products.askPrice}
                            </span>
                          )}
                        </div>

                        {p.feedingGuide && (
                          <button
                            onClick={() => setActiveModalProduct(p)}
                            className="text-[11px] text-[#B5533C] hover:underline font-semibold cursor-pointer"
                          >
                            Feeding Guide ↗
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Enquiry Button */}
                  <div className="p-4 sm:p-5 pt-0">
                    <button
                      onClick={() =>
                        addItem({
                          slug: p.slug,
                          name: p.name,
                          brand: p.brand,
                          packSize: p.packSize,
                          price: p.price,
                        })
                      }
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-colors cursor-pointer min-h-[44px] ${
                        inCart
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#1F3A2E] text-white hover:bg-[#15271F]'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.products.inEnquiry}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#E8A33D]" />
                          <span>{t.products.addToEnquiry}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
};
