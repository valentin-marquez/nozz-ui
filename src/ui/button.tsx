import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { motion, type HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

type ButtonVariant = 'default' | 'subtle' | 'ghost' | 'nav' | 'outline' | 'link' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonIconSide = 'left' | 'right';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children?: React.ReactNode;
}

interface ButtonIconProps {
  children: React.ReactNode;
  side?: ButtonIconSide;
}

const buttonVariants = {
  default: `
    bg-primary text-primary-foreground
    border border-primary/30
    shadow-lg shadow-primary/20
    hover:bg-primary/90 hover:border-primary/50 hover:shadow-primary/30
    active:bg-primary/95 active:shadow-primary/15
    transition-all duration-200
  `,
  subtle: `
    bg-secondary/90 text-secondary-foreground
    border border-secondary/30
    shadow-md shadow-secondary/10
    hover:bg-secondary/95 hover:border-secondary/50 hover:text-secondary-foreground
    active:bg-secondary hover:shadow-secondary/20
    transition-all duration-200
  `,
  ghost: `
    text-muted-foreground
    border border-transparent
    hover:bg-accent/30 hover:text-accent-foreground hover:border-accent/20
    active:bg-accent/40
    transition-all duration-200
  `,
  nav: `
    w-full bg-card/80 text-muted-foreground
    border border-border/40
    backdrop-blur-sm
    hover:bg-accent/30 hover:text-accent-foreground hover:border-accent/40
    active:bg-accent/40
    group transition-all duration-200
  `,
  outline: `
    border-2 border-primary text-primary
    hover:bg-primary/20 hover:border-primary/70
    active:bg-primary/30 active:border-primary/90
    transition-all duration-200
  `,
  link: `
    text-primary
    hover:text-primary/80 hover:underline
    active:text-primary/70
    transition-colors duration-200
  `,
  danger: `
    bg-danger text-danger-foreground
    border border-danger/30
    shadow-lg shadow-danger/20
    hover:bg-danger/90 hover:border-danger/50 hover:shadow-danger/30
    active:bg-danger/95 active:shadow-danger/15
    transition-all duration-200
  `,
};

const buttonSizes = {
  sm: 'h-8 px-3 text-sm rounded-lg',
  md: 'h-10 px-4 text-base rounded-lg',
  lg: 'h-12 px-6 text-lg rounded-xl',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const MotionSlot = motion.create(Slot);
    const Comp = asChild ? MotionSlot : motion.button;

    const content = React.useMemo(() => {
      const leftIcons: React.ReactNode[] = [];
      const rightIcons: React.ReactNode[] = [];
      const mainContent: React.ReactNode[] = [];

      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === ButtonIcon) {
          const side = child.props.side || 'left';
          if (side === 'left') {
            leftIcons.push(child);
          } else {
            rightIcons.push(child);
          }
        } else {
          mainContent.push(child);
        }
      });

      return {
        left: leftIcons,
        main: mainContent,
        right: rightIcons,
      };
    }, [children]);

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium gap-2',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {content.left}
        {content.main}
        {content.right}
      </Comp>
    );
  }
);

const ButtonIcon: React.FC<ButtonIconProps> = ({ children, side = 'left' }) => {
  return (
    <span className="inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
      {children}
    </span>
  );
};

Button.displayName = 'Button';
ButtonIcon.displayName = 'ButtonIcon';

export { Button, ButtonIcon };
export type { ButtonIconProps, ButtonProps };