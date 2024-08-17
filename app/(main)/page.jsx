'use client';
import { useEffect, useState } from 'react';
import transformIcons from '../components/transformIcons';
import { IconService } from '@/demo/service/IconService';

const Home = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    IconService.getIcons().then((data) => {
      data.sort((icon1, icon2) => {
        if (icon1.properties.name < icon2.properties.name) return -1;
        else if (icon1.properties.name < icon2.properties.name) return 1;
        else return 0;
      });

      setIcons(data);
    });
  }, []);
  const content = (
    <div>
      <h2>Icons</h2>
      <p>
        Example of an icon:{' '}
        <i
          className="pi pi-check"
          style={{ fontSize: '2rem', color: '#2a1818' }}
        ></i>
      </p>
      <p>
        Another icon:{' '}
        <i
          className="pi pi-times"
          style={{ fontSize: '2rem', color: '#2a1818' }}
        ></i>
      </p>
    </div>
  );
  return <div>{transformIcons(content, icons)}</div>;
};

export default Home;
