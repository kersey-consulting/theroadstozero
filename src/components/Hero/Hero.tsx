import type React from 'react';
import type { HeroProps } from './Hero.types';
import styles from './Hero.module.css';

export function Hero({
  backgroundImage,
  backgroundParallax = false,
  theme = 'primary',
  left,
  right,
  leftVert = 'center',
  rightVert = 'center',
}: Readonly<HeroProps>) {
  const style: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? 'cover' : undefined,
    backgroundPosition: backgroundImage ? 'center' : undefined,
    backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
    backgroundAttachment: backgroundParallax ? 'fixed' : 'scroll'
  };

  const themeClass =
    theme === 'secondary'
      ? styles.secondary
      : theme === 'tertiary'
        ? styles.tertiary
        : styles.primary;

  const leftVertClass = leftVert === 'end' ? styles.vertEnd : styles.vertCenter;
  const rightVertClass =
    rightVert === 'end' ? styles.vertEnd : styles.vertCenter;

  return (
    <section className={`${styles.hero} ${themeClass}`} style={style}>
      <div className={styles.inner}>
        {left ? (
          <div className={`${styles.col} ${styles.left} ${leftVertClass}`}>
            {left}
          </div>
        ) : null}

        {right ? (
          <div className={`${styles.col} ${styles.right} ${rightVertClass}`}>
            {right}
          </div>
        ) : null}
      </div>
    </section>
  );
}
