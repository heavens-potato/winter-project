import Navbar from "./Navbar";
import AboutCard from "./AboutCard";
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    title: 'Visual Insights & Dashboard',
    description: 'Our visually engaging dashboard and insight overview keeps you on top of your job applications at a glance. With bar and pie charts and key metrics, you’ll have a snapshot of your progress throughout your journey. Track statuses, analyze trends, and stay motivated with these visualizations keeping you informed and in control.',
  },
  {
    title: 'Smart Application Tracker',
    description: 'Effortlessly manage all your job applications in one convenient location. Our DataGrid structure makes it simple to add, view, edit, and delete entries. With powerful native and additional custom filtering options, you can quickly find the applications that matter most. You can also personalize your dashboard and display only the information that’s most relevant to you.',
  },
  {
    title: 'Personalized Workspace',
    description: 'Make Job Capyture your own with customizable themes and account settings. Choose from nine vibrant color themes to match your style, and enjoy a flexible workflow with the ability to easily and securely update your email, password, and profile settings whenever needed.',
  },
];

const paragraph = "Job Capyture simplifies and streamlines your job search process with an organized and customizable way to manage applications. We aim to solve the chaos of tracking applications across spreadsheets, emails, and scattered documents by offering a centralized, intuitive platform that visualizes progress and offers an organized method of viewing jobs. Designed for job seekers at all stages, Job Capyture is essential for maintaining clarity and confidence during the often-overwhelming job application journey."

function About(){
  const theme = useTheme();
  return (
    <>
      <Navbar/>
      <div> {/* Parent Div */}
        <div className='p-3 lg:p-14' style={{backgroundColor: theme.palette.primary.dark}}> {/* Top Part */}
          <div className = 'flex flex-col gap-6'>
            <div className = 'flex justify-center pt-2'>
              <Typography variant="h4" sx={{ fontSize: 32, color: theme.palette.primary.white, fontWeight: 'bold'}}>Who We Are</Typography>
            </div>
          </div>
          {/* 3 Features */}
            <motion.div
              initial = {{ opacity: 0 }}
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              transition = {{ duration: 0.3 }}
              >
              <p className="text-center mt-4" style={{color: theme.palette.primary.white}}>{paragraph}</p>
              <Grid className="mt-8" container spacing={3} sx={{
                backgroundColor: (theme) => theme.palette.primary.dark,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: 'center',
                justifyContent: 'center', 
                // padding: 5,
                height: '100%',
                gap: 5,
                paddingBottom: {xs: 4, sm:0}
              }}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index} sx={{
                      //  minWidth: { xs: 350, md: 600, lg: 350 },
                      maxWidth:{xs: '100%', lg: 415},
                      borderRadius: 25,
                    }}>
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }} 
                      viewport={{ once: true }}
                      transition = {{ duration: 0.3, delay: 0.3 }}
                    >
                      <Card sx={{minHeight:{xs: 0, lg:450}}}>
                        <CardContent>
                          <Typography variant="h5" component="h2" sx={{
                            fontSize: 32,
                            color: (theme) => theme.palette.primary.main,
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            padding: { xs: 2, md: 3 },
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
                      </motion.div>           
                    </Grid>
                  ))}
                </Grid>
              </motion.div> {/* 3 Features End */}
            </div>
        <div className = 'flex justify-center mt-10'>
          <Typography variant="h4" sx={{ fontSize: 32, fontWeight: 'bold' }}>Meet the Team</Typography>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-4 mb-10"> {/* Grid Parent */}
          <AboutCard name = 'Stephen Wu' />
          <AboutCard name = 'Justin Glazer'/>
          <AboutCard name = 'Claire Chen'/>
          <AboutCard name = 'Alexis Giobbi'/>
        </div> {/* Grid End */}
      </div> {/* Content End */}
    </>
  );
}

export default About;