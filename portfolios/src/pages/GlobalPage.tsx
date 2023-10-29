import { useEffect, useState } from 'react';
import { Progress, Space } from 'antd';

import useAuth from '../store/auth';
import useEducation from '../store/education';
import useExpiriens from '../store/expiriens';
import usePortfolio from '../store/portfolio';
import useSkill from '../store/skill';
import useMessage from '../store/message';
import useUsers from '../store/user';

const GlobalPage = () => {
  const user = useAuth((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { total: educationTotal, getEducation } = useEducation();
  const { total: expiriensTotal, getExpiriens } = useExpiriens();
  const { total: portfolioTotal, getPortfolio } = usePortfolio();
  const { total: messages, getMessage } = useMessage();
  const { total: users, getUser } = useUsers();

  const { total: skillsTotal, getSkills } = useSkill();

  useEffect(() => {
    if (educationTotal || expiriensTotal || portfolioTotal || skillsTotal) {
      setLoading(false);
    }
    getEducation()
    getExpiriens()
    getPortfolio()
    getSkills()
    getMessage()
    getUser()
  }, [educationTotal, expiriensTotal, portfolioTotal, skillsTotal, messages, users]);

  if (loading) {
    return <div className='loading'>
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  }

  return (
    <div className='timeline'>
      <div className='timeline-left'>
        <div className="intro box">
          <div className="intro-title">
            Portfolio
            <button className="intro-menu"></button>
          </div>
          <div className="info">
            <Space wrap>
              <Progress type="dashboard" percent={portfolioTotal} format={percent => (
                <span style={{ color: '#fff' }}>{percent}%</span>
              )}
              />
            </Space>
          </div>
        </div>
        <div className="event box">
          <div className="intro-title">
            Education
            <button className="intro-menu"></button>
          </div>
          <div className="info">
            <Space wrap>
              <Progress type="dashboard" percent={educationTotal} format={percent => (
                <span style={{ color: '#fff' }}>{percent}%</span>
              )}
              />
            </Space>
          </div>
        </div>
        <div className="pages box">
          <div className="intro-title">
            Skills
            <button className="intro-menu"></button>
          </div>
          <div className="info">
            <Space wrap>
              <Progress type="dashboard" percent={skillsTotal} format={percent => (
                <span style={{ color: '#fff' }}>{percent}%</span>
              )}
              />
            </Space>
          </div>
        </div>
      </div>
      <div className='timeline-right'>
        <div className="status box">
          <div className="intro-title">
            Message
            <button className="intro-menu"></button>
          </div>
          <div className="info">
            <Space wrap>
              <Progress type="dashboard" percent={messages} format={percent => (
                <span style={{ color: '#fff' }}>{percent}%</span>
              )}
              />
            </Space>
          </div>
        </div>
        <div className="album box">
          <div className="intro-title">
            Expiriens
            <button className="intro-menu"></button>
          </div>
          <div className="info">
            <Space wrap>
              <Progress type="dashboard" percent={expiriensTotal} format={percent => (
                <span style={{ color: '#fff' }}>{percent}%</span>
              )}
              />
            </Space>
          </div>
        </div>
        {
          user?.role === 'admin' ? (
            <div className="album box">
              <div className="intro-title">
                User
                <button className="intro-menu"></button>
              </div>
              <div className="info">
                <Space wrap>
                  <Progress type="dashboard" percent={users} format={percent => (
                    <span style={{ color: '#fff' }}>{percent}%</span>
                  )}
                  />
                </Space>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default GlobalPage