import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import propTypes from "prop-types";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Ticket from "../pages/Ticket";

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<MotionRouteWrapper element={<Home />} />} />
        <Route path="/login" element={<MotionRouteWrapper element={<Login />} />} />
        <Route path="/ticket/*" element={<MotionRouteWrapper element={<Ticket />} />} />
      </Routes>
    </AnimatePresence>
  );
};

const MotionRouteWrapper = ({ element }) => {
  MotionRouteWrapper.propTypes = {
    element: propTypes.element.isRequired,
  };
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {element}
    </motion.div>
  );
};

export default AppRouter;