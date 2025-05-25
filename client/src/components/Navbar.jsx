import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { loadFull } from 'tsparticles';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const particlesContainer = useRef(null);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize particles
  useEffect(() => {
    const initParticles = async () => {
      await loadFull(particlesContainer.current);
      particlesContainer.current.init({
        background: {
          color: {
            value: "#111827", // Same as Hero Section
          },
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        retina_detect: true,
      });
    };

    if (particlesContainer.current) {
      initParticles();
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Categories for dropdown
  const categories = [
    { id: 1, name: 'Electronics', path: '/shop/electronics' },
    { id: 2, name: 'Fashion', path: '/shop/fashion' },
    { id: 3, name: 'Home & Kitchen', path: '/shop/home-kitchen' },
    { id: 4, name: 'Beauty', path: '/shop/beauty' },
  ];

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.particlesBg} id="navbar-particles" ref={particlesContainer}></div>
      <div className={styles.overlay}></div>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          DealFinder
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className={styles.hamburger} onClick={toggleMobileMenu}>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </div>

        {/* Nav Links */}
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>

          {/* Shop with Dropdown */}
          <li className={styles.dropdown}>
            <div
              className={styles.navLink}
              onClick={toggleDropdown}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              Shop
              <span className={styles.dropdownArrow}>▼</span>
            </div>
            <ul
              className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.dropdownOpen : ''}`}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={category.path}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login/Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;