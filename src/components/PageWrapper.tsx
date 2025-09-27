// components/PageWrapper.tsx
import { motion } from 'framer-motion';
import { pageVariants, PageWrapperProps } from '../lib/animations';

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{
        type: "tween",
        ease: "anticipate",
        duration: 0.5
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;