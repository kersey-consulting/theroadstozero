import type {ButtonProps} from "@/components/Button/Button.types.ts";
import styles from './Button.module.css';

export const Button = ({theme = 'primary', size = 'medium', onClick, href, label}: ButtonProps) => {
    const buttonClass = `${styles.button} ${styles[theme]} ${styles[size]}`;
    if (href) {
        return (
            <a className={buttonClass} href={href} onClick={onClick}>{label}</a>
        )
    } else {
        return (
            <button className={buttonClass} onClick={onClick}>{label}</button>
        )
    }
};
