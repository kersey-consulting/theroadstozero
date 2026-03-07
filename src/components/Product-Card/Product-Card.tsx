import { Button } from '@/components/Button/Button.tsx';
import type { ProductCardProps } from './Product-Card.types.ts';
import styles from './Product-Card.module.css';

export const ProductCard = ({
                                imagePath,
                                title,
                                subtext,
                                button,
                            }: ProductCardProps) => {
    return (
        <article className={styles.card}>
            <img
                className={styles.image}
                src={imagePath}
                alt={title}
            />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.subtext}>{subtext}</div>
                <Button
                    label={button.label}
                    href={button.href}
                />
            </div>
        </article>
    );
};
