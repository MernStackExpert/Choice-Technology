const { MotionConfig } = require("framer-motion");

const ErrorMsg = ({ message }) => (

  <MotionConfig.p 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mt-2 ml-2"
  >
    {message}
  </MotionConfig.p>
);

export default ErrorMsg;