import React, { useState, useEffect } from 'react';
import capybaraLogo from './assets/img/Capybara.png';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="fixed w-full h-full bg-white flex flex-col justify-center items-center">
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                className="flex flex-row justify-center"
            >
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
                <img src={capybaraLogo} style={{ maxWidth: '20%'}} alt="Capybara" />
            </motion.div>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
                className="flex items-center"
            >
                <h1 className="text-2xl font-bold">Loading...</h1>
            </motion.div>
        </div>
    )
}

export default LoadingScreen;