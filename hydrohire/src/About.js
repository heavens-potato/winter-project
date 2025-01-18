import Navbar from "./Navbar";
import AboutCard from "./AboutCard";
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    title: 'Feature 1',
    description: 'Description of Feature 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    title: 'Feature 2',
    description: 'Description of Feature 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    title: 'Feature 3',
    description: 'Description of Feature 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
];

function About(){
  return (
    <>
      <Navbar/>
      <div> {/* Parent Div */}
        <div> {/* Top Part */}
          <div className = 'flex justify-center mt-1'>
            <Typography variant="h4" sx={{ fontSize: 32}}>Meet the Team</Typography>
          </div>
          <div className = 'flex justify-center mx-7'>
            <p> Job Capyture simplifies and streamlines your job search process with an organized and customizable 
              way to manage applications. We aim to solve the chaos of tracking applications across spreadsheets, 
              emails, and scattered documents by offering a centralized, intuitive platform that visualizes progress 
              and offers an organized method of viewing jobs. Designed for job seekers at all stages, 
              Job Capyture is essential for maintaining clarity and confidence during the often-overwhelming job 
              application journey.</p>
          </div>
          {/* 3 Features */}
            <motion.div
              initial = {{ opacity: 0 }}
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              transition = {{ duration: 0.3 }}
            >
            <Grid container spacing={3} sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: { xs: 5 , md: 15 },
                  gap: 5
                }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={4} key={index} sx={{
                  minWidth: { xs: 350, md: 600, lg: 350 },
                  maxWidth: 350,
                  borderRadius: 25,
                }}>
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }}
                    transition = {{ duration: 0.3, delay: 0.3 }}
                  >
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2" sx={{
                        fontSize: 32,
                        color: (theme) => theme.palette.primary.dark,
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        padding: { xs: 2, md: 3 }
                        }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{
                        fontSize: 18,
                        justifyContent: 'center',
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        color: (theme) => theme.palette.primary.dark,
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                  </motion.div>           {/* 3 Features End */}
                </Grid>
              ))}
            </Grid>
            </motion.div>
        </div> {/* Top End */}
        <div className="grid grid-cols-2 gap-3 p-4"> {/* Grid Parent */}
          <div className="grid gap-3">
            <div>
              <AboutCard name = 'Stephen Wu' ></AboutCard>
            </div>
            <div>
              <AboutCard name = 'Justin Glazer'></AboutCard>
            </div>
          </div>
          <div className="grid gap-3">
            <div>
              <AboutCard name = 'Claire Chen'></AboutCard>
            </div>
            <div>
              <AboutCard name = 'Alexis Giobbi'></AboutCard>
            </div>
          </div>
        </div> {/* Grid End */}
      </div> {/* Content End */}
    </>
  );
}

export default About;