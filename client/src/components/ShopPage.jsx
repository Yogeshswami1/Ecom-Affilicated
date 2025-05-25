import React, { useState } from 'react';
import styles from './ShopPage.module.css';
import ProductCard from './ProductCard';

// Sample product data (replace with API data later)
const productsData = [
  {
    id: 1,
    name: 'Smartphone X',
    category: 'Electronics',
    brand: 'Samsung',
    price: 699,
    rating: 4.5,
    image: 'https://picsum.photos/300/300?random=1',
    affiliateLink: 'https://affiliate.com/product1?ref=dealfinder',
    specs: { display: '6.5"', battery: '4500mAh', camera: '48MP' },
    features: { ram: '8GB', storage: '128GB' },
    reviews: ['Great phone!', 'Battery life is amazing.'],
    inStock: true,
    network: ['Amazon', 'Flipkart'],
    createdAt: '2025-05-20',
    dealScore: 90,
  },
  {
    id: 2,
    name: 'Leather Jacket',
    category: 'Fashion',
    brand: 'Nike',
    price: 129,
    rating: 4.0,
    image: 'https://picsum.photos/300/300?random=2',
    affiliateLink: 'https://affiliate.com/product2?ref=dealfinder',
    specs: { material: 'Genuine Leather', size: 'M', color: 'Black' },
    features: { material: 'Leather', fit: 'Regular' },
    reviews: ['Stylish and durable.', 'Fits perfectly!'],
    inStock: false,
    network: ['Flipkart'],
    createdAt: '2025-05-15',
    dealScore: 85,
  },
  {
    id: 3,
    name: 'Blender Pro',
    category: 'Home & Kitchen',
    brand: 'Philips',
    price: 89,
    rating: 4.2,
    image: 'https://picsum.photos/300/300?random=3',
    affiliateLink: 'https://affiliate.com/product3?ref=dealfinder',
    specs: { power: '1000W', capacity: '1.5L', blades: '6' },
    features: { power: '1000W', speed: '3 Levels' },
    reviews: ['Powerful blender!', 'Easy to clean.'],
    inStock: true,
    network: ['Amazon'],
    createdAt: '2025-05-10',
    dealScore: 80,
  },
  {
    id: 4,
    name: 'Perfume Lux',
    category: 'Beauty',
    brand: 'Chanel',
    price: 49,
    rating: 4.8,
    image: 'https://picsum.photos/300/300?random=4',
    affiliateLink: 'https://affiliate.com/product4?ref=dealfinder',
    specs: { scent: 'Floral', volume: '50ml', longevity: '8h' },
    features: { scentType: 'Floral', longevity: '8h' },
    reviews: ['Amazing scent!', 'Lasts all day.'],
    inStock: true,
    network: ['Amazon', 'Flipkart'],
    createdAt: '2025-05-05',
    dealScore: 95,
  },
];

const ShopPage = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    brand: '',
    inStock: false,
    network: [],
    features: {}, // Dynamic features based on category
    sort: 'newest', // Default sort by Newest
  });

  // Handle filter changes for select, checkbox, etc.
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle price range filter
  const handlePriceRangeChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      priceRange: [0, parseInt(value)],
    }));
  };

  // Handle network filter (multi-select)
  const handleNetworkChange = (network) => {
    setFilters((prev) => {
      const updatedNetwork = prev.network.includes(network)
        ? prev.network.filter((n) => n !== network)
        : [...prev.network, network];
      return { ...prev, network: updatedNetwork };
    });
  };

  // Handle dynamic features filter
  const handleFeatureChange = (featureKey, value) => {
    setFilters((prev) => ({
      ...prev,
      features: { ...prev.features, [featureKey]: value },
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = productsData
    .filter((product) => {
      const matchesCategory = filters.category
        ? product.category === filters.category
        : true;
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.rating;
      const matchesBrand = filters.brand ? product.brand === filters.brand : true;
      const matchesStock = filters.inStock ? product.inStock : true;
      const matchesNetwork =
        filters.network.length > 0
          ? filters.network.some((n) => product.network.includes(n))
          : true;
      const matchesFeatures = Object.keys(filters.features).every((key) =>
        filters.features[key]
          ? product.features[key] === filters.features[key]
          : true
      );

      return (
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesBrand &&
        matchesStock &&
        matchesNetwork &&
        matchesFeatures
      );
    })
    .sort((a, b) => {
      if (filters.sort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filters.sort === 'best-deal') {
        return b.dealScore - a.dealScore;
      } else if (filters.sort === 'top-rated') {
        return b.rating - a.rating;
      }
      return 0;
    });

  // Dynamic feature options based on category
  const featureOptions = {
    Electronics: {
      ram: ['4GB', '8GB', '16GB'],
      storage: ['64GB', '128GB', '256GB'],
    },
    Fashion: {
      material: ['Leather', 'Cotton', 'Denim'],
      fit: ['Regular', 'Slim', 'Loose'],
    },
    'Home & Kitchen': {
      power: ['500W', '1000W', '1500W'],
      speed: ['2 Levels', '3 Levels', '5 Levels'],
    },
    Beauty: {
      scentType: ['Floral', 'Woody', 'Citrus'],
      longevity: ['6h', '8h', '12h'],
    },
  };

  const selectedCategoryFeatures = filters.category
    ? featureOptions[filters.category] || {}
    : {};

  return (
    <div className={styles.shopPage}>
      {/* Left Sidebar Filters */}
      <div className={styles.sidebar}>
        <h3>Filters</h3>

        {/* Category Filter */}
        <div className={styles.filterGroup}>
          <label>Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={(e) => {
              handleFilterChange(e);
              setFilters((prev) => ({ ...prev, features: {} })); // Reset features on category change
            }}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div className={styles.filterGroup}>
          <label>Brand</label>
          <select name="brand" value={filters.brand} onChange={handleFilterChange}>
            <option value="">All Brands</option>
            <option value="Samsung">Samsung</option>
            <option value="Nike">Nike</option>
            <option value="Philips">Philips</option>
            <option value="Chanel">Chanel</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className={styles.filterGroup}>
          <label>Price Range: $0 - ${filters.priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={handlePriceRangeChange}
          />
        </div>

        {/* Rating Filter */}
        <div className={styles.filterGroup}>
          <label>Minimum Rating</label>
          <select name="rating" value={filters.rating} onChange={handleFilterChange}>
            <option value="0">All Ratings</option>
            <option value="3">3★+</option>
            <option value="4">4★+</option>
            <option value="4.5">4.5★+</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className={styles.filterGroup}>
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={filters.inStock}
              onChange={handleFilterChange}
            />
            In Stock Only
          </label>
        </div>

        {/* Network Filter */}
        <div className={styles.filterGroup}>
          <label>Network</label>
          <div className={styles.checkboxGroup}>
            {['Amazon', 'Flipkart'].map((network) => (
              <label key={network}>
                <input
                  type="checkbox"
                  checked={filters.network.includes(network)}
                  onChange={() => handleNetworkChange(network)}
                />
                {network}
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Features Filter */}
        {filters.category && Object.keys(selectedCategoryFeatures).length > 0 && (
          <div className={styles.filterGroup}>
            <label>Features</label>
            {Object.keys(selectedCategoryFeatures).map((featureKey) => (
              <div key={featureKey} className={styles.featureFilter}>
                <label>{featureKey.charAt(0).toUpperCase() + featureKey.slice(1)}</label>
                <select
                  value={filters.features[featureKey] || ''}
                  onChange={(e) =>
                    handleFeatureChange(featureKey, e.target.value || undefined)
                  }
                >
                  <option value="">All</option>
                  {selectedCategoryFeatures[featureKey].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Sort Options */}
        <div className={styles.filterGroup}>
          <label>Sort By</label>
          <select name="sort" value={filters.sort} onChange={handleFilterChange}>
            <option value="newest">Newest</option>
            <option value="best-deal">Best Deal</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Right Side Product Grid */}
      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;