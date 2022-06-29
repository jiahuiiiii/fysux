/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import Link from 'next/link';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function PaymentRecord({ data }) {
  const [currentSection, setcurrentSection] = useState(0);
  const paymentTitle = ['学费', '膳食费/洗衣费', '宿舍费', '其他个人收费'];

  return (
    <div className="border-2 border-neutral-700 p-10 mt-10">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-row items-center gap-2">
          <div className="bg-neutral-700 h-10 w-1" />
          <div className="text-2xl font-light">收费项目</div>
        </div>
        <div className="text-[1.1rem] space-x-4">
          {Object.entries(paymentTitle)
            .map(([key, value]) => (
              <button className={`text-zinc-500 py-1 ${currentSection === key ? 'border-b-2 text-neutral-800 transition-all border-neutral-700' : ''} `} onClick={() => setcurrentSection(key)}>{value}</button>
            ))}
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {['日期', '时间', '收据编号', '学号', '学期', '班级', '编号', '收费项目', '金额']
              .map((e) => <th>{e}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-300">
          {data.payment[currentSection].map((row) => (
            <tr>
              {row.map((d) => (
                <td className="py-4 text-center">{d}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentRecord;
