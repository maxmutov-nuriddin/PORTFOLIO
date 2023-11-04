/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import request from '../../server';

import { Progress, Space } from 'antd';

import 'react-multi-carousel/lib/styles.css';
import '../../components/portfolioPage/profile.scss'

const SkillSection = () => {
  const userId = localStorage.getItem("PORTFOLIO_USER")
    ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
    : null;

  const [loading, setLoading] = useState(true);
  const [formDatas, setFormDatas] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await request(`skills?user=${userId._id}`);
        setFormDatas(response.data.data)
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="skills__portfolio" id="skills">
      <div className="containers">
        <div className="row">
          <div className="col">
            <div className="skills__portfolio-bx wow zoomIn">
              <h2>Skills</h2>
              <p>
                I have a lot of skills, and these skills
                <br />
                👇👇👇👇
              </p>
              <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-padding-bottom"
                dotListClass=""
                draggable
                focusOnSelect
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                  }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {
                  formDatas.length > 0 ? (formDatas.map((data: { name: string, percent: number }) => (
                    < div className="item" key={data.name}>
                      <Space wrap>
                        <Progress type="dashboard" percent={data.percent} format={percent => (
                          <span style={{ color: '#fff' }}>{percent}%</span>
                        )}
                        />
                      </Space>
                      <h5 className='mt-3 fw-bold'>{data.name}</h5>
                    </div>
                  ))) : (<div className="fs-3 text-center mt-5">Card not found</div>)
                }
              </Carousel>
            </div>
          </div>
        </div>
      </div >
    </section >
  )
}

export default SkillSection