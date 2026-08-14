import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';


const SmoothScroll = ({ children, root = true, className = '' }) => {
 
  const lenisOptions = {
    lerp: 0.1, 
    duration: 2, 
    smoothWheel: true, 
    smoothTouch: false, 
    wheelMultiplier: 1,
    touchMultiplier: 20, 
    orientation: 'vertical',
    gestureDirection: 'vertical',
    infinite: false, 
  };

  return (
    <ReactLenis root={root} options={lenisOptions} className={className}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;