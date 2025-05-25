import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardRefs = useRef([]);
  const carouselRef = useRef(null);
  const cardsPerView = 4; // Number of cards visible at once
  const cardWidth = 250; // Width of each card including margin

  // Fetch products from DummyJSON API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=10');
        const data = await response.json();
        const mappedProducts = data.products.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price * 80,
          discount: Math.round(product.discountPercentage),
          image: product.thumbnail,
          affiliateLink: '#',
          tag: product.discountPercentage > 10 ? 'Hot Deal' : 'Best Pick',
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Add 3D tilt and hover effects
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        );

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotateX: 5,
            rotateY: 5,
            z: 20,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(card.querySelector(`.${styles.tag}`), {
            scale: 1.1,
            background: '#e63939',
            duration: 0.3,
          });
          gsap.to(card.querySelector(`.${styles.buyButton}`), {
            backgroundColor: '#f08804',
            scale: 1.05,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0,
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(card.querySelector(`.${styles.tag}`), {
            scale: 1,
            background: '#ff6161',
            duration: 0.3,
          });
          gsap.to(card.querySelector(`.${styles.buyButton}`), {
            backgroundColor: '#ffa41c',
            scale: 1,
            duration: 0.3,
          });
        });

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(card, {
            rotateX: -y / 20,
            rotateY: x / 20,
            duration: 0.3,
          });
        });
      }
    });
  }, [products]);

  // Sync scroll position with scroll bar
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  // Update scroll position on scroll bar movement
  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const handleNext = () => {
    const maxScroll = (products.length - cardsPerView) * cardWidth;
    setScrollPosition((prev) => Math.min(prev + cardWidth, maxScroll));
  };

  const handlePrev = () => {
    setScrollPosition((prev) => Math.max(prev - cardWidth, 0));
  };

  if (products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <section className={styles.featuredSection}>
      <h2 className={styles.title}>Featured Products</h2>
      <div className={styles.carouselContainer}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          disabled={scrollPosition === 0}
        >
          ←
        </button>
        <div
          className={styles.carousel}
          ref={carouselRef}
          onScroll={handleScroll}
        >
          <div className={styles.carouselInner}>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={styles.productCard}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <span className={styles.tag}>{product.tag}</span>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                  onError={() => console.log(`Failed to load image for ${product.name}`)}
                />
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.price}>
                  ₹{product.price}{' '}
                  <span className={styles.discountBadge}>
                    -{product.discount}%
                  </span>
                </p>
                <a href={product.affiliateLink} className={styles.buyButton}>
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={scrollPosition >= (products.length - cardsPerView) * cardWidth}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;