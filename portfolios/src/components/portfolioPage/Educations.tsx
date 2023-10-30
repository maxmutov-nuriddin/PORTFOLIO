import { useEffect, useState } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from 'react-multi-carousel';
import request from '../../server';

import 'react-multi-carousel/lib/styles.css';
import '../../components/portfolioPage/profile.scss'

const Educations = () => {
  const userId = localStorage.getItem("PORTFOLIO_USER")
    ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
    : null;

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formDatas, setFormDatas] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await request(`education?user=${userId._id}`);
        setFormDatas(response.data.data)
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchData();
  }, []);


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


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
    <section className="skills__portfolio my-5" id="experiences">
      <div className="containers">
        <div className="row">
          <div className="col">
            <div className="skills__portfolio-bx wow zoomIn">
              <h2 className='mb-5'>Education</h2>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skills__portfolio-slider justify-content-center"
              >
                {
                  formDatas !== null ? (formDatas.map((data: { _id: number; companyName: string, description: string, workName: string, startDate: string, endDate: string }) => (
                    < div className="item" key={data._id}>
                      <h5 className='fw-bold'><span className='text-warning'>Company Name:</span> {data.companyName}</h5>
                      <p className='m-0'><span className='text-warning'>Description:</span> {data.description}</p>
                      <p className='m-0'><span className='text-warning'>Work Name:</span> {data.workName}</p>
                      <p className='m-0'><span className='text-warning'>Start Date:</span> {data?.startDate.split('T')[0]}</p>
                      <p className='m-0'><span className='text-warning'>End Date:</span> {data?.endDate.split('T')[0]}</p>
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

export default Educations