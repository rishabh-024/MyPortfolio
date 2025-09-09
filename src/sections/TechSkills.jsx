import { 
  FaCode, FaGitAlt, FaJava, FaGithub, 
  FaJs, FaPython, FaHtml5, FaCss3Alt 
} from 'react-icons/fa';

import {
  SiMongodb, SiFirebase, SiTailwindcss, SiTensorflow,
  SiOpenai, SiScikitlearn, SiMysql, SiNumpy, SiPandas, SiReact
} from 'react-icons/si';

import { BiNetworkChart } from 'react-icons/bi';
import { motion } from 'framer-motion';

const Marquee = ({ skills, direction = 'left' }) => {
  const extendedSkills = [...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden group">
      <motion.div
        className="flex group-hover:paused"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          ease: 'linear',
          duration: 40,
          repeat: Infinity,
        }}
        style={{ animationPlayState: 'running' }}
      >
        {extendedSkills.map((skill, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 mx-4 flex items-center gap-3 bg-white dark:bg-gray-800 p-3 px-5 rounded-full shadow-md border border-gray-200/50 dark:border-gray-700/50"
          >
            <span 
              className="text-2xl" 
              role="img" 
              aria-label={`${skill.name} icon`}
            >
              {skill.icon}
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};


function Skills() {
  const skillsData = {
    techCategories: [
      {
        skills: [
          { name: 'JavaScript', icon: <FaJs className='text-[#F7DF1E]' /> },
          { name: 'React.jsx', icon: <SiReact className='text-[#61DBFB]' /> },
          { name: 'HTML5', icon: <FaHtml5 className='text-[#E34F26]' /> },
          { name: 'CSS3', icon: <FaCss3Alt className='text-[#1572B6]' /> },
          { name: 'Tailwind CSS', icon: <SiTailwindcss className='text-[#38BDF8]' /> },
        ]
      },
      {
        skills: [
          { name: 'Python', icon: <FaPython className='text-[#3776AB]' /> },
          { name: 'NumPy', icon: <SiNumpy className='text-[#013243]' /> },
          { name: 'Pandas', icon: <SiPandas className='text-[#150458]' /> },
          { name: 'TensorFlow', icon: <SiTensorflow className='text-[#FF6F00]' /> },
          { name: 'Scikit-learn', icon: <SiScikitlearn className='text-[#F7931E]' /> },
        ]
      },
      {
        skills: [
          { name: 'MongoDB', icon: <SiMongodb className='text-[#47A248]' /> },
          { name: 'MySQL', icon: <SiMysql className='text-[#4479A1]' /> },
          { name: 'Firebase', icon: <SiFirebase className='text-[#FFCA28]' /> },
          { name: 'Git', icon: <FaGitAlt className='text-[#F05032]' /> },
          { name: 'GitHub', icon: <FaGithub className='text-black dark:text-white' /> },
        ]
      },
      {
          skills: [
            { name: 'Java', icon: <FaJava className='text-[#007396]' /> },
            { name: 'Google Gemini API', icon: <FaCode className='text-[#34A853]' /> },
            { name: 'OpenAI API', icon: <SiOpenai className='text-black dark:text-white' /> },
            { name: 'RESTful APIs', icon: <BiNetworkChart className='text-gray-500' /> },
            { name: 'C', icon: <FaCode className='text-gray-700' /> },
          ]
        },
    ],
    fundamentalSkills: [
        { name: 'Data Structures & Algorithms' },
        { name: 'System Design' },
        { name: 'OOPs' },
        { name: 'DBMS' },
        { name: 'Operating Systems' },
        { name: 'Poster Designing' },
        { name: 'Video Editing' },
    ]
  };

  return (
    <section id='skills' className='py-24 bg-gray-50 dark:bg-gray-950 scroll-mt-20 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            Technologies & <span className="text-blue-600 dark:text-amber-300">Skills</span>
          </h2>
        </motion.div>

        <div className="space-y-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          {skillsData.techCategories.map((category, index) => (
            <Marquee
              key={index}
              skills={category.skills}
              direction={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
        
        <div className='mt-16 text-center'>
             <h3 className='text-xl font-bold text-gray-800 dark:text-white mb-6'>
                 Core CS Concepts & Additional Skills
             </h3>
             <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className='flex flex-wrap justify-center gap-3'
             >
                {skillsData.fundamentalSkills.map((skill, i) => (
                    <div key={i} className='bg-white dark:bg-gray-800 text-gray-700 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-200/80 dark:border-gray-700/80'>
                        {skill.name}
                    </div>
                ))}
             </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;