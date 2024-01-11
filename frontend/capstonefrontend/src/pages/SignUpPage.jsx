import React, { useEffect} from 'react'
import SignUp from '../components/SignUp'
import { useSkillContext } from '../context/SkillContext';
import { useData } from "../hooks/useData";

export default function SignUpPage() {
    const{handleUpdateSkills}= useSkillContext();
    const skillData = useData("http://localhost:8080/api/skills/", []);
    useEffect(() => {
        // let PostList= await postsData
        // setCurrentPosts(PostList)
       
        Array.isArray(skillData) && handleUpdateSkills(skillData);
      }, [skillData, handleUpdateSkills]);
  return (
   <SignUp/>
  )
}
