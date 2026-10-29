import styles from './Button.module.css';

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  children,
  ...props
}) {
  const type = Component === 'button' ? (props.type ?? 'button') : undefined;
  return (
    <Component className={`${styles.button} ${styles[variant]}`} {...props} type={type}>
      {children}
    </Component>
  );
}
