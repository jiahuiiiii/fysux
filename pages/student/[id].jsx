/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Lottie from 'react-lottie';
import PaymentRecord from '../../components/PaymentRecord';
import animationData from '../../assets/loading.json';

function StudentData() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/fetch/${id}`)
        .then((res) => res.json())
        .then((res) => setData(res));
    }
  }, [id]);

  return (data ? (
    <div className="flex flex-col p-8 bg-teal-50 w-full h-screen overflow-x-hidden overflow-y-auto">
      <div>
        <Link href="/">
          <div className="cursor-pointer flex flex-row gap-2 items-center hover:gap-4 transition-all drop-shadow-md">
            <Icon icon="ant-design:arrow-left-outlined" />
            <div>返回首页</div>
          </div>
        </Link>
        <div className="flex flex-col items-center mt-6">
          <div>{data.class}</div>
          <div className="text-4xl font-light mt-2">{data.name}</div>
        </div>
      </div>
      <PaymentRecord data={data} />
    </div>
  ) : (
    <div className="flex w-full h-screen justify-center items-center flex-col">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={400}
        width={400}
      />
      <div className="tracking-widest font-mono text-2xl">fetching...</div>
      <div className="font-mono text-2xl">this might takes some time...</div>
    </div>
  ));
}

export default StudentData;
