import { useEffect } from "react";

import useSkill from "../../store/skill";
import SkillsCadr from "../../components/skills/SkillsCadr";

const Skills = () => {
  const {
    user,
    skills,
    total,
    page,
    getSkills,
    setPage,
  } = useSkill();

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const totalPages = Math.ceil(total / page);

  return (
    <div>
      <div className="user__inner">
        {
          skills.map((skill) => <SkillsCadr skills={skill} />)
        }
      </div>
      {totalPages > 1 && (
        <div className="skills__pagination">
          <button
            className="skills__pagination-button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="skills__pagination-current">{page}</span>
          <button
            className="skills__pagination-button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Skills