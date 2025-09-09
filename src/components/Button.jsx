import './../../src/index.css'

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {

  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full font-bold overflow-hidden transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900";

  const variantClasses = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 dark:bg-amber-400 dark:text-gray-900 dark:shadow-amber-400/30 dark:hover:bg-amber-500 focus:ring-blue-500 dark:focus:ring-amber-300",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-gray-900 focus:ring-blue-500 dark:focus:ring-amber-300",
    ghost: "text-blue-600 hover:bg-blue-100 dark:text-amber-300 dark:hover:bg-amber-400/20 focus:ring-blue-500 dark:focus:ring-amber-300",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ y: -4 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-[150%] rotate-[-45deg] transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"></span>
      
      {Icon && iconPosition === 'left' && <Icon className="text-xl" />}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="text-xl" />}
    </motion.button>
  );
};

export default Button;