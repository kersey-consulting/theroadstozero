export type ButtonProps = {
    theme?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    href?: string;
    label: string;
}
