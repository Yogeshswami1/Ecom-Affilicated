import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { id, name, price, rating, image, affiliateLink } = product;

  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className={styles.image} />
      </Link>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price}</p>
        <p className={styles.rating}>Rating: {rating} ★</p>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.buyButton}
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;