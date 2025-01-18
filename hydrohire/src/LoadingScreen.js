import React, { useState, useEffect } from 'react';
import capybaraLogo from './assets/img/Capybara.png';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="fixed w-full h-full bg-white flex flex-col justify-center items-center space-y-10">
            <motion.div
                initial={{ x: 500 }}
                animate={{ x: -500 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                style={{ maxWidth: '20%'}}
                className="flex justify-center items-center flex-row"
            >
                <img src={capybaraLogo} alt="Capybara" />
                <img src={capybaraLogo} alt="Capybara" />
                <img src={capybaraLogo} alt="Capybara" />
                <img src={capybaraLogo} alt="Capybara" />
                <img src={capybaraLogo} alt="Capybara" />
                <img src={capybaraLogo} alt="Capybara" />
                <img src={capybaraLogo} alt="Capybara" />
            </motion.div>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
                className="flex items-center"
            >
                <h1 className="text-2xl font-bold">Loading...</h1>
            </motion.div>
        </div>
    )
}

export default LoadingScreen;